import { ILightboxImageState, ILightboxState } from "../ComponentState";
import { debuginfo } from "./log";
import { handleReset } from "./manipulation";
import { IImage } from "./types";

// consumers sometimes provide incorrect type or casing
export function normalizeSourceSet(data: IImage) {
  if (!data) return null;

  const sourceSet = data.srcSet || data.srcSet;

  if (!sourceSet) return null;

  if (Array.isArray(sourceSet)) {
    return sourceSet.join();
  }

  return sourceSet;
}

// Preload image
export function preloadImage(
  state: ILightboxState,
  updateImageState: (updates: Partial<ILightboxImageState>) => void,
  resetImageOnLoad: boolean
): HTMLImageElement {
  const { images, currentImage: idx } = state;
  console.log(`Preloading image at index: ${idx}`); // Debugging log

  const data = images?.[idx];

  const img = new Image();

  if (!images || idx < 0 || idx >= images.length) {
    return img; // Return empty image if index is out of bounds
  }

  const sourceSet = normalizeSourceSet(data);

  img.onload = () => {
    debuginfo(`Image loaded at index ${idx}`); // Debugging log
    debuginfo(`Image dimensions: ${img.width}x${img.height}`); // Debugging log
    const stateIncludingImageAttributes: ILightboxState = {
      ...state,
      imageState: {
        ...state.imageState,
        imageHeight: img.height,
        imageWidth: img.width,
      },
    };
    const resetImageState = resetImageOnLoad
      ? handleReset(stateIncludingImageAttributes)
      : stateIncludingImageAttributes.imageState;
    updateImageState({
      ...stateIncludingImageAttributes.imageState,
      ...resetImageState,
      imageLoaded: true,
    });
  };

  img.onerror = () => {
    debuginfo(`Failed to load image at index ${idx}`);
    updateImageState({
      error: `Failed to load image at index ${idx}`,
      imageLoaded: false,
    });
  };

  if (!data || !data.src) {
    debuginfo(`No image data found for index ${idx}`);
    return img;
  }

  img.src = data.src;
  if (sourceSet) img.srcset = sourceSet;

  return img;
}
