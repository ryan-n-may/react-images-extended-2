import { ReactNode, FC } from "react";
import { IImage } from "./utils/types";
export interface ILightboxManipulationState {
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
    zoomFactor: number;
    scrollX: number;
    scrollY: number;
}
export declare enum IImageViewMode {
    READER = "READER",
    IMAGE = "IMAGE"
}
export declare enum ILightboxImageType {
    IMAGE = "IMAGE",
    PDF = "PDF",
    UNINITIALISED = "UNINITIALISED"
}
export type ILightboxTrackedImage = IImage & ILightboxManipulationState;
export interface ILightboxState {
    pageCount: number;
    currentIndex: number;
    figures: Array<ILightboxTrackedImage>;
    isDraggingFigure: boolean;
    viewMode: IImageViewMode;
    showThumbnails: boolean;
    resetImageOnLoad: boolean;
    holdZoomDelay: number;
    holdZoomInternal: number;
    isLoading: boolean;
    isNavigating: boolean;
    navigationDirection: 'left' | 'right' | null;
    isAnimating: boolean;
    windowRef: Window | null;
    onCLickFigure?: () => void;
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
    type: "ZOOM_IN_TO_POINT";
    payload: {
        x: number;
        y: number;
    };
} | {
    type: "ZOOM_TO_FACTOR";
    payload: number;
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
    type: "SET_SHOW_THUMBNAILS";
    payload: boolean;
} | {
    type: "SET_LOADING";
    payload: boolean;
} | {
    type: "SET_NAVIGATING";
    payload: boolean;
} | {
    type: "SET_ANIMATION_STATE";
    payload: {
        isAnimating: boolean;
        direction?: 'left' | 'right' | null;
    };
} | {
    type: "SET_WINDOW_REF";
    payload: Window | null;
} | {
    type: "SET_STATE";
    payload: Partial<ILightboxState>;
} | {
    type: "RESET_ALL";
} | {
    type: "SET_FIGURES";
    payload: ILightboxTrackedImage[];
} | {
    type: "SET_PAGE_COUNT";
    payload: number;
} | {
    type: "SET_CURRENT_INDEX";
    payload: number;
} | {
    type: "UPDATE_FIGURE_STATE";
    payload: Partial<ILightboxManipulationState>;
} | {
    type: "SET_DRAGGING";
    payload: boolean;
} | {
    type: "RESET_IMAGE";
};
export interface ILightboxContext {
    state: ILightboxState;
    dispatch: React.Dispatch<LightboxAction>;
    setState: (state: Partial<ILightboxState>) => void;
    setFigures: (figures: ILightboxTrackedImage[]) => void;
    setLoading: (isLoading: boolean) => void;
    setNavigating: (isNavigating: boolean) => void;
    setAnimationState: (isAnimating: boolean, direction?: 'left' | 'right' | null) => void;
    setWindowRef: (windowRef: Window | null) => void;
    zoomIn: () => void;
    zoomOut: () => void;
    zoomInToFactor: (notch: number) => void;
    rotateLeft: () => void;
    rotateRight: () => void;
    flipVertical: () => void;
    flipHorisontal: () => void;
    setCurrentIndex: (index: number) => void;
    setDraggingFigure: (isDragging: boolean) => void;
    updateFigureManipulation: (updates: Partial<ILightboxTrackedImage>) => void;
    resetMaipulationState: () => void;
    resetAll: () => void;
    setPageCount: (pages: number) => void;
}
interface ILightboxProviderProps {
    children: ReactNode;
    initialState?: Partial<ILightboxState>;
}
export declare const LightboxProvider: FC<ILightboxProviderProps>;
export declare const useSetupState: (initialState: Partial<ILightboxState>) => void;
export declare const useLightboxState: () => ILightboxContext;
export declare const useCurrentFigure: () => ILightboxTrackedImage;
export declare const useCallbackMethods: () => {
    onCLickFigure: (() => void) | undefined;
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
};
export declare const useLightboxImages: () => {
    figures: ILightboxTrackedImage[];
    currentIndex: number;
    pageCount: number;
    currentFigureData: ILightboxTrackedImage;
    setFigures: () => void;
    setCurrentIndex: (index: number) => void;
    nextImage: () => void;
    prevImage: () => void;
    toImage: (index: number) => void;
    hasNext: boolean;
    hasPrev: boolean;
    isNavigating: boolean;
};
export declare const useLightboxDrag: () => {
    isDragging: boolean;
    setDraggingFigure: (isDragging: boolean) => void;
    isAnyDragging: boolean;
};
export {};
//# sourceMappingURL=ComponentState.d.ts.map