import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState, useRef } from "react";
import { useLightboxState } from "../ComponentState";
export function AnimatedImageContainer({ children, style = {} }) {
    const lightboxState = useLightboxState();
    const { currentIndex } = lightboxState.state;
    const [slideDirection, setSlideDirection] = useState("none");
    const [isAnimating, setIsAnimating] = useState(false);
    const prevIndexRef = useRef(currentIndex);
    const containerRef = useRef(null);
    useEffect(() => {
        const prevIndex = prevIndexRef.current;
        const newIndex = currentIndex;
        if (prevIndex !== newIndex) {
            // Determine slide direction
            const direction = newIndex > prevIndex ? "left" : "right";
            setSlideDirection(direction);
            setIsAnimating(true);
            // Reset animation after transition completes
            const timer = setTimeout(() => {
                setIsAnimating(false);
                setSlideDirection("none");
            }, 400); // Match CSS transition duration
            prevIndexRef.current = newIndex;
            return () => clearTimeout(timer);
        }
    }, [currentIndex]);
    const getAnimationStyles = () => {
        const baseStyles = {
            transform: "translateX(0%)",
            opacity: 1
        };
        if (!isAnimating) {
            return baseStyles;
        }
        // During animation, create slide effect
        switch (slideDirection) {
            case "left":
                // Sliding left (next image) - slide in from right
                return {
                    ...baseStyles,
                    transform: "translateX(0%)",
                };
            case "right":
                // Sliding right (previous image) - slide in from left  
                return {
                    ...baseStyles,
                    transform: "translateX(0%)",
                };
            default:
                return baseStyles;
        }
    };
    return (_jsx("div", { ref: containerRef, style: {
            ...style,
            ...getAnimationStyles(),
            transition: isAnimating ? "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease" : "none",
            overflow: "hidden",
            willChange: isAnimating ? "transform, opacity" : "auto",
            width: "100%",
            height: "100%",
        }, children: children }));
}
