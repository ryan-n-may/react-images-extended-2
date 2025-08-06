"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useContainerDimensions = void 0;
const react_1 = require("react");
const canUseDom_1 = __importDefault(require("../utils/canUseDom"));
const log_1 = require("../utils/log");
function useContainerDimensions(containerWidthRef, containerHeightRef) {
    // Set container dimensions
    const setContainerWidthHeight = (0, react_1.useCallback)(() => {
        (0, log_1.debuginfo)(`Setting container dimensions: width=${containerWidthRef.current}, height=${containerHeightRef.current}`);
        if (canUseDom_1.default) {
            containerWidthRef.current = window.innerWidth;
            containerHeightRef.current = window.innerHeight;
        }
    }, []);
    // Initialize container dimensions on mount
    (0, react_1.useEffect)(() => {
        setContainerWidthHeight();
    }, [setContainerWidthHeight]);
}
exports.useContainerDimensions = useContainerDimensions;
