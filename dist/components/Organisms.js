"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modal = exports.DefaultHeader = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Atoms_1 = require("./Atoms");
const Molecules_1 = require("./Molecules");
const lucide_react_1 = require("lucide-react");
const react_1 = require("react");
const react_dom_1 = require("react-dom");
const StyledComponents_1 = require("./StyledComponents");
const react_2 = require("@chakra-ui/react");
const ComponentState_1 = require("../ComponentState");
function DefaultHeader({ containerWidthRef, containerHeightRef, }) {
    const lightboxState = (0, ComponentState_1.useLightboxState)();
    const { imageLoaded } = lightboxState.state.imageState;
    const currentDisplayMode = lightboxState.state.displayMode;
    const callbacks = (0, ComponentState_1.useCallbackMethods)();
    const [showExtraControls, setShowExtraControls] = (0, react_1.useState)(true);
    const toggleShowExtraControls = () => setShowExtraControls(!showExtraControls);
    const defaultActions = [];
    const extraActions = [];
    defaultActions.push((0, jsx_runtime_1.jsxs)(react_2.HStack, { gap: "1", children: [(0, jsx_runtime_1.jsx)(Atoms_1.ActionButtonAtom, { tooltip: "Zoom in", disabled: !imageLoaded, onClick: () => lightboxState.zoomIn(), icon: (0, jsx_runtime_1.jsx)(lucide_react_1.ZoomIn, {}) }, "zoom-in"), (0, jsx_runtime_1.jsx)(Atoms_1.ActionButtonAtom, { tooltip: "Zoom out", disabled: !imageLoaded, onClick: () => lightboxState.zoomOut(), icon: (0, jsx_runtime_1.jsx)(lucide_react_1.ZoomOut, {}) }, "zoom-out")] }, "zoom-buttons"));
    defaultActions.push((0, jsx_runtime_1.jsxs)(react_2.HStack, { gap: "1", children: [(0, jsx_runtime_1.jsx)(Atoms_1.ActionButtonAtom, { tooltip: "Rotate left", disabled: !imageLoaded, onClick: () => lightboxState.rotateLeft(), icon: (0, jsx_runtime_1.jsx)(lucide_react_1.RotateCcwSquare, {}) }, "rotate-left"), (0, jsx_runtime_1.jsx)(Atoms_1.ActionButtonAtom, { tooltip: "Rotate right", disabled: !imageLoaded, onClick: () => lightboxState.rotateRight(), icon: (0, jsx_runtime_1.jsx)(lucide_react_1.RotateCwSquare, {}) }, "rotate-right")] }, "rotate-buttons"));
    if (currentDisplayMode !== ComponentState_1.LightboxDisplayMode.PIP) {
        defaultActions.push((0, jsx_runtime_1.jsx)(Atoms_1.ActionButtonAtom, { tooltip: "Enter Picture-in-Picture mode", disabled: !imageLoaded, onClick: () => {
                var _a;
                lightboxState.setDisplayMode(ComponentState_1.LightboxDisplayMode.PIP);
                (_a = callbacks.onClickPip) === null || _a === void 0 ? void 0 : _a.call(callbacks); // used to enter DPIP mode on user interaction.
            }, icon: (0, jsx_runtime_1.jsx)(lucide_react_1.PictureInPicture, {}) }, "toggle-pip"));
    }
    if (currentDisplayMode !== ComponentState_1.LightboxDisplayMode.FULLSCREEN) {
        defaultActions.push((0, jsx_runtime_1.jsx)(Atoms_1.ActionButtonAtom, { tooltip: "Toggle fullscreen mode", disabled: !imageLoaded, onClick: () => {
                lightboxState.setDisplayMode(ComponentState_1.LightboxDisplayMode.FULLSCREEN);
                lightboxState.resetImageState(containerWidthRef.current, containerHeightRef.current);
            }, icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Maximize2, {}) }, "toggle-fullscreen"));
    }
    if (currentDisplayMode !== ComponentState_1.LightboxDisplayMode.PIP) {
        defaultActions.push((0, jsx_runtime_1.jsx)(Atoms_1.ActionButtonAtom, { tooltip: "Extra controls", disabled: !imageLoaded, onClick: () => toggleShowExtraControls(), icon: showExtraControls ? (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowLeftToLine, {}) : (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRightToLine, {}) }, "toggle-collapse"));
    }
    extraActions.push((0, jsx_runtime_1.jsxs)(react_2.HStack, { gap: "1", children: [(0, jsx_runtime_1.jsx)(Atoms_1.ActionButtonAtom, { tooltip: "Flip vertical", disabled: !imageLoaded, onClick: () => lightboxState.flipVertical(), icon: (0, jsx_runtime_1.jsx)(lucide_react_1.FlipVertical2, {}) }, "flip-vertical"), (0, jsx_runtime_1.jsx)(Atoms_1.ActionButtonAtom, { tooltip: "Flip horizontal", disabled: !imageLoaded, onClick: () => lightboxState.flipHorisontal(), icon: (0, jsx_runtime_1.jsx)(lucide_react_1.FlipHorizontal2, {}) }, "flip-horisontal")] }, "flip-controls"));
    extraActions.push((0, jsx_runtime_1.jsx)(Atoms_1.ActionButtonAtom, { tooltip: "Reset image position", disabled: !imageLoaded, onClick: () => lightboxState.resetImageState(containerWidthRef.current, containerHeightRef.current), icon: (0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, {}) }, "reset-image"));
    return ((0, jsx_runtime_1.jsx)(Molecules_1.HeaderMolecule, { controls: defaultActions, extraControls: extraActions, showCloseButton: true, showExtraControls: showExtraControls && currentDisplayMode !== ComponentState_1.LightboxDisplayMode.PIP }));
}
exports.DefaultHeader = DefaultHeader;
function Modal({ children, hidden, }) {
    const portalElementRef = (0, react_1.useRef)(null);
    const nodeRef = (0, react_1.useRef)(null);
    // Create portal element on mount
    (0, react_1.useEffect)(() => {
        if (!portalElementRef.current) {
            const portalDiv = document.createElement("div");
            document.body.appendChild(portalDiv);
            portalElementRef.current = portalDiv;
        }
        // Cleanup on unmount
        return () => {
            if (portalElementRef.current) {
                document.body.removeChild(portalElementRef.current);
                portalElementRef.current = null;
            }
        };
    }, []);
    // Don't render anything until portal element is created
    if (!portalElementRef.current) {
        return null;
    }
    if (hidden) {
        return (0, react_dom_1.createPortal)((0, jsx_runtime_1.jsx)(StyledComponents_1.HiddenPortal, { children: (0, jsx_runtime_1.jsx)("div", { ref: nodeRef, children: children }) }), portalElementRef.current);
    }
    return (0, react_dom_1.createPortal)((0, jsx_runtime_1.jsx)(StyledComponents_1.Portal, { children: (0, jsx_runtime_1.jsx)("div", { ref: nodeRef, children: children }) }), portalElementRef.current);
}
exports.Modal = Modal;
