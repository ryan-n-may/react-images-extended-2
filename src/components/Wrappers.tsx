import {
  useRef,
  ReactNode,
  useMemo,
  useImperativeHandle,
  forwardRef,
} from "react";
import { useLightboxState } from "../ComponentState";
import { IMAGE_Z_INDEX } from "../utils/constants";

export interface ScrollableImageContainerRef {
  scrollTo: (x: number, y: number, behavior?: ScrollBehavior) => void;
  scrollToCenter: () => void;
  scrollToPoint: (x: number, y: number, behavior?: ScrollBehavior) => void;
  getScrollPosition: () => { x: number; y: number };
  getContainerElement: () => HTMLDivElement | null;
  addScrollListener: (listener: (event: Event) => void) => () => void;
}

export const ScrollableImageContainer = forwardRef<
  ScrollableImageContainerRef,
  { children: ReactNode }
>(({ children }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lightboxState = useLightboxState();
  const { state } = lightboxState;
  const { currentIndex, figures } = state;
  const currentFigure = figures?.[currentIndex] ?? {};

  // Calculate the total size needed for the scaled image with padding
  const scaledWidth = currentFigure.width * currentFigure.scaleX;
  const scaledHeight = currentFigure.height * currentFigure.scaleY;

  // Add extra padding around the scaled image to ensure all edges are reachable
  const portraitPage = [0, 180].includes(currentFigure.rotate % 360);
  const containerWidth = portraitPage ? scaledWidth : scaledHeight;
  const containerHeight = portraitPage ? scaledHeight : scaledWidth;

  // Minimum size should be at least the viewport size
  const minWidth = window.innerWidth; // Full viewport width since each image container is 100vw
  const minHeight = window.innerHeight;

  // Expose scroll control methods
  useImperativeHandle(
    ref,
    () => ({
      scrollTo: (x: number, y: number, behavior: ScrollBehavior = "smooth") => {
        if (containerRef.current) {
          containerRef.current.scrollTo({ left: x, top: y, behavior });
        }
      },
      scrollToCenter: () => {
        if (containerRef.current) {
          const centerX =
            (containerRef.current.scrollWidth -
              containerRef.current.clientWidth) /
            2;
          const centerY =
            (containerRef.current.scrollHeight -
              containerRef.current.clientHeight) /
            2;
          containerRef.current.scrollTo({
            left: centerX,
            top: centerY,
            behavior: "smooth",
          });
        }
      },
      scrollToPoint: (
        x: number,
        y: number,
        behavior: ScrollBehavior = "smooth"
      ) => {
        if (containerRef.current) {
          // Convert viewport coordinates to scroll coordinates
          const rect = containerRef.current.getBoundingClientRect();
          const scrollX = x - rect.left - containerRef.current.clientWidth / 2;
          const scrollY = y - rect.top - containerRef.current.clientHeight / 2;
          containerRef.current.scrollTo({
            left: scrollX,
            top: scrollY,
            behavior,
          });
        }
      },
      getScrollPosition: () => {
        if (containerRef.current) {
          return {
            x: containerRef.current.scrollLeft,
            y: containerRef.current.scrollTop,
          };
        }
        return { x: 0, y: 0 };
      },
      getContainerElement: () => {
        return containerRef.current;
      },
      addScrollListener: (listener: (event: Event) => void) => {
        if (containerRef.current) {
          containerRef.current.addEventListener("scroll", listener);
          // Return cleanup function
          return () => {
            if (containerRef.current) {
              containerRef.current.removeEventListener("scroll", listener);
            }
          };
        }
        // Return no-op cleanup if no container
        return () => {};
      },
    }),
    []
  );

  return (
    <div
      ref={containerRef}
      className="scrollable-image-container"
      style={{
        position: "relative",
        width: "100vw", // Full viewport width for each image
        height: "100vh",
        overflow: "auto",
        zIndex: IMAGE_Z_INDEX - 1,
        flexShrink: 0, // Prevent flex shrinking
      }}
    >
      <div
        style={{
          position: "relative",
          width: `${Math.max(containerWidth, minWidth)}px`,
          height: `${Math.max(containerHeight, minHeight)}px`,
          minWidth: "100vw", // Ensure minimum viewport width
          minHeight: "100vh", // Ensure minimum viewport height
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </div>
    </div>
  );
});

export function StyledImageWrapper({ children }: { children: ReactNode }) {
  const lightboxState = useLightboxState();
  const { state } = lightboxState;
  const { currentIndex, figures } = state;
  const currentFigure = figures?.[currentIndex] ?? {};

  const styleDependencies = [
    currentFigure.imageHeight,
    currentFigure.imageWidth,
    currentFigure.width,
    currentFigure.height,
    currentFigure.top,
    currentFigure.left,
    currentFigure.scaleX,
    currentFigure.scaleY,
    currentFigure.rotate,
  ];

  const wrapperStyle = useMemo(
    () => ({
      width: `${currentFigure.width}px`,
      minWidth: `${currentFigure.width}px`,
      maxWidth: `${currentFigure.width}px`,
      height: "auto",
      transform: `rotate(${currentFigure.rotate}deg) scaleX(${currentFigure.scaleX}) scaleY(${currentFigure.scaleY})`,
      transformOrigin: "center",
      willChange: "transform",

      backfaceVisibility: "hidden" as const, // Prevent flashing on transform
      WebkitBackfaceVisibility: "hidden" as const,
      WebkitTransform: `rotate(${currentFigure.rotate}deg) scaleX(${currentFigure.scaleX}) scaleY(${currentFigure.scaleY})`,
      position: "relative" as const,
      display: "block",
      zIndex: IMAGE_Z_INDEX, // Ensure image is below controls

      cursor: "zoom-in", // Indicate zoom capability
      // Additional properties to reduce flashing
      imageRendering: "crisp-edges" as const,
      WebkitFontSmoothing: "antialiased" as const,
      MozOsxFontSmoothing: "grayscale" as const,

      pointerEvents: "auto" as const, // Add this
      userSelect: "none" as const, // Add this
      WebkitUserSelect: "none" as const, // Add this

      flexShrink: 0, // Prevent flexbox from shrinking the image
    }),
    styleDependencies
  );

  return (
    <div role="styled-wrapper" style={wrapperStyle}>
      {children}
    </div>
  );
}
