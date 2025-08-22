import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { ActionButtonAtom, GhostActionButtonAtom } from "./Atoms";
import { ArrowLeft, ArrowRight, CircleX, X, ZoomIn, ZoomOut, } from "lucide-react";
import { CollapsedControls, Header, HeaderGroup, LeftGradientThumbnail, NoGradientThumbnail, PageCount, PinnedThumbnail, RightGradientThumbnail, ThumbnailScroller, ThumnailBar, } from "./StyledComponents";
import { useCallbackMethods, useLightboxImages, useLightboxState, } from "../ComponentState";
import { debuginfo } from "../utils/log";
export function PreviousImageMolecule() {
    const imageState = useLightboxImages();
    const callBacks = useCallbackMethods();
    return (_jsx(ActionButtonAtom, { tooltip: "Previous Image", icon: _jsx(ArrowLeft, { color: "white" }), onClick: () => {
            debuginfo("Previous image clicked");
            imageState.prevImage();
            if (callBacks.onClickPrev)
                callBacks.onClickPrev();
        }, disabled: imageState.currentIndex <= 0 }));
}
export function NextImageMolecule() {
    const imageState = useLightboxImages();
    const callBacks = useCallbackMethods();
    return (_jsx(ActionButtonAtom, { tooltip: "Next Image", icon: _jsx(ArrowRight, { color: "white" }), onClick: () => {
            debuginfo("Next image clicked");
            imageState.nextImage();
            if (callBacks.onClickNext)
                callBacks.onClickNext();
        }, disabled: imageState.currentIndex >= imageState.pageCount - 1 }));
}
export function ThumbnailsMolecule() {
    const { state } = useLightboxState();
    const imageState = useLightboxImages();
    const callBacks = useCallbackMethods();
    const currentImage = imageState.currentIndex;
    const imageArray = imageState.images;
    const pageCount = imageState.pageCount;
    if (pageCount === 0)
        return null;
    const minimalBackthumbnail = Math.max(0, currentImage - 5);
    const minimalForwardthumbnail = Math.min(pageCount - 1, currentImage + 5);
    const noScrollImage = imageArray[currentImage];
    const leftScrollImage = imageArray.slice(minimalBackthumbnail, currentImage);
    const rightScrollImage = imageArray.slice(currentImage + 1, minimalForwardthumbnail + 1);
    if (state.showThumbnails === false) {
        return null; // Return null if thumbnails are not enabled
    }
    return (_jsx(ThumnailBar, { children: imageArray.length > 0 && (_jsxs(ThumbnailScroller, { children: [leftScrollImage.map((image, index) => {
                    return (_jsx(LeftGradientThumbnail, { index: index, src: image.src, onClick: () => {
                            imageState.setCurrentIndex(minimalBackthumbnail + index);
                            if (callBacks.onClickThumbnail)
                                callBacks.onClickThumbnail();
                        } }));
                }), _jsx(NoGradientThumbnail, { src: noScrollImage.src }), rightScrollImage.map((image, index) => {
                    return (_jsx(RightGradientThumbnail, { index: currentImage + 1 + index, src: image.src, onClick: () => {
                            imageState.setCurrentIndex(currentImage + 1 + index);
                            if (callBacks.onClickThumbnail)
                                callBacks.onClickThumbnail();
                        } }));
                })] })) }));
}
export function HeaderMolecule({ controls, extraControls, showCloseButton, showExtraControls, }) {
    const callBacks = useCallbackMethods();
    return (_jsx(_Fragment, { children: _jsxs(Header, { children: [_jsx(HeaderGroup, { children: controls && controls }), showExtraControls && (_jsx(CollapsedControls, { children: extraControls && extraControls })), !!showCloseButton && (_jsx(HeaderGroup, { children: _jsx(ActionButtonAtom, { onClick: () => callBacks.onClose?.(), tooltip: "Close", icon: _jsx(X, { color: "white" }) }, "close-button") }))] }) }));
}
export const PageCountMolecule = () => {
    const lightboxState = useLightboxState();
    const currentImage = lightboxState.state.currentIndex ?? 0;
    const imageCount = lightboxState.state.pageCount;
    return (_jsx(HeaderGroup, { children: _jsx(PageCount, { children: _jsxs("p", { children: [" ", `${currentImage + 1} / ${imageCount}`, " "] }) }) }));
};
export const PinnedImagesHeader = () => {
    const lightboxContext = useLightboxState();
    const { state } = lightboxContext;
    const { images, currentIndex } = state;
    const pinnedImages = state.pinnedFigureStates || [];
    if (pinnedImages.length === 0)
        return null;
    return (_jsx(Header, { children: _jsx(HeaderGroup, { children: pinnedImages.map((image, index) => {
                const currentImage = images[image.imageIndex];
                const active = currentIndex === image.imageIndex;
                return (_jsxs("div", { className: "relative", children: [_jsx("div", { style: {
                                border: active ? "2px solid white" : "0px solid white",
                                borderRadius: "0.5rem",
                                backgroundColor: active ? "white" : "transparent",
                                opacity: active ? 1 : 0.5,
                            }, children: _jsx(PinnedThumbnail, { src: currentImage.src, onClick: () => {
                                    lightboxContext.goToPinnedFigure(image.imageIndex, image.imageState);
                                } }, `pinned-thumbnail-${index}`) }), _jsx("div", { className: "absolute -top-1 -right-1", children: _jsx(GhostActionButtonAtom, { icon: _jsx(CircleX, { color: "red", size: 16, className: "bg-neutral-700 rounded-full" }), onClick: () => {
                                    lightboxContext.unPinFigure(index);
                                } }) })] }, `pinned-image-${index}`));
            }) }) }));
};
export function ZoomMolecule() {
    const lightboxContext = useLightboxState();
    const { state } = lightboxContext;
    const { figureManipulation, holdZoomDelay, holdZoomInternal } = state;
    const { imageLoaded } = figureManipulation;
    return (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(ActionButtonAtom, { tooltip: "Zoom in", disabled: !imageLoaded, onClick: () => lightboxContext.zoomIn(), onHoldDown: () => lightboxContext.zoomIn(), holdDelay: holdZoomDelay, holdInterval: holdZoomInternal, icon: _jsx(ZoomIn, { color: "white" }) }, "zoom-in"), _jsx(ActionButtonAtom, { tooltip: "Zoom out", disabled: !imageLoaded, onClick: () => lightboxContext.zoomOut(), onHoldDown: () => lightboxContext.zoomOut(), holdDelay: holdZoomDelay, holdInterval: holdZoomInternal, icon: _jsx(ZoomOut, { color: "white" }) }, "zoom-out")] }, "zoom-controls"));
}
