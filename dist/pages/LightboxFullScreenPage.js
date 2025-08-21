import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useMemo } from "react";
import { SpinnerAtom } from "../components/Atoms";
import { PinnedImagesHeader, ThumbnailsMolecule, } from "../components/Molecules";
import { Modal, DefaultHeader } from "../components/Organisms";
import { FigureContainerFullScreen } from "../components/StyledComponents";
import { useLightboxState, useLightboxManipulationState, } from "../ComponentState";
import { useLoadImage } from "../hooks/useLoadImage";
import { debuginfo } from "../utils/log";
import { useOpenPip } from "../hooks/useOpenPip";
import { useOpenTab } from "../hooks/useOpenTab";
import { ImageElementFullscreen } from "./elements/ImageElementFullscreen";
import { usePdfMetadata } from "../hooks/usePdfMetadata";
export const LightboxFullScreenPage = () => {
    const lightboxState = useLightboxState();
    const { images, currentIndex, showThumbnails, viewMode, sourceType } = lightboxState.state;
    const { manipulationState } = useLightboxManipulationState();
    const { imageLoaded } = manipulationState;
    usePdfMetadata();
    useLoadImage();
    const ImageCourasselFullscreen = useMemo(() => {
        debuginfo(`Rendering ImageCourassel for currentImage: ${currentIndex}`);
        return (_jsx("figure", { role: "image-courassel-fullscreen", children: _jsx(ImageElementFullscreen, { state: lightboxState.state }) }));
    }, [images, currentIndex, viewMode, imageLoaded, sourceType]);
    const { open: handlePipOpen, isOpen, close, } = useOpenPip(lightboxState.state);
    const { open: handleTabOpen } = useOpenTab(lightboxState.state);
    return (_jsx(_Fragment, { children: _jsx(Modal, { hidden: false, children: _jsxs("div", { children: [_jsx("div", { className: "fixed left-0 top-0 z-10 h-screen p-4", children: _jsx(PinnedImagesHeader, {}, "pinned-images-header") }), _jsx("div", { className: "sticky top-0 z-10", children: _jsx(DefaultHeader, { pipControls: { open: handlePipOpen, close, isOpen }, newTabControls: { open: handleTabOpen } }, "default-header") }), imageLoaded && (_jsx(FigureContainerFullScreen, { children: ImageCourasselFullscreen }, "figure-container-fullscreen")), !imageLoaded && _jsx(SpinnerAtom, {}, "document-preview-spinner"), _jsx("div", { className: "sticky bottom-0 z-10", children: showThumbnails && _jsx(ThumbnailsMolecule, {}, "thumbnails") })] }, "lightbox-fullscreen") }, "lightbox-fullscreen-modal") }));
};
