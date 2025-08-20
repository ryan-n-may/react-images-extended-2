"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LightboxDPIPPage = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Atoms_1 = require("../components/Atoms");
const Draggable_1 = require("../components/Draggable");
const Molecules_1 = require("../components/Molecules");
const Organisms_1 = require("../components/Organisms");
const StyledComponents_1 = require("../components/StyledComponents");
const ComponentState_1 = require("../ComponentState");
const useLoadImage_1 = require("../hooks/useLoadImage");
const log_1 = require("../utils/log");
function LightboxDPIPPage(props) {
    var _a, _b;
    const lightboxState = (0, ComponentState_1.useLightboxState)();
    const { images, currentImage, showThumbnails } = lightboxState.state;
    const { imageState } = (0, ComponentState_1.useLightboxImageState)();
    const { imageLoaded } = imageState;
    // Refs to replace instance variables]
    const imageRef = (0, react_1.useRef)(null);
    (0, useLoadImage_1.useLoadImage)();
    const ImageElementFullscreen = (0, react_1.useMemo)(() => {
        (0, log_1.debuginfo)(`Rendering ImageElementFullscreen for currentImage: ${currentImage}`);
        if (!images[currentImage])
            return null;
        return (0, jsx_runtime_1.jsx)(Draggable_1.DraggableImageFullScreen, { imageRef: imageRef });
    }, [images, currentImage, imageRef]);
    const ImageCourasselFullscreen = (0, react_1.useMemo)(() => {
        (0, log_1.debuginfo)(`Rendering ImageCourassel for currentImage: ${currentImage}`);
        return (0, jsx_runtime_1.jsx)("figure", { children: ImageElementFullscreen });
    }, [ImageElementFullscreen]);
    (_b = (_a = props.targetWindowRef) === null || _a === void 0 ? void 0 : _a.current) === null || _b === void 0 ? void 0 : _b.focus(); // need to actually do something with this, maybe store it in state so we can fix the reset bug...
    return ((0, jsx_runtime_1.jsxs)("div", { className: "bg-black text-white h-screen w-screen", children: [(0, jsx_runtime_1.jsx)("div", { className: "sticky top-0 z-10", children: (0, jsx_runtime_1.jsx)(Organisms_1.DefaultHeader, {}) }), imageLoaded && ((0, jsx_runtime_1.jsx)(StyledComponents_1.FigureContainerFullScreen, { children: ImageCourasselFullscreen })), !imageLoaded && (0, jsx_runtime_1.jsx)(Atoms_1.SpinnerAtom, {}), (0, jsx_runtime_1.jsx)("div", { className: "sticky bottom-0 z-10", children: showThumbnails && (0, jsx_runtime_1.jsx)(Molecules_1.ThumbnailsMolecule, {}) })] }, "lightbox-dpip"));
}
exports.LightboxDPIPPage = LightboxDPIPPage;
