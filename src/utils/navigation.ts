import { ILightboxManipulationState } from "../ComponentState";
import { IImage } from "./types";

// Navigation functions
export function goToThumbnail(
  setCurrentImage: React.Dispatch<React.SetStateAction<number>>,
  images: Array<IImage>,
  index: number,
  onClickThumbnail?: (index: number) => void,
  event?: React.MouseEvent<HTMLImageElement>
) {
  if (!images || images?.length === 0) return;

  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  setCurrentImage(index);

  if (onClickThumbnail) onClickThumbnail(index);
}

// Navigation functions
export function goToNext(
  state: ILightboxManipulationState,
  setCurrentImage: React.Dispatch<React.SetStateAction<number>>,
  images: Array<IImage>,
  currentImage: number,
  onClickNext?: () => void,
  event?: React.MouseEvent<HTMLButtonElement>
) {
  const { imageLoaded } = state;

  if (!images || images?.length === 0) return;

  if (!imageLoaded || currentImage === images?.length - 1) return;

  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  setCurrentImage((prev) => prev + 1);

  if (onClickNext) onClickNext();
}

export function goToPrev(
  state: ILightboxManipulationState,
  setCurrentImage: React.Dispatch<React.SetStateAction<number>>,
  images: Array<IImage>,
  currentImage: number,
  onClickPrev?: () => void,
  event?: React.MouseEvent<HTMLButtonElement>
) {
  const { imageLoaded } = state;

  if (!images || images?.length === 0) return;

  if (!imageLoaded || currentImage === 0) return;

  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  setCurrentImage((prev) => prev - 1);

  if (onClickPrev) onClickPrev();
}
