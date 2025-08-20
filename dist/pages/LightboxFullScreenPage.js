"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LightboxFullScreenPage = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Atoms_1 = require("../components/Atoms");
const Draggable_1 = require("../components/Draggable");
const Molecules_1 = require("../components/Molecules");
const Organisms_1 = require("../components/Organisms");
const StyledComponents_1 = require("../components/StyledComponents");
const ComponentState_1 = require("../ComponentState");
const useLoadImage_1 = require("../hooks/useLoadImage");
const useWindowSize_1 = require("../hooks/useWindowSize");
const constants_1 = require("../utils/constants");
const log_1 = require("../utils/log");
const useOpenPip_1 = require("../hooks/useOpenPip");
const useOpenTab_1 = require("../hooks/useOpenTab");
const LightboxFullScreenPage = () => {
    const lightboxState = (0, ComponentState_1.useLightboxState)();
    const { images, currentImage, showThumbnails } = lightboxState.state;
    const { imageState } = (0, ComponentState_1.useLightboxImageState)();
    const { imageLoaded } = imageState;
    // Refs to replace instance variables
    const footerHeightRef = (0, react_1.useRef)(constants_1.FOOTER_HEIGHT);
    const imageRef = (0, react_1.useRef)(null);
    (0, useLoadImage_1.useLoadImage)(footerHeightRef);
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
    const { open: handlePipOpen, isOpen, close, } = (0, useOpenPip_1.useOpenPip)(lightboxState.state);
    const { open: handleTabOpen } = (0, useOpenTab_1.useOpenTab)(lightboxState.state);
    // debugging box showing the center of the window
    const { width: windowWidth, height: windowHeight } = (0, useWindowSize_1.useWindowSize)(window);
    const center = {
        x: Math.min(windowWidth / 2),
        y: Math.min(windowHeight / 2),
    };
    (0, react_1.useEffect)(() => {
        (0, log_1.debuginfo)(`windowWidth: ${windowWidth}, windowHeight: ${windowHeight}`);
        (0, log_1.debuginfo)(`imageCenter: x=${center.x}, y=${center.y}`);
    }, [windowWidth, windowHeight]);
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(Organisms_1.Modal, { hidden: false, children: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { className: `absolute top-[0px] left-[0px] w-[10px] h-[10px] z-[10000] bg-red-500`, style: {
                            transform: `translate(${center.x}px, ${center.y}px)`,
                        } }), (0, jsx_runtime_1.jsx)("div", { className: "sticky top-0 z-10", children: (0, jsx_runtime_1.jsx)(Organisms_1.DefaultHeader, { pipControls: { open: handlePipOpen, close, isOpen }, newTabControls: { open: handleTabOpen } }, "default-header") }), imageLoaded && ((0, jsx_runtime_1.jsx)(StyledComponents_1.FigureContainerFullScreen, { children: ImageCourasselFullscreen }, "figure-container-fullscreen")), !imageLoaded && (0, jsx_runtime_1.jsx)(Atoms_1.SpinnerAtom, {}, "document-preview-spinner"), (0, jsx_runtime_1.jsx)("div", { className: "sticky bottom-0 z-10", children: showThumbnails && ((0, jsx_runtime_1.jsx)(Molecules_1.ThumbnailsMolecule, { size: "sm" }, "thumbnails")) })] }, "lightbox-fullscreen") }, "lightbox-fullscreen-modal") }));
};
exports.LightboxFullScreenPage = LightboxFullScreenPage;
