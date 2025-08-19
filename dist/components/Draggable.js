"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DraggableImageFullScreen = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const ComponentState_1 = require("../ComponentState");
const StyledComponents_1 = require("./StyledComponents");
const Wrappers_1 = require("./Wrappers");
function DraggableImageFullScreen({ imageRef }) {
    const currentImage = (0, ComponentState_1.useCurrentImage)();
    const { onClickImage } = (0, ComponentState_1.useCallbackMethods)();
    return ((0, jsx_runtime_1.jsx)(Wrappers_1.Draggable, { children: (0, jsx_runtime_1.jsx)(StyledComponents_1.ImageFullscreen, { ref: imageRef, onClick: onClickImage, alt: currentImage.alt, src: currentImage.src }) }));
}
exports.DraggableImageFullScreen = DraggableImageFullScreen;
