import { jsx as _jsx } from "react/jsx-runtime";
import { useRef, useMemo, useImperativeHandle, forwardRef, } from "react";
import { useLightboxState } from "../ComponentState";
import { IMAGE_Z_INDEX } from "../utils/constants";
export const ScrollableImageContainer = forwardRef(({ children }, ref) => {
    const containerRef = useRef(null);
    const lightboxState = useLightboxState();
    const { state } = lightboxState;
    const { currentIndex, figures } = state;
    const currentFigure = figures?.[currentIndex] ?? {};
    // Calculate the total size needed for the scaled image with padding
    const scaledWidth = currentFigure.width * currentFigure.scaleX;
    const scaledHeight = currentFigure.height * currentFigure.scaleY;
    // Add extra padding around the scaled image to ensure all edges are reachable
    const portraitPage = [0, 180].includes(currentFigure.rotate % 360);
    const containerWidth = portraitPage ? scaledWidth : scaledHeight;
    const containerHeight = portraitPage ? scaledHeight : scaledWidth;
    // Minimum size should be at least the viewport size
    const minWidth = window.innerWidth; // Full viewport width since each image container is 100vw
    const minHeight = window.innerHeight;
    // Expose scroll control methods
    useImperativeHandle(ref, () => ({
        scrollTo: (x, y, behavior = "smooth") => {
            if (containerRef.current) {
                containerRef.current.scrollTo({ left: x, top: y, behavior });
            }
        },
        scrollToCenter: () => {
            if (containerRef.current) {
                const centerX = (containerRef.current.scrollWidth -
                    containerRef.current.clientWidth) /
                    2;
                const centerY = (containerRef.current.scrollHeight -
                    containerRef.current.clientHeight) /
                    2;
                containerRef.current.scrollTo({
                    left: centerX,
                    top: centerY,
                    behavior: "smooth",
                });
            }
        },
        scrollToPoint: (x, y, behavior = "smooth") => {
            if (containerRef.current) {
                // Convert viewport coordinates to scroll coordinates
                const rect = containerRef.current.getBoundingClientRect();
                const scrollX = x - rect.left - containerRef.current.clientWidth / 2;
                const scrollY = y - rect.top - containerRef.current.clientHeight / 2;
                containerRef.current.scrollTo({
                    left: scrollX,
                    top: scrollY,
                    behavior,
                });
            }
        },
        getScrollPosition: () => {
            if (containerRef.current) {
                return {
                    x: containerRef.current.scrollLeft,
                    y: containerRef.current.scrollTop,
                };
            }
            return { x: 0, y: 0 };
        },
        getContainerElement: () => {
            return containerRef.current;
        },
        addScrollListener: (listener) => {
            if (containerRef.current) {
                containerRef.current.addEventListener("scroll", listener);
                // Return cleanup function
                return () => {
                    if (containerRef.current) {
                        containerRef.current.removeEventListener("scroll", listener);
                    }
                };
            }
            // Return no-op cleanup if no container
            return () => { };
        },
    }), []);
    return (_jsx("div", { ref: containerRef, className: "scrollable-image-container", style: {
            position: "relative",
            width: "100vw", // Full viewport width for each image
            height: "100vh",
            overflow: "auto",
            zIndex: IMAGE_Z_INDEX - 1,
            flexShrink: 0, // Prevent flex shrinking
        }, children: _jsx("div", { style: {
                position: "relative",
                width: `${Math.max(containerWidth, minWidth)}px`,
                height: `${Math.max(containerHeight, minHeight)}px`,
                minWidth: "100vw", // Ensure minimum viewport width
                minHeight: "100vh", // Ensure minimum viewport height
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }, children: children }) }));
});
export function StyledImageWrapper({ children }) {
    const lightboxState = useLightboxState();
    const { state } = lightboxState;
    const { currentIndex, figures } = state;
    const currentFigure = figures?.[currentIndex] ?? {};
    const styleDependencies = [
        currentFigure.imageHeight,
        currentFigure.imageWidth,
        currentFigure.width,
        currentFigure.height,
        currentFigure.top,
        currentFigure.left,
        currentFigure.scaleX,
        currentFigure.scaleY,
        currentFigure.rotate,
    ];
    const wrapperStyle = useMemo(() => ({
        width: `${currentFigure.width}px`,
        minWidth: `${currentFigure.width}px`,
        maxWidth: `${currentFigure.width}px`,
        height: "auto",
        transform: `rotate(${currentFigure.rotate}deg) scaleX(${currentFigure.scaleX}) scaleY(${currentFigure.scaleY})`,
        transformOrigin: "center",
        willChange: "transform",
        backfaceVisibility: "hidden", // Prevent flashing on transform
        WebkitBackfaceVisibility: "hidden",
        WebkitTransform: `rotate(${currentFigure.rotate}deg) scaleX(${currentFigure.scaleX}) scaleY(${currentFigure.scaleY})`,
        position: "relative",
        display: "block",
        zIndex: IMAGE_Z_INDEX, // Ensure image is below controls
        cursor: "zoom-in", // Indicate zoom capability
        // Additional properties to reduce flashing
        imageRendering: "crisp-edges",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
        pointerEvents: "auto", // Add this
        userSelect: "none", // Add this
        WebkitUserSelect: "none", // Add this
        flexShrink: 0, // Prevent flexbox from shrinking the image
    }), styleDependencies);
    return (_jsx("div", { role: "styled-wrapper", style: wrapperStyle, children: children }));
}
