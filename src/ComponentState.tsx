import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect,
  ReactNode,
  FC,
} from "react";
import { IImage } from "./utils/types";
import { debuginfo } from "./utils/log";
import {
  flipManipulation,
  handleReset,
  IPinnedState,
  rotateManipulation,
  zoomManipulation,
} from "./utils/manipulation";
import { PageCount } from "./components/StyledComponents";

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

export enum IImageViewMode {
  READER = "READER",
  IMAGE = "IMAGE",
}

export enum ILightboxImageType {
  IMAGE = "IMAGE",
  PDF = "PDF",
  UNINITIALISED = "UNINITIALISED",
}

// State interface for the entire lightbox component
export interface ILightboxState {
  // Figure sources:
  images: IImage[];
  pdfDocumentSrc: string;

  // Figure state:
  pageCount: number;
  currentIndex: number;
  currentIndexIsPinned: boolean;
  figureManipulation: ILightboxManipulationState;
  pinnedFigureStates: Array<IPinnedState>;
  isDraggingFigure: boolean;

  // View mode flags
  sourceType: ILightboxImageType; // controls the type of image (IMAGE or PDF)
  viewMode: IImageViewMode; // controls how the images are displayed

  // UI configuration
  showThumbnails: boolean;
  isLoading: boolean;

  // Callbacks
  onCLickFigure?: () => void;
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
  // Basic figure manipulation methods
  | { type: "ZOOM_IN"; payload: null }
  | { type: "ZOOM_OUT"; payload: null }
  | { type: "ROTATE_LEFT"; payload: null }
  | { type: "ROTATE_RIGHT"; payload: null }
  | { type: "FLIP_VERTICAL"; payload: null }
  | { type: "FLIP_HORIZONTAL"; payload: null }

  // Setting view mode flags
  | { type: "UPDATE_VIEW_STATE"; payload: IImageViewMode }
  | { type: "SET_SOURCE_TYPE"; payload: ILightboxImageType }

  // Setting UI flags
  | { type: "SET_SHOW_THUMBNAILS"; payload: boolean }
  | { type: "SET_LOADING"; payload: boolean }

  // Setting overall lightbox state
  | { type: "SET_STATE"; payload: Partial<ILightboxState> }
  | { type: "RESET_ALL" }

  // Setting figure sources
  | { type: "SET_IMAGES"; payload: IImage[] }
  | { type: "SET_PDF_DOCUMENT"; payload: string }

  // Setting figure state
  | { type: "SET_PAGE_COUNT"; payload: number }
  | { type: "SET_CURRENT_INDEX"; payload: number }
  | {
      type: "UPDATE_FIGURE_STATE";
      payload: Partial<ILightboxManipulationState>;
    }
  | { type: "SET_DRAGGING"; payload: boolean }
  | { type: "RESET_IMAGE" }

