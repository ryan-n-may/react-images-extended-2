/// <reference types="react" />
import { ILightboxImageState } from "../ComponentState";
import { IImage } from "./types";
export declare function goToThumbnail(setCurrentImage: React.Dispatch<React.SetStateAction<number>>, images: Array<IImage>, index: number, onClickThumbnail?: (index: number) => void, event?: React.MouseEvent<HTMLImageElement>): void;
export declare function goToNext(state: ILightboxImageState, setCurrentImage: React.Dispatch<React.SetStateAction<number>>, images: Array<IImage>, currentImage: number, onClickNext?: () => void, event?: React.MouseEvent<HTMLButtonElement>): void;
export declare function goToPrev(state: ILightboxImageState, setCurrentImage: React.Dispatch<React.SetStateAction<number>>, images: Array<IImage>, currentImage: number, onClickPrev?: () => void, event?: React.MouseEvent<HTMLButtonElement>): void;
//# sourceMappingURL=navigation.d.ts.map