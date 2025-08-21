import { pdfjs } from "react-pdf";

// Reference worker bundled with your library
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  './pdf.worker.min.js',
  import.meta.url
).toString();