import { ReactNode } from "react";
export interface ILightboxStateUpdateControls {
    updateStyle: (style: any) => void;
    setIsDragging: (isDragging: boolean) => void;
    updatePosition: (left: number, top: number) => void;
    getPosition: () => {
        left: number;
        top: number;
    };
    getDimensions: () => {
        width: number;
        height: number;
    };
    getScale: () => {
        scaleX: number;
        scaleY: number;
    };
    getRotation: () => {
        rotate: number;
    };
    getIsDragging: () => boolean;
    children: ReactNode;
}
export declare function Draggable({ children }: {
    children: ReactNode;
}): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Wrappers.d.ts.map