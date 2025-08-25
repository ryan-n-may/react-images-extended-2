import { ILightboxTrackedImage } from "../ComponentState";
export declare function getImageCenterXY(figure: ILightboxTrackedImage): {
    x: number;
    y: number;
};
export declare function getImgWidthHeight(imgWidth: number, imgHeight: number): [number, number];
export declare const scaleFactors: number[];
export declare function zoomManipulationToPoint(figure: ILightboxTrackedImage, position: {
    x: number;
    y: number;
}): Partial<ILightboxTrackedImage> | undefined;
export declare function zoomManipulation(zoomingIn: boolean, figure: ILightboxTrackedImage): Partial<ILightboxTrackedImage> | undefined;
export declare function flipManipulation(figure: ILightboxTrackedImage, isHorisontal?: boolean): Partial<ILightboxTrackedImage>;
export declare function rotateManipulation(figure: ILightboxTrackedImage, isRight?: boolean): Partial<ILightboxTrackedImage>;
export declare function resetOnAbsence(trackedImage: ILightboxTrackedImage): Partial<ILightboxTrackedImage>;
export declare function handleReset(trackedImage: ILightboxTrackedImage): Partial<ILightboxTrackedImage>;
//# sourceMappingURL=manipulation.d.ts.map