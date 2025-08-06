"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLoadImage = void 0;
const react_1 = require("react");
const loading_1 = require("../utils/loading");
const ComponentState_1 = require("../ComponentState");
const canUseDom_1 = __importDefault(require("../utils/canUseDom"));
const log_1 = require("../utils/log");
function useLoadImage(containerWidthRef, containerHeightRef, footerHeightRef) {
    const lightboxContext = (0, ComponentState_1.useLightboxState)();
    (0, react_1.useEffect)(() => {
        (0, log_1.debuginfo)(`useLoadImage: currentImage index is ${lightboxContext.state.currentImage}`);
        if (!canUseDom_1.default)
            return;
        (0, loading_1.preloadImage)(lightboxContext.state, lightboxContext.updateImageState, containerWidthRef, containerHeightRef, footerHeightRef);
    }, [lightboxContext.state.currentImage, loading_1.preloadImage]);
}
exports.useLoadImage = useLoadImage;
