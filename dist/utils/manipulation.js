import { FULL_ROTATION, IMAGE_MAX_SIZE_RATIO, MIN_SCALE, ROTATE_STEP, } from "./constants";
import { debuginfo } from "./log";
import { getWindowSize } from "./getWindowSize";
const ROTATION_DIRECTION_LEFT = -1;
const ROTATION_DIRECTION_RIGHT = 1;
const SCALE_DIRECTION_NEGATIVE = -1;
const SCALE_DIRECTION_POSITIVE = 1;
// Get image center coordinates
export function getImageCenterXY(figure) {
    const { width: windowWidth, height: windowHeight } = getWindowSize();
    const viewportCenterX = windowWidth / 2;
    const viewportCenterY = windowHeight / 2;
    return {
        x: viewportCenterX + figure.left,
        y: viewportCenterY + figure.top,
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
export const scaleFactors = [1, 1.25, 1.5, 2.5, 4, 6];
export function zoomManipulationToPoint(figure, position) {
    const { scaleX, scaleY, left, top, zoomFactor } = figure;
    const newScale = zoomFactor === scaleFactors[4] ? scaleFactors[0] : scaleFactors[4];
    // Calculate new scale values
    const newScaleX = newScale;
    const newScaleY = newScale;
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
        zoomFactor: newScale
    };
}
// Handle zoom
export function zoomManipulation(zoomingIn, figure) {
    // Which way are we zooming?
    const direction = zoomingIn
        ? SCALE_DIRECTION_NEGATIVE
        : SCALE_DIRECTION_POSITIVE;
    const previousZoomFactor = figure.zoomFactor;
    const previousZoomIndex = previousZoomFactor ? scaleFactors.indexOf(previousZoomFactor) : 0;
    let nextRealIndex = previousZoomIndex + direction;
    if ((nextRealIndex >= scaleFactors.length &&
        direction === SCALE_DIRECTION_POSITIVE) ||
        (nextRealIndex < 0 && direction === SCALE_DIRECTION_NEGATIVE))
        nextRealIndex = 0;
    const updatedScale = scaleFactors[nextRealIndex];
    console.log(`Updated scale factor: ${updatedScale}`);
    // Scale the image
    const newScaleX = updatedScale;
    const newScaleY = updatedScale;
    if (newScaleX < MIN_SCALE || newScaleY < MIN_SCALE)
        return undefined;
    return {
        scaleX: newScaleX,
        scaleY: newScaleY,
        zoomFactor: updatedScale,
    };
}
// Handle rotate
export function flipManipulation(figure, isHorisontal = false) {
    const { scaleX, scaleY } = figure;
    const newScaleX = scaleX * (isHorisontal ? -1 : 1);
    const newScaleY = scaleY * (isHorisontal ? 1 : -1);
    // Use requestAnimationFrame to batch the state update and prevent flashing
    return {
        scaleX: newScaleX,
        scaleY: newScaleY,
    };
}
// Handle rotate
export function rotateManipulation(figure, isRight = false) {
    debuginfo(`Handling rotate: isRight=${isRight}, current rotate=${figure.rotate}`);
    // Use requestAnimationFrame to batch the state update and prevent flashing
    return {
        rotate: (figure.rotate +
            ROTATE_STEP *
                (isRight ? ROTATION_DIRECTION_RIGHT : ROTATION_DIRECTION_LEFT)) %
            FULL_ROTATION,
    };
}
export function resetOnAbsence(trackedImage) {
    const missingWidth = !trackedImage.width || trackedImage.width <= 0;
    const missingHeight = !trackedImage.height || trackedImage.height <= 0;
    const missingScaleX = !trackedImage.scaleX || trackedImage.scaleX <= 0;
    const missingScaleY = !trackedImage.scaleY || trackedImage.scaleY <= 0;
    const missingRotate = trackedImage.rotate === undefined || trackedImage.rotate === null;
    const missingZoomFactor = !trackedImage.zoomFactor || trackedImage.zoomFactor <= 0;
    const needsReset = missingWidth || missingHeight || missingScaleX || missingScaleY || missingRotate || missingZoomFactor;
    if (needsReset)
        return handleReset(trackedImage);
    else
        return {};
}
export function handleReset(trackedImage) {
    debuginfo("Handling reset: resetting image state to initial values");
    // Use requestAnimationFrame to batch the state update and prevent flashing
    const { height: windowHeight } = getWindowSize();
    const getImageAspectRatio = () => {
        const imageHeight = trackedImage.imageHeight;
        const imageWidth = trackedImage.imageWidth;
        return imageWidth / imageHeight;
    };
    const imageAspectRatio = getImageAspectRatio();
    const imageHeightFillingScreen = windowHeight;
    const imageWidthFillingScreen = imageAspectRatio * imageHeightFillingScreen;
    return {
        height: imageHeightFillingScreen,
        width: imageWidthFillingScreen,
        rotate: 0,
        scaleX: 1,
        scaleY: 1,
        top: 0,
        left: 0,
    };
}
