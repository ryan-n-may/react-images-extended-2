"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LightboxWrapper = exports.Lightbox = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Atoms_1 = require("./components/Atoms");
const Molecules_1 = require("./components/Molecules");
const Organisms_1 = require("./components/Organisms");
const constants_1 = require("./utils/constants");
const StyledComponents_1 = require("./components/StyledComponents");
const react_2 = require("@chakra-ui/react");
const ComponentState_1 = require("./ComponentState");
const Draggable_1 = require("./components/Draggable");
const loadImage_1 = require("./hooks/loadImage");
const containerDims_1 = require("./hooks/containerDims");
const log_1 = require("./utils/log");
const pip_1 = require("./utils/pip");
const Lightbox = (props) => {
    return ((0, jsx_runtime_1.jsx)(ComponentState_1.LightboxProvider, { children: (0, jsx_runtime_1.jsx)(exports.LightboxWrapper, Object.assign({}, props)) }));
};
exports.Lightbox = Lightbox;
const LightboxWrapper = (props) => {
    // Might need to tweak requirements
    const { images, onClickImage, onClickNext, onClickPrev, onClose, onSave, showThumbnails, onClickThumbnail, displayMode = ComponentState_1.LightboxDisplayMode.FULLSCREEN, } = props;
    // transfer props to state
    (0, ComponentState_1.useSetupState)({
        showThumbnails,
        onClickThumbnail,
        onClickImage,
        onClickNext,
        onClickPrev,
        onClose,
        onSave,
        images: images || [],
        currentImage: 0, // Default to first image
        displayMode: displayMode,
    });
    return (0, jsx_runtime_1.jsx)(LightboxFunctional, {});
};
exports.LightboxWrapper = LightboxWrapper;
const LightboxFunctional = () => {
    const lightboxState = (0, ComponentState_1.useLightboxState)();
    const { images, currentImage, showThumbnails } = lightboxState.state;
    const { imageState } = (0, ComponentState_1.useLightboxImageState)();
    const { imageLoaded } = imageState;
    // Refs to replace instance variables
    const containerWidthRef = (0, react_1.useRef)(0);
    const containerHeightRef = (0, react_1.useRef)(0);
    const footerHeightRef = (0, react_1.useRef)(constants_1.FOOTER_HEIGHT);
    const imageRef = (0, react_1.useRef)(null);
    (0, containerDims_1.useContainerDimensions)(containerWidthRef, containerHeightRef);
    (0, loadImage_1.useLoadImage)(containerWidthRef, containerHeightRef, footerHeightRef);
    const ImageElementFullscreen = (0, react_1.useMemo)(() => {
        (0, log_1.debuginfo)(`Rendering ImageElementFullscreen for currentImage: ${currentImage}`);
        if (!images[currentImage])
            return null;
        return (0, jsx_runtime_1.jsx)(Draggable_1.DraggableImageFullScreen, { imageRef: imageRef });
    }, [images, currentImage, imageRef]);
    const ImageCourasselFullscreen = (0, react_1.useMemo)(() => {
        (0, log_1.debuginfo)(`Rendering ImageCourassel for currentImage: ${currentImage}`);
        return (0, jsx_runtime_1.jsx)(react_2.Box, { as: "figure", children: ImageElementFullscreen });
    }, [ImageElementFullscreen]);
    const { open, close, isOpen } = (0, pip_1.useDocumentPiP)();
    const onPipClick = () => {
        if (isOpen())
            close();
        open((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("strong", { children: "Document Viewer" }), (0, jsx_runtime_1.jsx)(react_2.Box, { position: "sticky", top: "0", zIndex: "sticky", children: (0, jsx_runtime_1.jsx)(Organisms_1.DefaultHeader, { containerWidthRef: containerWidthRef, containerHeightRef: containerHeightRef }) }), imageLoaded && ((0, jsx_runtime_1.jsx)(StyledComponents_1.FigureContainerFullScreen, { children: ImageCourasselFullscreen })), !imageLoaded && (0, jsx_runtime_1.jsx)(Atoms_1.SpinnerAtom, { size: "lg" }), (0, jsx_runtime_1.jsx)(react_2.Box, { position: "sticky", bottom: "0", zIndex: "sticky", children: showThumbnails && (0, jsx_runtime_1.jsx)(Molecules_1.ThumbnailsMolecule, { size: "sm" }) })] })).catch((error) => {
            console.error("Error opening PiP:", error);
            close();
        });
    };
    // Set the PiP callback in the lightbox state; only able to open on user event interaction.
    lightboxState.setPipCallback(onPipClick);
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(Organisms_1.Modal, { hidden: lightboxState.state.displayMode !== ComponentState_1.LightboxDisplayMode.FULLSCREEN, children: (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_2.Box, { position: "sticky", top: "0", zIndex: "sticky", children: (0, jsx_runtime_1.jsx)(Organisms_1.DefaultHeader, { containerWidthRef: containerWidthRef, containerHeightRef: containerHeightRef }) }), imageLoaded && ((0, jsx_runtime_1.jsx)(StyledComponents_1.FigureContainerFullScreen, { children: ImageCourasselFullscreen })), !imageLoaded && (0, jsx_runtime_1.jsx)(Atoms_1.SpinnerAtom, { size: "lg" }), (0, jsx_runtime_1.jsx)(react_2.Box, { position: "sticky", bottom: "0", zIndex: "sticky", children: showThumbnails && (0, jsx_runtime_1.jsx)(Molecules_1.ThumbnailsMolecule, { size: "sm" }) })] }) }) }));
};