  // Pinning figure states
  | { type: "PIN_FIGURE_STATE"; payload: IPinnedState }
  | { type: "UNPIN_FIGURE_STATE"; payload: number }
  | {
      type: "GO_TO_PINNED_FIGURE_STATE";
      payload: { index: number; updates: Partial<ILightboxManipulationState> };
    };

// Default state
const defaultState: ILightboxState = {
  // Figure sources:
  images: [],
  pdfDocumentSrc: "",

  // Figure state:
  currentIndex: 0,
  pageCount: 0,
  pinnedFigureStates: [],
  currentIndexIsPinned: false,

  // View mode flags:
  sourceType: ILightboxImageType.UNINITIALISED,
  viewMode: IImageViewMode.IMAGE,

  // Figure manipulation state
  isDraggingFigure: false,
  figureManipulation: {
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

  showThumbnails: false,
  isLoading: false,
};

// Reducer function for state mutations
function lightboxReducer(
  state: ILightboxState,
  action: LightboxAction
): ILightboxState {
  switch (action.type) {
    case "ZOOM_IN":
      debuginfo("Handling zoom in");
      const stateOnZoomIn = zoomManipulation(false, state.figureManipulation);
      return {
        ...state,
        figureManipulation: {
          ...state.figureManipulation,
          ...stateOnZoomIn,
        },
      };

    case "ZOOM_OUT":
      debuginfo("Handling zoom out");
      const stateOnZoomOut = zoomManipulation(true, state.figureManipulation);
      return {
        ...state,
        figureManipulation: {
          ...state.figureManipulation,
          ...stateOnZoomOut,
        },
      };

    case "ROTATE_LEFT":
      debuginfo("Handling rotate left");
      const stateOnRotateLeft = rotateManipulation(
        state.figureManipulation,
        false
      );
      return {
        ...state,
        figureManipulation: {
          ...state.figureManipulation,
          ...stateOnRotateLeft,
        },
      };

    case "ROTATE_RIGHT":
      debuginfo("Handling rotate right");
      const stateOnRotateRight = rotateManipulation(
        state.figureManipulation,
        true
      );
      return {
        ...state,
        figureManipulation: {
          ...state.figureManipulation,
          ...stateOnRotateRight,
        },
      };

    case "FLIP_HORIZONTAL":
      debuginfo("Handling flip horizontal");
      const stateOnFlipHorisontal = flipManipulation(
        state.figureManipulation,
        true
      );
      return {
        ...state,
        figureManipulation: {
          ...state.figureManipulation,
          ...stateOnFlipHorisontal,
        },
      };

    case "FLIP_VERTICAL":
      debuginfo("Handling flip vertical");
      const stateOnFlipVertical = flipManipulation(
        state.figureManipulation,
        false
      );
      return {
        ...state,
        figureManipulation: {
          ...state.figureManipulation,
          ...stateOnFlipVertical,
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

    case "SET_CURRENT_INDEX":
      return {
        ...state,
        currentIndexIsPinned: false,
        currentIndex: Math.max(0, Math.min(action.payload, state.pageCount - 1)),
      };

    case "SET_PAGE_COUNT":
      return {
        ...state,
        pageCount: action.payload,
      };

    case "UPDATE_VIEW_STATE":
      return {
        ...state,
        viewMode: action.payload,
        isDraggingFigure: false,
      };

    case "SET_SOURCE_TYPE":
      return {
        ...state,
        sourceType: action.payload,
        isDraggingFigure: false,
      };

    case "PIN_FIGURE_STATE":
      return {
        ...state,
        pinnedFigureStates: [...state.pinnedFigureStates, action.payload],
      };

    case "UNPIN_FIGURE_STATE":
      const unpinned = state.pinnedFigureStates.filter(
        (_pin, index) => index !== action.payload
      );
      return {
        ...state,
        pinnedFigureStates: unpinned,
      };

    case "UPDATE_FIGURE_STATE":
      return {
        ...state,
        figureManipulation: {
          ...state.figureManipulation,
          ...action.payload,
        },
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
        isDraggingFigure: action.payload,
      };

    case "RESET_IMAGE":
      debuginfo("Resetting image state");
      const stateOnImageReset = handleReset(state);
      return {
        ...state,
        isDraggingFigure: false,
        figureManipulation: {
          ...state.figureManipulation,
          ...stateOnImageReset,
        },
      };

    case "GO_TO_PINNED_FIGURE_STATE":
      debuginfo(`Going to pinned image at index: ${action.payload.index}`);
      const { index, updates } = action.payload;
      return {
        ...state,
        currentIndex: index,
        currentIndexIsPinned: true,
        figureManipulation: {
          ...state.figureManipulation,
          ...updates,
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

  // Convenience methods for common operations
  setState: (state: Partial<ILightboxState>) => void;
  setImages: (images: IImage[]) => void;

  setLoading: (isLoading: boolean) => void;

  zoomIn: () => void;
  zoomOut: () => void;

  rotateLeft: () => void;
  rotateRight: () => void;

  flipVertical: () => void;
  flipHorisontal: () => void;

  setCurrentIndex: (index: number) => void;
  updateFigureManipulation: (
    updates: Partial<ILightboxManipulationState>
  ) => void;

  goToPinnedFigure: (
    index: number,
    updates: Partial<ILightboxManipulationState>
  ) => void;

  setDraggingFigure: (isDragging: boolean) => void;

  resetMaipulationState: () => void;
  resetAll: () => void;

  updateViewState: (viewMode: IImageViewMode) => void;

  setSourceType: (sourceType: ILightboxImageType) => void;

  pinFigure: (state: IPinnedState) => void;
  unPinFigure: (imageIndex: number) => void;

  setPageCount: (pages: number) => void;
}

// Create context
const LightboxContext = createContext<ILightboxContext | undefined>(undefined);

// Provider component
interface ILightboxProviderProps {
  children: ReactNode;
  initialState?: Partial<ILightboxState>;
}

export const LightboxProvider: FC<ILightboxProviderProps> = ({
  children,
  initialState = {},
}) => {
  const [state, dispatch] = useReducer(lightboxReducer, {
    ...defaultState,
    ...initialState,
  });

  const setState = useCallback((newState: Partial<ILightboxState>) => {
    dispatch({ type: "SET_STATE", payload: newState });
  }, []);

  // Convenience methods
  const setImages = useCallback((images: IImage[]) => {
    dispatch({ type: "SET_IMAGES", payload: images });
  }, []);

  const setCurrentIndex = useCallback((index: number) => {
    dispatch({ type: "SET_CURRENT_INDEX", payload: index });
  }, []);

  const setPageCount = useCallback((pages: number) => {
    dispatch({ type: "SET_PAGE_COUNT", payload: pages });
  }, []);

  const updateFigureManipulation = useCallback(
    (updates: Partial<ILightboxManipulationState>) => {
      dispatch({ type: "UPDATE_FIGURE_STATE", payload: updates });
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

  const setDraggingFigure = useCallback((isDragging: boolean) => {
    dispatch({ type: "SET_DRAGGING", payload: isDragging });
  }, []);

  const resetMaipulationState = useCallback(() => {
    dispatch({ type: "RESET_IMAGE" });
  }, []);

  const resetAll = useCallback(() => {
    dispatch({ type: "RESET_ALL" });
  }, []);

  const updateViewState = useCallback((viewMode: IImageViewMode) => {
    debuginfo(`Updating view state to: ${viewMode}`);
    dispatch({ type: "UPDATE_VIEW_STATE", payload: viewMode });
    dispatch({ type: "RESET_IMAGE" });
  }, []);

  const setSourceType = useCallback((sourceType: ILightboxImageType) => {
    debuginfo(`Updating view state to: ${sourceType}`);
    dispatch({ type: "SET_SOURCE_TYPE", payload: sourceType });
    dispatch({ type: "RESET_IMAGE" });
  }, []);

  const pinFigure = useCallback((state: IPinnedState) => {
    debuginfo(`Pinning image at index: ${state.imageIndex}`);
    dispatch({ type: "PIN_FIGURE_STATE", payload: state });
  }, []);

  const unPinFigure = useCallback((imageIndex: number) => {
    debuginfo(`Unpinning image at index: ${imageIndex}`);
    dispatch({ type: "UNPIN_FIGURE_STATE", payload: imageIndex });
  }, []);

  const setLoading = useCallback((isLoading: boolean) => {
    debuginfo(`Setting loading state to: ${isLoading}`);
    dispatch({ type: "SET_LOADING", payload: isLoading });
  }, []);

  const goToPinnedFigure = useCallback(
    (index: number, updates: Partial<ILightboxManipulationState>) => {
      debuginfo(`Going to pinned image at index: ${index}`);
      dispatch({
        type: "GO_TO_PINNED_FIGURE_STATE",
        payload: { index, updates },
      });
    },
    []
  );

  const contextValue = {
    state,
    dispatch,
    setState,
    setImages,
    setCurrentIndex,
    zoomIn,
    zoomOut,
    flipVertical,
    flipHorisontal,
    rotateLeft,
    rotateRight,
    updateFigureManipulation,
    setDraggingFigure,
    resetMaipulationState,
    resetAll,
    updateViewState,
    goToPinnedFigure,
    pinFigure,
    unPinFigure,
    setLoading,
    setSourceType,
    setPageCount,
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
  const { images, currentIndex } = state;
  return images[currentIndex];
};

export const useCallbackMethods = () => {
  const { state } = useLightboxState();
  const {
    onCLickFigure,
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
    onCLickFigure,
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
  const { state, setImages, setCurrentIndex } = useLightboxState();
  return {
    images: state.images,
    currentIndex: state.currentIndex,
    pageCount: state.pageCount,
    currentFigureData: state.images[state.currentIndex],
    setImages,
    setCurrentIndex,
    nextImage: () => setCurrentIndex(state.currentIndex + 1),
    prevImage: () => setCurrentIndex(state.currentIndex - 1),
    toImage: (index: number) => setCurrentIndex(index),
    hasNext: state.currentIndex < state.images.length - 1,
    hasPrev: state.currentIndex > 0,
  };
};

export const useLightboxManipulationState = () => {
  const { state, updateFigureManipulation, resetMaipulationState } =
    useLightboxState();
  return {
    manipulationState: state.figureManipulation,
    updateFigureManipulation,
    resetMaipulationState,
    isLoaded: state.figureManipulation.imageLoaded,
    hasError: !!state.figureManipulation.error,
  };
};

export const useLightboxDrag = () => {
  const { state, setDraggingFigure } = useLightboxState();
  return {
    isDragging: state.isDraggingFigure,
    setDraggingFigure,
    isAnyDragging: state.isDraggingFigure,
  };
};
