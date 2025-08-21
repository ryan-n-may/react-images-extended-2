import { jsx as _jsx } from "react/jsx-runtime";
import { useCallback, StrictMode } from "react";
import ReactDOM from "react-dom/client";
export function useNewTab() {
    const open = useCallback(async (node) => {
        const newTab = window.open("", "_blank");
        if (!newTab) {
            throw new Error("Failed to open new tab - popup blocked?");
        }
        newTab.document.title = "Document Viewer";
        // Create a host element and mount React into the PiP window
        const host = newTab.document.createElement("div");
        if (!host) {
            throw new Error("Failed to create host element");
        }
        host.style.all = "unset"; // avoid default margins
        newTab.document.body.style.margin = "0";
        newTab.document.body.appendChild(host);
        // Copy all stylesheets from the main document to the PiP window
        const stylesheets = Array.from(document.querySelectorAll('link[rel="stylesheet"], style'));
        stylesheets.forEach((stylesheet) => {
            const clonedStylesheet = stylesheet.cloneNode(true);
            newTab.document.head.appendChild(clonedStylesheet);
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
        const style = newTab.document.createElement("style");
        style.textContent = criticalCSS;
        newTab.document.head.appendChild(style);
        let root = undefined;
        try {
            root = ReactDOM.createRoot(host);
            root.render(_jsx(StrictMode, { children: node }));
        }
        catch (error) {
            newTab.close();
            throw new Error(`Failed to render React component: ${error}`);
        }
        finally {
            if (!root) {
                newTab.close();
                throw new Error("Failed to create React root");
            }
        }
        return newTab;
    }, []);
    return { open };
}
