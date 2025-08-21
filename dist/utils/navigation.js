// Navigation functions
export function goToThumbnail(setCurrentImage, images, index, onClickThumbnail, event) {
    if (!images || images?.length === 0)
        return;
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    setCurrentImage(index);
    if (onClickThumbnail)
        onClickThumbnail(index);
}
// Navigation functions
export function goToNext(state, setCurrentImage, images, currentImage, onClickNext, event) {
    const { imageLoaded } = state;
    if (!images || images?.length === 0)
        return;
    if (!imageLoaded || currentImage === images?.length - 1)
        return;
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    setCurrentImage((prev) => prev + 1);
    if (onClickNext)
        onClickNext();
}
export function goToPrev(state, setCurrentImage, images, currentImage, onClickPrev, event) {
    const { imageLoaded } = state;
    if (!images || images?.length === 0)
        return;
    if (!imageLoaded || currentImage === 0)
        return;
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    setCurrentImage((prev) => prev - 1);
    if (onClickPrev)
        onClickPrev();
}
