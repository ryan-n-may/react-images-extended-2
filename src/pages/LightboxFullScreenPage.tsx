import { useRef, useMemo, useEffect } from "react";
import { SpinnerAtom } from "../components/Atoms";
import { DraggableImageFullScreen } from "../components/Draggable";
import { ThumbnailsMolecule } from "../components/Molecules";
import { Modal, DefaultHeader } from "../components/Organisms";
import { FigureContainerFullScreen } from "../components/StyledComponents";
import {
  useLightboxState,
  useLightboxImageState,
} from "../ComponentState";
import { useLoadImage } from "../hooks/useLoadImage";
import { useWindowSize } from "../hooks/useWindowSize";
import { FOOTER_HEIGHT } from "../utils/constants";
import { debuginfo } from "../utils/log";
import { useOpenPip } from "../hooks/useOpenPip";
import { useOpenTab } from "../hooks/useOpenTab";

export const LightboxFullScreenPage = () => {
  const lightboxState = useLightboxState();
  const { images, currentImage, showThumbnails } = lightboxState.state;
  const { imageState } = useLightboxImageState();
  const { imageLoaded } = imageState;

  // Refs to replace instance variables
  const footerHeightRef = useRef(FOOTER_HEIGHT);
  const imageRef = useRef(null);

  useLoadImage(footerHeightRef);

  const ImageElementFullscreen = useMemo(() => {
    debuginfo(
      `Rendering ImageElementFullscreen for currentImage: ${currentImage}`
    );
    if (!images[currentImage]) return null;
    return (
      <DraggableImageFullScreen
        key="image-draggable-fullscreen"
        imageRef={imageRef}
      />
    );
  }, [images, currentImage, imageRef]);

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

  // debugging box showing the center of the window
  const { width: windowWidth, height: windowHeight } = useWindowSize(window);
  const center = {
    x: Math.min(windowWidth / 2),
    y: Math.min(windowHeight / 2),
  };

  useEffect(() => {
    debuginfo(`windowWidth: ${windowWidth}, windowHeight: ${windowHeight}`);
    debuginfo(`imageCenter: x=${center.x}, y=${center.y}`);
  }, [windowWidth, windowHeight]);

  return (
    <>
      <Modal key="lightbox-fullscreen-modal" hidden={false}>
        <div key="lightbox-fullscreen">
          <div
            className={`absolute top-[0px] left-[0px] w-[10px] h-[10px] z-[10000] bg-red-500`}
            style={{
              transform: `translate(${center.x}px, ${center.y}px)`,
            }}
          ></div>
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
            {showThumbnails && (
              <ThumbnailsMolecule key="thumbnails" size={"sm"} />
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};
