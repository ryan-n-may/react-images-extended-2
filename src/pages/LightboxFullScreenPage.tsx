import { useMemo } from "react";
import {
  NextImageMolecule,
  PageCountMolecule,
  PreviousImageMolecule,
  ThumbnailsMolecule,
} from "../components/Molecules";
import { Modal, DefaultHeader } from "../components/Organisms";
import { useLightboxState } from "../ComponentState";
import { useLoadImage } from "../hooks/useLoadImage";
import { ImageElementFullscreen } from "./elements/ImageElementFullscreen";
import { FigureContainerFullScreen } from "../components/StyledComponents";
import { SpinnerAtom } from "../components/Atoms";
import { HEADER_Z_INDEX } from "../utils/constants";

export const LightboxFullScreenPage = () => {
  const lightboxState = useLightboxState();
  const { figures, currentIndex } = lightboxState.state;
  const currentFigure = figures?.[currentIndex] ?? {};
  const { imageLoaded } = currentFigure;

  useLoadImage();

  const ImageCourasselFullscreen = useMemo(() => {
    return (
      <figure role="image-courassel-fullscreen">
        <ImageElementFullscreen />
      </figure>
    );
  }, [figures, currentIndex, imageLoaded]);

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
              <ThumbnailsMolecule />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
