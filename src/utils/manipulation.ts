import { MutableRefObject } from 'react';
import { ILightboxImageState } from '../ComponentState';
import { CENTER_DIVISOR, FULL_ROTATION, IMAGE_MAX_SIZE_RATIO, MIN_SCALE, ROTATE_STEP } from './constants';
import { debuginfo } from './log';

const ROTATION_DIRECTION_LEFT = -1;
const ROTATION_DIRECTION_RIGHT = 1;
const SCALE_DIRECTION_NEGATIVE = -1;
const SCALE_DIRECTION_POSITIVE = 1;

// Get image center coordinates
export function getImageCenterXY(state: ILightboxImageState): { x: number; y: number } {
  return {
    x: state.left + state.width / CENTER_DIVISOR,
    y: state.top + state.height / CENTER_DIVISOR
  };
}

// Calculate image width and height
export function getImgWidthHeight(
  imgWidth: number,
  imgHeight: number,
  containerWidthRef: MutableRefObject<number>,
  containerHeightRef: MutableRefObject<number>,
  footerHeightRef: MutableRefObject<number>
): [number, number] {
  const maxWidth = containerWidthRef.current * IMAGE_MAX_SIZE_RATIO;
  const maxHeight = (containerHeightRef.current - footerHeightRef.current) * IMAGE_MAX_SIZE_RATIO;
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
  state: ILightboxImageState
): Partial<ILightboxImageState> | undefined {
  const { scaleX, scaleY } = state;

  // Which way are we zooming?
  const direction: 1 | -1 = zoomingIn ? SCALE_DIRECTION_NEGATIVE : SCALE_DIRECTION_POSITIVE;

  const step = 0.1;

  const scaleChange = direction * step;

  // Scale the image
  const newScaleX = scaleX + scaleChange;
  const newScaleY = scaleY + scaleChange;

  if (newScaleX < MIN_SCALE || newScaleY < MIN_SCALE) return undefined;

  return {
    scaleX: newScaleX,
    scaleY: newScaleY
  };
}

// Handle rotate
export function flipManipulation(
  state: ILightboxImageState,
  isHorisontal: boolean = false
): Partial<ILightboxImageState> {
  const { scaleX, scaleY } = state;

  const newScaleX = scaleX * (isHorisontal ? -1 : 1);
  const newScaleY = scaleY * (isHorisontal ? 1 : -1);

  // Use requestAnimationFrame to batch the state update and prevent flashing
  return {
    scaleX: newScaleX,
    scaleY: newScaleY
  };
}

// Handle rotate
export function rotateManipulation(state: ILightboxImageState, isRight: boolean = false): Partial<ILightboxImageState> {
  debuginfo(`Handling rotate: isRight=${isRight}, current rotate=${state.rotate}`);
  // Use requestAnimationFrame to batch the state update and prevent flashing
  return {
    rotate:
      (state.rotate + ROTATE_STEP * (isRight ? ROTATION_DIRECTION_RIGHT : ROTATION_DIRECTION_LEFT)) % FULL_ROTATION
  };
}

export function handleReset(
  widthRef: number,
  heightRef: number,
  imageWidth: number,
  imageHeight: number
): Partial<ILightboxImageState> {
  debuginfo('Handling reset: resetting image state to initial values');
  // Use requestAnimationFrame to batch the state update and prevent flashing
  return {
    rotate: 0,
    scaleX: 1,
    scaleY: 1,
    top: Math.abs(heightRef / 2 - imageHeight / 2),
    left: Math.abs(widthRef / 2 - imageWidth / 2)
  };
}
