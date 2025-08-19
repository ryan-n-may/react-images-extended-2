"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionButtonAtom = exports.ThumbnailAtom = exports.SpinnerAtom = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const StyledComponents_1 = require("./StyledComponents");
function SpinnerAtom() {
    return ((0, jsx_runtime_1.jsx)(StyledComponents_1.ImageSpinnerWrapper, { children: (0, jsx_runtime_1.jsx)("p", { children: " Loading... " }) }));
}
exports.SpinnerAtom = SpinnerAtom;
function ThumbnailAtom({ index, src, active, onClick, }) {
    return ((0, jsx_runtime_1.jsx)(StyledComponents_1.Thumbnail, { active: active !== null && active !== void 0 ? active : false, src: src, onClick: onClick }, `thumbnail-${index}`));
}
exports.ThumbnailAtom = ThumbnailAtom;
function ActionButtonAtom({ onClick, icon, disabled = false, }) {
    return ((0, jsx_runtime_1.jsx)("button", { onClick: onClick, "aria-label": "action-button", disabled: disabled, className: "flex items-center justify-center p-2 rounded hover:bg-gray-200 transition-colors", children: icon }));
}
exports.ActionButtonAtom = ActionButtonAtom;
