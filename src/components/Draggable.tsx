import { useRef, useCallback, memo, useEffect } from "react";
import {
  ILightboxContext,
  ILightboxTrackedImage,
  useLightboxState,
} from "../ComponentState";
import { ImageFullscreen } from "./StyledComponents";
import {
  StyledImageWrapper,
  ScrollableImageContainer,
  ScrollableImageContainerRef,
} from "./Wrappers";

export function ImageArrayFullScreen() {
  const lightboxContext = useLightboxState();
  const { state } = lightboxContext;
  const { figures, currentIndex } = state;
  const carouselRef = useRef<HTMLDivElement>(null);

  // Handle transition properly with a two-step process
  useEffect(() => {
    if (carouselRef.current) {
      const element = carouselRef.current;

      // First, ensure transition is set
      element.style.transition = "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)";

      // Then, on next frame, apply the transform
      requestAnimationFrame(() => {
        element.style.transform = `translateX(-${currentIndex * 100}vw)`;
      });
    }
  }, [currentIndex]);

  const components = figures.map((_figure, index) => (
    <ImageAtIndexFullScreen key={index} componentIndex={index} />
  ));

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden", // Hide the horizontal scroll
      }}
    >
      <div
        ref={carouselRef}
        style={{
          display: "flex",
          flexDirection: "row",
          width: `${figures.length * 100}vw`, // Each image takes full viewport width
          height: "100vh",
          transform: `translateX(-${currentIndex * 100}vw)`, // Initial position
          transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          willChange: "transform",
        }}
      >
        {components}
      </div>
    </div>
  );
}

export interface ImageAtIndexFullScreenProps {
  componentIndex: number;
}

export function ImageAtIndexFullScreen(props: ImageAtIndexFullScreenProps) {
  const { componentIndex } = props;
  const lightboxContext = useLightboxState();
  const { state } = lightboxContext;
  const { figures } = state;
  const currentFigure = figures[componentIndex] || {};

  return (
    <ImageAtIndexFullScreenMemo
      lightboxState={lightboxContext}
      currentFigure={currentFigure}
    />
  );
}

export interface ImageAtIndexFullScreenMemoProps {
  lightboxState: ILightboxContext;
  currentFigure: ILightboxTrackedImage;
}
export const ImageAtIndexFullScreenMemo = memo(
  (props: ImageAtIndexFullScreenMemoProps) => {
    const { currentFigure, lightboxState } = props;

    const scrollRef = useRef<ScrollableImageContainerRef>(null);

    // Integrated zoom-to-point with scroll adjustment
    const handleZoomToPoint = useCallback(
      (clickX: number, clickY: number) => {
        // Get the current scroll container element
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        // Get the current scale before zoom
        const oldScaleX = currentFigure.scaleX || 1;

        // First, perform the zoom operation
        lightboxState.zoomInToPoint({ x: clickX, y: clickY });

        // Use requestAnimationFrame for more precise timing - runs on next frame
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            const containerElement = scrollContainer.getContainerElement();
            if (containerElement) {
              const containerRect = containerElement.getBoundingClientRect();
              const currentScroll = scrollContainer.getScrollPosition();

              // Get the new scale after zoom (need to get updated figure)
              // Since we can't easily get the updated figure, let's estimate the scale change
              // Based on the scaleFactors array: [1, 1.25, 1.5, 2.5, 4, 6]
              const currentZoomFactor = currentFigure.zoomFactor || oldScaleX;
              const scaleFactors = [1, 1.25, 1.5, 2.5, 4, 6];
              const newScaleFactor =
                currentZoomFactor === scaleFactors[4]
                  ? scaleFactors[1]
                  : scaleFactors[4];

              // Calculate the scale ratio
              const scaleRatio = newScaleFactor / currentZoomFactor;

              // Calculate the relative position within the scroll container BEFORE zoom
              const relativeX = clickX - containerRect.left + currentScroll.x;
              const relativeY = clickY - containerRect.top + currentScroll.y;

              // After zoom, the same logical point will be at a different pixel location
              // Scale the relative position by the zoom ratio
              const scaledRelativeX = relativeX * scaleRatio;
              const scaledRelativeY = relativeY * scaleRatio;

              // Center the clicked point in the viewport after zoom
              const newScrollX = scaledRelativeX - containerRect.width / 2;
              const newScrollY = scaledRelativeY - containerRect.height / 2;

              scrollContainer.scrollTo(
                Math.max(0, newScrollX),
                Math.max(0, newScrollY),
                "auto" // Use 'auto' for instant, non-animated scroll
              );
            }
          });
        });
      },
      [
        lightboxState,
        currentFigure.scaleX,
        currentFigure.scaleY,
        currentFigure.zoomFactor,
      ]
    );

    const handleDoubleClick = useCallback(
      (event: React.MouseEvent<Element>) => {
        console.log("Double click detected");
        event.preventDefault();

        const clickX = event.clientX;
        const clickY = event.clientY;

        if (handleZoomToPoint) {
          // Use custom zoom handler that includes scroll adjustment
          handleZoomToPoint(clickX, clickY);
        } else {
          // Fallback to default zoom behavior
          lightboxState.zoomInToPoint({ x: clickX, y: clickY });
        }

        lightboxState.setDraggingFigure(false);
      },
      [lightboxState, handleZoomToPoint]
    );

    return (
      <ScrollableImageContainer ref={scrollRef}>
        <StyledImageWrapper>
          <ImageFullscreen
            onDoubleClick={handleDoubleClick}
            alt={currentFigure.alt}
            src={currentFigure.src}
          />
        </StyledImageWrapper>
      </ScrollableImageContainer>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.currentFigure === nextProps.currentFigure;
  }
);
