import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useMemo } from "react";
import { NextImageMolecule, PageCountMolecule, PreviousImageMolecule, ThumbnailsMolecule, } from "../components/Molecules";
import { Modal, DefaultHeader } from "../components/Organisms";
import { useLightboxState } from "../ComponentState";
import { useLoadImage } from "../hooks/useLoadImage";
import { ImageElementFullscreen } from "./elements/ImageElementFullscreen";
import { FigureContainerFullScreen } from "../components/StyledComponents";
import { SpinnerAtom } from "../components/Atoms";
import { HEADER_Z_INDEX } from "../utils/constants";
import { useWindowResize } from "../hooks/useWindowResize";
export const LightboxFullScreenPage = () => {
    const lightboxState = useLightboxState();
    const { figures, currentIndex } = lightboxState.state;
    const currentFigure = figures?.[currentIndex] ?? {};
    const { imageLoaded } = currentFigure;
    useWindowResize();
    useLoadImage();
    const ImageCourasselFullscreen = useMemo(() => {
        return (_jsx("figure", { role: "image-courassel-fullscreen", children: _jsx(ImageElementFullscreen, {}) }));
    }, [figures]); // Remove currentIndex dependency to prevent remounting
    return (_jsx(_Fragment, { children: _jsx(Modal, { hidden: false, children: _jsxs("div", { role: "lightbox-fullscreen", className: "w-screen h-screen p-0", children: [_jsx(FigureContainerFullScreen, { children: ImageCourasselFullscreen }), !imageLoaded && _jsx(SpinnerAtom, {}), _jsx("div", { className: "fixed top-0 right-0 flex justify-end w-3/4", role: "top-right", style: { zIndex: HEADER_Z_INDEX }, children: _jsx(DefaultHeader, {}) }), _jsx("div", { className: "fixed top-0 left-0 flex justify-start w-1/4", role: "top-left", style: { zIndex: HEADER_Z_INDEX }, children: _jsx(PageCountMolecule, {}) }), _jsx("div", { className: "fixed bottom-1/2 left-0 flex justify-start w-1/4", role: "left-bar", style: { zIndex: HEADER_Z_INDEX }, children: _jsx(PreviousImageMolecule, {}) }), _jsx("div", { className: "fixed bottom-1/2 right-0 flex justify-end w-1/4", role: "right-bar", style: { zIndex: HEADER_Z_INDEX }, children: _jsx(NextImageMolecule, {}) }), _jsx("div", { className: "fixed bottom-0 flex justify-center w-full", role: "bottom-bar", style: { zIndex: HEADER_Z_INDEX }, children: _jsx("div", { className: "flex flex-col items-center space-y-2", children: _jsx(ThumbnailsMolecule, {}) }) })] }) }) }));
};
