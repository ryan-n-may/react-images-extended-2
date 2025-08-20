import {
  MouseEvent,
  MouseEventHandler,
  useCallback,
  useRef,
  ReactNode,
  useMemo,
  useEffect,
} from "react";
import { useLightboxImageState, useLightboxState } from "../ComponentState";
import { debuginfo } from "../utils/log";

export function Draggable({ children }: { children: ReactNode }) {
  const dragStartRef = useRef({ x: 0, y: 0 });
  const dragOffsetRef = useRef({ x: 0, y: 0 });

  const lightboxState = useLightboxState();
  const { isDraggingImage } = lightboxState.state;

  const { imageState } = useLightboxImageState();
  const { top, left } = imageState;

  useEffect(() => {
    debuginfo(`image state left updated to ${left}`);
  }, [left]);

  const wrapperStyle = useMemo(
    () => ({
      border: isDraggingImage ? "1px solid #ccc" : "none",
      width: `${imageState.width}px`,
      minWidth: `${imageState.width}px`,
      maxWidth: `${imageState.width}px`,
      height: "auto",
      transform: `rotate(${imageState.rotate}deg) scaleX(${imageState.scaleX}) scaleY(${imageState.scaleY})`,
      transformOrigin: "center",
      willChange: "transform",
      transition: "none", // Remove transition to prevent flashing
      backfaceVisibility: "hidden" as const, // Prevent flashing on transform
      WebkitBackfaceVisibility: "hidden" as const,
      WebkitTransform: `rotate(${imageState.rotate}deg) scaleX(${imageState.scaleX}) scaleY(${imageState.scaleY})`,
      position: "absolute" as const,
      display: "block",

      left: `${left || 0}px`,
      top: `${top || 0}px`,
      cursor: isDraggingImage ? "grabbing" : "grab",
      // Additional properties to reduce flashing
      imageRendering: "crisp-edges" as const,
      WebkitFontSmoothing: "antialiased" as const,
      MozOsxFontSmoothing: "grayscale" as const,

      pointerEvents: "auto" as const, // Add this
      userSelect: "none" as const, // Add this
      WebkitUserSelect: "none" as const, // Add this

      flexShrink: 0, // Prevent flexbox from shrinking the image
    }),
    [
      imageState.left,
      imageState.top,
      isDraggingImage,
      imageState.width,
      imageState.rotate,
      imageState.scaleX,
      imageState.scaleY,
    ]
  );

  const handleMouseDown: MouseEventHandler = useCallback(
    (event: MouseEvent<Element>) => {
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
    },
    [isDraggingImage, imageState.left, imageState.top]
  );

  const handleMouseMove = useCallback(
    (event: MouseEvent<Element>) => {
      if (!isDraggingImage) return;
      event.preventDefault();

      //debuginfo(`Screen coordinates: (${event.clientX}, ${event.clientY})`);

      const deltaX = event.clientX - dragStartRef.current.x;
      const deltaY = event.clientY - dragStartRef.current.y;

      const newLeft = dragOffsetRef.current.x + deltaX;
      const newTop = dragOffsetRef.current.y + deltaY;

      // Add debugging for right edge behavior
      const viewportWidth = window.innerWidth;
      debuginfo(
        `New left: ${newLeft}, Viewport width: ${viewportWidth}, Image width: ${imageState.width}`
      );

      const updatedImageState = {
        left: newLeft,
        top: newTop,
      };

      lightboxState.updateImageState(updatedImageState);
    },
    [isDraggingImage, dragOffsetRef, dragStartRef]
  );

  const handleMouseUp = useCallback(() => {
    //debuginfo("Mouse up event detected, stopping drag");
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
