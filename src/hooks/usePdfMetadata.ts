import { useEffect } from "react";
import { ILightboxImageType, useLightboxState } from "../ComponentState";
import { getPDFMetadata } from "../utils/getPDFMetadata";

export function usePdfMetadata() {
  const context = useLightboxState();
  const { state } = context;
  const { pdfDocumentSrc, sourceType } = state;

  useEffect(() => {
    console.log(`usePdfMetadata: sourceType is ${sourceType}`);

    if (sourceType !== ILightboxImageType.PDF) {
      console.warn(
        "usePdfMetadata: sourceType is not PDF, skipping metadata extraction."
      );
      return;
    }

    if (!pdfDocumentSrc) {
      console.warn(
        "usePdfMetadata: pdfDocumentSrc is undefined, skipping metadata extraction."
      );
      return;
    }

    const fetchPdfMetadata = async () => {
      const response = await getPDFMetadata(pdfDocumentSrc);
      console.log(`PDF Metadata fetched: ${JSON.stringify(response)}`);

      context.setPageCount(response.pageCount);
    };

    fetchPdfMetadata();
  }, [pdfDocumentSrc, context.setPageCount, sourceType]);
}
