import { ActionButtonAtom } from "./Atoms";
import { ArrowLeft, ArrowRight, X, ZoomIn, ZoomOut } from "lucide-react";
import {
  CollapsedControls,
  Header,
  HeaderGroup,
  LeftGradientThumbnail,
  NoGradientThumbnail,
  PageCount,
  RightGradientThumbnail,
  ThumbnailScroller,
  ThumnailBar,
} from "./StyledComponents";
import {
  useCallbackMethods,
  useLightboxImages,
  useLightboxState,
} from "../ComponentState";

export function PreviousImageMolecule() {
  const imageState = useLightboxImages();
  const callBacks = useCallbackMethods();

  const handlePrevious = () => {
    imageState.prevImage();
    if (callBacks.onClickPrev) callBacks.onClickPrev();
  };

  return (
    <ActionButtonAtom
      tooltip="Previous Image"
      icon={<ArrowLeft color="white" />}
      onClick={handlePrevious}
      keyboardKeys={["ArrowLeft"]}
      disabled={
        !imageState.hasPrev ||
        !imageState.currentFigureData?.imageLoaded ||
        imageState.isNavigating
      }
    />
  );
}

export function NextImageMolecule() {
  const imageState = useLightboxImages();
  const callBacks = useCallbackMethods();

  const handleNext = () => {
    console.log("NextImageMolecule: handleNext called");
    imageState.nextImage();
    if (callBacks.onClickNext) callBacks.onClickNext();
  };

  return (
    <ActionButtonAtom
      tooltip="Next Image"
      icon={<ArrowRight color="white" />}
      onClick={handleNext}
      keyboardKeys={["ArrowRight"]}
      disabled={
        !imageState.hasNext ||
        !imageState.currentFigureData?.imageLoaded ||
        imageState.isNavigating
      }
    />
  );
}

export function ThumbnailsMolecule() {
  const lightboxState = useLightboxState();
  const { state } = lightboxState;
  const { figures, currentIndex, pageCount } = state;
  const callBacks = useCallbackMethods();

  if (pageCount === 0) return null;

  const minimalBackthumbnail = Math.max(0, currentIndex - 5);
  const minimalForwardthumbnail = Math.min(pageCount - 1, currentIndex + 5);

  const noScrollImage = figures[currentIndex];
  const leftScrollImage = figures.slice(minimalBackthumbnail, currentIndex);
  const rightScrollImage = figures.slice(
    currentIndex + 1,
    minimalForwardthumbnail + 1
  );

  if (state.showThumbnails === false) {
    return null; // Return null if thumbnails are not enabled
  }

  return (
    <ThumnailBar>
      {figures && figures.length > 0 && (
        <ThumbnailScroller>
          {leftScrollImage.map((image, index) => {
            return (
              <LeftGradientThumbnail
                index={index}
                src={image.src}
                onClick={() => {
                  lightboxState.setCurrentIndex(minimalBackthumbnail + index);
                  if (callBacks.onClickThumbnail) callBacks.onClickThumbnail();
                }}
              />
            );
          })}

          <NoGradientThumbnail src={noScrollImage.src} />

          {rightScrollImage.map((image, index) => {
            return (
              <RightGradientThumbnail
                index={currentIndex + 1 + index}
                src={image.src}
                onClick={() => {
                  lightboxState.setCurrentIndex(currentIndex + 1 + index);
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
              keyboardKeys={["Escape"]}
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

export function ZoomMolecule() {
  const lightboxContext = useLightboxState();
  const { state } = lightboxContext;
  const { figures, currentIndex, holdZoomDelay, holdZoomInternal } = state;

  const currentFigure = figures?.[currentIndex] ?? {};
  const { imageLoaded } = currentFigure;

  return (
    <div key="zoom-controls" className="flex items-center gap-2">
      <ActionButtonAtom
        tooltip="Zoom in"
        key="zoom-in"
        keyboardKeys={["ArrowUp", "+", "NumpadAdd"]}
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
        keyboardKeys={["ArrowDown", "-", "NumpadSubtract"]}
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
