import { useRef, useMemo } from "react";
import { SpinnerAtom } from "../components/Atoms";
import { DraggableImageFullScreen } from "../components/Draggable";
import { ThumbnailsMolecule } from "../components/Molecules";
import { DefaultHeader } from "../components/Organisms";
import { FigureContainerFullScreen } from "../components/StyledComponents";
import { useLightboxState, useLightboxImageState } from "../ComponentState";
import { useLoadImage } from "../hooks/useLoadImage";
import { debuginfo } from "../utils/log";

export function LightboxDPIPPage(props: {
  targetWindowRef?: React.MutableRefObject<Window | null>;
}) {
  const lightboxState = useLightboxState();
  const { images, currentImage, showThumbnails } = lightboxState.state;
  const { imageState } = useLightboxImageState();
  const { imageLoaded } = imageState;

  // Refs to replace instance variables]
  const imageRef = useRef(null);

  useLoadImage();

  const ImageElementFullscreen = useMemo(() => {
    debuginfo(
      `Rendering ImageElementFullscreen for currentImage: ${currentImage}`
    );
    if (!images[currentImage]) return null;
    return <DraggableImageFullScreen imageRef={imageRef} />;
  }, [images, currentImage, imageRef]);

  const ImageCourasselFullscreen = useMemo(() => {
    debuginfo(`Rendering ImageCourassel for currentImage: ${currentImage}`);
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
