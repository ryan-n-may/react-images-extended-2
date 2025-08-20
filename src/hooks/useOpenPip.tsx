import {
  ILightboxState,
  LightboxProvider,
  useCallbackMethods,
} from "../ComponentState";
import { LightboxDPIPPage } from "../pages/LightboxDPIPPage";
import { useDocumentPiP } from "./usePip";

export const useOpenPip = (lightboxState: ILightboxState) => {
  const {
    open: pipOpen,
    close,
    isOpen,
    window: targetWindowRef,
  } = useDocumentPiP();
  const callbackMethods = useCallbackMethods();

  const handlePipOpen = async () => {
    try {
      pipOpen(
        <LightboxProvider initialState={lightboxState}>
          <LightboxDPIPPage targetWindowRef={targetWindowRef ?? undefined} />
        </LightboxProvider>
      ); // passing current state to pipOpen
      callbackMethods.onClose?.(); // close main component when PIP opened
    } catch (error) {
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
