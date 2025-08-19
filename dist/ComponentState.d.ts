import { ReactNode, FC } from "react";
import { IImage } from "./utils/types";
export interface ILightboxImageState {
    imageLoaded: boolean;
    error: string | null;
    left: number;
    top: number;
    width: number;
    height: number;
    rotate: number;
    imageWidth: number;
    imageHeight: number;
    scaleX: number;
    scaleY: number;
}
export declare enum ActionType {
    CLOSE = "CLOSE",
    NEXT = "NEXT",
    PREVIOUS = "PREVIOUS",
    ZOOM_IN = "ZOOM_IN",
    ZOOM_OUT = "ZOOM_OUT",
    ROTATE_LEFT = "ROTATE_LEFT",
    ROTATE_RIGHT = "ROTATE_RIGHT",
    FLIP_VERTICAL = "FLIP_VERTICAL",
    FLIP_HORIZONTAL = "FLIP_HORIZONTAL",
    RESET_IMAGE = "RESET_IMAGE",
    SAVE = "SAVE"
}
export interface ILightboxState {
    images: IImage[];
    currentImage: number;
    imageState: ILightboxImageState;
    showThumbnails: boolean;
    isLoading: boolean;
    isDraggingImage: boolean;
    pipPosition: {
        left: number;
        top: number;
    };
    onClickPip?: () => void;
    onClickImage?: () => void;
    onClickNext?: () => void;
    onClickPrev?: () => void;
    onClickThumbnail?: () => void;
    onClose?: () => void;
    onRotateLeft?: () => void;
    onRotateRight?: () => void;
    onZoomIn?: () => void;
    onZoomOut?: () => void;
    onSave?: (currentImage: number, state: {
        zoom: number;
        rotation: number;
    }) => void;
}
export type LightboxAction = {
    type: "ZOOM_IN";
    payload: null;
} | {
    type: "ZOOM_OUT";
    payload: null;
} | {
    type: "ROTATE_LEFT";
    payload: null;
} | {
    type: "ROTATE_RIGHT";
    payload: null;
} | {
    type: "FLIP_VERTICAL";
    payload: null;
} | {
    type: "FLIP_HORIZONTAL";
    payload: null;
} | {
    type: "SET_STATE";
    payload: Partial<ILightboxState>;
} | {
    type: "SET_IMAGES";
    payload: IImage[];
} | {
    type: "SET_CURRENT_IMAGE";
    payload: number;
} | {
    type: "UPDATE_IMAGE_STATE";
    payload: Partial<ILightboxImageState>;
} | {
    type: "UPDATE_IMAGE_STATE_LOADED";
    payload: {
        imageLoaded: boolean;
    };
} | {
    type: "SET_PIP_POSITION";
    payload: {
        left: number;
        top: number;
    };
} | {
    type: "SET_SHOW_THUMBNAILS";
    payload: boolean;
} | {
    type: "SET_LOADING";
    payload: boolean;
} | {
    type: "SET_DRAGGING";
    payload: boolean;
} | {
    type: "SET_DRAGGING_PIP";
    payload: boolean;
} | {
    type: "SET_PIP_CALLBACK";
    payload: () => void;
} | {
    type: "RESET_IMAGE";
} | {
    type: "RESET_ALL";
};
export interface ILightboxContext {
    state: ILightboxState;
    dispatch: React.Dispatch<LightboxAction>;
    setState: (state: Partial<ILightboxState>) => void;
    setImages: (images: IImage[]) => void;
    zoomIn: () => void;
    zoomOut: () => void;
    rotateLeft: () => void;
    rotateRight: () => void;
    flipVertical: () => void;
    flipHorisontal: () => void;
    setCurrentImage: (index: number) => void;
    updateImageState: (updates: Partial<ILightboxImageState>) => void;
    setImageLoaded: (imageLoaded: boolean) => void;
    setDraggingImage: (isDragging: boolean) => void;
    resetImageState: () => void;
    resetAll: () => void;
}
interface ILightboxProviderProps {
    children: ReactNode;
    initialState?: Partial<ILightboxState>;
}
export declare const LightboxProvider: FC<ILightboxProviderProps>;
export declare const useSetupState: (initialState: Partial<ILightboxState>) => void;
export declare const useLightboxState: () => ILightboxContext;
export declare const useCurrentImage: () => IImage;
export declare const useCallbackMethods: () => {
    onClickImage: (() => void) | undefined;
    onClickNext: (() => void) | undefined;
    onClickPrev: (() => void) | undefined;
    onClose: (() => void) | undefined;
    onRotateLeft: (() => void) | undefined;
    onRotateRight: (() => void) | undefined;
    onZoomIn: (() => void) | undefined;
    onZoomOut: (() => void) | undefined;
    onSave: ((currentImage: number, state: {
        zoom: number;
        rotation: number;
    }) => void) | undefined;
    onClickThumbnail: (() => void) | undefined;
    onClickPip: (() => void) | undefined;
};
export declare const useLightboxImages: () => {
    images: IImage[];
    currentImage: number;
    currentImageData: IImage;
    setImages: (images: IImage[]) => void;
    setCurrentImage: (index: number) => void;
    nextImage: () => void;
    prevImage: () => void;
    toImage: (index: number) => void;
    hasNext: boolean;
    hasPrev: boolean;
};
export declare const useLightboxImageState: () => {
    imageState: ILightboxImageState;
    updateImageState: (updates: Partial<ILightboxImageState>) => void;
    resetImageState: () => void;
    isLoaded: boolean;
    hasError: boolean;
};
export declare const useLightboxDrag: () => {
    isDragging: boolean;
    setDraggingImage: (isDragging: boolean) => void;
    isAnyDragging: boolean;
};
export {};
//# sourceMappingURL=ComponentState.d.ts.map