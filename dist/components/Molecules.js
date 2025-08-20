"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PinnedImagesHeader = exports.HeaderMolecule = exports.ThumbnailsMolecule = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Atoms_1 = require("./Atoms");
const lucide_react_1 = require("lucide-react");
const StyledComponents_1 = require("./StyledComponents");
const ComponentState_1 = require("../ComponentState");
const log_1 = require("../utils/log");
function ThumbnailsMolecule() {
    const imageState = (0, ComponentState_1.useLightboxImages)();
    const callBacks = (0, ComponentState_1.useCallbackMethods)();
    const currentImage = imageState.currentImage;
    const imageArray = imageState.images;
    if (imageArray.length === 0)
        return null;
    const minimalBackthumbnail = Math.max(0, currentImage - 5);
    const minimalForwardthumbnail = Math.min(imageState.images.length - 1, currentImage + 5);
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
    return ((0, jsx_runtime_1.jsxs)(StyledComponents_1.ThumnailBar, { children: [(0, jsx_runtime_1.jsx)(Atoms_1.ActionButtonAtom, { tooltip: "Previous Image", icon: (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowLeft, { color: "white" }), onClick: () => {
                    (0, log_1.debuginfo)("Previous image clicked");
                    imageState.prevImage();
                    if (callBacks.onClickPrev)
                        callBacks.onClickPrev();
                }, disabled: imageState.currentImage <= 0 }), (0, jsx_runtime_1.jsxs)(StyledComponents_1.ThumbnailScroller, { children: [leftScrollImage.map((image, index) => {
                        const lps = getLeftProgressiveScale(index, minimalBackthumbnail);
                        return ((0, jsx_runtime_1.jsx)(StyledComponents_1.LeftGradientThumbnail, { progressiveScale: lps, index: index, src: image.src, onClick: () => {
                                imageState.setCurrentImage(minimalBackthumbnail + index);
                                if (callBacks.onClickThumbnail)
                                    callBacks.onClickThumbnail();
                            } }, `thumbnail-${index}-${lps}`));
                    }), (0, jsx_runtime_1.jsx)(StyledComponents_1.NoGradientThumbnail, { src: noScrollImage.src }), rightScrollImage.map((image, index) => {
                        const rps = getRightProgressiveScale(index);
                        return ((0, jsx_runtime_1.jsx)(StyledComponents_1.RightGradientThumbnail, { progressiveScale: rps, index: currentImage + 1 + index, src: image.src, onClick: () => {
                                imageState.setCurrentImage(currentImage + 1 + index);
                                if (callBacks.onClickThumbnail)
                                    callBacks.onClickThumbnail();
                            } }, `thumbnail-${index}-${rps}`));
                    })] }), (0, jsx_runtime_1.jsx)(Atoms_1.ActionButtonAtom, { tooltip: "Next Image", icon: (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRight, { color: "white" }), onClick: () => {
                    (0, log_1.debuginfo)("Next image clicked");
                    imageState.nextImage();
                    if (callBacks.onClickNext)
                        callBacks.onClickNext();
                }, disabled: currentImage >= imageArray.length - 1 })] }));
}
exports.ThumbnailsMolecule = ThumbnailsMolecule;
function HeaderMolecule({ controls, extraControls, showCloseButton, showExtraControls, }) {
    var _a, _b;
    const callBacks = (0, ComponentState_1.useCallbackMethods)();
    const lightboxState = (0, ComponentState_1.useLightboxState)();
    const currentImage = (_a = lightboxState.state.currentImage) !== null && _a !== void 0 ? _a : 0;
    const images = lightboxState.state.images;
    const imageCount = (_b = images === null || images === void 0 ? void 0 : images.length) !== null && _b !== void 0 ? _b : 0;
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)(StyledComponents_1.Header, { children: [(0, jsx_runtime_1.jsx)(StyledComponents_1.HeaderGroup, { children: controls && controls }), showExtraControls && ((0, jsx_runtime_1.jsx)(StyledComponents_1.CollapsedControls, { children: extraControls && extraControls })), !!showCloseButton && ((0, jsx_runtime_1.jsx)(StyledComponents_1.HeaderGroup, { children: (0, jsx_runtime_1.jsx)(Atoms_1.ActionButtonAtom, { onClick: () => { var _a; return (_a = callBacks.onClose) === null || _a === void 0 ? void 0 : _a.call(callBacks); }, tooltip: "Close", icon: (0, jsx_runtime_1.jsx)(lucide_react_1.X, { color: "white" }) }, "close-button") })), (0, jsx_runtime_1.jsx)(StyledComponents_1.PageCount, { children: (0, jsx_runtime_1.jsxs)("p", { children: [" ", `${currentImage + 1} / ${imageCount}`, " "] }) })] }) }));
}
exports.HeaderMolecule = HeaderMolecule;
const PinnedImagesHeader = () => {
    const lightboxContext = (0, ComponentState_1.useLightboxState)();
    const { state } = lightboxContext;
    const { images } = state;
    const pinnedImages = state.pinnedImages || [];
    if (pinnedImages.length === 0)
        return null;
    return ((0, jsx_runtime_1.jsx)(StyledComponents_1.VerticalThumbnailScroller, { children: pinnedImages.map((image, index) => {
            const currentImage = images[image.imageIndex];
            return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(StyledComponents_1.PinnedThumbnail, { src: currentImage.src, onClick: () => {
                            lightboxContext.goToPinnedImage(image.imageIndex, image.imageState);
                        } }, `pinned-thumbnail-${index}`), (0, jsx_runtime_1.jsx)(Atoms_1.IconSwitcherButton, { icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Pin, { color: "white" }), iconOnHover: (0, jsx_runtime_1.jsx)(lucide_react_1.Delete, { color: "white" }), onClick: () => {
                            lightboxContext.unPinImage(index);
                        } })] }, `pinned-image-${index}`));
        }) }));
};
exports.PinnedImagesHeader = PinnedImagesHeader;
