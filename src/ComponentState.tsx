import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import { IImage } from "./utils/types";
import { debuginfo } from "./utils/log";
import {
  flipManipulation,
  handleReset,
  rotateManipulation,
  zoomManipulation,
} from "./utils/manipulation";

export interface ILightboxPipState {
  left: number;
  top: number;
  width: number;
  height: number;
}

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

export enum ActionType {
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

  SAVE = "SAVE",

  TOGGLE_PIP = "TOGGLE_PIP",
  TOGGLE_FULLSCREEN = "TOGGLE_FULLSCREEN",
}

export enum LightboxDisplayMode {
  FULLSCREEN = "fullscreen",
  COMPONENT = "component",
  PIP = "pip",
}

// State interface for the entire lightbox component
export interface ILightboxState {
  // Image state
  images: IImage[];
  currentImage: number;
  imageState: ILightboxImageState;

  // Display mode
  displayMode: LightboxDisplayMode;

  // UI state
  showThumbnails: boolean;
  isLoading: boolean;

  // Drag state
  isDraggingImage: boolean;

  pipPosition: { left: number; top: number };

  // Callbacks

  onClickImage?: () => void;
  onClickNext?: () => void;
  onClickPrev?: () => void;
  onClickThumbnail?: () => void;

  onClose?: () => void;

  onRotateLeft?: () => void;
  onRotateRight?: () => void;

  onZoomIn?: () => void;
  onZoomOut?: () => void;

  onSave?: (
    currentImage: number,
    state: { zoom: number; rotation: number }
  ) => void;
}

// Action types for state mutations
export type LightboxAction =
  | { type: "ZOOM_IN"; payload: null }
  | { type: "ZOOM_OUT"; payload: null }
  | { type: "ROTATE_LEFT"; payload: null }
  | { type: "ROTATE_RIGHT"; payload: null }
  | { type: "FLIP_VERTICAL"; payload: null }
  | { type: "FLIP_HORIZONTAL"; payload: null }
  | { type: "SET_STATE"; payload: Partial<ILightboxState> }
  | { type: "SET_IMAGES"; payload: IImage[] }
  | { type: "SET_CURRENT_IMAGE"; payload: number }
  | { type: "UPDATE_IMAGE_STATE"; payload: Partial<ILightboxImageState> }
  | { type: "UPDATE_IMAGE_STATE_LOADED"; payload: { imageLoaded: boolean } }
  | { type: "SET_DISPLAY_MODE_PIP"; payload: LightboxDisplayMode }
  | { type: "SET_DISPLAY_MODE_FS"; payload: LightboxDisplayMode }
  | { type: "SET_PIP_POSITION"; payload: { left: number; top: number } }
  | { type: "SET_SHOW_THUMBNAILS"; payload: boolean }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_DRAGGING"; payload: boolean }
  | { type: "SET_DRAGGING_PIP"; payload: boolean }
  | {
      type: "RESET_IMAGE_STATE";
      payload: { widthRef: number; heightRef: number };
    }
  | { type: "RESET_ALL" };

// Default state
const defaultState: ILightboxState = {
  images: [],
  currentImage: 0,
  imageState: {
    imageLoaded: false,
    error: null,
    left: 0,
    top: 15,
    width: 0,
    height: 0,
    rotate: 0,
    imageWidth: 0,
    imageHeight: 0,
    scaleX: 1,
    scaleY: 1,
  },
  pipPosition: { left: 0, top: 0 },
  displayMode: LightboxDisplayMode.FULLSCREEN,
  showThumbnails: false,
  isLoading: false,
  isDraggingImage: false,
};

