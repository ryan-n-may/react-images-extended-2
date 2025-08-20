import {
  useCallbackMethods,
  useCurrentImage,
  useLightboxState,
} from "../ComponentState";
import { ImageFullscreen, ReaderModeImageFullscreen } from "./StyledComponents";
import { Draggable } from "./Wrappers";

interface IDraggableImageFullScreen {
  imageRef: React.RefObject<HTMLImageElement>;
}

export function DraggableImageFullScreen({
  imageRef,
}: IDraggableImageFullScreen) {
  const currentImage = useCurrentImage();
  const { onClickImage } = useCallbackMethods();

  return (
    <Draggable>
      <ImageFullscreen
        ref={imageRef}
        onClick={onClickImage}
        alt={currentImage.alt}
        src={currentImage.src}
      />
    </Draggable>
  );
}

export function DraggableReaderFullScreen() {
  const currentImage = useCurrentImage();
  const { onClickImage } = useCallbackMethods();

  const { state } = useLightboxState();
  const imageArray = state.images || [];
  const currentImageIndex = state.currentImage || 0;
  let nextIndex = currentImageIndex + 1;
  if (nextIndex >= imageArray.length) nextIndex = currentImageIndex;

  const nextImage = imageArray[nextIndex] || null;

  return (
    <Draggable>
      <ReaderModeImageFullscreen
        image1={{
          onClick: onClickImage,
          alt: currentImage.alt,
          src: currentImage.src,
        }}
        image2={{
          onClick: onClickImage,
          alt: nextImage.alt,
          src: nextImage.src,
        }}
      />
    </Draggable>
  );
}
