import { MutableRefObject, useEffect } from "react";
import { preloadImage } from "../utils/loading";
import { useLightboxState } from "../ComponentState";
import canUseDom from "../utils/canUseDom";
import { debuginfo } from "../utils/log";

export function useLoadImage(
  containerWidthRef: MutableRefObject<number>,
  containerHeightRef: MutableRefObject<number>,
  footerHeightRef: MutableRefObject<number>
) {
  const lightboxContext = useLightboxState();
  useEffect(() => {
    debuginfo(
      `useLoadImage: currentImage index is ${lightboxContext.state.currentImage}`
    );
    if (!canUseDom) return;

    preloadImage(
      lightboxContext.state,
      lightboxContext.updateImageState,
      containerWidthRef,
      containerHeightRef,
      footerHeightRef
    );
  }, [lightboxContext.state.currentImage, preloadImage]);
}
