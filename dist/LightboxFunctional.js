"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LightboxWrapper = exports.Lightbox = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const ComponentState_1 = require("./ComponentState");
const LightboxFullScreenPage_1 = require("./pages/LightboxFullScreenPage");
const Lightbox = (props) => {
    return ((0, jsx_runtime_1.jsx)(ComponentState_1.LightboxProvider, { children: (0, jsx_runtime_1.jsx)(LightboxWrapper, Object.assign({}, props)) }));
};
exports.Lightbox = Lightbox;
function LightboxWrapper(props) {
    // Might need to tweak requirements
    const { images, onClickImage, onClickNext, onClickPrev, onClose, onSave, showThumbnails, onClickThumbnail, } = props;
    // Memoize the initial state to prevent function reference changes
    const initialState = (0, react_1.useMemo)(() => ({
        showThumbnails,
        onClickThumbnail,
        onClickImage,
        onClickNext,
        onClickPrev,
        onClose,
        onSave,
        images: images || [],
        currentImage: 0, // Default to first image
    }), [
        showThumbnails,
        onClickThumbnail,
        onClickImage,
        onClickNext,
        onClickPrev,
        onClose,
        onSave,
        images,
    ]);
    // transfer props to state
    (0, ComponentState_1.useSetupState)(initialState);
    return (0, jsx_runtime_1.jsx)(LightboxFullScreenPage_1.LightboxFullScreenPage, {});
}
exports.LightboxWrapper = LightboxWrapper;
