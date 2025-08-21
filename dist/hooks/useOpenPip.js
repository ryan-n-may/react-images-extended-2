import { jsx as _jsx } from "react/jsx-runtime";
import { LightboxProvider, useCallbackMethods, } from "../ComponentState";
import { LightboxDPIPPage } from "../pages/LightboxDPIPPage";
import { useDocumentPiP } from "./usePip";
export const useOpenPip = (lightboxState) => {
    const { open: pipOpen, close, isOpen, window: targetWindowRef, } = useDocumentPiP();
    const callbackMethods = useCallbackMethods();
    const handlePipOpen = async () => {
        try {
            pipOpen(_jsx(LightboxProvider, { initialState: lightboxState, children: _jsx(LightboxDPIPPage, { targetWindowRef: targetWindowRef ?? undefined }) })); // passing current state to pipOpen
            callbackMethods.onClose?.(); // close main component when PIP opened
        }
        catch (error) {
            console.error("Error opening Document PiP:", error);
            // Optionally handle the error, e.g., show a notification
        }
    };
    return {
        open: handlePipOpen,
        close,
        isOpen,
    };
};
