import { IconButton, Collapse } from "@chakra-ui/react";
import { ActionButtonAtom, ThumbnailAtom } from "./Atoms";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { CollapsedControls, Header, ThumnailBar } from "./StyledComponents";
import {
  useCallbackMethods,
  useLightboxImages,
} from "../ComponentState";

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
        <Collapse
          in={showExtraControls}
          transition={{ enter: { duration: 0.3 }, exit: { duration: 0.2 } }}
        >
          <CollapsedControls> {extraControls} </CollapsedControls>
        </Collapse>
        {!!showCloseButton && (
          <IconButton onClick={callBacks.onClose} aria-label={""}>
            <X />
          </IconButton>
        )}
      </Header>
    </>
  );
}
