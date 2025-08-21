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
function useLoadImage() {
    const lightboxContext = (0, ComponentState_1.useLightboxState)();
    const { state } = lightboxContext;
    const { currentImage, images, currentImageIsPinned } = state;
    (0, react_1.useEffect)(() => {
        (0, log_1.debuginfo)(`useLoadImage: currentImage index is ${currentImage}`);
        if (!canUseDom_1.default) {
            (0, log_1.debuginfo)("useLoadImage: canUseDom is false, skipping image preload.");
            return;
        }
        // We do not need to preload pdf sources
        if (state.sourceType === ComponentState_1.ILightboxImageType.PDF)
            return;
        (0, loading_1.preloadImage)(state, lightboxContext.updateImageState, !currentImageIsPinned);
    }, [currentImage, loading_1.preloadImage, images]);
}
exports.useLoadImage = useLoadImage;
