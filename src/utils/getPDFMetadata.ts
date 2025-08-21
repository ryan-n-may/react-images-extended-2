import { pdfjs } from "react-pdf";

export async function getPDFMetadata(
  pdfUrl: string
): Promise<{ pageCount: number }> {
  const loadingTask = pdfjs.getDocument(pdfUrl);
  const pdf = await loadingTask.promise;

  return {
    pageCount: pdf.numPages,
  };
}
