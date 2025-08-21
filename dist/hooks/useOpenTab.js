import { jsx as _jsx } from "react/jsx-runtime";
import { LightboxProvider, useCallbackMethods, } from "../ComponentState";
import { LightboxFullScreenPage } from "../pages/LightboxFullScreenPage";
import { useNewTab } from "./useNewTab";
export const useOpenTab = (lightboxState) => {
    const { open: openNewTab } = useNewTab();
    const callbackMethods = useCallbackMethods();
    const handleTabOpen = async () => {
        try {
            await openNewTab(_jsx(LightboxProvider, { initialState: lightboxState, children: _jsx(LightboxFullScreenPage, {}) }));
            callbackMethods.onClose?.(); // close main component when new tab opened
        }
        catch (error) {
            console.error("Error opening new tab:", error);
        }
    };
    return {
        open: handleTabOpen,
    };
};
