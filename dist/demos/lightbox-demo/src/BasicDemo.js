"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicDemo = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_2 = require("@chakra-ui/react");
const react_images_extended_2_1 = require("react-images-extended-2");
// Demo images from public APIs
const demoImages = [
    {
        src: 'https://picsum.photos/1200/800?random=1',
        caption: 'Beautiful Landscape 1',
    },
    {
        src: 'https://picsum.photos/1200/800?random=2',
        caption: 'Beautiful Landscape 2',
    },
    {
        src: 'https://picsum.photos/1200/800?random=3',
        caption: 'Beautiful Landscape 3',
    },
    {
        src: 'https://picsum.photos/1200/800?random=4',
        caption: 'Beautiful Landscape 4',
    },
    {
        src: 'https://picsum.photos/1200/800?random=5',
        caption: 'Beautiful Landscape 5',
    },
];
const portraitImages = [
    {
        src: 'https://picsum.photos/600/900?random=6',
        caption: 'Portrait Image 1',
    },
    {
        src: 'https://picsum.photos/600/900?random=7',
        caption: 'Portrait Image 2',
    },
    {
        src: 'https://picsum.photos/600/900?random=8',
        caption: 'Portrait Image 3',
    },
];
const singleImage = [
    {
        src: 'https://picsum.photos/1000/1000?random=9',
        caption: 'Single Square Image',
    },
];
function BasicDemo() {
    const [isOpen, setIsOpen] = (0, react_1.useState)(false);
    const [currentImages, setCurrentImages] = (0, react_1.useState)([]);
    const openLightbox = (images) => {
        setCurrentImages(images);
        setIsOpen(true);
    };
    const closeLightbox = () => {
        setIsOpen(false);
    };
    return ((0, jsx_runtime_1.jsxs)(react_2.Box, { p: 8, maxWidth: "1200px", margin: "0 auto", children: [(0, jsx_runtime_1.jsxs)(react_2.VStack, { spacing: 8, align: "stretch", children: [(0, jsx_runtime_1.jsxs)(react_2.Box, { textAlign: "center", children: [(0, jsx_runtime_1.jsx)(react_2.Heading, { as: "h1", size: "xl", mb: 4, children: "React Images Extended Demo" }), (0, jsx_runtime_1.jsx)(react_2.Text, { fontSize: "lg", color: "gray.600", children: "Click the buttons below to open the lightbox with different image sets" })] }), (0, jsx_runtime_1.jsxs)(react_2.VStack, { spacing: 6, children: [(0, jsx_runtime_1.jsx)(react_2.Card, { width: "100%", children: (0, jsx_runtime_1.jsx)(react_2.CardBody, { children: (0, jsx_runtime_1.jsxs)(react_2.VStack, { spacing: 4, children: [(0, jsx_runtime_1.jsx)(react_2.Heading, { as: "h3", size: "md", children: "Landscape Gallery (5 images)" }), (0, jsx_runtime_1.jsx)(react_2.Text, { color: "gray.600", textAlign: "center", children: "A collection of beautiful landscape images with zoom, rotate, and navigation features" }), (0, jsx_runtime_1.jsx)(react_2.Button, { colorScheme: "blue", size: "lg", onClick: () => openLightbox(demoImages), children: "Open Landscape Gallery" })] }) }) }), (0, jsx_runtime_1.jsx)(react_2.Card, { width: "100%", children: (0, jsx_runtime_1.jsx)(react_2.CardBody, { children: (0, jsx_runtime_1.jsxs)(react_2.VStack, { spacing: 4, children: [(0, jsx_runtime_1.jsx)(react_2.Heading, { as: "h3", size: "md", children: "Portrait Gallery (3 images)" }), (0, jsx_runtime_1.jsx)(react_2.Text, { color: "gray.600", textAlign: "center", children: "Portrait oriented images to test different aspect ratios" }), (0, jsx_runtime_1.jsx)(react_2.Button, { colorScheme: "green", size: "lg", onClick: () => openLightbox(portraitImages), children: "Open Portrait Gallery" })] }) }) }), (0, jsx_runtime_1.jsx)(react_2.Card, { width: "100%", children: (0, jsx_runtime_1.jsx)(react_2.CardBody, { children: (0, jsx_runtime_1.jsxs)(react_2.VStack, { spacing: 4, children: [(0, jsx_runtime_1.jsx)(react_2.Heading, { as: "h3", size: "md", children: "Single Image" }), (0, jsx_runtime_1.jsx)(react_2.Text, { color: "gray.600", textAlign: "center", children: "Test with just one image (square format)" }), (0, jsx_runtime_1.jsx)(react_2.Button, { colorScheme: "purple", size: "lg", onClick: () => openLightbox(singleImage), children: "Open Single Image" })] }) }) })] }), (0, jsx_runtime_1.jsxs)(react_2.Box, { children: [(0, jsx_runtime_1.jsx)(react_2.Heading, { as: "h3", size: "md", mb: 4, children: "Features to Test:" }), (0, jsx_runtime_1.jsxs)(react_2.VStack, { align: "start", spacing: 2, children: [(0, jsx_runtime_1.jsxs)(react_2.Text, { children: ["\u2022 \u26A1 ", (0, jsx_runtime_1.jsx)("strong", { children: "Zoom in/out" }), " - Use the zoom buttons or mouse wheel"] }), (0, jsx_runtime_1.jsxs)(react_2.Text, { children: ["\u2022 \uD83D\uDD04 ", (0, jsx_runtime_1.jsx)("strong", { children: "Rotate" }), " - Rotate images left or right"] }), (0, jsx_runtime_1.jsxs)(react_2.Text, { children: ["\u2022 \u2194\uFE0F ", (0, jsx_runtime_1.jsx)("strong", { children: "Flip" }), " - Flip images horizontally or vertically"] }), (0, jsx_runtime_1.jsxs)(react_2.Text, { children: ["\u2022 \uD83D\uDCF1 ", (0, jsx_runtime_1.jsx)("strong", { children: "Picture-in-Picture" }), " - Open in a resizable floating window"] }), (0, jsx_runtime_1.jsxs)(react_2.Text, { children: ["\u2022 \uD83D\uDDB1\uFE0F ", (0, jsx_runtime_1.jsx)("strong", { children: "Drag to pan" }), " - Drag zoomed images around"] }), (0, jsx_runtime_1.jsxs)(react_2.Text, { children: ["\u2022 \u2328\uFE0F ", (0, jsx_runtime_1.jsx)("strong", { children: "Keyboard navigation" }), " - Arrow keys to navigate"] }), (0, jsx_runtime_1.jsxs)(react_2.Text, { children: ["\u2022 \uD83D\uDDBC\uFE0F ", (0, jsx_runtime_1.jsx)("strong", { children: "Thumbnails" }), " - Quick navigation between images"] }), (0, jsx_runtime_1.jsxs)(react_2.Text, { children: ["\u2022 \uD83C\uDFAF ", (0, jsx_runtime_1.jsx)("strong", { children: "Reset" }), " - Reset image position and zoom"] })] })] })] }), isOpen && ((0, jsx_runtime_1.jsx)(react_images_extended_2_1.Lightbox, { images: currentImages, onClose: closeLightbox, onClickNext: () => console.log('Next clicked'), onClickPrev: () => console.log('Previous clicked'), onClickImage: () => console.log('Image clicked'), showThumbnails: true }))] }));
}
exports.BasicDemo = BasicDemo;
exports.default = BasicDemo;
