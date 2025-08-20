"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DraggableReaderFullScreen = exports.DraggableImageFullScreen = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const ComponentState_1 = require("../ComponentState");
const StyledComponents_1 = require("./StyledComponents");
const Wrappers_1 = require("./Wrappers");
function DraggableImageFullScreen({ imageRef, }) {
    const currentImage = (0, ComponentState_1.useCurrentImage)();
    const { onClickImage } = (0, ComponentState_1.useCallbackMethods)();
    return ((0, jsx_runtime_1.jsx)(Wrappers_1.Draggable, { children: (0, jsx_runtime_1.jsx)(StyledComponents_1.ImageFullscreen, { ref: imageRef, onClick: onClickImage, alt: currentImage.alt, src: currentImage.src }) }));
}
exports.DraggableImageFullScreen = DraggableImageFullScreen;
function DraggableReaderFullScreen() {
    const currentImage = (0, ComponentState_1.useCurrentImage)();
    const { onClickImage } = (0, ComponentState_1.useCallbackMethods)();
    const { state } = (0, ComponentState_1.useLightboxState)();
    const imageArray = state.images || [];
    const currentImageIndex = state.currentImage || 0;
    let nextIndex = currentImageIndex + 1;
    if (nextIndex >= imageArray.length)
        nextIndex = currentImageIndex;
    const nextImage = imageArray[nextIndex] || null;
    return ((0, jsx_runtime_1.jsx)(Wrappers_1.Draggable, { children: (0, jsx_runtime_1.jsx)(StyledComponents_1.ReaderModeImageFullscreen, { image1: {
                onClick: onClickImage,
                alt: currentImage.alt,
                src: currentImage.src,
            }, image2: {
                onClick: onClickImage,
                alt: nextImage.alt,
                src: nextImage.src,
            } }) }));
}
exports.DraggableReaderFullScreen = DraggableReaderFullScreen;
