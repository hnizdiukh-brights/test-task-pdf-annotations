export interface User {
  type: string;
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  me: boolean;
}

export interface Annotation {
  type: 'rect' | 'ellipse' | 'circle' | 'line';
  left: number;
  top: number;
  originX: string;
  originY: string;
  width: number;
  height: number;
  stroke: string;
  // Line-specific properties
  x1?: number;
  x2?: number;
  y1?: number;
  y2?: number;
}

export interface Comment {
  id: string;
  repliedToId: string | null;
  topParentId: string | null;
  task: any;
  user: User;
  isExternal: boolean;
  priority: boolean;
  text: string;
  documentPage: number;
  annotations: string | null;
  createdAt: string;
}

export interface ProcessedComment extends Comment {
  parsedAnnotations: Annotation[] | null;
  pageIndex: number;
}

export interface PDFCoordinates {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface RGBColor {
  r: number;
  g: number;
  b: number;
}
