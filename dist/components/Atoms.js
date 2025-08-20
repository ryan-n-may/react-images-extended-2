"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionButtonAtom = exports.IconSwitcherButton = exports.ThumbnailAtom = exports.SpinnerAtom = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const StyledComponents_1 = require("./StyledComponents");
function SpinnerAtom() {
    return ((0, jsx_runtime_1.jsx)(StyledComponents_1.ImageSpinnerWrapper, { children: (0, jsx_runtime_1.jsx)("p", { children: " Loading... " }) }));
}
exports.SpinnerAtom = SpinnerAtom;
function ThumbnailAtom({ index, src, active, onClick, }) {
    return ((0, jsx_runtime_1.jsx)(StyledComponents_1.Thumbnail, { active: active !== null && active !== void 0 ? active : false, src: src, onClick: onClick }, `thumbnail-${index}`));
}
exports.ThumbnailAtom = ThumbnailAtom;
function IconSwitcherButton({ onClick, icon, iconOnHover, disabled = false, }) {
    const [showHoverIcon, setShowHoverIcon] = react_1.default.useState(false);
    return ((0, jsx_runtime_1.jsx)("button", { onClick: onClick, "aria-label": "action-button", disabled: disabled, className: "flex items-center justify-center p-2 rounded hover:bg-neutral-600 transition-colors", style: { opacity: disabled ? 0.5 : 1 }, onMouseEnter: () => setShowHoverIcon(true), onMouseLeave: () => setShowHoverIcon(false), children: showHoverIcon ? iconOnHover : icon }));
}
exports.IconSwitcherButton = IconSwitcherButton;
function ActionButtonAtom({ onClick, icon, tooltip, disabled = false, }) {
    const [showTooltip, setShowTooltip] = react_1.default.useState(false);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [showTooltip && ((0, jsx_runtime_1.jsx)("p", { className: "absolute rounded-md text-white bg-neutral-900 p-1 m-0", style: { transform: "translateY(50px)" }, children: tooltip })), (0, jsx_runtime_1.jsx)("button", { onClick: onClick, "aria-label": "action-button", disabled: disabled, className: "flex items-center justify-center p-2 rounded hover:bg-neutral-600 transition-colors", style: { opacity: disabled ? 0.5 : 1 }, onMouseEnter: () => setShowTooltip(true), onMouseLeave: () => setShowTooltip(false), children: icon })] }));
}
exports.ActionButtonAtom = ActionButtonAtom;
