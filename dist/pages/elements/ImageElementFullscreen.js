"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageElementFullscreen = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Draggable_1 = require("../../components/Draggable");
const ComponentState_1 = require("../../ComponentState");
function ImageElementFullscreen(props) {
    const { state } = props;
    const { images, currentImage, viewMode, sourceType, pdfDocumentSrc } = state;
    if (sourceType === ComponentState_1.ILightboxImageType.PDF) {
        if (!pdfDocumentSrc)
            return null;
        return (0, jsx_runtime_1.jsx)(Draggable_1.DraggablePdfFullscreen, {});
    }
    if (sourceType === ComponentState_1.ILightboxImageType.IMAGE) {
        if (!images[currentImage])
            return null;
        if (viewMode === ComponentState_1.IImageViewMode.READER) {
            return ((0, jsx_runtime_1.jsx)(Draggable_1.DraggableReaderFullScreen, {}, "image-reader-draggable-fullscreen"));
        }
        return (0, jsx_runtime_1.jsx)(Draggable_1.DraggableImageFullScreen, {}, "image-draggable-fullscreen");
    }
}
exports.ImageElementFullscreen = ImageElementFullscreen;
