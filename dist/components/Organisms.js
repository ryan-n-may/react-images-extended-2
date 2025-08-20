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
const ComponentState_1 = require("../ComponentState");
const manipulation_1 = require("../utils/manipulation");
function DefaultHeader(props) {
    const lightboxState = (0, ComponentState_1.useLightboxState)();
    const { imageLoaded } = lightboxState.state.imageState;
    const [showExtraControls, setShowExtraControls] = (0, react_1.useState)(true);
    const toggleShowExtraControls = () => setShowExtraControls(!showExtraControls);
    const defaultActions = [];
    const extraActions = [];
    defaultActions.push((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)(Atoms_1.ActionButtonAtom, { tooltip: "Zoom in", disabled: !imageLoaded, onClick: () => lightboxState.zoomIn(), icon: (0, jsx_runtime_1.jsx)(lucide_react_1.ZoomIn, { color: "white" }) }, "zoom-in"), (0, jsx_runtime_1.jsx)(Atoms_1.ActionButtonAtom, { tooltip: "Zoom out", disabled: !imageLoaded, onClick: () => lightboxState.zoomOut(), icon: (0, jsx_runtime_1.jsx)(lucide_react_1.ZoomOut, { color: "white" }) }, "zoom-out")] }, "zoom-buttons"));
    defaultActions.push((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)(Atoms_1.ActionButtonAtom, { tooltip: "Rotate left", disabled: !imageLoaded, onClick: () => lightboxState.rotateLeft(), icon: (0, jsx_runtime_1.jsx)(lucide_react_1.RotateCcwSquare, { color: "white" }) }, "rotate-left"), (0, jsx_runtime_1.jsx)(Atoms_1.ActionButtonAtom, { tooltip: "Rotate right", disabled: !imageLoaded, onClick: () => lightboxState.rotateRight(), icon: (0, jsx_runtime_1.jsx)(lucide_react_1.RotateCwSquare, { color: "white" }) }, "rotate-right")] }, "rotate-buttons"));
    defaultActions.push((0, jsx_runtime_1.jsx)(Atoms_1.ActionButtonAtom, { tooltip: "Extra controls", disabled: !imageLoaded, onClick: () => toggleShowExtraControls(), icon: showExtraControls ? ((0, jsx_runtime_1.jsx)(lucide_react_1.ArrowLeftToLine, { color: "white" })) : ((0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRightToLine, { color: "white" })) }, "toggle-collapse"));
    extraActions.push((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)(Atoms_1.ActionButtonAtom, { tooltip: "Flip vertical", disabled: !imageLoaded, onClick: () => lightboxState.flipVertical(), icon: (0, jsx_runtime_1.jsx)(lucide_react_1.FlipVertical2, { color: "white" }) }, "flip-vertical"), (0, jsx_runtime_1.jsx)(Atoms_1.ActionButtonAtom, { tooltip: "Flip horizontal", disabled: !imageLoaded, onClick: () => lightboxState.flipHorisontal(), icon: (0, jsx_runtime_1.jsx)(lucide_react_1.FlipHorizontal2, { color: "white" }) }, "flip-horisontal")] }, "flip-controls"));
    extraActions.push((0, jsx_runtime_1.jsx)(Atoms_1.ActionButtonAtom, { tooltip: "Reset image position", disabled: !imageLoaded, onClick: () => lightboxState.resetImageState(), icon: (0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, { color: "white" }) }, "reset-image"));
    if (props.pipControls) {
        const { open, isOpen, close } = props.pipControls;
        extraActions.push((0, jsx_runtime_1.jsx)(Atoms_1.ActionButtonAtom, { tooltip: "Open PiP", disabled: !imageLoaded, onClick: () => {
                if (isOpen())
                    close();
                else
                    open().catch((error) => {
                        console.error("Error opening PiP:", error);
                        close();
                    });
            }, icon: (0, jsx_runtime_1.jsx)(lucide_react_1.PictureInPicture, { color: "white" }) }, "pip-button"));
    }
    if (props.newTabControls) {
        const { open } = props.newTabControls;
        extraActions.push((0, jsx_runtime_1.jsx)(Atoms_1.ActionButtonAtom, { tooltip: "New tab", disabled: !imageLoaded, onClick: () => {
                open().catch((error) => {
                    console.error("Error opening new tab:", error);
                    // we do not elect to control the new open tab; no close handlers
                });
            }, icon: (0, jsx_runtime_1.jsx)(lucide_react_1.CircleArrowOutUpRight, { color: "white" }) }, "open-new-tab-button"));
    }
    extraActions.push((0, jsx_runtime_1.jsx)(Atoms_1.ActionButtonAtom, { tooltip: "Download", disabled: !imageLoaded, onClick: () => { }, icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Download, { color: "white" }) }, "save-image-button"));
    extraActions.push((0, jsx_runtime_1.jsx)(Atoms_1.ActionButtonAtom, { tooltip: "Reader mode", disabled: !imageLoaded, onClick: () => lightboxState.updateViewState(ComponentState_1.IImageViewMode.READER), icon: (0, jsx_runtime_1.jsx)(lucide_react_1.BookOpen, { color: "white" }) }, "reader-mode-button"));
    extraActions.push((0, jsx_runtime_1.jsx)(Atoms_1.ActionButtonAtom, { tooltip: "Image mode", disabled: !imageLoaded, onClick: () => lightboxState.updateViewState(ComponentState_1.IImageViewMode.IMAGE), icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Image, { color: "white" }) }, "image-mode-button"));
    extraActions.push((0, jsx_runtime_1.jsx)(Atoms_1.ActionButtonAtom, { tooltip: "Pin image", disabled: !imageLoaded, onClick: () => {
            const pinnedImage = (0, manipulation_1.pinImage)(lightboxState.state);
            lightboxState.pinImage(pinnedImage);
        }, icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Pin, { color: "white" }) }, "pin-image-button"));
    return ((0, jsx_runtime_1.jsx)(Molecules_1.HeaderMolecule, { controls: defaultActions, extraControls: extraActions, showCloseButton: true, showExtraControls: showExtraControls }));
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
