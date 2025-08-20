import { ActionButtonAtom } from "./Atoms";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import {
  CollapsedControls,
  Header,
  LeftGradientThumbnail,
  NoGradientThumbnail,
  RightGradientThumbnail,
  ThumnailBar,
} from "./StyledComponents";
import {
  useCallbackMethods,
  useLightboxImages,
  useLightboxState,
} from "../ComponentState";
import { debuginfo } from "../utils/log";

export interface IThumbnailsMoleculeProps {
  size?: string;
}

export function ThumbnailsMolecule({ size = "sm" }: IThumbnailsMoleculeProps) {
  const imageState = useLightboxImages();
  const callBacks = useCallbackMethods();

  const currentImage = imageState.currentImage;
  const imageArray = imageState.images;

  if (imageArray.length === 0) return null;

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

  // optimising recalculations here...
  const cacheLeftProgressiveScale = new Map<number, number>();
  const cacheRightProgressiveScale = new Map<number, number>();

  const getLeftProgressiveScale = (
    index: number,
    currentImage: number,
    minimalBackthumbnail: number
  ) => {
    const distanceFromCurrent = currentImage - minimalBackthumbnail + index;
    if (cacheLeftProgressiveScale.has(distanceFromCurrent)) {
      return cacheLeftProgressiveScale.get(distanceFromCurrent);
    }
    const scale = Math.max(25, 100 - distanceFromCurrent * 25);
    cacheLeftProgressiveScale.set(
      distanceFromCurrent,
      Math.max(25, 100 - distanceFromCurrent * 25)
    );
    // ie: currentImage = 10, minimalBackthumbnail = 8, index = 0
    // distanceFromCurrent = 10 - 8 + 0 = 2
    // ie: currentImage = 20, minimalBackthumbnail = 18, index = 1
    // distanceFromCurrent = 20 - 18 + 1 = 3
    return scale;
  };

  const getRightProgressiveScale = (index: number) => {
    //const distanceFromCurrent = minimalForwardthumbnail - currentImage - (minimalForwardthumbnail - currentImage + index + 1);
    const distanceFromCurrentSimplified = index + 1;
    if (cacheRightProgressiveScale.has(distanceFromCurrentSimplified)) {
      return cacheRightProgressiveScale.get(distanceFromCurrentSimplified);
    }
    const scale = Math.max(100 - distanceFromCurrentSimplified * 25);
    cacheRightProgressiveScale.set(distanceFromCurrentSimplified, scale);
    return scale;
  };

  return (
    <ThumnailBar>
      <ActionButtonAtom
        tooltip="Previous Image"
        icon={<ArrowLeft />}
        onClick={() => {
          debuginfo("Previous image clicked");
          imageState.prevImage();
          if (callBacks.onClickPrev) callBacks.onClickPrev();
        }}
        disabled={imageState.currentImage <= 0}
      />

      {leftScrollImage.map((image, index) => (
        <LeftGradientThumbnail
          progressiveScale={getLeftProgressiveScale(
            index,
            currentImage, 
            minimalBackthumbnail
          )}
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
          progressiveScale={getRightProgressiveScale(index)}
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

      <ActionButtonAtom
        tooltip="Next Image"
        icon={<ArrowRight />}
        onClick={() => {
          debuginfo("Next image clicked");
          imageState.nextImage();
          if (callBacks.onClickNext) callBacks.onClickNext();
        }}
        disabled={currentImage >= imageArray.length - 1}
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
