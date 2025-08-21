import { jsx as _jsx } from "react/jsx-runtime";
import { useCallback, useRef, useMemo, useEffect, } from "react";
import { useLightboxManipulationState, useLightboxState, } from "../ComponentState";
import { debuginfo } from "../utils/log";
export function Draggable({ children }) {
    const dragStartRef = useRef({ x: 0, y: 0 });
    const dragOffsetRef = useRef({ x: 0, y: 0 });
    const lightboxState = useLightboxState();
    const { isDraggingFigure } = lightboxState.state;
    const { manipulationState } = useLightboxManipulationState();
    const { top, left } = manipulationState;
    useEffect(() => {
        debuginfo(`image state left updated to ${left}`);
    }, [left]);
    const wrapperStyle = useMemo(() => ({
        border: isDraggingFigure ? "1px solid #ccc" : "none",
        width: `${manipulationState.width}px`,
        minWidth: `${manipulationState.width}px`,
        maxWidth: `${manipulationState.width}px`,
        height: "auto",
        transform: `rotate(${manipulationState.rotate}deg) scaleX(${manipulationState.scaleX}) scaleY(${manipulationState.scaleY})`,
        transformOrigin: "center",
        willChange: "transform",
        transition: "none", // Remove transition to prevent flashing
        backfaceVisibility: "hidden", // Prevent flashing on transform
        WebkitBackfaceVisibility: "hidden",
        WebkitTransform: `rotate(${manipulationState.rotate}deg) scaleX(${manipulationState.scaleX}) scaleY(${manipulationState.scaleY})`,
        position: "absolute",
        display: "block",
        left: `${left || 0}px`,
        top: `${top || 0}px`,
        cursor: isDraggingFigure ? "grabbing" : "grab",
        // Additional properties to reduce flashing
        imageRendering: "crisp-edges",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
        pointerEvents: "auto", // Add this
        userSelect: "none", // Add this
        WebkitUserSelect: "none", // Add this
        flexShrink: 0, // Prevent flexbox from shrinking the image
    }), [
        manipulationState.left,
        manipulationState.top,
        manipulationState.height,
        manipulationState.width,
        manipulationState.rotate,
        manipulationState.scaleX,
        manipulationState.scaleY,
    ]);
    const handleMouseDown = useCallback((event) => {
        event.preventDefault();
        lightboxState.setDraggingFigure(true);
        //debuginfo(`Mouse down position at (${event.clientX}, ${event.clientY})`);
        dragStartRef.current = {
            x: event.clientX,
            y: event.clientY,
        };
        const { left, top } = manipulationState;
        dragOffsetRef.current = {
            x: left || 0,
            y: top || 0,
        };
    }, [isDraggingFigure, manipulationState.left, manipulationState.top]);
    const handleMouseMove = useCallback((event) => {
        if (!isDraggingFigure)
            return;
        event.preventDefault();
        //debuginfo(`Screen coordinates: (${event.clientX}, ${event.clientY})`);
        const deltaX = event.clientX - dragStartRef.current.x;
        const deltaY = event.clientY - dragStartRef.current.y;
        const newLeft = dragOffsetRef.current.x + deltaX;
        const newTop = dragOffsetRef.current.y + deltaY;
        const updatedImageState = {
            left: newLeft,
            top: newTop,
        };
        lightboxState.updateFigureManipulation(updatedImageState);
    }, [isDraggingFigure, dragOffsetRef, dragStartRef]);
    const handleMouseUp = useCallback(() => {
        //debuginfo("Mouse up event detected, stopping drag");
        lightboxState.setDraggingFigure(false);
    }, [lightboxState]);
    return (_jsx("div", { role: "draggable-wrapper", onMouseDown: handleMouseDown, onMouseMove: handleMouseMove, onMouseUp: handleMouseUp, onMouseLeave: handleMouseUp, style: wrapperStyle, children: children }));
}
