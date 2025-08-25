import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useReducer, useCallback, useEffect, useRef, } from "react";
import { debuginfo } from "./utils/log";
import { flipManipulation, handleReset, rotateManipulation, zoomManipulation } from "./utils/manipulation";
export var IImageViewMode;
(function (IImageViewMode) {
    IImageViewMode["READER"] = "READER";
    IImageViewMode["IMAGE"] = "IMAGE";
})(IImageViewMode || (IImageViewMode = {}));
export var ILightboxImageType;
(function (ILightboxImageType) {
    ILightboxImageType["IMAGE"] = "IMAGE";
    ILightboxImageType["PDF"] = "PDF";
    ILightboxImageType["UNINITIALISED"] = "UNINITIALISED";
})(ILightboxImageType || (ILightboxImageType = {}));
// Default state
const defaultState = {
    // Figure state:
    currentIndex: 0,
    pageCount: 0,
    figures: [],
    // View mode flags:
    viewMode: IImageViewMode.IMAGE,
    // Figure manipulation state
    isDraggingFigure: false,
    showThumbnails: false,
    resetImageOnLoad: true,
    holdZoomDelay: 250, // ms
    holdZoomInternal: 100, // ms
    isLoading: false,
    isNavigating: false,
    navigationDirection: null,
    isAnimating: false,
    windowRef: typeof window !== 'undefined' ? window : null,
};
// Reducer function for state mutations
function lightboxReducer(state, action) {
    const { figures, currentIndex } = state;
    const updatedFigures = [...figures];
    const currentFigure = figures[currentIndex];
    switch (action.type) {
        case "ZOOM_IN":
            const stateOnZoomIn = zoomManipulation(false, currentFigure);
            const updatedFigureZoomIn = {
                ...currentFigure,
                ...stateOnZoomIn,
            };
            updatedFigures[currentIndex] = updatedFigureZoomIn;
            return {
                ...state,
                figures: updatedFigures,
            };
        case "ZOOM_OUT":
            const stateOnZoomOut = zoomManipulation(true, currentFigure);
            const updatedFigureZoomOut = {
                ...currentFigure,
                ...stateOnZoomOut,
            };
            updatedFigures[currentIndex] = updatedFigureZoomOut;
            return {
                ...state,
                figures: updatedFigures,
            };
        case "ROTATE_LEFT":
            debuginfo("Handling rotate left");
            const stateOnRotateLeft = rotateManipulation(currentFigure, false);
            const updatedFigureOnRotateLeft = {
                ...currentFigure,
                ...stateOnRotateLeft,
            };
            updatedFigures[currentIndex] = updatedFigureOnRotateLeft;
            return {
                ...state,
                figures: updatedFigures,
            };
        case "ROTATE_RIGHT":
            debuginfo("Handling rotate right");
            const stateOnRotateRight = rotateManipulation(currentFigure, true);
            const updatedFigureOnRotateRight = {
                ...currentFigure,
                ...stateOnRotateRight,
            };
            updatedFigures[currentIndex] = updatedFigureOnRotateRight;
            return {
                ...state,
                figures: updatedFigures,
            };
        case "FLIP_HORIZONTAL":
            debuginfo("Handling flip horizontal");
            const stateOnFlipHorisontal = flipManipulation(currentFigure, true);
            const updatedFigureOnFlipHorisontal = {
                ...currentFigure,
                ...stateOnFlipHorisontal,
            };
            updatedFigures[currentIndex] = updatedFigureOnFlipHorisontal;
            return {
                ...state,
                figures: updatedFigures,
            };
        case "FLIP_VERTICAL":
            debuginfo("Handling flip vertical");
            const stateOnFlipVertical = flipManipulation(currentFigure, false);
            const updatedFigureOnFlipVertical = {
                ...currentFigure,
                ...stateOnFlipVertical,
            };
            updatedFigures[currentIndex] = updatedFigureOnFlipVertical;
            return {
                ...state,
                figures: updatedFigures,
            };
        case "SET_STATE":
            return {
                ...state,
                ...action.payload,
            };
        case "SET_FIGURES":
            return {
                ...state,
                figures: action.payload,
            };
        case "SET_CURRENT_INDEX":
            const newIndex = Math.max(0, Math.min(action.payload, state.pageCount - 1));
            // Only update if index actually changes
            if (newIndex === state.currentIndex) {
                return state; // No change needed
            }
            // Determine animation direction
            const direction = newIndex > state.currentIndex ? 'right' : 'left';
            const updatedFiguresOnIndexChange = [...state.figures];
            const currentFigureOnIndexChange = state.figures[state.currentIndex];
            const updatedFigureOnIndexChange = { ...currentFigureOnIndexChange, imageLoaded: false };
            updatedFiguresOnIndexChange[state.currentIndex] = updatedFigureOnIndexChange;
            return {
                ...state,
                currentIndex: newIndex,
                figures: updatedFiguresOnIndexChange,
                isNavigating: true, // Set navigating state when changing images
                navigationDirection: direction,
                isAnimating: true, // Start animation when changing images
            };
        case "SET_PAGE_COUNT":
            return {
                ...state,
                pageCount: action.payload,
            };
        case "UPDATE_FIGURE_STATE":
            const updatedFigure = {
                ...currentFigure,
                ...action.payload,
            };
            const updatedFiguresList = [...state.figures];
            updatedFiguresList[state.currentIndex] = updatedFigure;
            return {
                ...state,
                figures: updatedFiguresList,
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
        case "SET_NAVIGATING":
            return {
                ...state,
                isNavigating: action.payload,
            };
        case "SET_ANIMATION_STATE":
            return {
                ...state,
                isAnimating: action.payload.isAnimating,
                navigationDirection: action.payload.direction || state.navigationDirection,
            };
        case "SET_WINDOW_REF":
            return {
                ...state,
                windowRef: action.payload,
            };
        case "SET_DRAGGING":
            return {
                ...state,
                isDraggingFigure: action.payload,
            };
        case "RESET_IMAGE":
            debuginfo("Resetting image state");
            const updatedFigureOnReset = {
                ...currentFigure,
            };
            const updatedFigurePostReset = handleReset(updatedFigureOnReset);
            const updatedFiguresListOnReset = [...state.figures];
            updatedFiguresListOnReset[state.currentIndex] = {
                ...currentFigure,
                ...updatedFigurePostReset,
            };
            return {
                ...state,
                figures: updatedFiguresListOnReset,
            };
        case "RESET_ALL":
            return defaultState;
        default:
            return state;
    }
}
// Create context
const LightboxContext = createContext(undefined);
export const LightboxProvider = ({ children, initialState = {}, }) => {
    const [state, dispatch] = useReducer(lightboxReducer, {
        ...defaultState,
        ...initialState,
    });
    const setState = useCallback((newState) => {
        dispatch({ type: "SET_STATE", payload: newState });
    }, []);
    // Convenience methods
    const setFigures = useCallback((figures) => {
        dispatch({ type: "SET_FIGURES", payload: figures });
    }, []);
    const setCurrentIndex = useCallback((index) => {
        dispatch({ type: "SET_CURRENT_INDEX", payload: index });
    }, []);
    const setPageCount = useCallback((pages) => {
        dispatch({ type: "SET_PAGE_COUNT", payload: pages });
    }, []);
    const updateFigureManipulation = useCallback((updates) => {
        dispatch({ type: "UPDATE_FIGURE_STATE", payload: updates });
    }, []);
    const zoomIn = useCallback(() => {
        dispatch({ type: "ZOOM_IN", payload: null });
    }, []);
    const zoomOut = useCallback(() => {
        debuginfo("Zoom out callback triggered");
        dispatch({ type: "ZOOM_OUT", payload: null });
    }, []);
    const zoomInToFactor = useCallback((notch) => {
        dispatch({ type: "ZOOM_TO_FACTOR", payload: notch });
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
    const setDraggingFigure = useCallback((isDragging) => {
        dispatch({ type: "SET_DRAGGING", payload: isDragging });
    }, []);
    const setNavigating = useCallback((isNavigating) => {
        dispatch({ type: "SET_NAVIGATING", payload: isNavigating });
    }, []);
    const setAnimationState = useCallback((isAnimating, direction) => {
        dispatch({ type: "SET_ANIMATION_STATE", payload: { isAnimating, direction } });
    }, []);
    const setWindowRef = useCallback((windowRef) => {
        dispatch({ type: "SET_WINDOW_REF", payload: windowRef });
    }, []);
    const resetMaipulationState = useCallback(() => {
        dispatch({ type: "RESET_IMAGE" });
    }, []);
    const resetAll = useCallback(() => {
        dispatch({ type: "RESET_ALL" });
    }, []);
    const setLoading = useCallback((isLoading) => {
        debuginfo(`Setting loading state to: ${isLoading}`);
        dispatch({ type: "SET_LOADING", payload: isLoading });
    }, []);
    const contextValue = {
        state,
        dispatch,
        setState,
        setFigures,
        setCurrentIndex,
        zoomIn,
        zoomOut,
        zoomInToFactor,
        flipVertical,
        flipHorisontal,
        rotateLeft,
        rotateRight,
        updateFigureManipulation,
        setDraggingFigure,
        setNavigating,
        setAnimationState,
        setWindowRef,
        resetMaipulationState,
        resetAll,
        setLoading,
        setPageCount,
    };
    return (_jsx(LightboxContext.Provider, { value: contextValue, children: children }));
};
export const useSetupState = (initialState) => {
    const context = useContext(LightboxContext);
    if (!context) {
        throw new Error("useInitialiseState must be used within a LightboxProvider");
    }
    // Only initialize once when the component mounts
    useEffect(() => {
        context.setState(initialState);
    }, []); // Empty dependency array ensures this only runs once
};
// Custom hook to use the lightbox context
export const useLightboxState = () => {
    const context = useContext(LightboxContext);
    if (context === undefined) {
        throw new Error("useLightboxState must be used within a LightboxProvider");
    }
    return context;
};
// Custom hooks for specific state slices
export const useCurrentFigure = () => {
    const { state } = useLightboxState();
    const { figures, currentIndex } = state;
    return figures[currentIndex];
};
export const useCallbackMethods = () => {
    const { state } = useLightboxState();
    const { onCLickFigure, onClickNext, onClickPrev, onClose, onRotateLeft, onRotateRight, onZoomIn, onZoomOut, onSave, onClickThumbnail, } = state;
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
    const { state, setCurrentIndex, setNavigating } = useLightboxState();
    // Create a ref to track navigation cooldown
    const navigationCooldownRef = useRef(null);
    // Clear any existing cooldown when component unmounts
    useEffect(() => {
        return () => {
            if (navigationCooldownRef.current) {
                clearTimeout(navigationCooldownRef.current);
            }
        };
    }, []);
    // Safe navigation function with aggressive protection
    const navigate = (direction) => {
        const currentFigure = state.figures[state.currentIndex];
        const hasNext = state.currentIndex < state.figures.length - 1;
        const hasPrev = state.currentIndex > 0;
        // Multiple layers of protection
        if (state.isNavigating || // Already navigating
            !currentFigure?.imageLoaded || // Current image not loaded
            navigationCooldownRef.current || // Still in cooldown period
            (direction === 'next' && !hasNext) || // No next image
            (direction === 'prev' && !hasPrev) // No previous image
        ) {
            return;
        }
        // Set navigation lock
        setNavigating(true);
        // Set cooldown period
        navigationCooldownRef.current = setTimeout(() => {
            navigationCooldownRef.current = null;
        }, 300); // 300ms cooldown between navigations
        // Execute navigation
        const newIndex = direction === 'next'
            ? state.currentIndex + 1
            : state.currentIndex - 1;
        setCurrentIndex(newIndex);
    };
    const nextImage = () => navigate('next');
    const prevImage = () => navigate('prev');
    return {
        figures: state.figures,
        currentIndex: state.currentIndex,
        pageCount: state.pageCount,
        currentFigureData: state.figures[state.currentIndex],
        setFigures: () => { }, // placeholder
        setCurrentIndex,
        nextImage,
        prevImage,
        toImage: (index) => {
            // Direct index navigation should also be protected
            const currentFigure = state.figures[state.currentIndex];
            if (!state.isNavigating && currentFigure?.imageLoaded && !navigationCooldownRef.current) {
                setNavigating(true);
                navigationCooldownRef.current = setTimeout(() => {
                    navigationCooldownRef.current = null;
                }, 300);
                setCurrentIndex(index);
            }
        },
        hasNext: state.currentIndex < state.figures.length - 1,
        hasPrev: state.currentIndex > 0,
        isNavigating: state.isNavigating,
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
