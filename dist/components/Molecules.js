"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeaderMolecule = exports.ThumbnailsMolecule = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Atoms_1 = require("./Atoms");
const lucide_react_1 = require("lucide-react");
const StyledComponents_1 = require("./StyledComponents");
const ComponentState_1 = require("../ComponentState");
const log_1 = require("../utils/log");
function ThumbnailsMolecule({ size = "sm" }) {
    const imageState = (0, ComponentState_1.useLightboxImages)();
    const callBacks = (0, ComponentState_1.useCallbackMethods)();
    const currentImage = imageState.currentImage;
    const imageArray = imageState.images;
    if (imageArray.length === 0)
        return null;
    const minimalBackthumbnail = Math.max(0, currentImage - 2);
    const minimalForwardthumbnail = Math.min(imageState.images.length - 1, currentImage + 2);
    const noScrollImage = imageArray[currentImage];
    const leftScrollImage = imageArray.slice(minimalBackthumbnail, currentImage);
    const rightScrollImage = imageArray.slice(currentImage + 1, minimalForwardthumbnail + 1);
    // optimising recalculations here...
    const cacheLeftProgressiveScale = new Map();
    const cacheRightProgressiveScale = new Map();
    const getLeftProgressiveScale = (index, currentImage, minimalBackthumbnail) => {
        const distanceFromCurrent = currentImage - minimalBackthumbnail + index;
        if (cacheLeftProgressiveScale.has(distanceFromCurrent)) {
            return cacheLeftProgressiveScale.get(distanceFromCurrent);
        }
        const scale = Math.max(25, 100 - distanceFromCurrent * 25);
        cacheLeftProgressiveScale.set(distanceFromCurrent, Math.max(25, 100 - distanceFromCurrent * 25));
        // ie: currentImage = 10, minimalBackthumbnail = 8, index = 0
        // distanceFromCurrent = 10 - 8 + 0 = 2
        // ie: currentImage = 20, minimalBackthumbnail = 18, index = 1
        // distanceFromCurrent = 20 - 18 + 1 = 3
        return scale;
    };
    const getRightProgressiveScale = (index) => {
        //const distanceFromCurrent = minimalForwardthumbnail - currentImage - (minimalForwardthumbnail - currentImage + index + 1);
        const distanceFromCurrentSimplified = index + 1;
        if (cacheRightProgressiveScale.has(distanceFromCurrentSimplified)) {
            return cacheRightProgressiveScale.get(distanceFromCurrentSimplified);
        }
        const scale = Math.max(100 - distanceFromCurrentSimplified * 25);
        cacheRightProgressiveScale.set(distanceFromCurrentSimplified, scale);
        return scale;
    };
    return ((0, jsx_runtime_1.jsxs)(StyledComponents_1.ThumnailBar, { children: [(0, jsx_runtime_1.jsx)(Atoms_1.ActionButtonAtom, { tooltip: "Previous Image", icon: (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowLeft, {}), onClick: () => {
                    (0, log_1.debuginfo)("Previous image clicked");
                    imageState.prevImage();
                    if (callBacks.onClickPrev)
                        callBacks.onClickPrev();
                }, disabled: imageState.currentImage <= 0 }), leftScrollImage.map((image, index) => ((0, jsx_runtime_1.jsx)(StyledComponents_1.LeftGradientThumbnail, { progressiveScale: getLeftProgressiveScale(index, currentImage, minimalBackthumbnail), index: index, src: image.src, size: size, active: false, onClick: () => {
                    imageState.setCurrentImage(minimalBackthumbnail + index);
                    if (callBacks.onClickThumbnail)
                        callBacks.onClickThumbnail();
                } }, `thumbnail-${index}`))), (0, jsx_runtime_1.jsx)(StyledComponents_1.NoGradientThumbnail, { src: noScrollImage.src, size: size, active: true, index: currentImage, onClick: () => { } }, currentImage), rightScrollImage.map((image, index) => ((0, jsx_runtime_1.jsx)(StyledComponents_1.RightGradientThumbnail, { progressiveScale: getRightProgressiveScale(index), index: currentImage + 1 + index, src: image.src, size: size, active: false, onClick: () => {
                    imageState.setCurrentImage(currentImage + 1 + index);
                    if (callBacks.onClickThumbnail)
                        callBacks.onClickThumbnail();
                } }, `thumbnail-${index}`))), (0, jsx_runtime_1.jsx)(Atoms_1.ActionButtonAtom, { tooltip: "Next Image", icon: (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRight, {}), onClick: () => {
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
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)(StyledComponents_1.Header, { children: [controls && controls, showExtraControls && ((0, jsx_runtime_1.jsx)(StyledComponents_1.CollapsedControls, { children: extraControls && extraControls })), !!showCloseButton && ((0, jsx_runtime_1.jsx)("button", { onClick: callBacks.onClose, "aria-label": "Close", className: "flex items-center justify-center p-2 rounded hover:bg-gray-200 transition-colors", children: (0, jsx_runtime_1.jsx)(lucide_react_1.X, {}) })), (0, jsx_runtime_1.jsxs)("p", { children: [" ", `${currentImage} / ${imageCount}`, " "] })] }) }));
}
exports.HeaderMolecule = HeaderMolecule;
