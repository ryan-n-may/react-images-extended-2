import { useRef, useCallback, useEffect } from "react";
import {
  useCallbackMethods,
  useCurrentFigure,
  useLightboxState,
} from "../ComponentState";
import { ImageFullscreen } from "./StyledComponents";
import {
  Draggable,
  ScrollableImageContainer,
  ScrollableImageContainerRef,
} from "./Wrappers";

export function DraggableImageFullScreen() {
  const currentFigure = useCurrentFigure();
  const { onCLickFigure } = useCallbackMethods();
  const lightboxState = useLightboxState();
  const { state } = lightboxState;
  const { currentIndex } = state;
  const scrollRef = useRef<ScrollableImageContainerRef>(null);

  const handleScrollChange = useCallback(
    (_event: Event) => {
      const scrollPos = scrollRef.current?.getScrollPosition();
      lightboxState.updateFigureManipulation({
        scrollX: scrollPos?.x || 0,
        scrollY: scrollPos?.y || 0,
      });
    },
    [scrollRef]
  );

  useEffect(() => {
    const cleanup = scrollRef.current?.addScrollListener(handleScrollChange);
    return cleanup;
  }, []);

  useEffect(() => {
    console.log(
      `on mount scroll to save position: ${currentFigure.scrollX}, ${currentFigure.scrollY}`
    );
    // On mount, scroll to the saved position
    const scrollPos = {
      x: currentFigure.scrollX || 0,
      y: currentFigure.scrollY || 0,
    };

    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    requestAnimationFrame(() => {
      scrollContainer.scrollTo(scrollPos.x, scrollPos.y, "auto");
    });
  }, [currentIndex]);

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

  return (
    <ScrollableImageContainer ref={scrollRef}>
      <Draggable onZoomToPoint={handleZoomToPoint}>
        <ImageFullscreen
          onClick={onCLickFigure}
          alt={currentFigure.alt}
          src={currentFigure.src}
        />
      </Draggable>
    </ScrollableImageContainer>
  );
}
