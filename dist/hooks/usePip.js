"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDocumentPiP = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
const client_1 = __importDefault(require("react-dom/client"));
function useDocumentPiP() {
    const pipWinRef = (0, react_1.useRef)(null);
    const open = (0, react_1.useCallback)((node_1, ...args_1) => __awaiter(this, [node_1, ...args_1], void 0, function* (node, size = { width: 420, height: 260 }) {
        if (!("documentPictureInPicture" in window))
            throw new Error("DPiP not supported");
        // Must be called in a user gesture (click/tap/keydown)
        const pipWin = yield window.documentPictureInPicture.requestWindow({
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
            const clonedStylesheet = stylesheet.cloneNode(true);
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
        const root = client_1.default.createRoot(host);
        root.render((0, jsx_runtime_1.jsx)(react_1.StrictMode, { children: node }));
        // Cleanup when the PiP window closes or opener navigates away
        const cleanup = () => {
            try {
                root.unmount();
            }
            catch (_a) { }
            pipWinRef.current = null;
        };
        pipWin.addEventListener("pagehide", cleanup, { once: true });
        window.addEventListener("pagehide", () => pipWin.close(), { once: true });
        pipWinRef.current = pipWin;
        return pipWin;
    }), []);
    const close = react_1.default.useCallback(() => { var _a; return (_a = pipWinRef.current) === null || _a === void 0 ? void 0 : _a.close(); }, []);
    return { open, close, isOpen: () => !!pipWinRef.current };
}
exports.useDocumentPiP = useDocumentPiP;
