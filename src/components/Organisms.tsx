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
  PictureInPicture,
  Maximize2,
  ArrowRightToLine,
  ArrowLeftToLine,
} from "lucide-react";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { HiddenPortal, Portal } from "./StyledComponents";
import { HStack } from "@chakra-ui/react";
import { LightboxDisplayMode, useLightboxState } from "../ComponentState";

export function DefaultHeader({
  containerWidthRef,
  containerHeightRef,
}: {
  containerWidthRef: MutableRefObject<number>;
  containerHeightRef: MutableRefObject<number>;
}) {
  const lightboxState = useLightboxState();
  const { imageLoaded } = lightboxState.state.imageState;
  const currentDisplayMode = lightboxState.state.displayMode;

  const [showExtraControls, setShowExtraControls] = useState<boolean>(true);
  const toggleShowExtraControls = () =>
    setShowExtraControls(!showExtraControls);

  const defaultActions = [];
  const extraActions = [];

  defaultActions.push(
    <HStack key="zoom-buttons" gap="1">
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
    </HStack>
  );

  defaultActions.push(
    <HStack key="rotate-buttons" gap="1">
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
    </HStack>
  );

  if (currentDisplayMode !== LightboxDisplayMode.PIP) {
    defaultActions.push(
      <ActionButtonAtom
        tooltip="Enter Picture-in-Picture mode"
        key="toggle-pip"
        disabled={!imageLoaded}
        onClick={() => {
          lightboxState.setDisplayMode(LightboxDisplayMode.PIP);
        }}
        icon={<PictureInPicture />}
      />
    );
  }

  if (currentDisplayMode !== LightboxDisplayMode.FULLSCREEN) {
    defaultActions.push(
      <ActionButtonAtom
        tooltip="Toggle fullscreen mode"
        key="toggle-fullscreen"
        disabled={!imageLoaded}
        onClick={() => {
          lightboxState.setDisplayMode(LightboxDisplayMode.FULLSCREEN);
          lightboxState.resetImageState(
            containerWidthRef.current,
            containerHeightRef.current
          );
        }}
        icon={<Maximize2 />}
      />
    );
  }

  if (currentDisplayMode !== LightboxDisplayMode.PIP) {
    defaultActions.push(
      <ActionButtonAtom
        tooltip="Extra controls"
        key="toggle-collapse"
        disabled={!imageLoaded}
        onClick={() => toggleShowExtraControls()}
        icon={showExtraControls ? <ArrowLeftToLine /> : <ArrowRightToLine />}
      />
    );
  }

  extraActions.push(
    <HStack key="flip-controls" gap="1">
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
    </HStack>
  );

  extraActions.push(
    <ActionButtonAtom
      tooltip="Reset image position"
      key="reset-image"
      disabled={!imageLoaded}
      onClick={() =>
        lightboxState.resetImageState(
          containerWidthRef.current,
          containerHeightRef.current
        )
      }
      icon={<RefreshCw />}
    />
  );

  return (
    <HeaderMolecule
      controls={defaultActions}
      extraControls={extraActions}
      showCloseButton
      showExtraControls={
        showExtraControls && currentDisplayMode !== LightboxDisplayMode.PIP
      }
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
