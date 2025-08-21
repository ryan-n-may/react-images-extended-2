import { useRef, useMemo } from "react";
import { SpinnerAtom } from "../components/Atoms";
import { DraggableImageFullScreen } from "../components/Draggable";
import { ThumbnailsMolecule } from "../components/Molecules";
import { DefaultHeader } from "../components/Organisms";
import { FigureContainerFullScreen } from "../components/StyledComponents";
import {
  useLightboxState,
  useLightboxManipulationState,
} from "../ComponentState";
import { useLoadImage } from "../hooks/useLoadImage";
import { debuginfo } from "../utils/log";

export function LightboxDPIPPage(props: {
  targetWindowRef?: React.MutableRefObject<Window | null>;
}) {
  const lightboxState = useLightboxState();
  const { images, currentIndex, showThumbnails } = lightboxState.state;
  const { manipulationState } = useLightboxManipulationState();
  const { imageLoaded } = manipulationState;

  // Refs to replace instance variables]
  const imageRef = useRef(null);

  useLoadImage();

  const ImageElementFullscreen = useMemo(() => {
    debuginfo(
      `Rendering ImageElementFullscreen for currentImage: ${currentIndex}`
    );
    if (!images[currentIndex]) return null;
    return <DraggableImageFullScreen />;
  }, [images, currentIndex, imageRef]);

  const ImageCourasselFullscreen = useMemo(() => {
    debuginfo(`Rendering ImageCourassel for currentImage: ${currentIndex}`);
    return <figure>{ImageElementFullscreen}</figure>;
  }, [ImageElementFullscreen]);

  props.targetWindowRef?.current?.focus(); // need to actually do something with this, maybe store it in state so we can fix the reset bug...

  return (
    <div key="lightbox-dpip" className="bg-black text-white h-screen w-screen">
      <div className="sticky top-0 z-10">
        <DefaultHeader />
      </div>
      {imageLoaded && (
        <FigureContainerFullScreen>
          {ImageCourasselFullscreen}
        </FigureContainerFullScreen>
      )}
      {!imageLoaded && <SpinnerAtom />}
      <div className="sticky bottom-0 z-10">
        {showThumbnails && <ThumbnailsMolecule />}
      </div>
    </div>
  );
}
