import React from "react";
export declare function useDocumentPiP(): {
    open: (node: React.ReactNode, size?: {
        width: number;
        height: number;
    }) => Promise<any>;
    close: () => void | undefined;
    isOpen: () => boolean;
    window: React.MutableRefObject<Window | null>;
};
//# sourceMappingURL=usePip.d.ts.map