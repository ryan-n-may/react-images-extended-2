"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLightboxDrag = exports.useLightboxImageState = exports.useLightboxImages = exports.useCallbackMethods = exports.useCurrentImage = exports.useLightboxState = exports.useSetupState = exports.LightboxProvider = exports.IImageViewMode = exports.ActionType = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const log_1 = require("./utils/log");
const manipulation_1 = require("./utils/manipulation");
var ActionType;
(function (ActionType) {
    ActionType["CLOSE"] = "CLOSE";
    ActionType["NEXT"] = "NEXT";
    ActionType["PREVIOUS"] = "PREVIOUS";
    ActionType["ZOOM_IN"] = "ZOOM_IN";
    ActionType["ZOOM_OUT"] = "ZOOM_OUT";
    ActionType["ROTATE_LEFT"] = "ROTATE_LEFT";
    ActionType["ROTATE_RIGHT"] = "ROTATE_RIGHT";
    ActionType["FLIP_VERTICAL"] = "FLIP_VERTICAL";
    ActionType["FLIP_HORIZONTAL"] = "FLIP_HORIZONTAL";
    ActionType["RESET_IMAGE"] = "RESET_IMAGE";
    ActionType["SAVE"] = "SAVE";
})(ActionType || (exports.ActionType = ActionType = {}));
var IImageViewMode;
(function (IImageViewMode) {
    IImageViewMode["READER"] = "READER";
    IImageViewMode["IMAGE"] = "IMAGE";
})(IImageViewMode || (exports.IImageViewMode = IImageViewMode = {}));
// Default state
const defaultState = {
    images: [],
    currentImage: 0,
    viewMode: IImageViewMode.IMAGE,
    pinnedImages: [],
    currentImageIsPinned: false,
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
    showThumbnails: false,
    isLoading: false,
    isDraggingImage: false,
};
// Reducer function for state mutations
function lightboxReducer(state, action) {
    switch (action.type) {
        case "ZOOM_IN":
            (0, log_1.debuginfo)("Handling zoom in");
            const stateOnZoomIn = (0, manipulation_1.zoomManipulation)(false, state.imageState);
            return Object.assign(Object.assign({}, state), { imageState: Object.assign(Object.assign({}, state.imageState), stateOnZoomIn) });
        case "ZOOM_OUT":
            (0, log_1.debuginfo)("Handling zoom out");
            const stateOnZoomOut = (0, manipulation_1.zoomManipulation)(true, state.imageState);
            return Object.assign(Object.assign({}, state), { imageState: Object.assign(Object.assign({}, state.imageState), stateOnZoomOut) });
        case "ROTATE_LEFT":
            (0, log_1.debuginfo)("Handling rotate left");
            const stateOnRotateLeft = (0, manipulation_1.rotateManipulation)(state.imageState, false);
            return Object.assign(Object.assign({}, state), { imageState: Object.assign(Object.assign({}, state.imageState), stateOnRotateLeft) });
        case "ROTATE_RIGHT":
            (0, log_1.debuginfo)("Handling rotate right");
            const stateOnRotateRight = (0, manipulation_1.rotateManipulation)(state.imageState, true);
            return Object.assign(Object.assign({}, state), { imageState: Object.assign(Object.assign({}, state.imageState), stateOnRotateRight) });
        case "FLIP_HORIZONTAL":
            (0, log_1.debuginfo)("Handling flip horizontal");
            const stateOnFlipHorisontal = (0, manipulation_1.flipManipulation)(state.imageState, true);
            return Object.assign(Object.assign({}, state), { imageState: Object.assign(Object.assign({}, state.imageState), stateOnFlipHorisontal) });
        case "FLIP_VERTICAL":
            (0, log_1.debuginfo)("Handling flip vertical");
            const stateOnFlipVertical = (0, manipulation_1.flipManipulation)(state.imageState, false);
            return Object.assign(Object.assign({}, state), { imageState: Object.assign(Object.assign({}, state.imageState), stateOnFlipVertical) });
        case "SET_STATE":
            return Object.assign(Object.assign({}, state), action.payload);
        case "SET_IMAGES":
            return Object.assign(Object.assign({}, state), { images: action.payload });
        case "SET_CURRENT_IMAGE":
            return Object.assign(Object.assign({}, state), { currentImageIsPinned: false, currentImage: Math.max(0, Math.min(action.payload, state.images.length - 1)) });
        case "UPDATE_VIEW_STATE":
            return Object.assign(Object.assign({}, state), { viewMode: action.payload, isDraggingImage: false });
        case "PIN_IMAGE":
            return Object.assign(Object.assign({}, state), { pinnedImages: [...state.pinnedImages, action.payload] });
        case "UN_PIN_IMAGE":
            const unpinned = state.pinnedImages.filter((_pin, index) => index !== action.payload);
            return Object.assign(Object.assign({}, state), { pinnedImages: unpinned });
        case "UPDATE_IMAGE_STATE":
            return Object.assign(Object.assign({}, state), { imageState: Object.assign(Object.assign({}, state.imageState), action.payload) });
        case "SET_SHOW_THUMBNAILS":
            return Object.assign(Object.assign({}, state), { showThumbnails: action.payload });
        case "SET_LOADING":
            return Object.assign(Object.assign({}, state), { isLoading: action.payload });
        case "SET_DRAGGING":
            return Object.assign(Object.assign({}, state), { isDraggingImage: action.payload });
        case "RESET_IMAGE":
            (0, log_1.debuginfo)("Resetting image state");
            const stateOnImageReset = (0, manipulation_1.handleReset)(state);
            return Object.assign(Object.assign({}, state), { isDraggingImage: false, imageState: Object.assign(Object.assign({}, state.imageState), stateOnImageReset) });
        case "GO_TO_PINNED_IMAGE":
            (0, log_1.debuginfo)(`Going to pinned image at index: ${action.payload.index}`);
            const { index, updates } = action.payload;
            return Object.assign(Object.assign({}, state), { currentImage: index, currentImageIsPinned: true, imageState: Object.assign(Object.assign({}, state.imageState), updates) });
        case "RESET_ALL":
            return defaultState;
        default:
            return state;
    }
}
// Create context
const LightboxContext = (0, react_1.createContext)(undefined);
const LightboxProvider = ({ children, initialState = {}, }) => {
    const [state, dispatch] = (0, react_1.useReducer)(lightboxReducer, Object.assign(Object.assign({}, defaultState), initialState));
    const setState = (0, react_1.useCallback)((newState) => {
        dispatch({ type: "SET_STATE", payload: newState });
    }, []);
    // Convenience methods
    const setImages = (0, react_1.useCallback)((images) => {
        dispatch({ type: "SET_IMAGES", payload: images });
    }, []);
    const setCurrentImage = (0, react_1.useCallback)((index) => {
        dispatch({ type: "SET_CURRENT_IMAGE", payload: index });
    }, []);
    const updateImageState = (0, react_1.useCallback)((updates) => {
        dispatch({ type: "UPDATE_IMAGE_STATE", payload: updates });
    }, []);
    const zoomIn = (0, react_1.useCallback)(() => {
        (0, log_1.debuginfo)("Zoom in callback triggered");
        dispatch({ type: "ZOOM_IN", payload: null });
    }, []);
    const zoomOut = (0, react_1.useCallback)(() => {
        (0, log_1.debuginfo)("Zoom out callback triggered");
        dispatch({ type: "ZOOM_OUT", payload: null });
    }, []);
    const rotateLeft = (0, react_1.useCallback)(() => {
        (0, log_1.debuginfo)("Rotate left callback triggered");
        dispatch({ type: "ROTATE_LEFT", payload: null });
    }, []);
    const flipVertical = (0, react_1.useCallback)(() => {
        (0, log_1.debuginfo)("Flip vertical callback triggered");
        dispatch({ type: "FLIP_VERTICAL", payload: null });
    }, []);
    const flipHorisontal = (0, react_1.useCallback)(() => {
        (0, log_1.debuginfo)("Flip horisontal callback triggered");
        dispatch({ type: "FLIP_HORIZONTAL", payload: null });
    }, []);
    const rotateRight = (0, react_1.useCallback)(() => {
        (0, log_1.debuginfo)("Rotate right callback triggered");
        dispatch({ type: "ROTATE_RIGHT", payload: null });
    }, []);
    const setDraggingImage = (0, react_1.useCallback)((isDragging) => {
        dispatch({ type: "SET_DRAGGING", payload: isDragging });
    }, []);
    const resetImageState = (0, react_1.useCallback)(() => {
        dispatch({ type: "RESET_IMAGE" });
    }, []);
    const resetAll = (0, react_1.useCallback)(() => {
        dispatch({ type: "RESET_ALL" });
    }, []);
    const updateViewState = (0, react_1.useCallback)((viewMode) => {
        (0, log_1.debuginfo)(`Updating view state to: ${viewMode}`);
        dispatch({ type: "UPDATE_VIEW_STATE", payload: viewMode });
        dispatch({ type: "RESET_IMAGE" });
    }, []);
    const pinImage = (0, react_1.useCallback)((state) => {
        (0, log_1.debuginfo)(`Pinning image at index: ${state.imageIndex}`);
        dispatch({ type: "PIN_IMAGE", payload: state });
    }, []);
    const unPinImage = (0, react_1.useCallback)((imageIndex) => {
        (0, log_1.debuginfo)(`Unpinning image at index: ${imageIndex}`);
        dispatch({ type: "UN_PIN_IMAGE", payload: imageIndex });
    }, []);
    const setLoading = (0, react_1.useCallback)((isLoading) => {
        (0, log_1.debuginfo)(`Setting loading state to: ${isLoading}`);
        dispatch({ type: "SET_LOADING", payload: isLoading });
    }, []);
    const goToPinnedImage = (0, react_1.useCallback)((index, updates) => {
        (0, log_1.debuginfo)(`Going to pinned image at index: ${index}`);
        dispatch({ type: "GO_TO_PINNED_IMAGE", payload: { index, updates } });
    }, []);
    const contextValue = {
        state,
        dispatch,
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
        setDraggingImage,
        resetImageState,
        resetAll,
        updateViewState,
        goToPinnedImage,
        pinImage,
        unPinImage,
        setLoading,
    };
    return ((0, jsx_runtime_1.jsx)(LightboxContext.Provider, { value: contextValue, children: children }));
};
exports.LightboxProvider = LightboxProvider;
const useSetupState = (initialState) => {
    const context = (0, react_1.useContext)(LightboxContext);
    if (!context) {
        throw new Error("useInitialiseState must be used within a LightboxProvider");
    }
    // Only initialize once when the component mounts
    (0, react_1.useEffect)(() => {
        context.setState(initialState);
    }, []); // Empty dependency array ensures this only runs once
};
exports.useSetupState = useSetupState;
// Custom hook to use the lightbox context
const useLightboxState = () => {
    const context = (0, react_1.useContext)(LightboxContext);
    if (context === undefined) {
        throw new Error("useLightboxState must be used within a LightboxProvider");
    }
    return context;
};
exports.useLightboxState = useLightboxState;
// Custom hooks for specific state slices
const useCurrentImage = () => {
    const { state } = (0, exports.useLightboxState)();
    const { images, currentImage } = state;
    return images[currentImage];
};
exports.useCurrentImage = useCurrentImage;
const useCallbackMethods = () => {
    const { state } = (0, exports.useLightboxState)();
    const { onClickImage, onClickNext, onClickPrev, onClose, onRotateLeft, onRotateRight, onZoomIn, onZoomOut, onSave, onClickThumbnail, } = state;
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
exports.useCallbackMethods = useCallbackMethods;
// Custom hooks for specific state slices
const useLightboxImages = () => {
    const { state, setImages, setCurrentImage } = (0, exports.useLightboxState)();
    return {
        images: state.images,
        currentImage: state.currentImage,
        currentImageData: state.images[state.currentImage],
        setImages,
        setCurrentImage,
        nextImage: () => setCurrentImage(state.currentImage + 1),
        prevImage: () => setCurrentImage(state.currentImage - 1),
        toImage: (index) => setCurrentImage(index),
        hasNext: state.currentImage < state.images.length - 1,
        hasPrev: state.currentImage > 0,
    };
};
exports.useLightboxImages = useLightboxImages;
const useLightboxImageState = () => {
    const { state, updateImageState, resetImageState } = (0, exports.useLightboxState)();
    return {
        imageState: state.imageState,
        updateImageState,
        resetImageState,
        isLoaded: state.imageState.imageLoaded,
        hasError: !!state.imageState.error,
    };
};
exports.useLightboxImageState = useLightboxImageState;
const useLightboxDrag = () => {
    const { state, setDraggingImage } = (0, exports.useLightboxState)();
    return {
        isDragging: state.isDraggingImage,
        setDraggingImage,
        isAnyDragging: state.isDraggingImage,
    };
};
exports.useLightboxDrag = useLightboxDrag;
