import { useCallbackMethods, useCurrentImage } from '../ComponentState';
import { ImageFullscreen } from './StyledComponents';
import { Draggable } from './Wrappers';

interface IDraggableImageFullScreen {
  imageRef: React.RefObject<HTMLImageElement>;
}

export function DraggableImageFullScreen({ imageRef }: IDraggableImageFullScreen) {
  const currentImage = useCurrentImage();
  const { onClickImage } = useCallbackMethods();

  return (
    <Draggable>
      <ImageFullscreen ref={imageRef} onClick={onClickImage} alt={currentImage.alt} src={currentImage.src} />
    </Draggable>
  );
}

