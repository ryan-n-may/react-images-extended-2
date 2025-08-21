import { ActionButtonAtom, IconSwitcherButton } from "./Atoms";
import { ArrowLeft, ArrowRight, Pin, X, Delete } from "lucide-react";
import {
  CollapsedControls,
  Header,
  HeaderGroup,
  LeftGradientThumbnail,
  NoGradientThumbnail,
  PageCount,
  PinnedThumbnail,
  RightGradientThumbnail,
  ThumbnailScroller,
  ThumnailBar,
  VerticalThumbnailScroller,
} from "./StyledComponents";
import {
  useCallbackMethods,
  useLightboxImages,
  useLightboxState,
} from "../ComponentState";
import { debuginfo } from "../utils/log";

export function ThumbnailsMolecule() {
  const imageState = useLightboxImages();
  const callBacks = useCallbackMethods();

  const currentImage = imageState.currentIndex;
  const imageArray = imageState.images;
  const pageCount = imageState.pageCount;

  if (pageCount === 0) return null;

  const minimalBackthumbnail = Math.max(0, currentImage - 5);
  const minimalForwardthumbnail = Math.min(pageCount - 1, currentImage + 5);

  const noScrollImage = imageArray[currentImage];
  const leftScrollImage = imageArray.slice(minimalBackthumbnail, currentImage);
  const rightScrollImage = imageArray.slice(
    currentImage + 1,
    minimalForwardthumbnail + 1
  );

  const getLeftProgressiveScale = (
    index: number,
    minimalBackthumbnail: number
  ) => {
    const distanceFromCurrent = index - minimalBackthumbnail - 1; // will be negative
    const scale = Math.max(25, 100 + distanceFromCurrent * 20);
    return scale;
  };

  const getRightProgressiveScale = (index: number) => {
    const distanceFromCurrentSimplified = index + 1; // will be positive
    const scale = Math.max(25, 100 - distanceFromCurrentSimplified * 20);
    return scale;
  };

  return (
    <ThumnailBar>
      <ActionButtonAtom
        tooltip="Previous Image"
        icon={<ArrowLeft color="white" />}
        onClick={() => {
          debuginfo("Previous image clicked");
          imageState.prevImage();
          if (callBacks.onClickPrev) callBacks.onClickPrev();
        }}
        disabled={imageState.currentIndex <= 0}
      />

      {imageArray.length > 0 && (
        <ThumbnailScroller>
          {leftScrollImage.map((image, index) => {
            const lps = getLeftProgressiveScale(index, minimalBackthumbnail);
            return (
              <LeftGradientThumbnail
                progressiveScale={lps}
                key={`thumbnail-${index}-${lps}`}
                index={index}
                src={image.src}
                onClick={() => {
                  imageState.setCurrentIndex(minimalBackthumbnail + index);
                  if (callBacks.onClickThumbnail) callBacks.onClickThumbnail();
                }}
              />
            );
          })}

          <NoGradientThumbnail src={noScrollImage.src} />

          {rightScrollImage.map((image, index) => {
            const rps = getRightProgressiveScale(index);
            return (
              <RightGradientThumbnail
                progressiveScale={rps}
                key={`thumbnail-${index}-${rps}`}
                index={currentImage + 1 + index}
                src={image.src}
                onClick={() => {
                  imageState.setCurrentIndex(currentImage + 1 + index);
                  if (callBacks.onClickThumbnail) callBacks.onClickThumbnail();
                }}
              />
            );
          })}
        </ThumbnailScroller>
      )}

      <ActionButtonAtom
        tooltip="Next Image"
        icon={<ArrowRight color="white" />}
        onClick={() => {
          debuginfo("Next image clicked");
          imageState.nextImage();
          if (callBacks.onClickNext) callBacks.onClickNext();
        }}
        disabled={currentImage >= pageCount - 1}
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
  const currentImage = lightboxState.state.currentIndex ?? 0;
  const imageCount = lightboxState.state.pageCount;

  return (
    <>
      <Header>
        <HeaderGroup>{controls && controls}</HeaderGroup>
        {showExtraControls && (
          <CollapsedControls>
            {extraControls && extraControls}
          </CollapsedControls>
        )}

        {!!showCloseButton && (
          <HeaderGroup>
            <ActionButtonAtom
              onClick={() => callBacks.onClose?.()}
              key="close-button"
              tooltip="Close"
              icon={<X color="white" />}
            />
          </HeaderGroup>
        )}
        <PageCount>
          <p> {`${currentImage + 1} / ${imageCount}`} </p>
        </PageCount>
      </Header>
    </>
  );
}

export const PinnedImagesHeader = () => {
  const lightboxContext = useLightboxState();
  const { state } = lightboxContext;
  const { images } = state;
  const pinnedImages = state.pinnedFigureStates || [];

  if (pinnedImages.length === 0) return null;

  return (
    <VerticalThumbnailScroller>
      {pinnedImages.map((image, index) => {
        const currentImage = images[image.imageIndex];
        return (
          <div
            className="flex items-center gap-2"
            key={`pinned-image-${index}`}
          >
            <PinnedThumbnail
              key={`pinned-thumbnail-${index}`}
              src={currentImage.src}
              onClick={() => {
                lightboxContext.goToPinnedFigure(
                  image.imageIndex,
                  image.imageState
                );
              }}
            />

            <IconSwitcherButton
              icon={<Pin color="white" />}
              iconOnHover={<Delete color="white" />}
              onClick={() => {
                lightboxContext.unPinFigure(index);
              }}
            />
          </div>
        );
      })}
    </VerticalThumbnailScroller>
  );
};
