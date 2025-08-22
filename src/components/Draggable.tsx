import {
  useCallbackMethods,
  useCurrentImage,
  useLightboxState,
} from "../ComponentState";
import {
  ImageFullscreen,
  ReaderModeImageFullscreen,
} from "./StyledComponents";
import { Draggable } from "./Wrappers";

export function DraggableImageFullScreen() {
  const currentImage = useCurrentImage();
  const { onCLickFigure } = useCallbackMethods();

  return (
    <Draggable>
      <ImageFullscreen
        onClick={onCLickFigure}
        alt={currentImage.alt}
        src={currentImage.src}
      />
    </Draggable>
  );
}

export function DraggableReaderFullScreen() {
  const currentImage = useCurrentImage();
  const { onCLickFigure } = useCallbackMethods();

  const { state } = useLightboxState();
  const imageArray = state.images || [];
  const currentImageIndex = state.currentIndex || 0;
  let nextIndex = currentImageIndex + 1;
  if (nextIndex >= imageArray.length) nextIndex = currentImageIndex;

  const nextImage = imageArray[nextIndex] || null;

  return (
    <Draggable>
      <ReaderModeImageFullscreen
        image1={{
          onClick: onCLickFigure,
          alt: currentImage.alt,
          src: currentImage.src,
        }}
        image2={{
          onClick: onCLickFigure,
          alt: nextImage.alt,
          src: nextImage.src,
        }}
      />
    </Draggable>
  );
}