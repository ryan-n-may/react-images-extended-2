"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionButtonAtom = exports.ThumbnailAtom = exports.SpinnerAtom = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const StyledComponents_1 = require("./StyledComponents");
const constants_1 = require("../utils/constants");
function SpinnerAtom(props) {
    const { size = "md" } = props;
    return ((0, jsx_runtime_1.jsx)(StyledComponents_1.ImageSpinnerWrapper, { children: (0, jsx_runtime_1.jsx)(react_1.Spinner, { zIndex: constants_1.HEADER_Z_INDEX, size: size }) }));
}
exports.SpinnerAtom = SpinnerAtom;
function ThumbnailAtom({ index, src, active, onClick, }) {
    return ((0, jsx_runtime_1.jsx)(StyledComponents_1.Thumbnail, { active: active !== null && active !== void 0 ? active : false, src: src, onClick: onClick }, `thumbnail-${index}`));
}
exports.ThumbnailAtom = ThumbnailAtom;
function ActionButtonAtom({ onClick, icon, disabled = false, tooltip, }) {
    return ((0, jsx_runtime_1.jsx)(react_1.Tooltip, { label: tooltip, placement: "bottom", hasArrow: true, children: (0, jsx_runtime_1.jsx)(react_1.IconButton, { zIndex: constants_1.HEADER_Z_INDEX, onClick: onClick, disabled: disabled, "aria-label": "action-button", icon: icon }) }));
}
exports.ActionButtonAtom = ActionButtonAtom;
