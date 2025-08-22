import { ILightboxManipulationState, ILightboxState } from "../ComponentState";
export declare function getImageCenterXY(state: ILightboxManipulationState): {
    x: number;
    y: number;
};
export declare function getImgWidthHeight(imgWidth: number, imgHeight: number): [number, number];
export declare function zoomManipulationToPoint(state: ILightboxManipulationState, position: {
    x: number;
    y: number;
}): Partial<ILightboxManipulationState> | undefined;
export declare function zoomToAFactor(notchNumber: number): Partial<ILightboxManipulationState>;
export declare function zoomManipulation(zoomingIn: boolean, state: ILightboxManipulationState, zoomFactor?: number): Partial<ILightboxManipulationState> | undefined;
export declare function flipManipulation(state: ILightboxManipulationState, isHorisontal?: boolean): Partial<ILightboxManipulationState>;
export declare function rotateManipulation(state: ILightboxManipulationState, isRight?: boolean): Partial<ILightboxManipulationState>;
export interface IPinnedState {
    imageState: ILightboxManipulationState;
    imageIndex: number;
}
export declare function handlePinFigure(state: ILightboxState): IPinnedState;
export declare function handleReset(state: ILightboxState): Partial<ILightboxManipulationState>;
//# sourceMappingURL=manipulation.d.ts.map