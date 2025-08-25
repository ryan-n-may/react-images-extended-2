import { ILightboxState, ILightboxTrackedImage } from "../ComponentState";
import { IImage } from "./types";
export declare function normalizeSourceSet(data: IImage): string | null;
export declare function handleInitialisingImages(images: Array<IImage>): ILightboxTrackedImage[];
export declare function preloadImage(state: ILightboxState, updateLightboxState: (updates: Partial<ILightboxState>) => void): HTMLImageElement;
//# sourceMappingURL=loading.d.ts.map