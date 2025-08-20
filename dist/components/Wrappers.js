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
    const { top, left } = imageState;
    (0, react_1.useEffect)(() => {
        (0, log_1.debuginfo)(`image state left updated to ${left}`);
    }, [left]);
    const wrapperStyle = (0, react_1.useMemo)(() => ({
        border: isDraggingImage ? "1px solid #ccc" : "none",
        width: `${imageState.width}px`,
        minWidth: `${imageState.width}px`,
        maxWidth: `${imageState.width}px`,
        height: "auto",
        transform: `rotate(${imageState.rotate}deg) scaleX(${imageState.scaleX}) scaleY(${imageState.scaleY})`,
        transformOrigin: "center",
        willChange: "transform",
        transition: "none", // Remove transition to prevent flashing
        backfaceVisibility: "hidden", // Prevent flashing on transform
        WebkitBackfaceVisibility: "hidden",
        WebkitTransform: `rotate(${imageState.rotate}deg) scaleX(${imageState.scaleX}) scaleY(${imageState.scaleY})`,
        position: "absolute",
        display: "block",
        left: `${left || 0}px`,
        top: `${top || 0}px`,
        cursor: isDraggingImage ? "grabbing" : "grab",
        // Additional properties to reduce flashing
        imageRendering: "crisp-edges",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
        pointerEvents: "auto", // Add this
        userSelect: "none", // Add this
        WebkitUserSelect: "none", // Add this
        flexShrink: 0, // Prevent flexbox from shrinking the image
    }), [
        imageState.left,
        imageState.top,
        isDraggingImage,
        imageState.width,
        imageState.rotate,
        imageState.scaleX,
        imageState.scaleY,
    ]);
    const handleMouseDown = (0, react_1.useCallback)((event) => {
        event.preventDefault();
        lightboxState.setDraggingImage(true);
        //debuginfo(`Mouse down position at (${event.clientX}, ${event.clientY})`);
        dragStartRef.current = {
            x: event.clientX,
            y: event.clientY,
        };
        const { left, top } = imageState;
        dragOffsetRef.current = {
            x: left || 0,
            y: top || 0,
        };
    }, [isDraggingImage, imageState.left, imageState.top]);
    const handleMouseMove = (0, react_1.useCallback)((event) => {
        if (!isDraggingImage)
            return;
        event.preventDefault();
        //debuginfo(`Screen coordinates: (${event.clientX}, ${event.clientY})`);
        const deltaX = event.clientX - dragStartRef.current.x;
        const deltaY = event.clientY - dragStartRef.current.y;
        const newLeft = dragOffsetRef.current.x + deltaX;
        const newTop = dragOffsetRef.current.y + deltaY;
        // Add debugging for right edge behavior
        const viewportWidth = window.innerWidth;
        (0, log_1.debuginfo)(`New left: ${newLeft}, Viewport width: ${viewportWidth}, Image width: ${imageState.width}`);
        const updatedImageState = {
            left: newLeft,
            top: newTop,
        };
        lightboxState.updateImageState(updatedImageState);
    }, [isDraggingImage, dragOffsetRef, dragStartRef]);
    const handleMouseUp = (0, react_1.useCallback)(() => {
        //debuginfo("Mouse up event detected, stopping drag");
        lightboxState.setDraggingImage(false);
    }, [lightboxState]);
    return ((0, jsx_runtime_1.jsx)("div", { onMouseDown: handleMouseDown, onMouseMove: handleMouseMove, onMouseUp: handleMouseUp, onMouseLeave: handleMouseUp, style: wrapperStyle, children: children }));
}
exports.Draggable = Draggable;
