import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ActionButtonAtom } from "./Atoms";
import { HeaderMolecule, ZoomMolecule } from "./Molecules";
import { RotateCcwSquare, RotateCwSquare, RefreshCw, FlipHorizontal2, FlipVertical2, ArrowRightToLine, ArrowLeftToLine, Download, } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { HiddenPortal, Portal } from "./StyledComponents";
import { useLightboxState } from "../ComponentState";
export function DefaultHeader() {
    const lightboxState = useLightboxState();
    const { state } = lightboxState;
    const { figures, currentIndex } = state;
    const currentFigure = figures?.[currentIndex] ?? {};
    const [showExtraControls, setShowExtraControls] = useState(false);
    const toggleShowExtraControls = () => setShowExtraControls(!showExtraControls);
    const defaultActions = [];
    const extraActions = [];
    defaultActions.push(_jsx(ZoomMolecule, {}));
    defaultActions.push(_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(ActionButtonAtom, { tooltip: "Rotate left", disabled: !currentFigure.imageLoaded, onClick: () => lightboxState.rotateLeft(), icon: _jsx(RotateCcwSquare, { color: "white" }) }, "rotate-left"), _jsx(ActionButtonAtom, { tooltip: "Rotate right", disabled: !currentFigure.imageLoaded, onClick: () => lightboxState.rotateRight(), icon: _jsx(RotateCwSquare, { color: "white" }) }, "rotate-right")] }, "rotate-buttons"));
    defaultActions.push(_jsx(ActionButtonAtom, { tooltip: "Reset image position", disabled: !currentFigure.imageLoaded, onClick: () => lightboxState.resetMaipulationState(), icon: _jsx(RefreshCw, { color: "white" }) }, "reset-image"));
    defaultActions.push(_jsx(ActionButtonAtom, { tooltip: "Extra controls", disabled: !currentFigure.imageLoaded, onClick: () => toggleShowExtraControls(), icon: showExtraControls ? (_jsx(ArrowLeftToLine, { color: "white" })) : (_jsx(ArrowRightToLine, { color: "white" })) }, "toggle-collapse"));
    extraActions.push(_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(ActionButtonAtom, { tooltip: "Flip vertical", disabled: !currentFigure.imageLoaded, onClick: () => lightboxState.flipVertical(), icon: _jsx(FlipVertical2, { color: "white" }) }, "flip-vertical"), _jsx(ActionButtonAtom, { tooltip: "Flip horizontal", disabled: !currentFigure.imageLoaded, onClick: () => lightboxState.flipHorisontal(), icon: _jsx(FlipHorizontal2, { color: "white" }) }, "flip-horisontal")] }, "flip-controls"));
    extraActions.push(_jsx(ActionButtonAtom, { tooltip: "Download", disabled: !currentFigure.imageLoaded, onClick: () => { }, icon: _jsx(Download, { color: "white" }) }, "save-image-button"));
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
