import {
  ILightboxState,
  LightboxProvider,
  useCallbackMethods,
} from "../ComponentState";
import { LightboxFullScreenPage } from "../pages/LightboxFullScreenPage";
import { useNewTab } from "./useNewTab";

export const useOpenTab = (lightboxState: ILightboxState) => {
  const { open: openNewTab } = useNewTab();
  const callbackMethods = useCallbackMethods();

  const handleTabOpen = async () => {
    try {
      await openNewTab(
        <LightboxProvider initialState={lightboxState}>
          <LightboxFullScreenPage />
        </LightboxProvider>
      );
      callbackMethods.onClose?.(); // close main component when new tab opened
    } catch (error) {
      console.error("Error opening new tab:", error);
    }
  };

  return {
    open: handleTabOpen,
  };
};
