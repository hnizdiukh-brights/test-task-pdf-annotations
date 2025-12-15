import { join } from 'path';
import muhammara from 'muhammara';
import type {
  ProcessedComment,
  Annotation,
  PDFCoordinates,
  RGBColor,
} from './types.js';
import { COMMENTS } from './constants.js';

const documentPath = join(process.cwd(), 'data', '500mb.pdf');
const outputPath = join(process.cwd(), 'data', 'annotated-document.pdf');

class PDFAnnotator {
  hexToRGB(hex: string): RGBColor {
    const cleanHex = hex.replace('#', '');
    const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
    const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
    const b = parseInt(cleanHex.substring(4, 6), 16) / 255;
    return { r, g, b };
  }

  transformCoordinates(
    annotation: Annotation,
    pageWidth: number,
    pageHeight: number,
  ): PDFCoordinates {
    let x = annotation.left * pageWidth;
    let y = annotation.top * pageHeight;

    if (annotation.originX === 'center') {
      x = x - (annotation.width * pageWidth) / 2;
    } else if (annotation.originX === 'right') {
      x = x - annotation.width * pageWidth;
    }

    if (annotation.originY === 'center') {
      y = y - (annotation.height * pageHeight) / 2;
    } else if (annotation.originY === 'bottom') {
      y = y - annotation.height * pageHeight;
    }

    const width = annotation.width * pageWidth;
    const height = annotation.height * pageHeight;

    const pdfY = pageHeight - y - height;

    return { x, y: pdfY, width, height };
  }

  logMemory(label: string): void {
    const used = process.memoryUsage();
    console.log(`${label}:`, {
      rss: `${Math.round(used.rss / 1024 / 1024)}MB`,
      heapUsed: `${Math.round(used.heapUsed / 1024 / 1024)}MB`,
      heapTotal: `${Math.round(used.heapTotal / 1024 / 1024)}MB`,
      external: `${Math.round(used.external / 1024 / 1024)}MB`,
    });
  }
}

async function main(): Promise<void> {
  try {
    const annotator = new PDFAnnotator();
    console.log('Starting PDF annotation process...');
    annotator.logMemory('Initial memory');

    const processedComments: ProcessedComment[] = COMMENTS.map(comment => ({
      ...comment,
      parsedAnnotations: comment.annotations
        ? JSON.parse(comment.annotations)
        : null,
      pageIndex: comment.documentPage - 1,
    }));

    const commentsByPage = new Map<number, ProcessedComment[]>();
    processedComments.forEach(comment => {
      if (!commentsByPage.has(comment.pageIndex)) {
        commentsByPage.set(comment.pageIndex, []);
      }
      commentsByPage.get(comment.pageIndex)!.push(comment);
    });

    console.log(
      `Processing ${processedComments.length} comments across ${commentsByPage.size} pages`,
    );
    annotator.logMemory('After parsing comments');

    const pdfReader = muhammara.createReader(documentPath);
    const pageCount = pdfReader.getPagesCount();
    console.log(`Document has ${pageCount} pages`);

    annotator.logMemory('After creating PDF reader');

    const recipe = new muhammara.Recipe(documentPath, outputPath);

    for (const [pageIndex, pageComments] of commentsByPage.entries()) {
      if (pageIndex >= pageCount) {
        console.warn(
          `Warning: Comment references page ${
            pageIndex + 1
          } but document only has ${pageCount} pages`,
        );
        continue;
      }

      console.log(
        `Processing page ${pageIndex + 1} with ${
          pageComments.length
        } comment(s)`,
      );

      const pageInfo = pdfReader.parsePage(pageIndex);
      const mediaBox = pageInfo.getMediaBox();
      const pageWidth = mediaBox[2] - mediaBox[0];
      const pageHeight = mediaBox[3] - mediaBox[1];

      recipe.editPage(pageIndex + 1);

      let commentYPosition = 20;

      for (const comment of pageComments) {
        if (comment.text) {
          recipe.comment(comment.text, 20, commentYPosition);
          commentYPosition += 15; // Stack comments vertically
        }

        if (comment.parsedAnnotations && comment.parsedAnnotations.length > 0) {
          for (const annotation of comment.parsedAnnotations) {
            const color = annotator.hexToRGB(annotation.stroke);
            const coords = annotator.transformCoordinates(
              annotation,
              pageWidth,
              pageHeight,
            );

            switch (annotation.type) {
              case 'rect': {
                recipe.rectangle(
                  coords.x,
                  coords.y,
                  coords.width,
                  coords.height,
                  {
                    stroke: annotation.stroke,
                    lineWidth: 2,
                  },
                );
                break;
              }

              case 'ellipse':
              case 'circle': {
                recipe.circle(
                  coords.x + coords.width / 2,
                  coords.y + coords.height / 2,
                  Math.max(coords.width, coords.height) / 2,
                  {
                    stroke: annotation.stroke,
                    lineWidth: 2,
                  },
                );
                break;
              }

              case 'line': {
                const centerX = annotation.left * pageWidth;
                const centerY = pageHeight - annotation.top * pageHeight;
                const x1 = centerX + annotation.x1! * pageWidth;
                const y1 = centerY - annotation.y1! * pageHeight;
                const x2 = centerX + annotation.x2! * pageWidth;
                const y2 = centerY - annotation.y2! * pageHeight;

                recipe.line(
                  [
                    [x1, y1],
                    [x2, y2],
                  ],
                  {
                    stroke: annotation.stroke,
                    lineWidth: 2,
                  },
                );
                break;
              }
            }
          }
        }
      }

      recipe.endPage();

      annotator.logMemory(`After processing page ${pageIndex + 1}`);
    }

    // Finalize with Recipe
    recipe.endPDF();

    annotator.logMemory('Final memory after saving');
    console.log(`✓ Successfully saved annotated PDF to ${outputPath}`);
  } catch (error) {
    console.error('Error processing PDF:', error);
    throw error;
  }
}

// Execute
main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
