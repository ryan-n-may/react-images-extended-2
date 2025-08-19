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

      // Copy all stylesheets from the main document to the PiP window
      const stylesheets = Array.from(document.querySelectorAll('link[rel="stylesheet"], style'));
      stylesheets.forEach((stylesheet) => {
        const clonedStylesheet = stylesheet.cloneNode(true) as HTMLElement;
        pipWin.document.head.appendChild(clonedStylesheet);
      });

      // Inject critical Tailwind CSS for the lightbox components
      const criticalCSS = `
        .fixed { position: fixed !important; }
        .inset-0 { inset: 0 !important; }
        .w-screen { width: 100vw !important; }
        .h-screen { height: 100vh !important; }
        .flex { display: flex !important; }
        .items-center { align-items: center !important; }
        .justify-center { justify-content: center !important; }
        .justify-between { justify-content: space-between !important; }
        .bg-black { background-color: rgb(0 0 0) !important; }
        .bg-opacity-80 { background-color: rgba(0, 0, 0, 0.8) !important; }
        .bg-gray-100 { background-color: rgb(243 244 246) !important; }
        .bg-transparent { background-color: transparent !important; }
        .sticky { position: sticky !important; }
        .top-0 { top: 0 !important; }
        .bottom-0 { bottom: 0 !important; }
        .z-10 { z-index: 10 !important; }
        .p-2 { padding: 0.5rem !important; }
        .gap-1 { gap: 0.25rem !important; }
        .rounded-lg { border-radius: 0.5rem !important; }
        .min-w-0 { min-width: 0 !important; }
        .flex-wrap { flex-wrap: wrap !important; }
        .relative { position: relative !important; }
        .w-12 { width: 3rem !important; }
        .h-12 { height: 3rem !important; }
        .object-cover { object-fit: cover !important; }
        .rounded-md { border-radius: 0.375rem !important; }
        .border-2 { border-width: 2px !important; }
        .border-white { border-color: rgb(255 255 255) !important; }
        .border-transparent { border-color: transparent !important; }
        .cursor-pointer { cursor: pointer !important; }
        .flex-col { flex-direction: column !important; }
        .overflow-hidden { overflow: hidden !important; }
        .h-[80vh] { height: 80vh !important; }
        .w-full { width: 100% !important; }
        .p-4 { padding: 1rem !important; }
        .box-border { box-sizing: border-box !important; }
      `;
      
      const style = pipWin.document.createElement('style');
      style.textContent = criticalCSS;
      pipWin.document.head.appendChild(style);

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
