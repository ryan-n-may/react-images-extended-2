import { jsx as _jsx } from "react/jsx-runtime";
import { DraggableImageFullScreen, DraggableReaderFullScreen, } from "../../components/Draggable";
import { IImageViewMode, ILightboxImageType, } from "../../ComponentState";
import { debuginfo } from "../../utils/log";
export function ImageElementFullscreen(props) {
    const { state } = props;
    const { images, currentIndex, viewMode, sourceType } = state;
    if (sourceType === ILightboxImageType.PDF) {
        throw new Error("Experimental feature not supported in this version of react-iamges-extended-2.");
    }
    else if (sourceType === ILightboxImageType.IMAGE) {
        if (!images[currentIndex]) {
            console.error("Image source is not provided.");
            return null;
        }
        if (viewMode === IImageViewMode.READER) {
            debuginfo(`Rendering DraggableReaderFullScreen for currentImage: ${currentIndex}`);
            return (_jsx(DraggableReaderFullScreen, {}, "image-reader-draggable-fullscreen"));
        }
        debuginfo(`Rendering DraggableImageFullScreen for currentImage: ${currentIndex}`);
        return _jsx(DraggableImageFullScreen, {}, "image-draggable-fullscreen");
    }
}
