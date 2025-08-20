"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preloadImage = exports.normalizeSourceSet = void 0;
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
function preloadImage(state, updateImageState, resetImageOnLoad) {
    const { images, currentImage: idx } = state;
    console.log(`Preloading image at index: ${idx}`); // Debugging log
    const data = images === null || images === void 0 ? void 0 : images[idx];
    const img = new Image();
    if (!images || idx < 0 || idx >= images.length) {
        return img; // Return empty image if index is out of bounds
    }
    const sourceSet = normalizeSourceSet(data);
    img.onload = () => {
        (0, log_1.debuginfo)(`Image loaded at index ${idx}`); // Debugging log
        (0, log_1.debuginfo)(`Image dimensions: ${img.width}x${img.height}`); // Debugging log
        const stateIncludingImageAttributes = Object.assign(Object.assign({}, state), { imageState: Object.assign(Object.assign({}, state.imageState), { imageHeight: img.height, imageWidth: img.width }) });
        const resetImageState = resetImageOnLoad
            ? (0, manipulation_1.handleReset)(stateIncludingImageAttributes)
            : stateIncludingImageAttributes.imageState;
        updateImageState(Object.assign(Object.assign(Object.assign({}, stateIncludingImageAttributes.imageState), resetImageState), { imageLoaded: true }));
    };
    img.onerror = () => {
        (0, log_1.debuginfo)(`Failed to load image at index ${idx}`);
        updateImageState({
            error: `Failed to load image at index ${idx}`,
            imageLoaded: false,
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