// Reducer function for state mutations
function lightboxReducer(
  state: ILightboxState,
  action: LightboxAction
): ILightboxState {
  switch (action.type) {
    case "ZOOM_IN":
      debuginfo("Handling zoom in");
      const stateOnZoomIn = zoomManipulation(false, state.imageState);
      return {
        ...state,
        imageState: {
          ...state.imageState,
          ...stateOnZoomIn,
        },
      };

    case "ZOOM_OUT":
      debuginfo("Handling zoom out");
      const stateOnZoomOut = zoomManipulation(true, state.imageState);
      return {
        ...state,
        imageState: {
          ...state.imageState,
          ...stateOnZoomOut,
        },
      };

    case "ROTATE_LEFT":
      debuginfo("Handling rotate left");
      const stateOnRotateLeft = rotateManipulation(state.imageState, false);
      return {
        ...state,
        imageState: {
          ...state.imageState,
          ...stateOnRotateLeft,
        },
      };

    case "ROTATE_RIGHT":
      debuginfo("Handling rotate right");
      const stateOnRotateRight = rotateManipulation(state.imageState, true);
      return {
        ...state,
        imageState: {
          ...state.imageState,
          ...stateOnRotateRight,
        },
      };

    case "FLIP_HORIZONTAL":
      debuginfo("Handling flip horizontal");
      const stateOnFlipHorisontal = flipManipulation(state.imageState, true);
      return {
        ...state,
        imageState: {
          ...state.imageState,
          ...stateOnFlipHorisontal,
        },
      };

    case "FLIP_VERTICAL":
      debuginfo("Handling flip vertical");
      const stateOnFlipVertical = flipManipulation(state.imageState, false);
      return {
        ...state,
        imageState: {
          ...state.imageState,
          ...stateOnFlipVertical,
        },
      };

    case "SET_PIP_POSITION":
      return {
        ...state,
        pipPosition: {
          left: action.payload.left,
          top: action.payload.top,
        },
      };

    case "SET_STATE":
      return {
        ...state,
        ...action.payload,
      };

    case "SET_IMAGES":
      return {
        ...state,
        images: action.payload,
      };

    case "SET_CURRENT_IMAGE":
      return {
        ...state,
        currentImage: Math.max(
          0,
          Math.min(action.payload, state.images.length - 1)
        ),
      };

    case "UPDATE_IMAGE_STATE":
      return {
        ...state,
        imageState: {
          ...state.imageState,
          ...action.payload,
        },
      };

    case "UPDATE_IMAGE_STATE_LOADED":
      return {
        ...state,
        imageState: {
          ...state.imageState,
          imageLoaded: action.payload.imageLoaded,
        },
      };

    case "SET_DISPLAY_MODE_PIP":
      debuginfo("Setting display mode to PIP");
      return {
        ...state,
        displayMode: action.payload,
        imageState: {
          ...state.imageState,
          left: 0,
          top: 0,
        },
      };

    case "SET_DISPLAY_MODE_FS":
      return {
        ...state,
        displayMode: action.payload,
      };

    case "SET_SHOW_THUMBNAILS":
      return {
        ...state,
        showThumbnails: action.payload,
      };

    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };

    case "SET_DRAGGING":
      return {
        ...state,
        isDraggingImage: action.payload,
      };

    case "RESET_IMAGE_STATE":
      debuginfo("Resetting image state");
      const stateOnImageReset = handleReset(
        action.payload.widthRef,
        action.payload.heightRef,
        state.imageState.imageWidth,
        state.imageState.imageHeight
      );
      return {
        ...state,
        isDraggingImage: false,
        imageState: {
          ...state.imageState,
          ...stateOnImageReset,
        },
      };

    case "RESET_ALL":
      return defaultState;

    default:
      return state;
  }
}

// Context interface
export interface ILightboxContext {
  state: ILightboxState;
  dispatch: React.Dispatch<LightboxAction>;

  setPiPPosition: (left: number, top: number) => void;
  // Convenience methods for common operations
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

  setDisplayMode: (mode: LightboxDisplayMode) => void;
  setDraggingImage: (isDragging: boolean) => void;

  resetImageState: (widthRef: number, heightRed: number) => void;
  resetAll: () => void;
}

// Create context
const LightboxContext = createContext<ILightboxContext | undefined>(undefined);

// Provider component
interface ILightboxProviderProps {
  children: ReactNode;
  initialState?: Partial<ILightboxState>;
}

