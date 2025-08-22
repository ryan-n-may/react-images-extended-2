import { ReactNode, FC } from "react";
import { IImage } from "./utils/types";
import { IPinnedState } from "./utils/manipulation";
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
export interface ILightboxState {
    images: IImage[];
    pdfDocumentSrc: string;
    pageCount: number;
    currentIndex: number;
    currentIndexIsPinned: boolean;
    figureManipulation: ILightboxManipulationState;
    pinnedFigureStates: Array<IPinnedState>;
    isDraggingFigure: boolean;
    sourceType: ILightboxImageType;
    viewMode: IImageViewMode;
    showThumbnails: boolean;
    resetImageOnLoad: boolean;
    holdZoomDelay: number;
    holdZoomInternal: number;
    isLoading: boolean;
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
    type: "UPDATE_VIEW_STATE";
    payload: IImageViewMode;
} | {
    type: "SET_SOURCE_TYPE";
    payload: ILightboxImageType;
} | {
    type: "SET_SHOW_THUMBNAILS";
    payload: boolean;
} | {
    type: "SET_LOADING";
    payload: boolean;
} | {
    type: "SET_STATE";
    payload: Partial<ILightboxState>;
} | {
    type: "RESET_ALL";
} | {
    type: "SET_IMAGES";
    payload: IImage[];
} | {
    type: "SET_PDF_DOCUMENT";
    payload: string;
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
} | {
    type: "PIN_FIGURE_STATE";
    payload: IPinnedState;
} | {
    type: "UNPIN_FIGURE_STATE";
    payload: number;
} | {
    type: "GO_TO_PINNED_FIGURE_STATE";
    payload: {
        index: number;
        updates: Partial<ILightboxManipulationState>;
    };
};
export interface ILightboxContext {
    state: ILightboxState;
    dispatch: React.Dispatch<LightboxAction>;
    setState: (state: Partial<ILightboxState>) => void;
    setImages: (images: IImage[]) => void;
    setLoading: (isLoading: boolean) => void;
    zoomIn: () => void;
    zoomOut: () => void;
    zoomInToPoint: (position: {
        x: number;
        y: number;
    }) => void;
    zoomInToFactor: (notch: number) => void;
    rotateLeft: () => void;
    rotateRight: () => void;
    flipVertical: () => void;
    flipHorisontal: () => void;
    setCurrentIndex: (index: number) => void;
    updateFigureManipulation: (updates: Partial<ILightboxManipulationState>) => void;
    goToPinnedFigure: (index: number, updates: Partial<ILightboxManipulationState>) => void;
    setDraggingFigure: (isDragging: boolean) => void;
    resetMaipulationState: () => void;
    resetAll: () => void;
    updateViewState: (viewMode: IImageViewMode) => void;
    setSourceType: (sourceType: ILightboxImageType) => void;
    pinFigure: (state: IPinnedState) => void;
    unPinFigure: (imageIndex: number) => void;
    setPageCount: (pages: number) => void;
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
    images: IImage[];
    currentIndex: number;
    pageCount: number;
    currentFigureData: IImage;
    setImages: (images: IImage[]) => void;
    setCurrentIndex: (index: number) => void;
    nextImage: () => void;
    prevImage: () => void;
    toImage: (index: number) => void;
    hasNext: boolean;
    hasPrev: boolean;
};
export declare const useLightboxManipulationState: () => {
    manipulationState: ILightboxManipulationState;
    updateFigureManipulation: (updates: Partial<ILightboxManipulationState>) => void;
    resetMaipulationState: () => void;
    isLoaded: boolean;
    hasError: boolean;
};
export declare const useLightboxDrag: () => {
    isDragging: boolean;
    setDraggingFigure: (isDragging: boolean) => void;
    isAnyDragging: boolean;
};
export {};
//# sourceMappingURL=ComponentState.d.ts.map