/// <reference types="react" />
import { ILightboxContext, ILightboxTrackedImage } from "../ComponentState";
export declare function ImageArrayFullScreen(): import("react/jsx-runtime").JSX.Element;
export interface ImageAtIndexFullScreenProps {
    componentIndex: number;
}
export declare function ImageAtIndexFullScreen(props: ImageAtIndexFullScreenProps): import("react/jsx-runtime").JSX.Element;
export interface ImageAtIndexFullScreenMemoProps {
    lightboxState: ILightboxContext;
    currentFigure: ILightboxTrackedImage;
}
export declare const ImageAtIndexFullScreenMemo: import("react").MemoExoticComponent<(props: ImageAtIndexFullScreenMemoProps) => import("react/jsx-runtime").JSX.Element>;
//# sourceMappingURL=Draggable.d.ts.map