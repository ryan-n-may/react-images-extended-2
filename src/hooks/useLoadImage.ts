import { useEffect } from "react";
import { preloadImage } from "../utils/loading";
import { ILightboxImageType, useLightboxState } from "../ComponentState";
import canUseDom from "../utils/canUseDom";
import { debuginfo } from "../utils/log";

export function useLoadImage() {
  const lightboxContext = useLightboxState();
  const { state } = lightboxContext;
  const { currentIndex, images, currentIndexIsPinned, resetImageOnLoad } = state;
  useEffect(() => {
    debuginfo(`useLoadImage: currentImage index is ${currentIndex}`);

    if (!canUseDom) {
      debuginfo("useLoadImage: canUseDom is false, skipping image preload.");
      return;
    }

    // We do not need to preload pdf sources
    if (state.sourceType === ILightboxImageType.PDF) {
      lightboxContext.updateFigureManipulation({
        imageLoaded: true,
      });
    }


    preloadImage(
      state,
      lightboxContext.updateFigureManipulation,
      !currentIndexIsPinned || resetImageOnLoad
    );
  }, [currentIndex, preloadImage, images]);
}
