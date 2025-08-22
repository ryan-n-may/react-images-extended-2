import { useMemo } from "react";
import {
  NextImageMolecule,
  PageCountMolecule,
  PinnedImagesHeader,
  PreviousImageMolecule,
  ThumbnailsMolecule,
} from "../components/Molecules";
import { Modal, DefaultHeader } from "../components/Organisms";
import {
  useLightboxState,
  useLightboxManipulationState,
} from "../ComponentState";
import { useLoadImage } from "../hooks/useLoadImage";
import { debuginfo } from "../utils/log";
import { ImageElementFullscreen } from "./elements/ImageElementFullscreen";
import { FigureContainerFullScreen } from "../components/StyledComponents";
import { SpinnerAtom } from "../components/Atoms";
import { HEADER_Z_INDEX } from "../utils/constants";

export const LightboxFullScreenPage = () => {
  const lightboxState = useLightboxState();
  const { images, currentIndex, viewMode, sourceType } = lightboxState.state;
  const { manipulationState } = useLightboxManipulationState();
  const { imageLoaded } = manipulationState;

  useLoadImage();

  const ImageCourasselFullscreen = useMemo(() => {
    debuginfo(`Rendering ImageCourassel for currentImage: ${currentIndex}`);
    return (
      <figure role="image-courassel-fullscreen">
        <ImageElementFullscreen state={lightboxState.state} />
      </figure>
    );
  }, [images, currentIndex, viewMode, imageLoaded, sourceType]);

  return (
    <>
      <Modal hidden={false}>
        <div role="lightbox-fullscreen" className="w-screen h-screen p-0">
          {imageLoaded && (
            <FigureContainerFullScreen>
              {ImageCourasselFullscreen}
            </FigureContainerFullScreen>
          )}
          {!imageLoaded && <SpinnerAtom />}
          <div
            className="fixed top-0 right-0 flex justify-end w-3/4"
            role="top-right"
            style={{ zIndex: HEADER_Z_INDEX }}
          >
            <DefaultHeader />
          </div>

          <div
            className="fixed top-0 left-0 flex justify-start w-1/4"
            role="top-left"
            style={{ zIndex: HEADER_Z_INDEX }}
          >
            <PageCountMolecule />
          </div>

          <div
            className="fixed bottom-1/2 left-0 flex justify-start w-1/4"
            role="left-bar"
            style={{ zIndex: HEADER_Z_INDEX }}
          >
            <PreviousImageMolecule />
          </div>

          <div
            className="fixed bottom-1/2 right-0 flex justify-end w-1/4"
            role="right-bar"
            style={{ zIndex: HEADER_Z_INDEX }}
          >
            <NextImageMolecule />
          </div>

          <div
            className="fixed bottom-0 flex justify-center w-full"
            role="bottom-bar"
            style={{ zIndex: HEADER_Z_INDEX }}
          >
            <div className="flex flex-col items-center space-y-2">
              <PinnedImagesHeader />
              <ThumbnailsMolecule />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

/**
 * <div className="fixed left-0 top-0 z-10 h-screen w-screen p-4">
            <PinnedImagesHeader key="pinned-images-header" />
          </div>
 */

/**
           * <div className="sticky top-0 z-10">
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
           */
