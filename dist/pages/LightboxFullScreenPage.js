"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LightboxFullScreenPage = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Atoms_1 = require("../components/Atoms");
const Molecules_1 = require("../components/Molecules");
const Organisms_1 = require("../components/Organisms");
const StyledComponents_1 = require("../components/StyledComponents");
const ComponentState_1 = require("../ComponentState");
const useLoadImage_1 = require("../hooks/useLoadImage");
const log_1 = require("../utils/log");
const useOpenPip_1 = require("../hooks/useOpenPip");
const useOpenTab_1 = require("../hooks/useOpenTab");
const ImageElementFullscreen_1 = require("./elements/ImageElementFullscreen");
const LightboxFullScreenPage = () => {
    const lightboxState = (0, ComponentState_1.useLightboxState)();
    const { images, currentImage, showThumbnails, viewMode } = lightboxState.state;
    const { imageState } = (0, ComponentState_1.useLightboxImageState)();
    const { imageLoaded } = imageState;
    // Refs to replace instance variables
    const imageRef = (0, react_1.useRef)(null);
    (0, useLoadImage_1.useLoadImage)();
    const MemoImageElementFullscreen = (0, react_1.useMemo)(() => {
        return (0, ImageElementFullscreen_1.ImageElementFullscreen)({
            state: lightboxState.state,
        });
    }, [images, currentImage, imageRef, viewMode, imageLoaded]);
    const ImageCourasselFullscreen = (0, react_1.useMemo)(() => {
        (0, log_1.debuginfo)(`Rendering ImageCourassel for currentImage: ${currentImage}`);
        return ((0, jsx_runtime_1.jsx)("figure", { children: MemoImageElementFullscreen }, "image-courassel-fullscreen"));
    }, [ImageElementFullscreen_1.ImageElementFullscreen]);
    const { open: handlePipOpen, isOpen, close, } = (0, useOpenPip_1.useOpenPip)(lightboxState.state);
    const { open: handleTabOpen } = (0, useOpenTab_1.useOpenTab)(lightboxState.state);
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(Organisms_1.Modal, { hidden: false, children: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { className: "fixed left-0 top-0 z-10 h-screen p-4", children: (0, jsx_runtime_1.jsx)(Molecules_1.PinnedImagesHeader, {}, "pinned-images-header") }), (0, jsx_runtime_1.jsx)("div", { className: "sticky top-0 z-10", children: (0, jsx_runtime_1.jsx)(Organisms_1.DefaultHeader, { pipControls: { open: handlePipOpen, close, isOpen }, newTabControls: { open: handleTabOpen } }, "default-header") }), imageLoaded && ((0, jsx_runtime_1.jsx)(StyledComponents_1.FigureContainerFullScreen, { children: ImageCourasselFullscreen }, "figure-container-fullscreen")), !imageLoaded && (0, jsx_runtime_1.jsx)(Atoms_1.SpinnerAtom, {}, "document-preview-spinner"), (0, jsx_runtime_1.jsx)("div", { className: "sticky bottom-0 z-10", children: showThumbnails && (0, jsx_runtime_1.jsx)(Molecules_1.ThumbnailsMolecule, {}, "thumbnails") })] }, "lightbox-fullscreen") }, "lightbox-fullscreen-modal") }));
};
exports.LightboxFullScreenPage = LightboxFullScreenPage;