export const LightboxProvider: React.FC<ILightboxProviderProps> = ({
  children,
  initialState = {},
}) => {
  const [state, dispatch] = useReducer(lightboxReducer, {
    ...defaultState,
    ...initialState,
  });

  const setPiPPosition = useCallback((left: number, top: number) => {
    dispatch({ type: "SET_PIP_POSITION", payload: { left, top } });
  }, []);

  const setState = useCallback((newState: Partial<ILightboxState>) => {
    dispatch({ type: "SET_STATE", payload: newState });
  }, []);

  const setImageLoaded = useCallback((imageLoaded: boolean) => {
    dispatch({ type: "UPDATE_IMAGE_STATE_LOADED", payload: { imageLoaded } });
  }, []);

  // Convenience methods
  const setImages = useCallback((images: IImage[]) => {
    dispatch({ type: "SET_IMAGES", payload: images });
  }, []);

  const setCurrentImage = useCallback((index: number) => {
    dispatch({ type: "SET_CURRENT_IMAGE", payload: index });
  }, []);

  const updateImageState = useCallback(
    (updates: Partial<ILightboxImageState>) => {
      dispatch({ type: "UPDATE_IMAGE_STATE", payload: updates });
    },
    []
  );

  const zoomIn = useCallback(() => {
    debuginfo("Zoom in callback triggered");
    dispatch({ type: "ZOOM_IN", payload: null });
  }, []);

  const zoomOut = useCallback(() => {
    debuginfo("Zoom out callback triggered");
    dispatch({ type: "ZOOM_OUT", payload: null });
  }, []);

  const rotateLeft = useCallback(() => {
    debuginfo("Rotate left callback triggered");
    dispatch({ type: "ROTATE_LEFT", payload: null });
  }, []);

  const flipVertical = useCallback(() => {
    debuginfo("Flip vertical callback triggered");
    dispatch({ type: "FLIP_VERTICAL", payload: null });
  }, []);

  const flipHorisontal = useCallback(() => {
    debuginfo("Flip horisontal callback triggered");
    dispatch({ type: "FLIP_HORIZONTAL", payload: null });
  }, []);

  const rotateRight = useCallback(() => {
    debuginfo("Rotate right callback triggered");
    dispatch({ type: "ROTATE_RIGHT", payload: null });
  }, []);

  const setDisplayMode = useCallback((mode: LightboxDisplayMode) => {
    if (mode === LightboxDisplayMode.PIP)
      dispatch({ type: "SET_DISPLAY_MODE_PIP", payload: mode });
    else dispatch({ type: "SET_DISPLAY_MODE_FS", payload: mode });
  }, []);

  const setDraggingImage = useCallback((isDragging: boolean) => {
    dispatch({ type: "SET_DRAGGING", payload: isDragging });
  }, []);

  const resetImageState = useCallback((widthRef: number, heightRef: number) => {
    dispatch({ type: "RESET_IMAGE_STATE", payload: { widthRef, heightRef } });
  }, []);

  const resetAll = useCallback(() => {
    dispatch({ type: "RESET_ALL" });
  }, []);

  const contextValue = {
    state,
    dispatch,
    setPiPPosition,
    setState,
    setImages,
    setCurrentImage,
    zoomIn,
    zoomOut,
    flipVertical,
    flipHorisontal,
    rotateLeft,
    rotateRight,
    updateImageState,
    setImageLoaded,
    setDisplayMode,
    setDraggingImage,
    resetImageState,
    resetAll,
  };

  return (
    <LightboxContext.Provider value={contextValue}>
      {children}
    </LightboxContext.Provider>
  );
};

export const useSetupState = (initialState: Partial<ILightboxState>) => {
  const context = useContext(LightboxContext);
  if (!context) {
    throw new Error(
      "useInitialiseState must be used within a LightboxProvider"
    );
  }

  // Only initialize once when the component mounts
  useEffect(() => {
    context.setState(initialState);
  }, []); // Empty dependency array ensures this only runs once
};

// Custom hook to use the lightbox context
export const useLightboxState = (): ILightboxContext => {
  const context = useContext(LightboxContext);
  if (context === undefined) {
    throw new Error("useLightboxState must be used within a LightboxProvider");
  }
  return context;
};

// Custom hooks for specific state slices
export const useCurrentImage = () => {
  const { state } = useLightboxState();
  const { images, currentImage } = state;
  return images[currentImage];
};

export const useCallbackMethods = () => {
  const { state } = useLightboxState();
  const {
    onClickImage,
    onClickNext,
    onClickPrev,
    onClose,
    onRotateLeft,
    onRotateRight,
    onZoomIn,
    onZoomOut,
    onSave,
    onClickThumbnail,
  } = state;
  return {
    onClickImage,
    onClickNext,
    onClickPrev,
    onClose,
    onRotateLeft,
    onRotateRight,
    onZoomIn,
    onZoomOut,
    onSave,
    onClickThumbnail,
  };
};

// Custom hooks for specific state slices
export const useLightboxImages = () => {
  const { state, setImages, setCurrentImage } = useLightboxState();
  return {
    images: state.images,
    currentImage: state.currentImage,
    currentImageData: state.images[state.currentImage],
    setImages,
    setCurrentImage,
    nextImage: () => setCurrentImage(state.currentImage + 1),
    prevImage: () => setCurrentImage(state.currentImage - 1),
    toImage: (index: number) => setCurrentImage(index),
    hasNext: state.currentImage < state.images.length - 1,
    hasPrev: state.currentImage > 0,
  };
};

export const useLightboxImageState = () => {
  const { state, updateImageState, resetImageState } = useLightboxState();
  return {
    imageState: state.imageState,
    updateImageState,
    resetImageState,
    isLoaded: state.imageState.imageLoaded,
    hasError: !!state.imageState.error,
  };
};

export const useLightboxDisplay = () => {
  const { state, setDisplayMode } = useLightboxState();
  return {
    displayMode: state.displayMode,
    setDisplayMode,
    isFullscreen: state.displayMode === LightboxDisplayMode.FULLSCREEN,
    isPiP: state.displayMode === LightboxDisplayMode.PIP,
    isComponent: state.displayMode === LightboxDisplayMode.COMPONENT,
  };
};

export const useLightboxDrag = () => {
  const { state, setDraggingImage } = useLightboxState();
  return {
    isDragging: state.isDraggingImage,
    setDraggingImage,
    isAnyDragging: state.isDraggingImage,
  };
};
