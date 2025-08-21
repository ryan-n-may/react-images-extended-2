import { useEffect, useState } from "react";
import { useLightboxState } from "../ComponentState";
export function useWindowSize(targetWindow) {
    if (!targetWindow) {
        console.warn("useWindowSize: targetWindow is undefined, using default window.");
        targetWindow = window;
    }
    const [size, setSize] = useState({
        width: targetWindow.innerWidth,
        height: targetWindow.innerHeight,
    });
    useEffect(() => {
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
export function useMoveImageOnResize() {
    // The window object will be the PiP window when this hook runs inside PiP
    const { resetMaipulationState } = useLightboxState();
    const currentWindow = typeof window !== "undefined" ? window : null;
    const [size, setSize] = useState(() => {
        if (!currentWindow)
            return { width: 0, height: 0 };
        return {
            width: currentWindow.innerWidth,
            height: currentWindow.innerHeight,
        };
    });
    useEffect(() => {
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
    useEffect(() => {
        resetMaipulationState();
    }, [size.width, size.height]);
}
