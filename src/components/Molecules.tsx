import { IconButton, Collapsible, Box } from "@chakra-ui/react";
import { ActionButtonAtom, ThumbnailAtom } from "./Atoms";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { CollapsedControls, Header, ThumnailBar } from "./StyledComponents";
import {
  useCallbackMethods,
  useLightboxImages,
  useLightboxState,
} from "../ComponentState";
import { useEffect } from "react";
import { debuginfo } from "../utils/log";
import ReactDraggable, { DraggableData, DraggableEvent } from "react-draggable";
import { Resizable } from "re-resizable";

export interface IThumbnailsMoleculeProps {
  size?: string;
}

export function ThumbnailsMolecule({ size = "sm" }: IThumbnailsMoleculeProps) {
  const imageState = useLightboxImages();
  const callBacks = useCallbackMethods();
  return (
    <ThumnailBar>
      <ActionButtonAtom
        tooltip="Previous Image"
        icon={<ArrowLeft />}
        onClick={() => {
          imageState.prevImage();
          if (callBacks.onClickPrev) callBacks.onClickPrev();
        }}
        disabled={imageState.currentImage === 0}
      />

      {size !== "xs" &&
        imageState.images.map((img, idx) => {
          if (!img.src) return null;
          return (
            <ThumbnailAtom
              src={img.src}
              size={size}
              active={idx === imageState.currentImage}
              index={idx}
              key={idx}
              onClick={() => {
                imageState.toImage(idx);
                if (callBacks.onClickThumbnail) callBacks.onClickThumbnail();
              }}
            />
          );
        })}

      <ActionButtonAtom
        tooltip="Next Image"
        icon={<ArrowRight />}
        onClick={() => {
          imageState.nextImage();
          if (callBacks.onClickNext) callBacks.onClickNext();
        }}
        disabled={imageState.currentImage !== imageState.images.length - 1}
      />
    </ThumnailBar>
  );
}

export interface IHeaderProps {
  controls?: Array<JSX.Element>;
  extraControls?: Array<JSX.Element>;
  showCloseButton?: boolean;
  showExtraControls?: boolean; // Add this to control visibility
}

export function HeaderMolecule({
  controls,
  extraControls,
  showCloseButton,
  showExtraControls,
}: IHeaderProps) {
  const callBacks = useCallbackMethods();
  return (
    <>
      <Header className="pip-drag-handle">
        {controls ? controls : <></>}
        <Collapsible.Root
          in={showExtraControls}
          transition={{ enter: { duration: 0.3 }, exit: { duration: 0.2 } }}
        >
          <Collapsible.Content>
            <CollapsedControls> {extraControls} </CollapsedControls>
          </Collapsible.Content>
        </Collapsible.Root>
        {!!showCloseButton && (
          <IconButton onClick={callBacks.onClose} aria-label={""}>
            <X />
          </IconButton>
        )}
      </Header>
    </>
  );
}

export function PositionedBox({ children }: { children: React.ReactNode }) {
  const state = useLightboxState();

  useEffect(() => {
    debuginfo(
      `Pip position left: ${state.state.pipPosition.left}, top: ${state.state.pipPosition.top}`
    );
  }, [state.state.pipPosition]);

  return (
    <ReactDraggable
      handle=".pip-drag-handle"
      defaultPosition={{ x: 0, y: 0 }}
      onStop={(_e: DraggableEvent, data: DraggableData) => {
        console.log("Final position:", data.x, data.y);
        state.setPiPPosition(data.y, data.x);
      }}
    >
      <Resizable
        defaultSize={{ width: 400, height: 600 }}
        minWidth={100}
        minHeight={100}
        maxWidth={800}
        maxHeight={800}
      >
        <Box
          position="relative"
          width="100%"
          height="100%"
          background="white"
          border="2px"
          borderRadius={10}
          overflow={"hidden"}
        >
          {children}
        </Box>
      </Resizable>
    </ReactDraggable>
  );
}
