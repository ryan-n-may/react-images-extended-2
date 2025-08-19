"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LightboxDPIP = exports.LightboxWrapper = exports.Lightbox = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Atoms_1 = require("./components/Atoms");
const Molecules_1 = require("./components/Molecules");
const Organisms_1 = require("./components/Organisms");
const constants_1 = require("./utils/constants");
const StyledComponents_1 = require("./components/StyledComponents");
const ComponentState_1 = require("./ComponentState");
const Draggable_1 = require("./components/Draggable");
const loadImage_1 = require("./hooks/loadImage");
const log_1 = require("./utils/log");
const usePip_1 = require("./hooks/usePip");
const Lightbox = (props) => {
    return ((0, jsx_runtime_1.jsx)(ComponentState_1.LightboxProvider, { children: (0, jsx_runtime_1.jsx)(LightboxWrapper, Object.assign({}, props)) }));
};
exports.Lightbox = Lightbox;
function LightboxWrapper(props) {
    // Might need to tweak requirements
    const { images, onClickImage, onClickNext, onClickPrev, onClose, onSave, showThumbnails, onClickThumbnail, } = props;
    // Memoize the initial state to prevent function reference changes
    const initialState = (0, react_1.useMemo)(() => ({
        showThumbnails,
        onClickThumbnail,
        onClickImage,
        onClickNext,
        onClickPrev,
        onClose,
        onSave,
        images: images || [],
        currentImage: 0, // Default to first image
    }), [
        showThumbnails,
        onClickThumbnail,
        onClickImage,
        onClickNext,
        onClickPrev,
        onClose,
        onSave,
        images,
    ]);
    // transfer props to state
    (0, ComponentState_1.useSetupState)(initialState);
    return (0, jsx_runtime_1.jsx)(LightboxFunctional, {});
}
exports.LightboxWrapper = LightboxWrapper;
function LightboxDPIP() {
    const lightboxState = (0, ComponentState_1.useLightboxState)();
    const { images, currentImage, showThumbnails } = lightboxState.state;
    const { imageState } = (0, ComponentState_1.useLightboxImageState)();
    const { imageLoaded } = imageState;
    // Refs to replace instance variables
    const footerHeightRef = (0, react_1.useRef)(constants_1.FOOTER_HEIGHT);
    const imageRef = (0, react_1.useRef)(null);
    (0, loadImage_1.useLoadImage)(footerHeightRef);
    const ImageElementFullscreen = (0, react_1.useMemo)(() => {
        (0, log_1.debuginfo)(`Rendering ImageElementFullscreen for currentImage: ${currentImage}`);
        if (!images[currentImage])
            return null;
        return (0, jsx_runtime_1.jsx)(Draggable_1.DraggableImageFullScreen, { imageRef: imageRef });
    }, [images, currentImage, imageRef]);
    const ImageCourasselFullscreen = (0, react_1.useMemo)(() => {
        (0, log_1.debuginfo)(`Rendering ImageCourassel for currentImage: ${currentImage}`);
        return (0, jsx_runtime_1.jsx)("figure", { children: ImageElementFullscreen });
    }, [ImageElementFullscreen]);
    // TO DO: keep the image position when resizing the PiP.... not implemented yet.
    //const { width: windowWidth, height: windowHeight } = useWindowSize(); // will update on window resize
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { className: "sticky top-0 z-10", children: (0, jsx_runtime_1.jsx)(Organisms_1.DefaultHeader, {}) }), imageLoaded && ((0, jsx_runtime_1.jsx)(StyledComponents_1.FigureContainerFullScreen, { children: ImageCourasselFullscreen })), !imageLoaded && (0, jsx_runtime_1.jsx)(Atoms_1.SpinnerAtom, {}), (0, jsx_runtime_1.jsx)("div", { className: "sticky bottom-0 z-10", children: showThumbnails && (0, jsx_runtime_1.jsx)(Molecules_1.ThumbnailsMolecule, { size: "sm" }) })] }));
}
exports.LightboxDPIP = LightboxDPIP;
const LightboxFunctional = () => {
    const lightboxState = (0, ComponentState_1.useLightboxState)();
    const { images, currentImage, showThumbnails } = lightboxState.state;
    const { imageState } = (0, ComponentState_1.useLightboxImageState)();
    const { imageLoaded } = imageState;
    // Refs to replace instance variables
    const footerHeightRef = (0, react_1.useRef)(constants_1.FOOTER_HEIGHT);
    const imageRef = (0, react_1.useRef)(null);
    (0, loadImage_1.useLoadImage)(footerHeightRef);
    const ImageElementFullscreen = (0, react_1.useMemo)(() => {
        (0, log_1.debuginfo)(`Rendering ImageElementFullscreen for currentImage: ${currentImage}`);
        if (!images[currentImage])
            return null;
        return ((0, jsx_runtime_1.jsx)(Draggable_1.DraggableImageFullScreen, { imageRef: imageRef }, "image-draggable-fullscreen"));
    }, [images, currentImage, imageRef]);
    const ImageCourasselFullscreen = (0, react_1.useMemo)(() => {
        (0, log_1.debuginfo)(`Rendering ImageCourassel for currentImage: ${currentImage}`);
        return ((0, jsx_runtime_1.jsx)("figure", { children: ImageElementFullscreen }, "image-courassel-fullscreen"));
    }, [ImageElementFullscreen]);
    const { open, close, isOpen } = (0, usePip_1.useDocumentPiP)();
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(Organisms_1.Modal, { hidden: false, children: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { className: "sticky top-0 z-10", children: (0, jsx_runtime_1.jsx)(Organisms_1.DefaultHeader, { pipControls: { open, close, isOpen } }, "default-header") }), imageLoaded && ((0, jsx_runtime_1.jsx)(StyledComponents_1.FigureContainerFullScreen, { children: ImageCourasselFullscreen }, "figure-container-fullscreen")), !imageLoaded && (0, jsx_runtime_1.jsx)(Atoms_1.SpinnerAtom, {}, "document-preview-spinner"), (0, jsx_runtime_1.jsx)("div", { className: "sticky bottom-0 z-10", children: showThumbnails && ((0, jsx_runtime_1.jsx)(Molecules_1.ThumbnailsMolecule, { size: "sm" }, "thumbnails")) })] }, "lightbox-fullscreen") }, "lightbox-fullscreen-modal") }));
};
