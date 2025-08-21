import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { ActionButtonAtom, IconSwitcherButton } from "./Atoms";
import { ArrowLeft, ArrowRight, Pin, X, Delete } from "lucide-react";
import { CollapsedControls, Header, HeaderGroup, LeftGradientThumbnail, NoGradientThumbnail, PageCount, PinnedThumbnail, RightGradientThumbnail, ThumbnailScroller, ThumnailBar, VerticalThumbnailScroller, } from "./StyledComponents";
import { useCallbackMethods, useLightboxImages, useLightboxState, } from "../ComponentState";
import { debuginfo } from "../utils/log";
export function ThumbnailsMolecule() {
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
    const getLeftProgressiveScale = (index, minimalBackthumbnail) => {
        const distanceFromCurrent = index - minimalBackthumbnail - 1; // will be negative
        const scale = Math.max(25, 100 + distanceFromCurrent * 20);
        return scale;
    };
    const getRightProgressiveScale = (index) => {
        const distanceFromCurrentSimplified = index + 1; // will be positive
        const scale = Math.max(25, 100 - distanceFromCurrentSimplified * 20);
        return scale;
    };
    return (_jsxs(ThumnailBar, { children: [_jsx(ActionButtonAtom, { tooltip: "Previous Image", icon: _jsx(ArrowLeft, { color: "white" }), onClick: () => {
                    debuginfo("Previous image clicked");
                    imageState.prevImage();
                    if (callBacks.onClickPrev)
                        callBacks.onClickPrev();
                }, disabled: imageState.currentIndex <= 0 }), imageArray.length > 0 && (_jsxs(ThumbnailScroller, { children: [leftScrollImage.map((image, index) => {
                        const lps = getLeftProgressiveScale(index, minimalBackthumbnail);
                        return (_jsx(LeftGradientThumbnail, { progressiveScale: lps, index: index, src: image.src, onClick: () => {
                                imageState.setCurrentIndex(minimalBackthumbnail + index);
                                if (callBacks.onClickThumbnail)
                                    callBacks.onClickThumbnail();
                            } }, `thumbnail-${index}-${lps}`));
                    }), _jsx(NoGradientThumbnail, { src: noScrollImage.src }), rightScrollImage.map((image, index) => {
                        const rps = getRightProgressiveScale(index);
                        return (_jsx(RightGradientThumbnail, { progressiveScale: rps, index: currentImage + 1 + index, src: image.src, onClick: () => {
                                imageState.setCurrentIndex(currentImage + 1 + index);
                                if (callBacks.onClickThumbnail)
                                    callBacks.onClickThumbnail();
                            } }, `thumbnail-${index}-${rps}`));
                    })] })), _jsx(ActionButtonAtom, { tooltip: "Next Image", icon: _jsx(ArrowRight, { color: "white" }), onClick: () => {
                    debuginfo("Next image clicked");
                    imageState.nextImage();
                    if (callBacks.onClickNext)
                        callBacks.onClickNext();
                }, disabled: currentImage >= pageCount - 1 })] }));
}
export function HeaderMolecule({ controls, extraControls, showCloseButton, showExtraControls, }) {
    const callBacks = useCallbackMethods();
    const lightboxState = useLightboxState();
    const currentImage = lightboxState.state.currentIndex ?? 0;
    const imageCount = lightboxState.state.pageCount;
    return (_jsx(_Fragment, { children: _jsxs(Header, { children: [_jsx(HeaderGroup, { children: controls && controls }), showExtraControls && (_jsx(CollapsedControls, { children: extraControls && extraControls })), !!showCloseButton && (_jsx(HeaderGroup, { children: _jsx(ActionButtonAtom, { onClick: () => callBacks.onClose?.(), tooltip: "Close", icon: _jsx(X, { color: "white" }) }, "close-button") })), _jsx(PageCount, { children: _jsxs("p", { children: [" ", `${currentImage + 1} / ${imageCount}`, " "] }) })] }) }));
}
export const PinnedImagesHeader = () => {
    const lightboxContext = useLightboxState();
    const { state } = lightboxContext;
    const { images } = state;
    const pinnedImages = state.pinnedFigureStates || [];
    if (pinnedImages.length === 0)
        return null;
    return (_jsx(VerticalThumbnailScroller, { children: pinnedImages.map((image, index) => {
            const currentImage = images[image.imageIndex];
            return (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(PinnedThumbnail, { src: currentImage.src, onClick: () => {
                            lightboxContext.goToPinnedFigure(image.imageIndex, image.imageState);
                        } }, `pinned-thumbnail-${index}`), _jsx(IconSwitcherButton, { icon: _jsx(Pin, { color: "white" }), iconOnHover: _jsx(Delete, { color: "white" }), onClick: () => {
                            lightboxContext.unPinFigure(index);
                        } })] }, `pinned-image-${index}`));
        }) }));
};
