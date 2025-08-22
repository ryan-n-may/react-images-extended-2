import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ActionButtonAtom } from "./Atoms";
import { HeaderMolecule } from "./Molecules";
import { ZoomIn, ZoomOut, RotateCcwSquare, RotateCwSquare, RefreshCw, FlipHorizontal2, FlipVertical2, ArrowRightToLine, ArrowLeftToLine, PictureInPicture, CircleArrowOutUpRight, Download, BookOpen, Image, Pin, } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { HiddenPortal, Portal } from "./StyledComponents";
import { IImageViewMode, useLightboxManipulationState, useLightboxState, } from "../ComponentState";
import { handlePinFigure } from "../utils/manipulation";
import { PACKAGE_VERSION } from "..";
export function DefaultHeader(props) {
    const lightboxState = useLightboxState();
    const { manipulationState } = useLightboxManipulationState();
    const { imageLoaded } = manipulationState;
    const [showExtraControls, setShowExtraControls] = useState(true);
    const toggleShowExtraControls = () => setShowExtraControls(!showExtraControls);
    const defaultActions = [];
    const extraActions = [];
    defaultActions.push(_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(ActionButtonAtom, { tooltip: "Zoom in", disabled: !imageLoaded, onClick: () => lightboxState.zoomIn(), icon: _jsx(ZoomIn, { color: "white" }) }, "zoom-in"), _jsx(ActionButtonAtom, { tooltip: "Zoom out", disabled: !imageLoaded, onClick: () => lightboxState.zoomOut(), icon: _jsx(ZoomOut, { color: "white" }) }, "zoom-out")] }, "zoom-buttons"));
    defaultActions.push(_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(ActionButtonAtom, { tooltip: "Rotate left", disabled: !imageLoaded, onClick: () => lightboxState.rotateLeft(), icon: _jsx(RotateCcwSquare, { color: "white" }) }, "rotate-left"), _jsx(ActionButtonAtom, { tooltip: "Rotate right", disabled: !imageLoaded, onClick: () => lightboxState.rotateRight(), icon: _jsx(RotateCwSquare, { color: "white" }) }, "rotate-right")] }, "rotate-buttons"));
    defaultActions.push(_jsx(ActionButtonAtom, { tooltip: "Extra controls", disabled: !imageLoaded, onClick: () => toggleShowExtraControls(), icon: showExtraControls ? (_jsx(ArrowLeftToLine, { color: "white" })) : (_jsx(ArrowRightToLine, { color: "white" })) }, "toggle-collapse"));
    extraActions.push(_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(ActionButtonAtom, { tooltip: "Flip vertical", disabled: !imageLoaded, onClick: () => lightboxState.flipVertical(), icon: _jsx(FlipVertical2, { color: "white" }) }, "flip-vertical"), _jsx(ActionButtonAtom, { tooltip: "Flip horizontal", disabled: !imageLoaded, onClick: () => lightboxState.flipHorisontal(), icon: _jsx(FlipHorizontal2, { color: "white" }) }, "flip-horisontal")] }, "flip-controls"));
    extraActions.push(_jsx(ActionButtonAtom, { tooltip: "Reset image position", disabled: !imageLoaded, onClick: () => lightboxState.resetMaipulationState(), icon: _jsx(RefreshCw, { color: "white" }) }, "reset-image"));
    if (props.pipControls && PACKAGE_VERSION === "EXPERIMENTAL") {
        const { open, isOpen, close } = props.pipControls;
        extraActions.push(_jsx(ActionButtonAtom, { tooltip: "Open PiP", disabled: !imageLoaded, onClick: () => {
                if (isOpen())
                    close();
                else
                    open().catch((error) => {
                        console.error("Error opening PiP:", error);
                        close();
                    });
            }, icon: _jsx(PictureInPicture, { color: "white" }) }, "pip-button"));
    }
    if (props.newTabControls && PACKAGE_VERSION === "EXPERIMENTAL") {
        const { open } = props.newTabControls;
        extraActions.push(_jsx(ActionButtonAtom, { tooltip: "New tab", disabled: !imageLoaded, onClick: () => {
                open().catch((error) => {
                    console.error("Error opening new tab:", error);
                    // we do not elect to control the new open tab; no close handlers
                });
            }, icon: _jsx(CircleArrowOutUpRight, { color: "white" }) }, "open-new-tab-button"));
    }
    extraActions.push(_jsx(ActionButtonAtom, { tooltip: "Download", disabled: !imageLoaded, onClick: () => { }, icon: _jsx(Download, { color: "white" }) }, "save-image-button"));
    extraActions.push(_jsx(ActionButtonAtom, { tooltip: "Reader mode", disabled: !imageLoaded, onClick: () => lightboxState.updateViewState(IImageViewMode.READER), icon: _jsx(BookOpen, { color: "white" }) }, "reader-mode-button"));
    extraActions.push(_jsx(ActionButtonAtom, { tooltip: "Image mode", disabled: !imageLoaded, onClick: () => lightboxState.updateViewState(IImageViewMode.IMAGE), icon: _jsx(Image, { color: "white" }) }, "image-mode-button"));
    extraActions.push(_jsx(ActionButtonAtom, { tooltip: "Pin image", disabled: !imageLoaded, onClick: () => {
            const pinnedFigure = handlePinFigure(lightboxState.state);
            lightboxState.pinFigure(pinnedFigure);
        }, icon: _jsx(Pin, { color: "white" }) }, "pin-image-button"));
    return (_jsx(HeaderMolecule, { controls: defaultActions, extraControls: extraActions, showCloseButton: true, showExtraControls: showExtraControls }));
}
export function Modal({ children, hidden, }) {
    const portalElementRef = useRef(null);
    const nodeRef = useRef(null);
    // Create portal element on mount
    useEffect(() => {
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
        return createPortal(_jsx(HiddenPortal, { children: _jsx("div", { ref: nodeRef, children: children }) }), portalElementRef.current);
    }
    return createPortal(_jsx(Portal, { children: _jsx("div", { ref: nodeRef, children: children }) }), portalElementRef.current);
}
