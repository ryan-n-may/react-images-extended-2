import { MutableRefObject } from "react";
import { ILightboxImageState } from "../ComponentState";
export declare function getImageCenterXY(state: ILightboxImageState): {
    x: number;
    y: number;
};
export declare function getImgWidthHeight(imgWidth: number, imgHeight: number, footerHeightRef: MutableRefObject<number>): [number, number];
export declare function zoomManipulation(zoomingIn: boolean, state: ILightboxImageState): Partial<ILightboxImageState> | undefined;
export declare function flipManipulation(state: ILightboxImageState, isHorisontal?: boolean): Partial<ILightboxImageState>;
export declare function rotateManipulation(state: ILightboxImageState, isRight?: boolean): Partial<ILightboxImageState>;
export declare function handleReset(imageWidth: number, imageHeight: number): Partial<ILightboxImageState>;
//# sourceMappingURL=manipulation.d.ts.map