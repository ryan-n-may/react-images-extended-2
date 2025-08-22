import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo } from "react";
import { LightboxProvider, useSetupState, ILightboxImageType, } from "./ComponentState";
import { LightboxFullScreenPage } from "./pages/LightboxFullScreenPage";
import "./pdf";
export const Lightbox = (props) => {
    //if(props.allowExperimentalFeatures) PACKAGE_VERSION = "EXPERIMENTAL"; // add configurability to global state later. 
    return (_jsx(LightboxProvider, { children: _jsx(LightboxWrapper, { ...props }) }));
};
export function LightboxWrapper(props) {
    // Might need to tweak requirements
    const { images, pdfSource, onClickImage, onClickNext, onClickPrev, onClose, onSave, showThumbnails, onClickThumbnail, } = props;
    if (images && images.length > 0 && Boolean(pdfSource)) {
        throw new Error("Cannot use pdfSource with images. Please provide either images or pdfSource.");
    }
    // DETERMINE THE APPROPRIATE SOURCE TYPE FOR PDF OR IMAGE.
    const sourceType = pdfSource
        ? ILightboxImageType.PDF
        : ILightboxImageType.IMAGE;
    console.log(`Lightbox initialized with sourceType: ${sourceType}`); // Debugging log
    let pageCount = 0;
    if (sourceType === ILightboxImageType.PDF) {
        pageCount = 0;
    }
    else {
        pageCount = images ? images.length : 0;
    }
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
        images: images || [],
        pdfDocumentSrc: pdfSource || "",
        sourceType,
        currentImage: 0, // Default to first image
    }), [
        showThumbnails,
        pageCount,
        onClickThumbnail,
        onClickImage,
        onClickNext,
        onClickPrev,
        onClose,
        onSave,
        images,
        sourceType,
    ]);
    // transfer props to state
    useSetupState(initialState);
    return _jsx(LightboxFullScreenPage, {});
}
