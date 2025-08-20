import { MutableRefObject, useEffect } from "react";
import { preloadImage } from "../utils/loading";
import { useLightboxState } from "../ComponentState";
import canUseDom from "../utils/canUseDom";
import { debuginfo } from "../utils/log";

export function useLoadImage(footerHeightRef: MutableRefObject<number>) {
  const lightboxContext = useLightboxState();
  useEffect(() => {
    debuginfo(
      `useLoadImage: currentImage index is ${lightboxContext.state.currentImage}`
    );
    
    if (!canUseDom) {
      debuginfo("useLoadImage: canUseDom is false, skipping image preload.");
      return;
    }

    preloadImage(
      lightboxContext.state,
      lightboxContext.updateImageState,
      footerHeightRef
    );
  }, [lightboxContext.state.currentImage, preloadImage]);
}
