"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleReset = exports.pinImage = exports.rotateManipulation = exports.flipManipulation = exports.zoomManipulation = exports.getImgWidthHeight = exports.getImageCenterXY = void 0;
const ComponentState_1 = require("../ComponentState");
const constants_1 = require("./constants");
const log_1 = require("./log");
const getWindowSize_1 = require("./getWindowSize");
const ROTATION_DIRECTION_LEFT = -1;
const ROTATION_DIRECTION_RIGHT = 1;
const SCALE_DIRECTION_NEGATIVE = -1;
const SCALE_DIRECTION_POSITIVE = 1;
// Get image center coordinates
function getImageCenterXY(state) {
    return {
        x: state.left + state.width / constants_1.CENTER_DIVISOR,
        y: state.top + state.height / constants_1.CENTER_DIVISOR,
    };
}
exports.getImageCenterXY = getImageCenterXY;
// Calculate image width and height
function getImgWidthHeight(imgWidth, imgHeight) {
    const { width: windowWidth, height: windowHeight } = (0, getWindowSize_1.getWindowSize)();
    const maxWidth = windowWidth * constants_1.IMAGE_MAX_SIZE_RATIO;
    const maxHeight = windowHeight * constants_1.IMAGE_MAX_SIZE_RATIO;
    let calculatedWidth = Math.min(maxWidth, imgWidth);
    let calculatedHeight = (calculatedWidth / imgWidth) * imgHeight;
    if (calculatedHeight > maxHeight) {
        calculatedHeight = maxHeight;
        calculatedWidth = (calculatedHeight / imgHeight) * imgWidth;
    }
    return [calculatedWidth, calculatedHeight];
}
exports.getImgWidthHeight = getImgWidthHeight;
// Handle zoom
function zoomManipulation(zoomingIn, state) {
    const { scaleX, scaleY } = state;
    // Which way are we zooming?
    const direction = zoomingIn
        ? SCALE_DIRECTION_NEGATIVE
        : SCALE_DIRECTION_POSITIVE;
    const step = 0.1;
    const scaleChange = direction * step;
    // Scale the image
    const newScaleX = scaleX + scaleChange;
    const newScaleY = scaleY + scaleChange;
    if (newScaleX < constants_1.MIN_SCALE || newScaleY < constants_1.MIN_SCALE)
        return undefined;
    return {
        scaleX: newScaleX,
        scaleY: newScaleY,
    };
}
exports.zoomManipulation = zoomManipulation;
// Handle rotate
function flipManipulation(state, isHorisontal = false) {
    const { scaleX, scaleY } = state;
    const newScaleX = scaleX * (isHorisontal ? -1 : 1);
    const newScaleY = scaleY * (isHorisontal ? 1 : -1);
    // Use requestAnimationFrame to batch the state update and prevent flashing
    return {
        scaleX: newScaleX,
        scaleY: newScaleY,
    };
}
exports.flipManipulation = flipManipulation;
// Handle rotate
function rotateManipulation(state, isRight = false) {
    (0, log_1.debuginfo)(`Handling rotate: isRight=${isRight}, current rotate=${state.rotate}`);
    // Use requestAnimationFrame to batch the state update and prevent flashing
    return {
        rotate: (state.rotate +
            constants_1.ROTATE_STEP *
                (isRight ? ROTATION_DIRECTION_RIGHT : ROTATION_DIRECTION_LEFT)) %
            constants_1.FULL_ROTATION,
    };
}
exports.rotateManipulation = rotateManipulation;
function pinImage(state) {
    return {
        imageState: state.imageState,
        imageIndex: state.currentImage,
    };
}
exports.pinImage = pinImage;
function handleReset(state) {
    (0, log_1.debuginfo)("Handling reset: resetting image state to initial values");
    // Use requestAnimationFrame to batch the state update and prevent flashing
    const { height: windowHeight, width: windowWidth } = (0, getWindowSize_1.getWindowSize)();
    const getImageAspectRatio = () => {
        if (state.viewMode === ComponentState_1.IImageViewMode.IMAGE) {
            return state.imageState.imageWidth / state.imageState.imageHeight;
        }
        const imageHeight = state.imageState.imageHeight;
        const imageWidth = state.imageState.imageWidth * 2;
        return imageWidth / imageHeight;
    };
    const imageAspectRatio = getImageAspectRatio();
    console.log(`Image aspect ratio: ${imageAspectRatio}: ${state.imageState.imageWidth} / ${state.imageState.imageHeight}`);
    const imageHeightFillingScreen = windowHeight * constants_1.IMAGE_MAX_SIZE_RATIO;
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
exports.handleReset = handleReset;
