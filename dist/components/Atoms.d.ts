import React from "react";
export declare function SpinnerAtom(): import("react/jsx-runtime").JSX.Element;
export interface IThumbnailAtomProps {
    index: number;
    src: string;
    size: string;
    thumbnail?: string;
    active?: boolean;
    onClick: (event: React.MouseEvent<HTMLImageElement>) => void;
}
export declare function ThumbnailAtom({ index, src, active, onClick, }: IThumbnailAtomProps): import("react/jsx-runtime").JSX.Element;
export interface IIconSwitcherButtonProps {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    icon: JSX.Element;
    iconOnHover: JSX.Element;
    disabled?: boolean;
}
export declare function IconSwitcherButton({ onClick, icon, iconOnHover, disabled, }: IIconSwitcherButtonProps): import("react/jsx-runtime").JSX.Element;
export interface IActionButtonProps {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    icon: JSX.Element;
    disabled?: boolean;
    tooltip: string;
}
export declare function ActionButtonAtom({ onClick, icon, tooltip, disabled, }: IActionButtonProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Atoms.d.ts.map