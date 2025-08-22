import { ActionButtonAtom, GhostActionButtonAtom } from "./Atoms";
import {
  ArrowLeft,
  ArrowRight,
  CircleX,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
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
} from "./StyledComponents";
import {
  useCallbackMethods,
  useLightboxImages,
  useLightboxState,
} from "../ComponentState";
import { debuginfo } from "../utils/log";

export function PreviousImageMolecule() {
  const imageState = useLightboxImages();
  const callBacks = useCallbackMethods();

  return (
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
  );
}

export function NextImageMolecule() {
  const imageState = useLightboxImages();
  const callBacks = useCallbackMethods();

  return (
    <ActionButtonAtom
      tooltip="Next Image"
      icon={<ArrowRight color="white" />}
      onClick={() => {
        debuginfo("Next image clicked");
        imageState.nextImage();
        if (callBacks.onClickNext) callBacks.onClickNext();
      }}
      disabled={imageState.currentIndex >= imageState.pageCount - 1}
    />
  );
}

export function ThumbnailsMolecule() {
  const { state } = useLightboxState();
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

  if (state.showThumbnails === false) {
    return null; // Return null if thumbnails are not enabled
  }

  return (
    <ThumnailBar>
      {imageArray.length > 0 && (
        <ThumbnailScroller>
          {leftScrollImage.map((image, index) => {
            return (
              <LeftGradientThumbnail
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
            return (
              <RightGradientThumbnail
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
      </Header>
    </>
  );
}

export const PageCountMolecule = () => {
  const lightboxState = useLightboxState();
  const currentImage = lightboxState.state.currentIndex ?? 0;
  const imageCount = lightboxState.state.pageCount;

  return (
    <HeaderGroup>
      <PageCount>
        <p> {`${currentImage + 1} / ${imageCount}`} </p>
      </PageCount>
    </HeaderGroup>
  );
};

export const PinnedImagesHeader = () => {
  const lightboxContext = useLightboxState();
  const { state } = lightboxContext;
  const { images, currentIndex } = state;
  const pinnedImages = state.pinnedFigureStates || [];

  if (pinnedImages.length === 0) return null;

  return (
    <Header>
      <HeaderGroup>
        {pinnedImages.map((image, index) => {
          const currentImage = images[image.imageIndex];
          const active = currentIndex === image.imageIndex;
          return (
            <div className="relative" key={`pinned-image-${index}`}>
              <div
                style={{
                  border: active ? "2px solid white" : "0px solid white",
                  borderRadius: "0.5rem",
                  backgroundColor: active ? "white" : "transparent",
                  opacity: active ? 1 : 0.5,
                }}
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
              </div>

              <div className="absolute -top-1 -right-1">
                <GhostActionButtonAtom
                  icon={
                    <CircleX
                      color="red"
                      size={16}
                      className="bg-neutral-700 rounded-full"
                    />
                  }
                  onClick={() => {
                    lightboxContext.unPinFigure(index);
                  }}
                />
              </div>
            </div>
          );
        })}
      </HeaderGroup>
    </Header>
  );
};

export function ZoomMolecule() {
  const lightboxContext = useLightboxState();
  const { state } = lightboxContext;
  const { figureManipulation, holdZoomDelay, holdZoomInternal } = state;
  const { imageLoaded } = figureManipulation;

  return (
    <div key="zoom-controls" className="flex items-center gap-2">
      <ActionButtonAtom
        tooltip="Zoom in"
        key="zoom-in"
        disabled={!imageLoaded}
        onClick={() => lightboxContext.zoomIn()}
        onHoldDown={() => lightboxContext.zoomIn()}
        holdDelay={holdZoomDelay}
        holdInterval={holdZoomInternal}
        icon={<ZoomIn color="white" />}
      />

      <ActionButtonAtom
        tooltip="Zoom out"
        key="zoom-out"
        disabled={!imageLoaded}
        onClick={() => lightboxContext.zoomOut()}
        onHoldDown={() => lightboxContext.zoomOut()}
        holdDelay={holdZoomDelay}
        holdInterval={holdZoomInternal}
        icon={<ZoomOut color="white" />}
      />
    </div>
  );
}
