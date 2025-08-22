import { IImageViewMode, } from "../ComponentState";
import { FULL_ROTATION, IMAGE_MAX_SIZE_RATIO, MIN_SCALE, ROTATE_STEP, } from "./constants";
import { debuginfo } from "./log";
import { getWindowSize } from "./getWindowSize";
const ROTATION_DIRECTION_LEFT = -1;
const ROTATION_DIRECTION_RIGHT = 1;
const SCALE_DIRECTION_NEGATIVE = -1;
const SCALE_DIRECTION_POSITIVE = 1;
// Get image center coordinates
export function getImageCenterXY(state) {
    const { width: windowWidth, height: windowHeight } = getWindowSize();
    const viewportCenterX = windowWidth / 2;
    const viewportCenterY = windowHeight / 2;
    return {
        x: viewportCenterX + state.left,
        y: viewportCenterY + state.top,
    };
}
// Calculate image width and height
export function getImgWidthHeight(imgWidth, imgHeight) {
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
export function zoomManipulationToPoint(state, position) {
    const { scaleX, scaleY, left, top } = state;
    const zoomFactor = 2;
    // Calculate new scale values
    const newScaleX = scaleX * zoomFactor;
    const newScaleY = scaleY * zoomFactor;
    if (newScaleX < MIN_SCALE || newScaleY < MIN_SCALE)
        return undefined;
    // Get viewport center (since our CSS positions the image at 50%, 50%)
    const { width: windowWidth, height: windowHeight } = getWindowSize();
    const viewportCenterX = windowWidth / 2;
    const viewportCenterY = windowHeight / 2;
    // Current image center in viewport coordinates
    const currentImageCenterX = viewportCenterX + left;
    const currentImageCenterY = viewportCenterY + top;
    // Click position relative to current image center
    const clickRelativeToCenterX = position.x - currentImageCenterX;
    const clickRelativeToCenterY = position.y - currentImageCenterY;
    // Convert click position to unscaled image coordinates
    const unscaledClickX = clickRelativeToCenterX / scaleX;
    const unscaledClickY = clickRelativeToCenterY / scaleY;
    // Calculate where the image center should move to keep the clicked point stationary
    const newImageCenterX = position.x - unscaledClickX * newScaleX;
    const newImageCenterY = position.y - unscaledClickY * newScaleY;
    // Convert back to offset from viewport center
    const newLeft = newImageCenterX - viewportCenterX;
    const newTop = newImageCenterY - viewportCenterY;
    return {
        scaleX: newScaleX,
        scaleY: newScaleY,
        left: newLeft,
        top: newTop,
    };
}
// Handle zoom
export function zoomToAFactor(notchNumber) {
    const scaleArr = new Array(100);
    scaleArr.map((_, index) => {
        const scaleFactor = 1 + index * 1; // Scale factor increases by 0.1 for each notch
        scaleArr[index] = scaleFactor;
    });
    return {
        scaleX: scaleArr[notchNumber] || 1,
        scaleY: scaleArr[notchNumber] || 1,
    };
}
// Handle zoom
export function zoomManipulation(zoomingIn, state, zoomFactor) {
    const { scaleX, scaleY } = state;
    // Which way are we zooming?
    const direction = zoomingIn
        ? SCALE_DIRECTION_NEGATIVE
        : SCALE_DIRECTION_POSITIVE;
    // Dynamic step size based on current scale - larger steps at higher zoom levels
    const baseStep = zoomFactor ?? 0.1;
    const scaleFactor = Math.max(scaleX, scaleY); // Use the larger of the two scales
    const dynamicStep = baseStep * (1 + scaleFactor * 1.2); // More aggressive step increases with scale
    const scaleChange = direction * dynamicStep;
    // Scale the image
    const newScaleX = scaleX + scaleChange;
    const newScaleY = scaleY + scaleChange;
    if (newScaleX < MIN_SCALE || newScaleY < MIN_SCALE)
        return undefined;
    return {
        scaleX: newScaleX,
        scaleY: newScaleY,
    };
}
// Handle rotate
export function flipManipulation(state, isHorisontal = false) {
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
export function rotateManipulation(state, isRight = false) {
    debuginfo(`Handling rotate: isRight=${isRight}, current rotate=${state.rotate}`);
    // Use requestAnimationFrame to batch the state update and prevent flashing
    return {
        rotate: (state.rotate +
            ROTATE_STEP *
                (isRight ? ROTATION_DIRECTION_RIGHT : ROTATION_DIRECTION_LEFT)) %
            FULL_ROTATION,
    };
}
export function handlePinFigure(state) {
    return {
        imageState: state.figureManipulation,
        imageIndex: state.currentIndex,
    };
}
export function handleReset(state) {
    debuginfo("Handling reset: resetting image state to initial values");
    // Use requestAnimationFrame to batch the state update and prevent flashing
    const { height: windowHeight } = getWindowSize();
    const getImageAspectRatio = () => {
        if (state.viewMode === IImageViewMode.IMAGE) {
            return (state.figureManipulation.imageWidth /
                state.figureManipulation.imageHeight);
        }
        const imageHeight = state.figureManipulation.imageHeight;
        const imageWidth = state.figureManipulation.imageWidth * 2;
        return imageWidth / imageHeight;
    };
    const imageAspectRatio = getImageAspectRatio();
    console.log(`Image aspect ratio: ${imageAspectRatio}: ${state.figureManipulation.imageWidth} / ${state.figureManipulation.imageHeight}`);
    const imageHeightFillingScreen = windowHeight * IMAGE_MAX_SIZE_RATIO;
    const imageWidthFillingScreen = imageAspectRatio * imageHeightFillingScreen;
    // With center-based positioning, we start at (0, 0) offset from center
    const left = 0;
    const top = 0;
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
