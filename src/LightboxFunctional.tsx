import { useRef, useMemo } from "react";
import { SpinnerAtom } from "./components/Atoms";
import { ThumbnailsMolecule } from "./components/Molecules";
import { DefaultHeader, Modal } from "./components/Organisms";
import { FOOTER_HEIGHT } from "./utils/constants";
import { FigureContainerFullScreen } from "./components/StyledComponents";
import { Box } from "@chakra-ui/react";
import {
  LightboxDisplayMode,
  useLightboxState,
  LightboxProvider,
  useSetupState,
  useLightboxImageState,
  ILightboxState,
} from "./ComponentState";
import { IImage } from "./utils/types";
import { DraggableImageFullScreen } from "./components/Draggable";
import { useLoadImage } from "./hooks/loadImage";
import { useContainerDimensions } from "./hooks/containerDims";
import { debuginfo } from "./utils/log";
import { useDocumentPiP } from "./utils/pip";

export interface ICustomControl {
  label: string;
  icon: string;
  onClick: (state: ILightboxState) => Partial<ILightboxState>;
  isDisabled?: (state: ILightboxState) => boolean;
  isActive?: (state: ILightboxState) => boolean;
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
  displayMode?: LightboxDisplayMode;

  initialPipWidth?: number; // todo: implement this, currently hardcoded
  initialPipHeight?: number; // todo: implement this, current hardcoded
}

export const Lightbox = (props: ILightboxProps) => {
  return (
    <LightboxProvider>
      <LightboxWrapper {...props} />
    </LightboxProvider>
  );
};

export const LightboxWrapper = (props: ILightboxProps) => {
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
    displayMode = LightboxDisplayMode.FULLSCREEN,
  } = props;

  // transfer props to state
  useSetupState({
    showThumbnails,
    onClickThumbnail,
    onClickImage,
    onClickNext,
    onClickPrev,
    onClose,
    onSave,
    images: images || [],
    currentImage: 0, // Default to first image
    displayMode: displayMode,
  });

  return <LightboxFunctional />;
};

const LightboxFunctional = () => {
  const lightboxState = useLightboxState();
  const { images, currentImage, showThumbnails } = lightboxState.state;
  const { imageState } = useLightboxImageState();
  const { imageLoaded } = imageState;

  // Refs to replace instance variables
  const containerWidthRef = useRef(0);
  const containerHeightRef = useRef(0);
  const footerHeightRef = useRef(FOOTER_HEIGHT);
  const imageRef = useRef(null);

  useContainerDimensions(containerWidthRef, containerHeightRef);
  useLoadImage(containerWidthRef, containerHeightRef, footerHeightRef);

  const ImageElementFullscreen = useMemo(() => {
    debuginfo(
      `Rendering ImageElementFullscreen for currentImage: ${currentImage}`
    );
    if (!images[currentImage]) return null;
    return <DraggableImageFullScreen imageRef={imageRef} />;
  }, [images, currentImage, imageRef]);

  const ImageCourasselFullscreen = useMemo(() => {
    debuginfo(`Rendering ImageCourassel for currentImage: ${currentImage}`);
    return <Box as="figure">{ImageElementFullscreen}</Box>;
  }, [ImageElementFullscreen]);

  const { open, close, isOpen } = useDocumentPiP();

  const onPipClick = () => {
    if (isOpen()) close();
    open(
      <>
        <strong>Document Viewer</strong>
        <Box position="sticky" top="0" zIndex="sticky">
          <DefaultHeader
            containerWidthRef={containerWidthRef}
            containerHeightRef={containerHeightRef}
          />
        </Box>
        {imageLoaded && (
          <FigureContainerFullScreen>
            {ImageCourasselFullscreen}
          </FigureContainerFullScreen>
        )}
        {!imageLoaded && <SpinnerAtom size="lg" />}
        <Box position="sticky" bottom="0" zIndex="sticky">
          {showThumbnails && <ThumbnailsMolecule size={"sm"} />}
        </Box>
      </>
    ).catch((error) => {
      console.error("Error opening PiP:", error);
      close();
    });
  };

  // Set the PiP callback in the lightbox state; only able to open on user event interaction.
  lightboxState.setPipCallback(onPipClick);

  return (
    <>
      <Modal
        hidden={
          lightboxState.state.displayMode !== LightboxDisplayMode.FULLSCREEN
        }
      >
        <>
          <Box position="sticky" top="0" zIndex="sticky">
            <DefaultHeader
              containerWidthRef={containerWidthRef}
              containerHeightRef={containerHeightRef}
            />
          </Box>
          {imageLoaded && (
            <FigureContainerFullScreen>
              {ImageCourasselFullscreen}
            </FigureContainerFullScreen>
          )}
          {!imageLoaded && <SpinnerAtom size="lg" />}
          <Box position="sticky" bottom="0" zIndex="sticky">
            {showThumbnails && <ThumbnailsMolecule size={"sm"} />}
          </Box>
        </>
      </Modal>
    </>
  );
};
