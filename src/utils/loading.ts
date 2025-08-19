import { ILightboxImageState, ILightboxState } from "../ComponentState";
import { CENTER_DIVISOR } from "./constants";
import { getWindowSize } from "./getWindowSize";
import { debuginfo } from "./log";
import { getImgWidthHeight } from "./manipulation";
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
  footerHeightRef: React.MutableRefObject<number>
): HTMLImageElement {
  const { images, currentImage: idx } = state;
  console.log(`Preloading image at index: ${idx}`); // Debugging log

  const data = images?.[idx];

  const img = new Image();
  const sourceSet = normalizeSourceSet(data);

  img.onload = () => {
    debuginfo(`Image loaded at index ${idx}`); // Debugging log
    const imgWidth = img.width;
    const imgHeight = img.height;

    const [calculatedWidth, calculatedHeight] = getImgWidthHeight(
      imgWidth,
      imgHeight,
      footerHeightRef
    );

    const { height: windowHeight, width: windowWidth } = getWindowSize();

    const left = (windowWidth - calculatedWidth) / CENTER_DIVISOR;
    const top =
      (windowHeight - calculatedHeight - footerHeightRef.current) /
      CENTER_DIVISOR;
      
    updateImageState({
      width: calculatedWidth,
      height: calculatedHeight,
      error: null,
      left,
      top,
      imageWidth: imgWidth,
      imageHeight: imgHeight,
      rotate: data.initialRotation || 0,
      scaleX: data.initialZoom || 1,
      scaleY: data.initialZoom || 1,
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
