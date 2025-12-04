## Task: Embed StreamWork Comments as Native PDF Annotations (Memory-Efficient POC)

### Context

In StreamWork, users can leave comments and draw annotations (rectangles, ellipses, lines) on top of PDF documents. We want to **export a PDF that contains these comments as native PDF annotations**, so the resulting PDF can be opened in standard PDF viewers with all comments visible.

A project skeleton is already provided with all necessary inputs, reference outputs, and Docker configuration.

Your task is to build a **proof of concept (POC)** that embeds these annotations correctly and — ideally — does so in a memory-efficient way that can handle extremely large PDFs.

---

# 🎯 Goals

## 1. **Primary Goal (Ideal POC)**

Build an implementation that:

* Reads **`./data/500mb.pdf`**
* Embeds comments and annotations from `index.js` into the correct PDF pages
* Outputs `./data/annotated-document.pdf`
* Runs in a **memory-constrained environment (256MB RAM hard limit)** using the provided `docker-compose.yml`

This is the ideal target. If you achieve this, no fallback is needed.

---

## 2. **Fallback Goal (Non-Ideal but functional POC)**

If you cannot meet the Ideal requirements, you should still produce:

### **A working implementation that:**

* Correctly positions annotations
* Produces the expected visual result (see `./output-reference.pdf`)

### **Input file for fallback:**

* Use **`./data/37mb.pdf`**

### **Documentation requirements for fallback:**
  * Document the memory requirements for processing the input file
  * Peak memory usage (estimate or measurement)
  * Whether 256MB is sufficient, and if not, what memory threshold is required
  * Observed performance characteristics (runtime, I/O behavior)

And:

### ❗ Expand your documentation beyond your implementation:

You should also document:

* Any interesting **research findings**, such as:
  * Any tools you evaluated and rejected (and why)
  * PDF low-level behavior relevant to annotation embedding
  * Theoretical approaches for extreme memory constraints

Essentially:
EVEN IF you cannot make the ideal version work, you should provide meaningful engineering research that shows you explored the problem space thoughtfully.

---

# 📁 Project Structure Overview

You will find:

| File / Folder            | Description                                                                      |
| ------------------------ | -------------------------------------------------------------------------------- |
| `./data/500mb.pdf`       | Primary target PDF (Ideal implementation)                                        |
| `./data/37mb.pdf`        | Backup PDF if your implementation cannot handle 500MB                            |
| `./output-reference.pdf` | The desired output appearance (annotations placement)                            |
| `./index.js`             | Main implementation file; contains the comments array; write all core logic here |
| `./docker-compose.yml`   | Runs your script in a strict 256MB RAM container                                 |

---

# 🧩 Functional Requirements

### 1. Correct Placement

Convert normalized annotation coordinates into real PDF coordinates.

### 2. Native PDF Annotation Types

Use the appropriate PDF annotation subtypes:

| Shape Type          | PDF Subtype                                   |
| ------------------- | --------------------------------------------- |
| `rect`              | `/Square`                                     |
| `ellipse`, `circle` | `/Circle`                                     |
| `line`              | `/Ink` (1 stroke with 2 points is sufficient) |
| no shapes           | `/Text` (sticky note)                         |

### 3. Correct Page Targeting

Use `comment.documentPage` → (pageIndex - 1).

---

# 🏎 Performance & Memory Requirements

* Must run in Docker with **256MB RAM** (Ideal case).
* Avoid loading entire PDFs into memory when possible.
* Measure performance with:

  ```bash
  docker compose up
  ```

---

# 📝 Deliverables

1. **Working implementation** in `index.js`
2. **Generated output PDF** (`./data/annotated-document.pdf`)
3. **Documentation** including:

   * Whether `500mb.pdf` is supported
   * If not, memory requirements of `37mb.pdf`
   * Measured memory use or observed behavior under the 256MB limit
   * Runtime notes
   * List of libraries or techniques evaluated (and why they were chosen/rejected)
   * Any interesting research findings about:

     * PDF structure
     * Annotation embedding
     * Potential optimizations

---

# ⭐ Evaluation Criteria

| Area                  | What we check                                                                      |
| --------------------- | ---------------------------------------------------------------------------------- |
| **Correctness**       | Annotations on correct pages and correctly positioned                              |
| **Output Quality**    | Visual similarity to `output-reference.pdf`                                        |
| **Memory Efficiency** | Ability to run in 256MB container (either input)                                   |
| **Code Quality**      | Readable, structured, maintainable                                                 |
| **Research Depth**    | Thoughtful documentation of findings, not just notes about your own implementation |

