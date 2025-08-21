import { useEffect } from "react";
import { preloadImage } from "../utils/loading";
import { ILightboxImageType, useLightboxState } from "../ComponentState";
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

    // We do not need to preload pdf sources
    if (state.sourceType === ILightboxImageType.PDF) return;

    preloadImage(
      state,
      lightboxContext.updateImageState,
      !currentImageIsPinned
    );
  }, [currentImage, preloadImage, images]);
}
