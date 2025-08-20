"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMoveImageOnResize = exports.useWindowSize = void 0;
const react_1 = require("react");
const ComponentState_1 = require("../ComponentState");
function useWindowSize(targetWindow) {
    if (!targetWindow) {
        console.warn("useWindowSize: targetWindow is undefined, using default window.");
        targetWindow = window;
    }
    const [size, setSize] = (0, react_1.useState)({
        width: targetWindow.innerWidth,
        height: targetWindow.innerHeight,
    });
    (0, react_1.useEffect)(() => {
        if (!targetWindow)
            return;
        const handleResize = () => {
            setSize({
                width: targetWindow.innerWidth,
                height: targetWindow.innerHeight,
            });
        };
        targetWindow.addEventListener("resize", handleResize);
        return () => targetWindow.removeEventListener("resize", handleResize);
    }, [targetWindow]);
    return size;
}
exports.useWindowSize = useWindowSize;
function useMoveImageOnResize() {
    // The window object will be the PiP window when this hook runs inside PiP
    const { resetImageState } = (0, ComponentState_1.useLightboxState)();
    const currentWindow = typeof window !== "undefined" ? window : null;
    const [size, setSize] = (0, react_1.useState)(() => {
        if (!currentWindow)
            return { width: 0, height: 0 };
        return {
            width: currentWindow.innerWidth,
            height: currentWindow.innerHeight,
        };
    });
    (0, react_1.useEffect)(() => {
        if (!currentWindow)
            return;
        const handleResize = () => {
            setSize({
                width: currentWindow.innerWidth,
                height: currentWindow.innerHeight,
            });
        };
        currentWindow.addEventListener("resize", handleResize);
        return () => currentWindow.removeEventListener("resize", handleResize);
    }, [currentWindow]);
    // center image whenever window resizes
    (0, react_1.useEffect)(() => {
        resetImageState();
    }, [size.width, size.height]);
}
exports.useMoveImageOnResize = useMoveImageOnResize;
