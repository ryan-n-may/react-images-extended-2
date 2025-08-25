import { jsx as _jsx } from "react/jsx-runtime";
import React, { useEffect } from "react";
import { ImageSpinnerWrapper } from "./StyledComponents";
export function SpinnerAtom() {
    return (_jsx(ImageSpinnerWrapper, { children: _jsx("p", { children: " Loading... " }) }));
}
export function ActionButtonAtom({ onClick, onHoldDown, icon, holdDelay = 250, // Start holding after 500ms
holdInterval = 500, // Repeat every 100ms
disabled = false, keyboardKeys = [], }) {
    const [holding, setHolding] = React.useState(false);
    const holdTimeoutRef = React.useRef(null);
    const holdIntervalRef = React.useRef(null);
    const startHold = () => {
        if (holding || disabled)
            return;
        setHolding(true);
        // Start the hold action after delay
        holdTimeoutRef.current = setTimeout(() => {
            if (onHoldDown) {
                onHoldDown?.(); // First hold action
                // Continue holding at intervals
                holdIntervalRef.current = setInterval(() => {
                    onHoldDown();
                }, holdInterval);
            }
        }, holdDelay);
    };
    const stopHold = () => {
        setHolding(false);
        if (holdTimeoutRef.current) {
            clearTimeout(holdTimeoutRef.current);
            holdTimeoutRef.current = null;
        }
        if (holdIntervalRef.current) {
            clearInterval(holdIntervalRef.current);
            holdIntervalRef.current = null;
        }
    };
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (keyboardKeys.includes(e.key) && !disabled) {
                e.preventDefault(); // Prevent default browser behavior
                e.stopPropagation(); // Stop event bubbling
                // Call onClick with the keyboard event
                onClick(e);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [keyboardKeys, disabled, onClick]); // Add dependencies
    return (_jsx("button", { onClick: onClick, onMouseDown: startHold, onMouseLeave: stopHold, onMouseUp: stopHold, onMouseOut: stopHold, "aria-label": "action-button", disabled: disabled, className: "flex items-center justify-center p-2 rounded hover:bg-neutral-600 transition-colors", style: { opacity: disabled ? 0.5 : 1 }, children: icon }));
}
