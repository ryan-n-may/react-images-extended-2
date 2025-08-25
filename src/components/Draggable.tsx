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
import { zoomManipulationToPoint } from "../utils/manipulation";

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
        console.log("Viewport click at:", clickX, clickY);

        // Get the scroll container and image elements
        const scrollContainer = scrollRef.current?.getContainerElement();
        const imageElement = scrollContainer?.querySelector("img");

        if (!scrollContainer || !imageElement) return;

        // Get the image's position within the scroll container
        const imageRect = imageElement.getBoundingClientRect();

        // Convert viewport coordinates to image-relative coordinates
        const imageRelativeX =
          clickX - imageRect.left + scrollContainer.scrollLeft;
        const imageRelativeY =
          clickY - imageRect.top + scrollContainer.scrollTop;

        console.log("Image-relative click at:", imageRelativeX, imageRelativeY);
        console.log(
          "As fraction of image:",
          imageRelativeX / imageRect.width,
          imageRelativeY / imageRect.height
        );

        // Now zoom
        const { scaleX, scaleY, zoomFactor } = zoomManipulationToPoint(currentFigure) ?? {};
        if (!scaleX || !scaleY) return;

        lightboxState.updateFigureManipulation({ scaleX, scaleY, zoomFactor });

        // Calculate where that same point will be after scaling
        const scaleRatio = scaleX / currentFigure.scaleX;
        const newImageRelativeX = imageRelativeX * scaleRatio;
        const newImageRelativeY = imageRelativeY * scaleRatio;

        console.log(
          "New image-relative position:",
          newImageRelativeX,
          newImageRelativeY
        );

        // Scroll to keep that point centered
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            const containerWidth = scrollContainer.clientWidth;
            const containerHeight = scrollContainer.clientHeight;

            scrollRef.current?.scrollTo(
              newImageRelativeX - containerWidth / 2,
              newImageRelativeY - containerHeight / 2,
              "auto"
            );
          });
        });
      },
      [lightboxState, currentFigure.scaleX, currentFigure.scaleY]
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
