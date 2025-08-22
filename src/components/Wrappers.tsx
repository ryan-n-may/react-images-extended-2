import {
  MouseEvent,
  MouseEventHandler,
  useCallback,
  useRef,
  ReactNode,
  useMemo,
  useEffect,
} from "react";
import {
  ILightboxManipulationState,
  useLightboxManipulationState,
  useLightboxState,
} from "../ComponentState";
import { debuginfo } from "../utils/log";
import { IMAGE_Z_INDEX } from "../utils/constants";

export function Draggable({ children }: { children: ReactNode }) {
  const dragStartRef = useRef({ x: 0, y: 0 });
  const dragOffsetRef = useRef({ x: 0, y: 0 });

  const lightboxState = useLightboxState();
  const { isDraggingFigure } = lightboxState.state;

  const { manipulationState } = useLightboxManipulationState();
  const { top, left } = manipulationState;

  useEffect(() => {
    debuginfo(`image state left updated to ${left}`);
  }, [left]);

  const wrapperStyle = useMemo(
    () => ({
      border: isDraggingFigure ? "1px solid #ccc" : "none",
      width: `${manipulationState.width}px`,
      minWidth: `${manipulationState.width}px`,
      maxWidth: `${manipulationState.width}px`,
      height: "auto",
      transform: `translate(-50%, -50%) translate(${left || 0}px, ${
        top || 0
      }px) rotate(${manipulationState.rotate}deg) scaleX(${
        manipulationState.scaleX
      }) scaleY(${manipulationState.scaleY})`,
      transformOrigin: "center",
      willChange: "transform",
      transition: isDraggingFigure ? "none" : "transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)", // More visible smooth transitions when not dragging
      backfaceVisibility: "hidden" as const, // Prevent flashing on transform
      WebkitBackfaceVisibility: "hidden" as const,
      WebkitTransform: `translate(-50%, -50%) translate(${left || 0}px, ${
        top || 0
      }px) rotate(${manipulationState.rotate}deg) scaleX(${
        manipulationState.scaleX
      }) scaleY(${manipulationState.scaleY})`,
      position: "absolute" as const,
      display: "block",
      zIndex: IMAGE_Z_INDEX, // Ensure image is below controls

      left: "50%",
      top: "50%",
      cursor: isDraggingFigure ? "grabbing" : "grab",
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
      manipulationState.left,
      manipulationState.top,
      manipulationState.height,
      manipulationState.width,
      manipulationState.rotate,
      manipulationState.scaleX,
      manipulationState.scaleY,
      isDraggingFigure, // Add this dependency so transition updates properly
    ]
  );

  const handleMouseDown: MouseEventHandler = useCallback(
    (event: MouseEvent<Element>) => {
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
    },
    [isDraggingFigure, manipulationState.left, manipulationState.top]
  );

  const handleMouseMove = useCallback(
    (event: MouseEvent<Element>) => {
      if (!isDraggingFigure) return;
      event.preventDefault();

      //debuginfo(`Screen coordinates: (${event.clientX}, ${event.clientY})`);

      const deltaX = event.clientX - dragStartRef.current.x;
      const deltaY = event.clientY - dragStartRef.current.y;

      const newLeft = dragOffsetRef.current.x + deltaX;
      const newTop = dragOffsetRef.current.y + deltaY;

      const updatedImageState: Partial<ILightboxManipulationState> = {
        left: newLeft,
        top: newTop,
      };

      lightboxState.updateFigureManipulation(updatedImageState);
    },
    [isDraggingFigure, dragOffsetRef, dragStartRef]
  );

  const handleDoubleClick = useCallback(
    (event: MouseEvent<Element>) => {
      event.preventDefault();

      const clickX = event.clientX;
      const clickY = event.clientY;

      const deltaX = clickX - dragStartRef.current.x;
      const deltaY = clickY - dragStartRef.current.y;

      if (deltaX <= 1 && deltaY <= 1) {
        lightboxState.zoomInToPoint({ x: clickX, y: clickY });
      }

      lightboxState.setDraggingFigure(false);
    },
    [lightboxState]
  );

  const handleMouseUp = useCallback(() => {
    lightboxState.setDraggingFigure(false);
  }, [lightboxState]);

  return (
    <div
      role="draggable-wrapper"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onDoubleClick={handleDoubleClick}
      style={wrapperStyle}
    >
      {children}
    </div>
  );
}
