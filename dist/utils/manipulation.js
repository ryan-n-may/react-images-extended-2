"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleReset = exports.rotateManipulation = exports.flipManipulation = exports.zoomManipulation = exports.getImgWidthHeight = exports.getImageCenterXY = void 0;
const constants_1 = require("./constants");
const log_1 = require("./log");
const ROTATION_DIRECTION_LEFT = -1;
const ROTATION_DIRECTION_RIGHT = 1;
const SCALE_DIRECTION_NEGATIVE = -1;
const SCALE_DIRECTION_POSITIVE = 1;
// Get image center coordinates
function getImageCenterXY(state) {
    return {
        x: state.left + state.width / constants_1.CENTER_DIVISOR,
        y: state.top + state.height / constants_1.CENTER_DIVISOR
    };
}
exports.getImageCenterXY = getImageCenterXY;
// Calculate image width and height
function getImgWidthHeight(imgWidth, imgHeight, containerWidthRef, containerHeightRef, footerHeightRef) {
    const maxWidth = containerWidthRef.current * constants_1.IMAGE_MAX_SIZE_RATIO;
    const maxHeight = (containerHeightRef.current - footerHeightRef.current) * constants_1.IMAGE_MAX_SIZE_RATIO;
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
    const direction = zoomingIn ? SCALE_DIRECTION_NEGATIVE : SCALE_DIRECTION_POSITIVE;
    const step = 0.1;
    const scaleChange = direction * step;
    // Scale the image
    const newScaleX = scaleX + scaleChange;
    const newScaleY = scaleY + scaleChange;
    if (newScaleX < constants_1.MIN_SCALE || newScaleY < constants_1.MIN_SCALE)
        return undefined;
    return {
        scaleX: newScaleX,
        scaleY: newScaleY
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
        scaleY: newScaleY
    };
}
exports.flipManipulation = flipManipulation;
// Handle rotate
function rotateManipulation(state, isRight = false) {
    (0, log_1.debuginfo)(`Handling rotate: isRight=${isRight}, current rotate=${state.rotate}`);
    // Use requestAnimationFrame to batch the state update and prevent flashing
    return {
        rotate: (state.rotate + constants_1.ROTATE_STEP * (isRight ? ROTATION_DIRECTION_RIGHT : ROTATION_DIRECTION_LEFT)) % constants_1.FULL_ROTATION
    };
}
exports.rotateManipulation = rotateManipulation;
function handleReset(widthRef, heightRef, imageWidth, imageHeight) {
    (0, log_1.debuginfo)('Handling reset: resetting image state to initial values');
    // Use requestAnimationFrame to batch the state update and prevent flashing
    return {
        rotate: 0,
        scaleX: 1,
        scaleY: 1,
        top: Math.abs(heightRef / 2 - imageHeight / 2),
        left: Math.abs(widthRef / 2 - imageWidth / 2)
    };
}
exports.handleReset = handleReset;
