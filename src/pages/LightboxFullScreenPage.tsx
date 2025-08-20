import { useRef, useMemo } from "react";
import { SpinnerAtom } from "../components/Atoms";
import {
  DraggableImageFullScreen,
  DraggableReaderFullScreen,
} from "../components/Draggable";
import {
  PinnedImagesHeader,
  ThumbnailsMolecule,
} from "../components/Molecules";
import { Modal, DefaultHeader } from "../components/Organisms";
import { FigureContainerFullScreen } from "../components/StyledComponents";
import {
  useLightboxState,
  useLightboxImageState,
  IImageViewMode,
} from "../ComponentState";
import { useLoadImage } from "../hooks/useLoadImage";
import { debuginfo } from "../utils/log";
import { useOpenPip } from "../hooks/useOpenPip";
import { useOpenTab } from "../hooks/useOpenTab";

export const LightboxFullScreenPage = () => {
  const lightboxState = useLightboxState();
  const { images, currentImage, showThumbnails, viewMode } =
    lightboxState.state;
  const { imageState } = useLightboxImageState();
  const { imageLoaded } = imageState;

  // Refs to replace instance variables
  const imageRef = useRef(null);

  useLoadImage();

  const ImageElementFullscreen = useMemo(() => {
    debuginfo(
      `Rendering ImageElementFullscreen for currentImage: ${currentImage}`
    );
    if (!images[currentImage]) return null;

    if (viewMode === IImageViewMode.READER) {
      return (
        <DraggableReaderFullScreen key="image-reader-draggable-fullscreen" />
      );
    }

    return (
      <DraggableImageFullScreen
        imageRef={imageRef}
        key="image-draggable-fullscreen"
      />
    );
  }, [images, currentImage, imageRef, viewMode, imageLoaded]);

  const ImageCourasselFullscreen = useMemo(() => {
    debuginfo(`Rendering ImageCourassel for currentImage: ${currentImage}`);
    return (
      <figure key="image-courassel-fullscreen">{ImageElementFullscreen}</figure>
    );
  }, [ImageElementFullscreen]);

  const {
    open: handlePipOpen,
    isOpen,
    close,
  } = useOpenPip(lightboxState.state);
  const { open: handleTabOpen } = useOpenTab(lightboxState.state);

  return (
    <>
      <Modal key="lightbox-fullscreen-modal" hidden={false}>
        <div key="lightbox-fullscreen">
          <div className="fixed left-0 top-0 z-10 h-screen p-4">
            <PinnedImagesHeader key="pinned-images-header" />
          </div>
          <div className="sticky top-0 z-10">
            <DefaultHeader
              key="default-header"
              pipControls={{ open: handlePipOpen, close, isOpen }}
              newTabControls={{ open: handleTabOpen }}
            />
          </div>
          {imageLoaded && (
            <FigureContainerFullScreen key="figure-container-fullscreen">
              {ImageCourasselFullscreen}
            </FigureContainerFullScreen>
          )}
          {!imageLoaded && <SpinnerAtom key="document-preview-spinner" />}
          <div className="sticky bottom-0 z-10">
            {showThumbnails && <ThumbnailsMolecule key="thumbnails" />}
          </div>
        </div>
      </Modal>
    </>
  );
};
