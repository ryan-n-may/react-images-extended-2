import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { Thumbnail, ImageSpinnerWrapper } from "./StyledComponents";
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
export function ActionButtonAtom({ onClick, icon, tooltip, disabled = false, }) {
    const [showTooltip, setShowTooltip] = React.useState(false);
    return (_jsxs(_Fragment, { children: [showTooltip && (_jsx("p", { className: "absolute rounded-md text-white bg-neutral-900 p-1 m-0", style: { transform: "translateY(50px)" }, children: tooltip })), _jsx("button", { onClick: onClick, "aria-label": "action-button", disabled: disabled, className: "flex items-center justify-center p-2 rounded hover:bg-neutral-600 transition-colors", style: { opacity: disabled ? 0.5 : 1 }, onMouseEnter: () => setShowTooltip(true), onMouseLeave: () => setShowTooltip(false), children: icon })] }));
}
