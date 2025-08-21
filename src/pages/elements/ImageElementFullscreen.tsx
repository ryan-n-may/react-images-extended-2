import {
  DraggableImageFullScreen,
  DraggablePdfFullscreen,
  DraggableReaderFullScreen,
} from "../../components/Draggable";
import {
  IImageViewMode,
  ILightboxImageType,
  ILightboxState,
} from "../../ComponentState";

export interface IImageElementFullscreenProps {
  state: ILightboxState;
}

export function ImageElementFullscreen(props: IImageElementFullscreenProps) {
  const { state } = props;
  const { images, currentImage, viewMode, sourceType, pdfDocumentSrc } = state;

  if (sourceType === ILightboxImageType.PDF) {
    if (!pdfDocumentSrc) return null;

    return <DraggablePdfFullscreen />;
  }

  if (sourceType === ILightboxImageType.IMAGE) {
    if (!images[currentImage]) return null;

    if (viewMode === IImageViewMode.READER) {
      return (
        <DraggableReaderFullScreen key="image-reader-draggable-fullscreen" />
      );
    }

    return <DraggableImageFullScreen key="image-draggable-fullscreen" />;
  }
}
