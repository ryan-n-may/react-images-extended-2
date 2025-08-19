import { useRef, useMemo } from "react";
import { SpinnerAtom } from "./components/Atoms";
import { ThumbnailsMolecule } from "./components/Molecules";
import { DefaultHeader, Modal } from "./components/Organisms";
import { FOOTER_HEIGHT } from "./utils/constants";
import { FigureContainerFullScreen } from "./components/StyledComponents";
import {
  useLightboxState,
  LightboxProvider,
  useSetupState,
  useLightboxImageState,
  ILightboxState,
} from "./ComponentState";
import { IImage } from "./utils/types";
import { DraggableImageFullScreen } from "./components/Draggable";
import { useLoadImage } from "./hooks/loadImage";
import { debuginfo } from "./utils/log";
import { useDocumentPiP } from "./hooks/usePip";

export interface ICustomControl {
  label: string;
  icon: string;
  onClick: (state?: ILightboxState) => Partial<ILightboxState>;
  isDisabled?: (state?: ILightboxState) => boolean;
  isActive?: (state?: ILightboxState) => boolean;
}

export interface ILightboxProps {
  images: Array<IImage>;

  // Optional custom controls @todo: implement this.
  customControls?: Array<ICustomControl>;

  // Callback methods
  onClickImage?: () => void;
  onClickNext?: () => void;
  onClickPrev?: () => void;
  onClose?: () => void;
  onRotateLeft?: () => void;
  onRotateRight?: () => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onSave?: (
    currentImage: number,
    state: { zoom: number; rotation: number }
  ) => void;
  onClickThumbnail?: () => void;

  // Optional configurations
  showCloseButton?: boolean;
  showThumbnails?: boolean;
}

export const Lightbox = (props: ILightboxProps) => {
  return (
    <LightboxProvider>
      <LightboxWrapper {...props} />
    </LightboxProvider>
  );
};

export function LightboxWrapper(props: ILightboxProps) {
  // Might need to tweak requirements
  const {
    images,
    onClickImage,
    onClickNext,
    onClickPrev,
    onClose,
    onSave,
    showThumbnails,
    onClickThumbnail,
  } = props;

  // Memoize the initial state to prevent function reference changes
  const initialState = useMemo(
    () => ({
      showThumbnails,
      onClickThumbnail,
      onClickImage,
      onClickNext,
      onClickPrev,
      onClose,
      onSave,
      images: images || [],
      currentImage: 0, // Default to first image
    }),
    [
      showThumbnails,
      onClickThumbnail,
      onClickImage,
      onClickNext,
      onClickPrev,
      onClose,
      onSave,
      images,
    ]
  );

  // transfer props to state
  useSetupState(initialState);

  return <LightboxFunctional />;
}

export function LightboxDPIP() {
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
    return <DraggableImageFullScreen imageRef={imageRef} />;
  }, [images, currentImage, imageRef]);

  const ImageCourasselFullscreen = useMemo(() => {
    debuginfo(`Rendering ImageCourassel for currentImage: ${currentImage}`);
    return <figure>{ImageElementFullscreen}</figure>;
  }, [ImageElementFullscreen]);

  // TO DO: keep the image position when resizing the PiP.... not implemented yet.
  //const { width: windowWidth, height: windowHeight } = useWindowSize(); // will update on window resize

  return (
    <>
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
    </>
  );
}

const LightboxFunctional = () => {
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

  const { open, close, isOpen } = useDocumentPiP();

  return (
    <>
      <Modal key="lightbox-fullscreen-modal" hidden={false}>
        <div key="lightbox-fullscreen">
          <div className="sticky top-0 z-10">
            <DefaultHeader
              key="default-header"
              pipControls={{ open, close, isOpen }}
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
