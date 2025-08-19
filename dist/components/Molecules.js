"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeaderMolecule = exports.ThumbnailsMolecule = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Atoms_1 = require("./Atoms");
const lucide_react_1 = require("lucide-react");
const StyledComponents_1 = require("./StyledComponents");
const ComponentState_1 = require("../ComponentState");
function ThumbnailsMolecule({ size = "sm" }) {
    const imageState = (0, ComponentState_1.useLightboxImages)();
    const callBacks = (0, ComponentState_1.useCallbackMethods)();
    const currentImage = imageState.currentImage;
    if (imageState.images.length === 0)
        return null;
    const imageArray = imageState.images;
    const minimalBackthumbnail = Math.max(0, currentImage - 2);
    const minimalForwardthumbnail = Math.min(imageState.images.length - 1, currentImage + 2);
    const noScrollImage = imageArray[currentImage];
    const leftScrollImage = imageArray.slice(minimalBackthumbnail, currentImage);
    const rightScrollImage = imageArray.slice(currentImage + 1, minimalForwardthumbnail + 1);
    return ((0, jsx_runtime_1.jsxs)(StyledComponents_1.ThumnailBar, { children: [(0, jsx_runtime_1.jsx)(Atoms_1.ActionButtonAtom, { tooltip: "Previous Image", icon: (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowLeft, {}), onClick: () => {
                    imageState.prevImage();
                    if (callBacks.onClickPrev)
                        callBacks.onClickPrev();
                }, disabled: imageState.currentImage === 0 }), (0, jsx_runtime_1.jsxs)(StyledComponents_1.ThumbnailScroller, { children: [leftScrollImage.map((image, index) => ((0, jsx_runtime_1.jsx)(StyledComponents_1.LeftGradientThumbnail, { index: index, src: image.src, size: size, active: false, onClick: () => {
                            imageState.setCurrentImage(minimalBackthumbnail + index);
                            if (callBacks.onClickThumbnail)
                                callBacks.onClickThumbnail();
                        } }, `thumbnail-${index}`))), (0, jsx_runtime_1.jsx)(StyledComponents_1.NoGradientThumbnail, { src: noScrollImage.src, size: size, active: true, index: currentImage, onClick: () => { } }, currentImage), rightScrollImage.map((image, index) => ((0, jsx_runtime_1.jsx)(StyledComponents_1.RightGradientThumbnail, { index: currentImage + 1 + index, src: image.src, size: size, active: false, onClick: () => {
                            imageState.setCurrentImage(currentImage + 1 + index);
                            if (callBacks.onClickThumbnail)
                                callBacks.onClickThumbnail();
                        } }, `thumbnail-${index}`)))] }), (0, jsx_runtime_1.jsx)(Atoms_1.ActionButtonAtom, { tooltip: "Next Image", icon: (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRight, {}), onClick: () => {
                    imageState.nextImage();
                    if (callBacks.onClickNext)
                        callBacks.onClickNext();
                }, disabled: imageState.currentImage !== imageState.images.length - 1 })] }));
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
