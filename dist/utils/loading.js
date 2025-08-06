"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preloadImage = exports.normalizeSourceSet = void 0;
const constants_1 = require("./constants");
const log_1 = require("./log");
const manipulation_1 = require("./manipulation");
// consumers sometimes provide incorrect type or casing
function normalizeSourceSet(data) {
    if (!data)
        return null;
    const sourceSet = data.srcSet || data.srcSet;
    if (!sourceSet)
        return null;
    if (Array.isArray(sourceSet)) {
        return sourceSet.join();
    }
    return sourceSet;
}
exports.normalizeSourceSet = normalizeSourceSet;
// Preload image
function preloadImage(state, updateImageState, containerWidthRef, containerHeightRef, footerHeightRef) {
    const { images, currentImage: idx } = state;
    console.log(`Preloading image at index: ${idx}`); // Debugging log
    const data = images === null || images === void 0 ? void 0 : images[idx];
    const img = new Image();
    const sourceSet = normalizeSourceSet(data);
    img.onload = () => {
        (0, log_1.debuginfo)(`Image loaded at index ${idx}`); // Debugging log
        const imgWidth = img.width;
        const imgHeight = img.height;
        const [calculatedWidth, calculatedHeight] = (0, manipulation_1.getImgWidthHeight)(imgWidth, imgHeight, containerWidthRef, containerHeightRef, footerHeightRef);
        const left = (containerWidthRef.current - calculatedWidth) / constants_1.CENTER_DIVISOR;
        const top = (containerHeightRef.current - calculatedHeight - footerHeightRef.current) / constants_1.CENTER_DIVISOR;
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
            imageLoaded: true
        });
    };
    img.onerror = () => {
        (0, log_1.debuginfo)(`Failed to load image at index ${idx}`);
        updateImageState({
            error: `Failed to load image at index ${idx}`,
            imageLoaded: false
        });
    };
    if (!data || !data.src) {
        (0, log_1.debuginfo)(`No image data found for index ${idx}`);
        return img;
    }
    img.src = data.src;
    if (sourceSet)
        img.srcset = sourceSet;
    return img;
}
exports.preloadImage = preloadImage;
