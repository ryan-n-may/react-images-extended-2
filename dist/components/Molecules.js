"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeaderMolecule = exports.ThumbnailsMolecule = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const Atoms_1 = require("./Atoms");
const lucide_react_1 = require("lucide-react");
const StyledComponents_1 = require("./StyledComponents");
const ComponentState_1 = require("../ComponentState");
function ThumbnailsMolecule({ size = "sm" }) {
    const imageState = (0, ComponentState_1.useLightboxImages)();
    const callBacks = (0, ComponentState_1.useCallbackMethods)();
    return ((0, jsx_runtime_1.jsxs)(StyledComponents_1.ThumnailBar, { children: [(0, jsx_runtime_1.jsx)(Atoms_1.ActionButtonAtom, { tooltip: "Previous Image", icon: (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowLeft, {}), onClick: () => {
                    imageState.prevImage();
                    if (callBacks.onClickPrev)
                        callBacks.onClickPrev();
                }, disabled: imageState.currentImage === 0 }), size !== "xs" &&
                imageState.images.map((img, idx) => {
                    if (!img.src)
                        return null;
                    return ((0, jsx_runtime_1.jsx)(Atoms_1.ThumbnailAtom, { src: img.src, size: size, active: idx === imageState.currentImage, index: idx, onClick: () => {
                            imageState.toImage(idx);
                            if (callBacks.onClickThumbnail)
                                callBacks.onClickThumbnail();
                        } }, idx));
                }), (0, jsx_runtime_1.jsx)(Atoms_1.ActionButtonAtom, { tooltip: "Next Image", icon: (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRight, {}), onClick: () => {
                    imageState.nextImage();
                    if (callBacks.onClickNext)
                        callBacks.onClickNext();
                }, disabled: imageState.currentImage !== imageState.images.length - 1 })] }));
}
exports.ThumbnailsMolecule = ThumbnailsMolecule;
function HeaderMolecule({ controls, extraControls, showCloseButton, showExtraControls, }) {
    const callBacks = (0, ComponentState_1.useCallbackMethods)();
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)(StyledComponents_1.Header, { className: "pip-drag-handle", children: [controls ? controls : (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}), (0, jsx_runtime_1.jsx)(react_1.Collapse, { in: showExtraControls, transition: { enter: { duration: 0.3 }, exit: { duration: 0.2 } }, children: (0, jsx_runtime_1.jsxs)(StyledComponents_1.CollapsedControls, { children: [" ", extraControls, " "] }) }), !!showCloseButton && ((0, jsx_runtime_1.jsx)(react_1.IconButton, { onClick: callBacks.onClose, "aria-label": "", children: (0, jsx_runtime_1.jsx)(lucide_react_1.X, {}) }))] }) }));
}
exports.HeaderMolecule = HeaderMolecule;
