/// <reference types="react" />
interface IDefaultHeaderProps {
    pipControls?: {
        open: (content: JSX.Element) => Promise<void>;
        isOpen: () => boolean;
        close: () => void | undefined;
    };
}
export declare function DefaultHeader(props: IDefaultHeaderProps): import("react/jsx-runtime").JSX.Element;
export declare function Modal({ children, hidden, }: {
    children: JSX.Element;
    hidden: boolean;
}): import("react").ReactPortal | null;
export {};
//# sourceMappingURL=Organisms.d.ts.map