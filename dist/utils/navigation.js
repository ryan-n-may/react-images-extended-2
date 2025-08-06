"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.goToPrev = exports.goToNext = exports.goToThumbnail = void 0;
// Navigation functions
function goToThumbnail(setCurrentImage, images, index, onClickThumbnail, event) {
    if (!images || (images === null || images === void 0 ? void 0 : images.length) === 0)
        return;
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    setCurrentImage(index);
    if (onClickThumbnail)
        onClickThumbnail(index);
}
exports.goToThumbnail = goToThumbnail;
// Navigation functions
function goToNext(state, setCurrentImage, images, currentImage, onClickNext, event) {
    const { imageLoaded } = state;
    if (!images || (images === null || images === void 0 ? void 0 : images.length) === 0)
        return;
    if (!imageLoaded || currentImage === (images === null || images === void 0 ? void 0 : images.length) - 1)
        return;
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    setCurrentImage(prev => prev + 1);
    if (onClickNext)
        onClickNext();
}
exports.goToNext = goToNext;
function goToPrev(state, setCurrentImage, images, currentImage, onClickPrev, event) {
    const { imageLoaded } = state;
    if (!images || (images === null || images === void 0 ? void 0 : images.length) === 0)
        return;
    if (!imageLoaded || currentImage === 0)
        return;
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    setCurrentImage(prev => prev - 1);
    if (onClickPrev)
        onClickPrev();
}
exports.goToPrev = goToPrev;
