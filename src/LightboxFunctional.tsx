import { useMemo } from "react";
import {
  LightboxProvider,
  useSetupState,
  ILightboxState,
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

  return <LightboxFullScreenPage />;
}


