import {
  DraggableImageFullScreen,
  DraggableReaderFullScreen,
} from "../../components/Draggable";
import {
  IImageViewMode,
  ILightboxImageType,
  ILightboxState,
} from "../../ComponentState";
import { debuginfo } from "../../utils/log";

export interface IImageElementFullscreenProps {
  state: ILightboxState;
}

export function ImageElementFullscreen(props: IImageElementFullscreenProps) {
  const { state } = props;
  const { images, currentIndex, viewMode, sourceType } = state;

  if (sourceType === ILightboxImageType.PDF) {
    throw new Error(
      "Experimental feature not supported in this version of react-iamges-extended-2."
    );
  } else if (sourceType === ILightboxImageType.IMAGE) {
    if (!images[currentIndex]) {
      console.error("Image source is not provided.");
      return null;
    }

    if (viewMode === IImageViewMode.READER) {
      debuginfo(
        `Rendering DraggableReaderFullScreen for currentImage: ${currentIndex}`
      );
      return (
        <DraggableReaderFullScreen key="image-reader-draggable-fullscreen" />
      );
    }

    debuginfo(
      `Rendering DraggableImageFullScreen for currentImage: ${currentIndex}`
    );
    return <DraggableImageFullScreen key="image-draggable-fullscreen" />;
  }
}
