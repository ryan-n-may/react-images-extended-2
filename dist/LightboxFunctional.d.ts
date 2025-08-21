import { ILightboxState } from "./ComponentState";
import { IImage } from "./utils/types";
export interface ICustomControl {
    label: string;
    icon: string;
    onClick: (state?: ILightboxState) => Partial<ILightboxState>;
    isDisabled?: (state?: ILightboxState) => boolean;
    isActive?: (state?: ILightboxState) => boolean;
}
export interface ILightboxProps {
    pdfSource?: string;
    images?: Array<IImage>;
    customControls?: Array<ICustomControl>;
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
    showCloseButton?: boolean;
    showThumbnails?: boolean;
}
export declare const Lightbox: (props: ILightboxProps) => import("react/jsx-runtime").JSX.Element;
export declare function LightboxWrapper(props: ILightboxProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=LightboxFunctional.d.ts.map