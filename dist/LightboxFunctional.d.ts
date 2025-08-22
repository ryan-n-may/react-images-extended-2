import { ILightboxState } from "./ComponentState";
import { IImage } from "./utils/types";
export interface ICustomControl {
    label: string;
    icon: string;
    onClick: (state?: ILightboxState) => Partial<ILightboxState>;
    isDisabled?: (state?: ILightboxState) => boolean;
    isActive?: (state?: ILightboxState) => boolean;
}
export interface ILightboxProps extends IStableLightboxProps {
    pdfSource?: string;
    customControls?: Array<ICustomControl>;
    showCloseButton?: boolean;
    showThumbnails?: boolean;
}
interface IStableLightboxProps {
    images?: Array<IImage>;
    onClickImage?: () => void;
    onClickNext?: () => void;
    onClickPrev?: () => void;
    onClose?: () => void;
    onRotateLeft?: () => void;
    onRotateRight?: () => void;
    onZoomIn?: () => void;
    onZoomOut?: () => void;
    onSave?: (currentImage: number, state: {
        zoom: number;
        rotation: number;
    }) => void;
    onClickThumbnail?: () => void;
}
export declare const Lightbox: (props: ILightboxProps) => import("react/jsx-runtime").JSX.Element;
export declare function LightboxWrapper(props: ILightboxProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=LightboxFunctional.d.ts.map