import { ILightboxManipulationState, ILightboxState } from "../ComponentState";
import { IImage } from "./types";
export declare function normalizeSourceSet(data: IImage): string | null;
export declare function preloadImage(state: ILightboxState, updateImageState: (updates: Partial<ILightboxManipulationState>) => void, resetImageOnLoad: boolean): HTMLImageElement;
//# sourceMappingURL=loading.d.ts.map