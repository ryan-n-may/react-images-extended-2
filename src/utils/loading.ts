import { ILightboxState, ILightboxTrackedImage } from "../ComponentState";
import { resetOnAbsence } from "./manipulation";
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

export function handleInitialisingImages(images: Array<IImage>) {
  if (!images || images.length === 0) return [];

  const figureArray: Array<ILightboxTrackedImage> = images.map((img) => ({
    ...img,
    zoom: 1,
    rotation: 0,
    offsetX: 0,
    offsetY: 0,
    imageLoaded: false,
    imageWidth: 0,
    imageHeight: 0,
    left: 0,
    top: 0,
    scaleX: 1,
    scaleY: 1,
    rotate: 0,
    error: null,
    initialRotation: 0,
    initialZoom: 1,
    initialOffsetX: 0,
    initialOffsetY: 0,
    width: 0,
    height: 0,
    zoomFactor: 1,
    scrollX: 0,
    scrollY: 0,
  }));

  return figureArray;
}

export function preloadImage(
  state: ILightboxState,
  updateLightboxState: (updates: Partial<ILightboxState>) => void
): HTMLImageElement {
  const { figures, currentIndex: idx } = state;
  console.log(`Preloading image at index: ${idx}`); // Debugging log

  const data = figures?.[idx];

  const img = new Image();

  if (!figures || idx < 0 || idx >= figures.length) {
    return img; // Return empty image if index is out of bounds
  }

  const sourceSet = normalizeSourceSet(data);

  img.onload = () => {
    const currentFigure = figures[idx];
    const resetImageState = resetOnAbsence(currentFigure);

    const updatedFigure: ILightboxTrackedImage = {
      ...currentFigure,
      ...resetImageState,
      imageLoaded: true,
    };
    updatedFigure.imageWidth = img.width;
    updatedFigure.imageHeight = img.height;
    figures[idx] = updatedFigure;

    const stateIncludingImageAttributes: ILightboxState = {
      ...state,
      figures,
      isNavigating: false, // Clear navigation state when image loads successfully
    };

    updateLightboxState({
      ...state,
      ...stateIncludingImageAttributes,
    });
  };

  img.onerror = () => {
    const currentFigure = figures[idx];

    const updatedFigure: ILightboxTrackedImage = {
      ...currentFigure,
      error: `Failed to load image at index ${idx}`,
      imageLoaded: false,
    };
    updatedFigure.imageWidth = img.width;
    updatedFigure.imageHeight = img.height;
    figures[idx] = updatedFigure;

    const stateIncludingImageAttributes: ILightboxState = {
      ...state,
      figures,
    };

    updateLightboxState({
      ...state,
      ...stateIncludingImageAttributes,
    });
  };

  if (!data || !data.src) {
    const currentFigure = figures[idx];

    const updatedFigure: ILightboxTrackedImage = {
      ...currentFigure,
      error: `No image data found for image at index ${idx}`,
      imageLoaded: false,
    };
    updatedFigure.imageWidth = img.width;
    updatedFigure.imageHeight = img.height;
    figures[idx] = updatedFigure;

    const stateIncludingImageAttributes: ILightboxState = {
      ...state,
      figures,
    };

    updateLightboxState({
      ...state,
      ...stateIncludingImageAttributes,
    });

    return img;
  }

  img.src = data.src;
  if (sourceSet) img.srcset = sourceSet;

  return img;
}
