import { useEffect } from "react";
import { preloadImage } from "../utils/loading";
import { useLightboxState } from "../ComponentState";
import canUseDom from "../utils/canUseDom";
import { debuginfo } from "../utils/log";

export function useLoadImage() {
  const lightboxContext = useLightboxState();
  const { state } = lightboxContext;
  const { currentIndex } = state;
  const { imageLoaded } = state.figures?.[currentIndex] || {};
  useEffect(() => {
    debuginfo(`useLoadImage: currentImage index is ${currentIndex}`);

    if (!canUseDom) {
      debuginfo("useLoadImage: canUseDom is false, skipping image preload.");
      return;
    }

    preloadImage(
      state,
      lightboxContext.setState
    );
  }, [currentIndex, preloadImage, imageLoaded]);
}
