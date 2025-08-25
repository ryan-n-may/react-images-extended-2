import React from "react";
export declare function SpinnerAtom(): import("react/jsx-runtime").JSX.Element;
export interface IActionButtonProps {
    onClick: (event: React.MouseEvent<HTMLButtonElement> | KeyboardEvent | undefined) => void;
    onHoldDown?: () => void;
    icon: JSX.Element;
    disabled?: boolean;
    holdDelay?: number;
    holdInterval?: number;
    tooltip?: string;
    keyboardKeys?: string[];
}
export declare function ActionButtonAtom({ onClick, onHoldDown, icon, holdDelay, // Start holding after 500ms
holdInterval, // Repeat every 100ms
disabled, keyboardKeys, }: IActionButtonProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Atoms.d.ts.map