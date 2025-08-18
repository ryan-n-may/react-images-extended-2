import React, { useRef, useCallback, StrictMode } from "react";
import ReactDOM from "react-dom/client";

export function useDocumentPiP() {
  const pipWinRef = useRef<Window | null>(null);

  const open = useCallback(
    async (node: React.ReactNode, size = { width: 420, height: 260 }) => {
      if (!("documentPictureInPicture" in window))
        throw new Error("DPiP not supported");

      // Must be called in a user gesture (click/tap/keydown)
      const pipWin = await (
        window as any
      ).documentPictureInPicture.requestWindow({
        width: size.width,
        height: size.height,
        disallowReturnToOpener: false, // show “back to tab” button
        preferInitialWindowPlacement: false,
      });

      // Create a host element and mount React into the PiP window
      const host = pipWin.document.createElement("div");
      host.style.all = "unset"; // avoid default margins
      pipWin.document.body.style.margin = "0";
      pipWin.document.body.appendChild(host);

      const root = ReactDOM.createRoot(host);
      root.render(<StrictMode>{node}</StrictMode>);

      // Cleanup when the PiP window closes or opener navigates away
      const cleanup = () => {
        try {
          root.unmount();
        } catch {}
        pipWinRef.current = null;
      };
      pipWin.addEventListener("pagehide", cleanup, { once: true });
      window.addEventListener("pagehide", () => pipWin.close(), { once: true });

      pipWinRef.current = pipWin;
      return pipWin;
    },
    []
  );

  const close = React.useCallback(() => pipWinRef.current?.close(), []);

  return { open, close, isOpen: () => !!pipWinRef.current };
}
