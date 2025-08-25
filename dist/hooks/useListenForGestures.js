import { useEffect } from "react";
import { useCallbackMethods, useLightboxImages, } from "../ComponentState";
export function useListenForGestures() {
    const callbacks = useCallbackMethods();
    const lightboxContext = useLightboxImages();
    useEffect(() => {
        const handleScroll = (event) => {
            const dir = event.deltaX > event.deltaY ? "horizontal" : "vertical";
            if (dir === "horizontal")
                lightboxContext.nextImage();
            else
                console.log("Vertical scroll ignored");
        };
        window.addEventListener("wheel", handleScroll);
        // cleanup on unmount
        return () => {
            window.removeEventListener("wheel", handleScroll);
        };
    }, []);
}
