import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { ActionButtonAtom } from "./Atoms";
import { ArrowLeft, ArrowRight, X, ZoomIn, ZoomOut } from "lucide-react";
import { CollapsedControls, Header, HeaderGroup, LeftGradientThumbnail, NoGradientThumbnail, PageCount, RightGradientThumbnail, ThumbnailScroller, ThumnailBar, } from "./StyledComponents";
import { useCallbackMethods, useLightboxImages, useLightboxState, } from "../ComponentState";
export function PreviousImageMolecule() {
    const imageState = useLightboxImages();
    const callBacks = useCallbackMethods();
    const handlePrevious = () => {
        imageState.prevImage();
        if (callBacks.onClickPrev)
            callBacks.onClickPrev();
    };
    return (_jsx(ActionButtonAtom, { tooltip: "Previous Image", icon: _jsx(ArrowLeft, { color: "white" }), onClick: handlePrevious, keyboardKeys: ["ArrowLeft"], disabled: !imageState.hasPrev ||
            !imageState.currentFigureData?.imageLoaded ||
            imageState.isNavigating }));
}
export function NextImageMolecule() {
    const imageState = useLightboxImages();
    const callBacks = useCallbackMethods();
    const handleNext = () => {
        console.log("NextImageMolecule: handleNext called");
        imageState.nextImage();
        if (callBacks.onClickNext)
            callBacks.onClickNext();
    };
    return (_jsx(ActionButtonAtom, { tooltip: "Next Image", icon: _jsx(ArrowRight, { color: "white" }), onClick: handleNext, keyboardKeys: ["ArrowRight"], disabled: !imageState.hasNext ||
            !imageState.currentFigureData?.imageLoaded ||
            imageState.isNavigating }));
}
export function ThumbnailsMolecule() {
    const lightboxState = useLightboxState();
    const { state } = lightboxState;
    const { figures, currentIndex, pageCount } = state;
    const callBacks = useCallbackMethods();
    if (pageCount === 0)
        return null;
    const minimalBackthumbnail = Math.max(0, currentIndex - 5);
    const minimalForwardthumbnail = Math.min(pageCount - 1, currentIndex + 5);
    const noScrollImage = figures[currentIndex];
    const leftScrollImage = figures.slice(minimalBackthumbnail, currentIndex);
    const rightScrollImage = figures.slice(currentIndex + 1, minimalForwardthumbnail + 1);
    if (state.showThumbnails === false) {
        return null; // Return null if thumbnails are not enabled
    }
    return (_jsx(ThumnailBar, { children: figures && figures.length > 0 && (_jsxs(ThumbnailScroller, { children: [leftScrollImage.map((image, index) => {
                    return (_jsx(LeftGradientThumbnail, { index: index, src: image.src, onClick: () => {
                            lightboxState.setCurrentIndex(minimalBackthumbnail + index);
                            if (callBacks.onClickThumbnail)
                                callBacks.onClickThumbnail();
                        } }));
                }), _jsx(NoGradientThumbnail, { src: noScrollImage.src }), rightScrollImage.map((image, index) => {
                    return (_jsx(RightGradientThumbnail, { index: currentIndex + 1 + index, src: image.src, onClick: () => {
                            lightboxState.setCurrentIndex(currentIndex + 1 + index);
                            if (callBacks.onClickThumbnail)
                                callBacks.onClickThumbnail();
                        } }));
                })] })) }));
}
export function HeaderMolecule({ controls, extraControls, showCloseButton, showExtraControls, }) {
    const callBacks = useCallbackMethods();
    return (_jsx(_Fragment, { children: _jsxs(Header, { children: [_jsx(HeaderGroup, { children: controls && controls }), showExtraControls && (_jsx(CollapsedControls, { children: extraControls && extraControls })), !!showCloseButton && (_jsx(HeaderGroup, { children: _jsx(ActionButtonAtom, { onClick: () => callBacks.onClose?.(), keyboardKeys: ["Escape"], tooltip: "Close", icon: _jsx(X, { color: "white" }) }, "close-button") }))] }) }));
}
export const PageCountMolecule = () => {
    const lightboxState = useLightboxState();
    const currentImage = lightboxState.state.currentIndex ?? 0;
    const imageCount = lightboxState.state.pageCount;
    return (_jsx(HeaderGroup, { children: _jsx(PageCount, { children: _jsxs("p", { children: [" ", `${currentImage + 1} / ${imageCount}`, " "] }) }) }));
};
export function ZoomMolecule() {
    const lightboxContext = useLightboxState();
    const { state } = lightboxContext;
    const { figures, currentIndex, holdZoomDelay, holdZoomInternal } = state;
    const currentFigure = figures?.[currentIndex] ?? {};
    const { imageLoaded } = currentFigure;
    return (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(ActionButtonAtom, { tooltip: "Zoom in", keyboardKeys: ["ArrowUp", "+", "NumpadAdd"], disabled: !imageLoaded, onClick: () => lightboxContext.zoomIn(), onHoldDown: () => lightboxContext.zoomIn(), holdDelay: holdZoomDelay, holdInterval: holdZoomInternal, icon: _jsx(ZoomIn, { color: "white" }) }, "zoom-in"), _jsx(ActionButtonAtom, { tooltip: "Zoom out", keyboardKeys: ["ArrowDown", "-", "NumpadSubtract"], disabled: !imageLoaded, onClick: () => lightboxContext.zoomOut(), onHoldDown: () => lightboxContext.zoomOut(), holdDelay: holdZoomDelay, holdInterval: holdZoomInternal, icon: _jsx(ZoomOut, { color: "white" }) }, "zoom-out")] }, "zoom-controls"));
}
