import { useEffect } from "react";
import { preloadImage } from "../utils/loading";
import { useLightboxState } from "../ComponentState";
import canUseDom from "../utils/canUseDom";
import { debuginfo } from "../utils/log";

export function useLoadImage() {
  const lightboxContext = useLightboxState();
  const { state } = lightboxContext;
  const { currentImage, images, currentImageIsPinned } = state;
  useEffect(() => {
    debuginfo(`useLoadImage: currentImage index is ${currentImage}`);

    if (!canUseDom) {
      debuginfo("useLoadImage: canUseDom is false, skipping image preload.");
      return;
    }

    preloadImage(state, lightboxContext.updateImageState, !currentImageIsPinned);
  }, [currentImage, preloadImage, images]);
}
