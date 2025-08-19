import { ActionButtonAtom } from "./Atoms";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import {
  CollapsedControls,
  Header,
  LeftGradientThumbnail,
  NoGradientThumbnail,
  RightGradientThumbnail,
  ThumbnailScroller,
  ThumnailBar,
} from "./StyledComponents";
import {
  useCallbackMethods,
  useLightboxImages,
  useLightboxState,
} from "../ComponentState";

export interface IThumbnailsMoleculeProps {
  size?: string;
}

export function ThumbnailsMolecule({ size = "sm" }: IThumbnailsMoleculeProps) {
  const imageState = useLightboxImages();
  const callBacks = useCallbackMethods();

  const currentImage = imageState.currentImage;
  if (imageState.images.length === 0) return null;

  const imageArray = imageState.images;

  const minimalBackthumbnail = Math.max(0, currentImage - 2);
  const minimalForwardthumbnail = Math.min(
    imageState.images.length - 1,
    currentImage + 2
  );

  const noScrollImage = imageArray[currentImage];
  const leftScrollImage = imageArray.slice(minimalBackthumbnail, currentImage);
  const rightScrollImage = imageArray.slice(
    currentImage + 1,
    minimalForwardthumbnail + 1
  );

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

      <ThumbnailScroller>
        {leftScrollImage.map((image, index) => (
          <LeftGradientThumbnail
            key={`thumbnail-${index}`}
            index={index}
            src={image.src}
            size={size}
            active={false}
            onClick={() => {
              imageState.setCurrentImage(minimalBackthumbnail + index);
              if (callBacks.onClickThumbnail) callBacks.onClickThumbnail();
            }}
          />
        ))}

        <NoGradientThumbnail
          src={noScrollImage.src}
          size={size}
          active={true}
          index={currentImage}
          key={currentImage}
          onClick={() => {}} // no navigation to the current image
        />

        {rightScrollImage.map((image, index) => (
          <RightGradientThumbnail
            key={`thumbnail-${index}`}
            index={currentImage + 1 + index}
            src={image.src}
            size={size}
            active={false}
            onClick={() => {
              imageState.setCurrentImage(currentImage + 1 + index);
              if (callBacks.onClickThumbnail) callBacks.onClickThumbnail();
            }}
          />
        ))}
      </ThumbnailScroller>

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

  const lightboxState = useLightboxState();
  const currentImage = lightboxState.state.currentImage ?? 0;
  const images = lightboxState.state.images;

  const imageCount = images?.length ?? 0;

  return (
    <>
      <Header>
        {controls && controls}
        {showExtraControls && (
          <CollapsedControls>
            {extraControls && extraControls}
          </CollapsedControls>
        )}
        {!!showCloseButton && (
          <button
            onClick={callBacks.onClose}
            aria-label="Close"
            className="flex items-center justify-center p-2 rounded hover:bg-gray-200 transition-colors"
          >
            <X />
          </button>
        )}
        <p> {`${currentImage} / ${imageCount}`} </p>
      </Header>
    </>
  );
}
