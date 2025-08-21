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
  CircleArrowOutUpRight,
  Download,
  BookOpen,
  Image,
  Pin,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { HiddenPortal, Portal } from "./StyledComponents";
import {
  IImageViewMode,
  useLightboxManipulationState,
  useLightboxState,
} from "../ComponentState";
import { handlePinFigure } from "../utils/manipulation";

interface IDefaultHeaderProps {
  pipControls?: {
    open: () => Promise<void>;
    isOpen: () => boolean;
    close: () => void | undefined;
  };

  newTabControls?: {
    open: () => Promise<void>;
  };
}

export function DefaultHeader(props: IDefaultHeaderProps) {
  const lightboxState = useLightboxState();
  const { manipulationState } = useLightboxManipulationState();
  const { imageLoaded } = manipulationState;

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
        icon={<ZoomIn color="white" />}
      />
      <ActionButtonAtom
        tooltip="Zoom out"
        key="zoom-out"
        disabled={!imageLoaded}
        onClick={() => lightboxState.zoomOut()}
        icon={<ZoomOut color="white" />}
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
        icon={<RotateCcwSquare color="white" />}
      />
      <ActionButtonAtom
        tooltip="Rotate right"
        key="rotate-right"
        disabled={!imageLoaded}
        onClick={() => lightboxState.rotateRight()}
        icon={<RotateCwSquare color="white" />}
      />
    </div>
  );

  defaultActions.push(
    <ActionButtonAtom
      tooltip="Extra controls"
      key="toggle-collapse"
      disabled={!imageLoaded}
      onClick={() => toggleShowExtraControls()}
      icon={
        showExtraControls ? (
          <ArrowLeftToLine color="white" />
        ) : (
          <ArrowRightToLine color="white" />
        )
      }
    />
  );

  extraActions.push(
    <div key="flip-controls" className="flex items-center gap-1">
      <ActionButtonAtom
        tooltip="Flip vertical"
        key="flip-vertical"
        disabled={!imageLoaded}
        onClick={() => lightboxState.flipVertical()}
        icon={<FlipVertical2 color="white" />}
      />
      <ActionButtonAtom
        tooltip="Flip horizontal"
        key="flip-horisontal"
        disabled={!imageLoaded}
        onClick={() => lightboxState.flipHorisontal()}
        icon={<FlipHorizontal2 color="white" />}
      />
    </div>
  );

  extraActions.push(
    <ActionButtonAtom
      tooltip="Reset image position"
      key="reset-image"
      disabled={!imageLoaded}
      onClick={() => lightboxState.resetMaipulationState()}
      icon={<RefreshCw color="white" />}
    />
  );

  if (props.pipControls) {
    const { open, isOpen, close } = props.pipControls;
    extraActions.push(
      <ActionButtonAtom
        tooltip="Open PiP"
        key="pip-button"
        disabled={!imageLoaded}
        onClick={() => {
          if (isOpen()) close();
          else
            open().catch((error) => {
              console.error("Error opening PiP:", error);
              close();
            });
        }}
        icon={<PictureInPicture color="white" />}
      />
    );
  }

  if (props.newTabControls) {
    const { open } = props.newTabControls;
    extraActions.push(
      <ActionButtonAtom
        tooltip="New tab"
        key="open-new-tab-button"
        disabled={!imageLoaded}
        onClick={() => {
          open().catch((error) => {
            console.error("Error opening new tab:", error);
            // we do not elect to control the new open tab; no close handlers
          });
        }}
        icon={<CircleArrowOutUpRight color="white" />}
      />
    );
  }

  extraActions.push(
    <ActionButtonAtom
      tooltip="Download"
      key="save-image-button"
      disabled={!imageLoaded}
      onClick={() => {}}
      icon={<Download color="white" />}
    />
  );

  extraActions.push(
    <ActionButtonAtom
      tooltip="Reader mode"
      key="reader-mode-button"
      disabled={!imageLoaded}
      onClick={() => lightboxState.updateViewState(IImageViewMode.READER)}
      icon={<BookOpen color="white" />}
    />
  );

  extraActions.push(
    <ActionButtonAtom
      tooltip="Image mode"
      key="image-mode-button"
      disabled={!imageLoaded}
      onClick={() => lightboxState.updateViewState(IImageViewMode.IMAGE)}
      icon={<Image color="white" />}
    />
  );

  extraActions.push(
    <ActionButtonAtom
      tooltip="Pin image"
      key="pin-image-button"
      disabled={!imageLoaded}
      onClick={() => {
        const pinnedFigure = handlePinFigure(lightboxState.state);
        lightboxState.pinFigure(pinnedFigure);
      }}
      icon={<Pin color="white" />}
    />
  );

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
