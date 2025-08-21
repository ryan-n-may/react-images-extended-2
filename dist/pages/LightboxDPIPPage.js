import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useMemo } from "react";
import { SpinnerAtom } from "../components/Atoms";
import { DraggableImageFullScreen } from "../components/Draggable";
import { ThumbnailsMolecule } from "../components/Molecules";
import { DefaultHeader } from "../components/Organisms";
import { FigureContainerFullScreen } from "../components/StyledComponents";
import { useLightboxState, useLightboxManipulationState, } from "../ComponentState";
import { useLoadImage } from "../hooks/useLoadImage";
import { debuginfo } from "../utils/log";
export function LightboxDPIPPage(props) {
    const lightboxState = useLightboxState();
    const { images, currentIndex, showThumbnails } = lightboxState.state;
    const { manipulationState } = useLightboxManipulationState();
    const { imageLoaded } = manipulationState;
    // Refs to replace instance variables]
    const imageRef = useRef(null);
    useLoadImage();
    const ImageElementFullscreen = useMemo(() => {
        debuginfo(`Rendering ImageElementFullscreen for currentImage: ${currentIndex}`);
        if (!images[currentIndex])
            return null;
        return _jsx(DraggableImageFullScreen, {});
    }, [images, currentIndex, imageRef]);
    const ImageCourasselFullscreen = useMemo(() => {
        debuginfo(`Rendering ImageCourassel for currentImage: ${currentIndex}`);
        return _jsx("figure", { children: ImageElementFullscreen });
    }, [ImageElementFullscreen]);
    props.targetWindowRef?.current?.focus(); // need to actually do something with this, maybe store it in state so we can fix the reset bug...
    return (_jsxs("div", { className: "bg-black text-white h-screen w-screen", children: [_jsx("div", { className: "sticky top-0 z-10", children: _jsx(DefaultHeader, {}) }), imageLoaded && (_jsx(FigureContainerFullScreen, { children: ImageCourasselFullscreen })), !imageLoaded && _jsx(SpinnerAtom, {}), _jsx("div", { className: "sticky bottom-0 z-10", children: showThumbnails && _jsx(ThumbnailsMolecule, {}) })] }, "lightbox-dpip"));
}
