"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Draggable = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const ComponentState_1 = require("../ComponentState");
const log_1 = require("../utils/log");
function Draggable({ children }) {
    const dragStartRef = (0, react_1.useRef)({ x: 0, y: 0 });
    const dragOffsetRef = (0, react_1.useRef)({ x: 0, y: 0 });
    const lightboxState = (0, ComponentState_1.useLightboxState)();
    const { isDraggingImage } = lightboxState.state;
    const { imageState } = (0, ComponentState_1.useLightboxImageState)();
    const wrapperStyle = (0, react_1.useMemo)(() => ({
        border: isDraggingImage ? "1px solid #ccc" : "none",
        width: `${imageState.width}px`,
        height: "auto",
        transform: `rotate(${imageState.rotate}deg) scaleX(${imageState.scaleX}) scaleY(${imageState.scaleY})`,
        transformOrigin: "center center",
        willChange: "transform",
        transition: "none", // Remove transition to prevent flashing
        backfaceVisibility: "hidden", // Prevent flashing on transform
        WebkitBackfaceVisibility: "hidden",
        WebkitTransform: `rotate(${imageState.rotate}deg) scaleX(${imageState.scaleX}) scaleY(${imageState.scaleY})`,
        position: "absolute",
        display: "block",
        maxWidth: "none",
        left: `${imageState.left || 0}px`,
        top: `${imageState.top || 0}px`,
        cursor: isDraggingImage ? "grabbing" : "grab",
        // Additional properties to reduce flashing
        imageRendering: "crisp-edges",
        WebkitImageRendering: "crisp-edges",
        MozImageRendering: "crisp-edges",
        msImageRendering: "crisp-edges",
        // Force GPU acceleration
        WebkitTransformStyle: "preserve-3d",
        transformStyle: "preserve-3d",
        // Prevent subpixel rendering issues
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
    }), [
        imageState.width,
        imageState.rotate,
        imageState.scaleX,
        imageState.scaleY,
        imageState.left,
        imageState.top,
        isDraggingImage,
    ]);
    const handleMouseDown = (0, react_1.useCallback)((event) => {
        event.preventDefault();
        lightboxState.setDraggingImage(true);
        (0, log_1.debuginfo)(`Mouse down position at (${event.clientX}, ${event.clientY})`);
        dragStartRef.current = {
            x: event.clientX,
            y: event.clientY,
        };
        const { left, top } = lightboxState.state.imageState;
        dragOffsetRef.current = {
            x: left,
            y: top,
        };
        (0, log_1.debuginfo)(`Drag start position: (${dragStartRef.current.x}, ${dragStartRef.current.y})`);
        (0, log_1.debuginfo)(`Drag offset position: (${dragOffsetRef.current.x}, ${dragOffsetRef.current.y})`);
    }, [isDraggingImage, imageState.left, imageState.top]);
    const handleMouseMove = (0, react_1.useCallback)((event) => {
        if (!isDraggingImage)
            return;
        event.preventDefault();
        (0, log_1.debuginfo)(`Screen coordinates: (${event.clientX}, ${event.clientY})`);
        const deltaX = event.clientX - dragStartRef.current.x;
        const deltaY = event.clientY - dragStartRef.current.y;
        (0, log_1.debuginfo)(`Mouse move delta: (${deltaX}, ${deltaY})`);
        // Apply the delta to the original position
        lightboxState.updateImageState({
            left: dragOffsetRef.current.x + deltaX,
            top: dragOffsetRef.current.y + deltaY,
        });
    }, [isDraggingImage, dragOffsetRef, dragStartRef]);
    const handleMouseUp = (0, react_1.useCallback)(() => {
        (0, log_1.debuginfo)("Mouse up event detected, stopping drag");
        lightboxState.setDraggingImage(false);
    }, [lightboxState]);
    return ((0, jsx_runtime_1.jsx)("div", { onMouseDown: handleMouseDown, onMouseMove: handleMouseMove, onMouseUp: handleMouseUp, onMouseLeave: handleMouseUp, style: wrapperStyle, children: children }));
}
exports.Draggable = Draggable;
