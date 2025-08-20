import { useRef, useMemo, useEffect } from "react";
import { SpinnerAtom } from "../components/Atoms";
import { DraggableImageFullScreen } from "../components/Draggable";
import { ThumbnailsMolecule } from "../components/Molecules";
import { DefaultHeader } from "../components/Organisms";
import { FigureContainerFullScreen } from "../components/StyledComponents";
import { useLightboxState, useLightboxImageState } from "../ComponentState";
import { useLoadImage } from "../hooks/useLoadImage";
import { useWindowSize } from "../hooks/useWindowSize";
import { FOOTER_HEIGHT } from "../utils/constants";
import { debuginfo } from "../utils/log";

export function LightboxDPIPPage(props: {
  targetWindowRef?: React.MutableRefObject<Window | null>;
}) {
  const lightboxState = useLightboxState();
  const { images, currentImage, showThumbnails } = lightboxState.state;
  const { imageState } = useLightboxImageState();
  const { imageLoaded } = imageState;

  // Refs to replace instance variables]
  const footerHeightRef = useRef(FOOTER_HEIGHT);
  const imageRef = useRef(null);

  useLoadImage(footerHeightRef);

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

  // will update when targetWindowRef mounts on pip open
  const targetWindow = props.targetWindowRef?.current;

  // debugging box showing the center of the window
  const { width: windowWidth, height: windowHeight } = useWindowSize(
    targetWindow ?? undefined
  );
  const center = {
    x: Math.min(windowWidth / 2),
    y: Math.min(windowHeight / 2),
  };

  useEffect(() => {
    debuginfo(`windowWidth: ${windowWidth}, windowHeight: ${windowHeight}`);
    debuginfo(`imageCenter: x=${center.x}, y=${center.y}`);
  }, [windowWidth, windowHeight]);

  // override the onClose method to close the target window; not the lightbox overlay
  lightboxState.state.onClose = () => {
    debuginfo("Closing LightboxDPIPPage");
    targetWindow?.close();
  };

  return (
    <div key="lightbox-dpip">
      <div
        className={`absolute top-[0px] left-[0px] w-[10px] h-[10px] z-[10000] bg-red-500`}
        style={{
          transform: `translate(${center.x}px, ${center.y}px)`,
        }}
      ></div>
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
        {showThumbnails && <ThumbnailsMolecule size={"sm"} />}
      </div>
    </div>
  );
}
