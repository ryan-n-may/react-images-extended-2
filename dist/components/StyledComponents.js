import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { HEADER_Z_INDEX, FOOTER_Z_INDEX, MODAL_Z_INDEX, IMAGE_Z_INDEX, } from "../utils/constants";
import { Document, Page } from "react-pdf";
// Portal Components
export const HiddenPortal = (props) => (_jsx("div", { className: "fixed inset-0 w-screen h-screen flex items-center justify-center invisible bg-transparent", style: { zIndex: -MODAL_Z_INDEX }, ...props }));
export const Portal = (props) => (_jsx("div", { className: "fixed inset-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-90", style: { zIndex: MODAL_Z_INDEX }, ...props }));
export const Thumbnail = ({ active, ...props }) => (_jsx("img", { className: `w-12 h-12 relative object-cover rounded-md border-2 cursor-pointer ${active ? "border-white" : "border-transparent"}`, style: { zIndex: FOOTER_Z_INDEX }, ...props }));
// Control Components
export const CollapsedControls = (props) => (_jsx("div", { className: "bg-neutral-900 bg-opacity-90 p-2 relative rounded-lg gap-1 flex items-center justify-between flex-wrap min-w-0", ...props }));
export const ThumnailBar = (props) => (_jsx("div", { className: "bg-neutral-900 bg-opacity-90 p-2 relative rounded-lg gap-1 flex items-center justify-between flex-wrap min-w-0", style: { zIndex: HEADER_Z_INDEX }, ...props }));
export const ThumbnailScroller = (props) => (_jsx("div", { className: "flex items-center justify-center gap-1 min-w-0", style: { zIndex: HEADER_Z_INDEX }, ...props }));
export const VerticalThumbnailScroller = (props) => (_jsx("div", { className: "flex flex-col items-center justify-center gap-2 min-w-0 h-full overflow-y-auto", style: { zIndex: HEADER_Z_INDEX }, ...props }));
export const LeftGradientThumbnail = (props) => {
    const fractionalScale = (props.progressiveScale ?? 100) / 100;
    return (_jsx("img", { className: `w-12 h-12 relative object-cover rounded-md cursor-pointer shadow-md opacity-75 transform-gpu`, style: {
            opacity: fractionalScale,
        }, ...props }));
};
export const RightGradientThumbnail = (props) => {
    const fractionalScale = (props.progressiveScale ?? 100) / 100;
    return (_jsx("img", { className: `w-12 h-12 relative object-cover rounded-md cursor-pointer shadow-md opacity-75 transform-gpu`, style: {
            opacity: fractionalScale,
        }, ...props }));
};
export const PinnedThumbnail = (props) => (_jsx("div", { className: "rounded-md border-2 border-white", children: _jsx("img", { className: `w-12 h-12 relative object-cover rounded-md cursor-pointer shadow-md opacity-100 transform-gpu`, ...props }) }));
export const NoGradientThumbnail = (props) => (_jsx("div", { className: "rounded-md border-2 border-white", children: _jsx("img", { className: `w-12 h-12 relative object-cover rounded-md cursor-pointer shadow-md opacity-100 transform-gpu`, ...props }) }));
export const Header = (props) => (_jsx("div", { className: "relative gap-2 flex items-center justify-center flex-wrap min-w-0", style: {
        zIndex: HEADER_Z_INDEX,
        ...props.style,
    }, ...props }));
export const HeaderGroup = (props) => (_jsx("div", { className: "bg-neutral-900 bg-opacity-90 p-2 relative rounded-lg gap-1 flex items-center justify-between flex-wrap min-w-0", style: {
        zIndex: HEADER_Z_INDEX,
        ...props.style,
    }, ...props }));
export const PageCount = (props) => (_jsx("div", { className: "text-white p-2 relative rounded-lg gap-1 flex items-center justify-between flex-wrap min-w-0", style: {
        zIndex: HEADER_Z_INDEX,
        ...props.style,
    }, ...props }));
export const HeaderPiP = (props) => (_jsx("div", { className: "bg-gray-100 bg-opacity-90 p-1 relative rounded-lg gap-0.5 flex items-center justify-between min-w-0 flex-shrink", style: {
        zIndex: HEADER_Z_INDEX,
        ...props.style,
    }, ...props }));
// Image Components
export const ImageFullscreen = (props) => (_jsx("img", { className: "relative w-full h-full overflow-auto", style: { zIndex: IMAGE_Z_INDEX }, ...props }));
export const ReaderModeImageFullscreen = (props) => (_jsxs("div", { className: "flex w-full h-full gap-2", ...props.manipulation, children: [_jsx("img", { index: 1, className: "relative w-full h-full overflow-auto block", style: { zIndex: IMAGE_Z_INDEX }, ...props.image1 }), _jsx("img", { index: 2, className: "relative w-full h-full overflow-auto block", style: { zIndex: IMAGE_Z_INDEX }, ...props.image2 })] }));
export const PdfFullscreen = (props) => {
    const [_numPages, setNumPages] = useState(null);
    const [error, setError] = useState(null);
    console.log("PdfFullscreen props:", props); // Debug log
    return (_jsx("div", { className: "relative w-full h-full flex items-center justify-center bg-gray-100", children: _jsx(Document, { file: props.file, onLoadSuccess: ({ numPages }) => {
                console.log("PDF loaded successfully, pages:", numPages);
                setNumPages(numPages);
                setError(null);
            }, onLoadError: (error) => {
                console.error("PDF load error:", error);
                setError("Failed to load PDF");
            }, loading: _jsx("div", { className: "text-black bg-white p-4 rounded", children: "Loading PDF..." }), error: _jsxs("div", { className: "text-red-500 bg-white p-4 rounded", children: ["Error loading PDF: ", error] }), children: _jsx(Page, { pageNumber: props.pageNumber || 1, onLoadSuccess: () => {
                    console.log("Page loaded successfully");
                }, onLoadError: (error) => {
                    console.error("Page load error:", error);
                }, loading: _jsx("div", { className: "text-black bg-white p-4 rounded", children: "Loading page..." }), error: _jsx("div", { className: "text-red-500 bg-white p-4 rounded", children: "Error loading page" }), renderTextLayer: false, renderAnnotationLayer: false, width: Math.min(window.innerWidth * 0.8, 800) }) }) }));
};
export const ImageComponent = (props) => (_jsx("img", { className: "relative overflow-auto block", style: { zIndex: IMAGE_Z_INDEX }, ...props }));
export const ImageContainer = (props) => (_jsx("div", { className: "relative w-full h-full flex items-center justify-center overflow-scroll", style: { zIndex: IMAGE_Z_INDEX }, ...props }));
export const ImageSpinnerWrapper = (props) => (_jsx("div", { className: "flex items-center justify-center w-screen h-screen", ...props }));
export const FigureContainerFullScreen = (props) => (_jsx("div", { className: "h-[80vh] w-full p-4 box-border flex flex-col items-center justify-center", ...props }));
