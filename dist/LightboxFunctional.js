import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo } from "react";
import { LightboxProvider, useSetupState, } from "./ComponentState";
import { LightboxFullScreenPage } from "./pages/LightboxFullScreenPage";
import { handleInitialisingImages } from "./utils/loading";
export const Lightbox = (props) => {
    //if(props.allowExperimentalFeatures) PACKAGE_VERSION = "EXPERIMENTAL"; // add configurability to global state later.
    return (_jsx(LightboxProvider, { children: _jsx(LightboxWrapper, { ...props }) }));
};
export function LightboxWrapper(props) {
    // Might need to tweak requirements
    const { images, onClickImage, onClickNext, onClickPrev, onClose, onSave, onClickThumbnail, showThumbnails, zoomDelay, zoomInternal, resetImageOnLoad, currentImage, } = props;
    const figures = handleInitialisingImages(images || []);
    const pageCount = figures ? figures.length : 0;
    // Memoize the initial state to prevent function reference changes
    const initialState = useMemo(() => ({
        showThumbnails,
        onClickThumbnail,
        onClickImage,
        onClickNext,
        onClickPrev,
        onClose,
        onSave,
        pageCount,
        figures: figures,
        currentImage,
        zoomDelay,
        zoomInternal,
        resetImageOnLoad,
    }), [
        showThumbnails,
        pageCount,
        currentImage,
        onClickThumbnail,
        onClickImage,
        onClickNext,
        onClickPrev,
        onClose,
        onSave,
        figures,
        zoomDelay,
        zoomInternal,
        resetImageOnLoad,
    ]);
    // transfer props to state
    useSetupState(initialState);
    return _jsx(LightboxFullScreenPage, {});
}
