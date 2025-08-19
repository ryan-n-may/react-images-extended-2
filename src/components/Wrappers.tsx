import {
  MouseEvent,
  MouseEventHandler,
  useCallback,
  useRef,
  ReactNode,
  useMemo,
} from "react";
import { useLightboxImageState, useLightboxState } from "../ComponentState";
import { debuginfo } from "../utils/log";

export function Draggable({ children }: { children: ReactNode }) {
  const dragStartRef = useRef({ x: 0, y: 0 });
  const dragOffsetRef = useRef({ x: 0, y: 0 });

  const lightboxState = useLightboxState();
  const { isDraggingImage } = lightboxState.state;

  const { imageState } = useLightboxImageState();

  const wrapperStyle = useMemo(
    () => ({
      border: isDraggingImage ? "1px solid #ccc" : "none",
      width: `${imageState.width}px`,
      height: "auto",
      transform: `rotate(${imageState.rotate}deg) scaleX(${imageState.scaleX}) scaleY(${imageState.scaleY})`,
      transformOrigin: "center center",
      willChange: "transform",
      transition: "none", // Remove transition to prevent flashing
      backfaceVisibility: "hidden" as const, // Prevent flashing on transform
      WebkitBackfaceVisibility: "hidden" as const,
      WebkitTransform: `rotate(${imageState.rotate}deg) scaleX(${imageState.scaleX}) scaleY(${imageState.scaleY})`,
      position: "absolute" as const,
      display: "block",
      maxWidth: "none",
      left: `${imageState.left || 0}px`,
      top: `${imageState.top || 0}px`,
      cursor: isDraggingImage ? "grabbing" : "grab",
      // Additional properties to reduce flashing
      imageRendering: "crisp-edges" as const,
      WebkitImageRendering: "crisp-edges" as const,
      MozImageRendering: "crisp-edges" as const,
      msImageRendering: "crisp-edges" as const,
      // Force GPU acceleration
      WebkitTransformStyle: "preserve-3d" as const,
      transformStyle: "preserve-3d" as const,
      // Prevent subpixel rendering issues
      WebkitFontSmoothing: "antialiased" as const,
      MozOsxFontSmoothing: "grayscale" as const,
    }),
    [
      imageState.width,
      imageState.rotate,
      imageState.scaleX,
      imageState.scaleY,
      imageState.left,
      imageState.top,
      isDraggingImage,
    ]
  );

  const handleMouseDown: MouseEventHandler = useCallback(
    (event: MouseEvent<Element>) => {
      event.preventDefault();
      lightboxState.setDraggingImage(true);

      debuginfo(`Mouse down position at (${event.clientX}, ${event.clientY})`);

      dragStartRef.current = {
        x: event.clientX,
        y: event.clientY,
      };
      const { left, top } = lightboxState.state.imageState;
      dragOffsetRef.current = {
        x: left,
        y: top,
      };

      debuginfo(
        `Drag start position: (${dragStartRef.current.x}, ${dragStartRef.current.y})`
      );
      debuginfo(
        `Drag offset position: (${dragOffsetRef.current.x}, ${dragOffsetRef.current.y})`
      );
    },
    [isDraggingImage, imageState.left, imageState.top]
  );

  const handleMouseMove = useCallback(
    (event: MouseEvent<Element>) => {
      if (!isDraggingImage) return;
      event.preventDefault();

      debuginfo(`Screen coordinates: (${event.clientX}, ${event.clientY})`);

      const deltaX = event.clientX - dragStartRef.current.x;
      const deltaY = event.clientY - dragStartRef.current.y;

      debuginfo(`Mouse move delta: (${deltaX}, ${deltaY})`);

      // Apply the delta to the original position
      lightboxState.updateImageState({
        left: dragOffsetRef.current.x + deltaX,
        top: dragOffsetRef.current.y + deltaY,
      });
    },
    [isDraggingImage, dragOffsetRef, dragStartRef]
  );

  const handleMouseUp = useCallback(() => {
    debuginfo("Mouse up event detected, stopping drag");
    lightboxState.setDraggingImage(false);
  }, [lightboxState]);

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={wrapperStyle}
    >
      {children}
    </div>
  );
}
