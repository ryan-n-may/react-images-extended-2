import { ReactNode } from "react";
export interface ScrollableImageContainerRef {
    scrollTo: (x: number, y: number, behavior?: ScrollBehavior) => void;
    scrollToCenter: () => void;
    scrollToPoint: (x: number, y: number, behavior?: ScrollBehavior) => void;
    getScrollPosition: () => {
        x: number;
        y: number;
    };
    getContainerElement: () => HTMLDivElement | null;
    addScrollListener: (listener: (event: Event) => void) => () => void;
}
export declare const ScrollableImageContainer: import("react").ForwardRefExoticComponent<{
    children: ReactNode;
} & import("react").RefAttributes<ScrollableImageContainerRef>>;
export declare function StyledImageWrapper({ children }: {
    children: ReactNode;
}): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Wrappers.d.ts.map