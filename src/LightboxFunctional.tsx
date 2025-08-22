import { useMemo } from "react";
import {
  LightboxProvider,
  useSetupState,
  ILightboxState,
  ILightboxImageType,
} from "./ComponentState";
import { IImage } from "./utils/types";
import { LightboxFullScreenPage } from "./pages/LightboxFullScreenPage";

export interface ICustomControl {
  label: string;
  icon: string;
  onClick: (state?: ILightboxState) => Partial<ILightboxState>;
  isDisabled?: (state?: ILightboxState) => boolean;
  isActive?: (state?: ILightboxState) => boolean;
}

export interface ILightboxProps extends IStableLightboxProps {
  pdfSource?: string;
  customControls?: Array<ICustomControl>;
}

interface IStableLightboxProps {
  images?: Array<IImage>;
  currentImage?: number; // Default to first image

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
  showThumbnails?: boolean;
  zoomDelay?: number; // Delay in milliseconds for zoom actions
  zoomInternal?: number; // Interval in milliseconds for zoom actions
  resetImageOnLoad?: boolean; // Reset image state on load
}

export const Lightbox = (props: ILightboxProps) => {
  //if(props.allowExperimentalFeatures) PACKAGE_VERSION = "EXPERIMENTAL"; // add configurability to global state later.

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
    pdfSource,
    onClickImage,
    onClickNext,
    onClickPrev,
    onClose,
    onSave,
    onClickThumbnail,
    showThumbnails,
    zoomDelay,
    zoomInternal,
    resetImageOnLoad,
    currentImage,
  } = props;

  if (images && images.length > 0 && Boolean(pdfSource)) {
    throw new Error(
      "Cannot use pdfSource with images. Please provide either images or pdfSource."
    );
  }

  // DETERMINE THE APPROPRIATE SOURCE TYPE FOR PDF OR IMAGE.
  const sourceType = pdfSource
    ? ILightboxImageType.PDF
    : ILightboxImageType.IMAGE;

  console.log(`Lightbox initialized with sourceType: ${sourceType}`); // Debugging log

  let pageCount = 0;
  if (sourceType === ILightboxImageType.PDF) {
    pageCount = 0;
  } else {
    pageCount = images ? images.length : 0;
  }

  // Memoize the initial state to prevent function reference changes
  const initialState = useMemo(
    () =>
      ({
        showThumbnails,
        onClickThumbnail,
        onClickImage,
        onClickNext,
        onClickPrev,
        onClose,
        onSave,
        pageCount,
        images: images || [],
        currentImage,
        pdfDocumentSrc: pdfSource || "",
        sourceType,
        zoomDelay,
        zoomInternal,
        resetImageOnLoad,
      } as Partial<ILightboxState>),
    [
      showThumbnails,
      pageCount,
      currentImage,
      onClickThumbnail,
      onClickImage,
      onClickNext,
      onClickPrev,
      onClose,
      onSave,
      images,
      sourceType,
      zoomDelay,
      zoomInternal,
      resetImageOnLoad,
    ]
  );

  // transfer props to state
  useSetupState(initialState);

  return <LightboxFullScreenPage />;
}
