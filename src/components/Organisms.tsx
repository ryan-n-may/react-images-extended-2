import { ActionButtonAtom } from "./Atoms";
import { HeaderMolecule } from "./Molecules";
import {
  ZoomIn,
  ZoomOut,
  RotateCcwSquare,
  RotateCwSquare,
  RefreshCw,
  FlipHorizontal2,
  FlipVertical2,
  ArrowRightToLine,
  ArrowLeftToLine,
  PictureInPicture,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { HiddenPortal, Portal } from "./StyledComponents";
import { LightboxProvider, useLightboxState } from "../ComponentState";
import { LightboxDPIP } from "../LightboxFunctional";

interface IDefaultHeaderProps {
  pipControls?: {
    open: (content: JSX.Element) => Promise<void>;
    isOpen: () => boolean;
    close: () => void | undefined;
  };
}

export function DefaultHeader(props: IDefaultHeaderProps) {
  const lightboxState = useLightboxState();
  const { imageLoaded } = lightboxState.state.imageState;

  const [showExtraControls, setShowExtraControls] = useState<boolean>(true);
  const toggleShowExtraControls = () =>
    setShowExtraControls(!showExtraControls);

  const defaultActions = [];
  const extraActions = [];

  defaultActions.push(
    <div key="zoom-buttons" className="flex items-center gap-1">
      <ActionButtonAtom
        tooltip="Zoom in"
        key="zoom-in"
        disabled={!imageLoaded}
        onClick={() => lightboxState.zoomIn()}
        icon={<ZoomIn />}
      />
      <ActionButtonAtom
        tooltip="Zoom out"
        key="zoom-out"
        disabled={!imageLoaded}
        onClick={() => lightboxState.zoomOut()}
        icon={<ZoomOut />}
      />
    </div>
  );

  defaultActions.push(
    <div key="rotate-buttons" className="flex items-center gap-1">
      <ActionButtonAtom
        tooltip="Rotate left"
        key="rotate-left"
        disabled={!imageLoaded}
        onClick={() => lightboxState.rotateLeft()}
        icon={<RotateCcwSquare />}
      />
      <ActionButtonAtom
        tooltip="Rotate right"
        key="rotate-right"
        disabled={!imageLoaded}
        onClick={() => lightboxState.rotateRight()}
        icon={<RotateCwSquare />}
      />
    </div>
  );

  defaultActions.push(
    <ActionButtonAtom
      tooltip="Extra controls"
      key="toggle-collapse"
      disabled={!imageLoaded}
      onClick={() => toggleShowExtraControls()}
      icon={showExtraControls ? <ArrowLeftToLine /> : <ArrowRightToLine />}
    />
  );

  extraActions.push(
    <div key="flip-controls" className="flex items-center gap-1">
      <ActionButtonAtom
        tooltip="Flip vertical"
        key="flip-vertical"
        disabled={!imageLoaded}
        onClick={() => lightboxState.flipVertical()}
        icon={<FlipVertical2 />}
      />
      <ActionButtonAtom
        tooltip="Flip horizontal"
        key="flip-horisontal"
        disabled={!imageLoaded}
        onClick={() => lightboxState.flipHorisontal()}
        icon={<FlipHorizontal2 />}
      />
    </div>
  );

  extraActions.push(
    <ActionButtonAtom
      tooltip="Reset image position"
      key="reset-image"
      disabled={!imageLoaded}
      onClick={() => lightboxState.resetImageState()}
      icon={<RefreshCw />}
    />
  );

  if (props.pipControls) {
    const { open, isOpen, close } = props.pipControls;
    extraActions.push(
      <button
        key="pip-button"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          if (isOpen()) close();
          else
            open(
              <>
                <LightboxProvider initialState={lightboxState.state}>
                  <LightboxDPIP />
                </LightboxProvider>
              </>
            ).catch((error) => {
              console.error("Error opening PiP:", error);
              close();
            });
        }}
      >
        <PictureInPicture />
      </button>
    );
  }

  return (
    <HeaderMolecule
      controls={defaultActions}
      extraControls={extraActions}
      showCloseButton
      showExtraControls={showExtraControls}
    />
  );
}

export function Modal({
  children,
  hidden,
}: {
  children: JSX.Element;
  hidden: boolean;
}) {
  const portalElementRef = useRef<HTMLDivElement | null>(null);
  const nodeRef = useRef(null);

  // Create portal element on mount
  useEffect(() => {
    if (!portalElementRef.current) {
      const portalDiv = document.createElement("div");
      document.body.appendChild(portalDiv);
      portalElementRef.current = portalDiv;
    }

    // Cleanup on unmount
    return () => {
      if (portalElementRef.current) {
        document.body.removeChild(portalElementRef.current);
        portalElementRef.current = null;
      }
    };
  }, []);

  // Don't render anything until portal element is created
  if (!portalElementRef.current) {
    return null;
  }

  if (hidden) {
    return createPortal(
      <HiddenPortal>
        <div ref={nodeRef}>{children}</div>
      </HiddenPortal>,
      portalElementRef.current
    );
  }

  return createPortal(
    <Portal>
      <div ref={nodeRef}>{children}</div>
    </Portal>,
    portalElementRef.current
  );
}
