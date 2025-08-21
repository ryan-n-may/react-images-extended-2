import { jsx as _jsx } from "react/jsx-runtime";
import { useCallbackMethods, useCurrentImage, useLightboxState, } from "../ComponentState";
import { debuginfo } from "../utils/log";
import { ImageFullscreen, PdfFullscreen, ReaderModeImageFullscreen, } from "./StyledComponents";
import { Draggable } from "./Wrappers";
export function DraggableImageFullScreen() {
    const currentImage = useCurrentImage();
    const { onCLickFigure } = useCallbackMethods();
    return (_jsx(Draggable, { children: _jsx(ImageFullscreen, { onClick: onCLickFigure, alt: currentImage.alt, src: currentImage.src }) }));
}
export function DraggableReaderFullScreen() {
    const currentImage = useCurrentImage();
    const { onCLickFigure } = useCallbackMethods();
    const { state } = useLightboxState();
    const imageArray = state.images || [];
    const currentImageIndex = state.currentIndex || 0;
    let nextIndex = currentImageIndex + 1;
    if (nextIndex >= imageArray.length)
        nextIndex = currentImageIndex;
    const nextImage = imageArray[nextIndex] || null;
    return (_jsx(Draggable, { children: _jsx(ReaderModeImageFullscreen, { image1: {
                onClick: onCLickFigure,
                alt: currentImage.alt,
                src: currentImage.src,
            }, image2: {
                onClick: onCLickFigure,
                alt: nextImage.alt,
                src: nextImage.src,
            } }) }));
}
export function DraggablePdfFullScreen() {
    const { state } = useLightboxState();
    const { currentIndex: index, pdfDocumentSrc } = state;
    debuginfo(`DraggablePdfFullscreen props: ${pdfDocumentSrc} ${index}`);
    return (_jsx(Draggable, { children: _jsx(PdfFullscreen, { file: pdfDocumentSrc, pageNumber: index + 1 }) }));
}
