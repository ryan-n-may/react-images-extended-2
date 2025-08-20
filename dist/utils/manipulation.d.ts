import { ILightboxImageState, ILightboxState } from "../ComponentState";
export declare function getImageCenterXY(state: ILightboxImageState): {
    x: number;
    y: number;
};
export declare function getImgWidthHeight(imgWidth: number, imgHeight: number): [number, number];
export declare function zoomManipulation(zoomingIn: boolean, state: ILightboxImageState): Partial<ILightboxImageState> | undefined;
export declare function flipManipulation(state: ILightboxImageState, isHorisontal?: boolean): Partial<ILightboxImageState>;
export declare function rotateManipulation(state: ILightboxImageState, isRight?: boolean): Partial<ILightboxImageState>;
export interface IPinnedState {
    imageState: ILightboxImageState;
    imageIndex: number;
}
export declare function pinImage(state: ILightboxState): IPinnedState;
export declare function handleReset(state: ILightboxState): Partial<ILightboxImageState>;
//# sourceMappingURL=manipulation.d.ts.map