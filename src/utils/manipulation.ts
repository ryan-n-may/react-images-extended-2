import {
  IImageViewMode,
  ILightboxManipulationState,
  ILightboxState,
} from "../ComponentState";
import {
  CENTER_DIVISOR,
  FULL_ROTATION,
  IMAGE_MAX_SIZE_RATIO,
  MIN_SCALE,
  ROTATE_STEP,
} from "./constants";
import { debuginfo } from "./log";
import { getWindowSize } from "./getWindowSize";

const ROTATION_DIRECTION_LEFT = -1;
const ROTATION_DIRECTION_RIGHT = 1;
const SCALE_DIRECTION_NEGATIVE = -1;
const SCALE_DIRECTION_POSITIVE = 1;

// Get image center coordinates
export function getImageCenterXY(state: ILightboxManipulationState): {
  x: number;
  y: number;
} {
  return {
    x: state.left + state.width / CENTER_DIVISOR,
    y: state.top + state.height / CENTER_DIVISOR,
  };
}

// Calculate image width and height
export function getImgWidthHeight(
  imgWidth: number,
  imgHeight: number
): [number, number] {
  const { width: windowWidth, height: windowHeight } = getWindowSize();

  const maxWidth = windowWidth * IMAGE_MAX_SIZE_RATIO;
  const maxHeight = windowHeight * IMAGE_MAX_SIZE_RATIO;
  let calculatedWidth = Math.min(maxWidth, imgWidth);
  let calculatedHeight = (calculatedWidth / imgWidth) * imgHeight;
  if (calculatedHeight > maxHeight) {
    calculatedHeight = maxHeight;
    calculatedWidth = (calculatedHeight / imgHeight) * imgWidth;
  }
  return [calculatedWidth, calculatedHeight];
}

// Handle zoom
export function zoomManipulation(
  zoomingIn: boolean,
  state: ILightboxManipulationState
): Partial<ILightboxManipulationState> | undefined {
  const { scaleX, scaleY } = state;

  // Which way are we zooming?
  const direction: 1 | -1 = zoomingIn
    ? SCALE_DIRECTION_NEGATIVE
    : SCALE_DIRECTION_POSITIVE;

  const step = 0.1;

  const scaleChange = direction * step;

  // Scale the image
  const newScaleX = scaleX + scaleChange;
  const newScaleY = scaleY + scaleChange;

  if (newScaleX < MIN_SCALE || newScaleY < MIN_SCALE) return undefined;

  return {
    scaleX: newScaleX,
    scaleY: newScaleY,
  };
}

// Handle rotate
export function flipManipulation(
  state: ILightboxManipulationState,
  isHorisontal: boolean = false
): Partial<ILightboxManipulationState> {
  const { scaleX, scaleY } = state;

  const newScaleX = scaleX * (isHorisontal ? -1 : 1);
  const newScaleY = scaleY * (isHorisontal ? 1 : -1);

  // Use requestAnimationFrame to batch the state update and prevent flashing
  return {
    scaleX: newScaleX,
    scaleY: newScaleY,
  };
}

// Handle rotate
export function rotateManipulation(
  state: ILightboxManipulationState,
  isRight: boolean = false
): Partial<ILightboxManipulationState> {
  debuginfo(
    `Handling rotate: isRight=${isRight}, current rotate=${state.rotate}`
  );
  // Use requestAnimationFrame to batch the state update and prevent flashing
  return {
    rotate:
      (state.rotate +
        ROTATE_STEP *
          (isRight ? ROTATION_DIRECTION_RIGHT : ROTATION_DIRECTION_LEFT)) %
      FULL_ROTATION,
  };
}

export interface IPinnedState {
  imageState: ILightboxManipulationState;
  imageIndex: number;
}

export function handlePinFigure(state: ILightboxState): IPinnedState {
  return {
    imageState: state.figureManipulation,
    imageIndex: state.currentIndex,
  };
}

export function handleReset(
  state: ILightboxState
): Partial<ILightboxManipulationState> {
  debuginfo("Handling reset: resetting image state to initial values");
  // Use requestAnimationFrame to batch the state update and prevent flashing
  const { height: windowHeight, width: windowWidth } = getWindowSize();

  const getImageAspectRatio = () => {
    if (state.viewMode === IImageViewMode.IMAGE) {
      return (
        state.figureManipulation.imageWidth /
        state.figureManipulation.imageHeight
      );
    }

    const imageHeight = state.figureManipulation.imageHeight;
    const imageWidth = state.figureManipulation.imageWidth * 2;

    return imageWidth / imageHeight;
  };

  const imageAspectRatio = getImageAspectRatio();

  console.log(
    `Image aspect ratio: ${imageAspectRatio}: ${state.figureManipulation.imageWidth} / ${state.figureManipulation.imageHeight}`
  );

  const imageHeightFillingScreen = windowHeight * IMAGE_MAX_SIZE_RATIO;
  const imageWidthFillingScreen = imageAspectRatio * imageHeightFillingScreen;

  const left = (windowWidth - imageWidthFillingScreen) / 2;
  const top = (windowHeight - imageHeightFillingScreen) / 2;

  return {
    height: imageHeightFillingScreen,
    width: imageWidthFillingScreen,
    rotate: 0,
    scaleX: 1,
    scaleY: 1,
    top,
    left,
  };
}
