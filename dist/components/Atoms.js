import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import React from "react";
import { Thumbnail, ImageSpinnerWrapper } from "./StyledComponents";
import { debuginfo } from "../utils/log";
export function SpinnerAtom() {
    return (_jsx(ImageSpinnerWrapper, { children: _jsx("p", { children: " Loading... " }) }));
}
export function ThumbnailAtom({ index, src, active, onClick, }) {
    return (_jsx(Thumbnail, { active: active ?? false, src: src, onClick: onClick }, `thumbnail-${index}`));
}
export function IconSwitcherButton({ onClick, icon, iconOnHover, disabled = false, }) {
    const [showHoverIcon, setShowHoverIcon] = React.useState(false);
    return (_jsx("button", { onClick: onClick, "aria-label": "action-button", disabled: disabled, className: "flex items-center justify-center p-2 rounded hover:bg-neutral-600 transition-colors", style: { opacity: disabled ? 0.5 : 1 }, onMouseEnter: () => setShowHoverIcon(true), onMouseLeave: () => setShowHoverIcon(false), children: showHoverIcon ? iconOnHover : icon }));
}
export function ActionButtonAtom({ onClick, onHoldDown, icon, holdDelay = 250, // Start holding after 500ms
holdInterval = 100, // Repeat every 100ms
disabled = false, }) {
    const [holding, setHolding] = React.useState(false);
    const holdTimeoutRef = React.useRef(null);
    const holdIntervalRef = React.useRef(null);
    const startHold = () => {
        if (holding || disabled)
            return;
        debuginfo("Starting to hold action button");
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
    return (_jsx("button", { onClick: onClick, onMouseDown: startHold, onMouseLeave: stopHold, onMouseUp: stopHold, onMouseOut: stopHold, "aria-label": "action-button", disabled: disabled, className: "flex items-center justify-center p-2 rounded hover:bg-neutral-600 transition-colors", style: { opacity: disabled ? 0.5 : 1 }, children: icon }));
}
export function GhostActionButtonAtom({ onClick, icon }) {
    return (_jsx(_Fragment, { children: _jsx("button", { onClick: onClick, "aria-label": "action-button-ghost", className: "flex items-center justify-center p-0 m-0", children: icon }) }));
}
