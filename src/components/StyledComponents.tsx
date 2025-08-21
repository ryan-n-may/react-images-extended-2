import {
  HEADER_Z_INDEX,
  FOOTER_Z_INDEX,
  MODAL_Z_INDEX,
  IMAGE_Z_INDEX,
} from "../utils/constants";
import { Document, Page } from "react-pdf";

// Portal Components
export const HiddenPortal = (props: any) => (
  <div
    className="fixed inset-0 w-screen h-screen flex items-center justify-center invisible bg-transparent"
    style={{ zIndex: -MODAL_Z_INDEX }}
    {...props}
  />
);

export const Portal = (props: any) => (
  <div
    className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-90"
    style={{ zIndex: MODAL_Z_INDEX }}
    {...props}
  />
);

// Thumbnail Component
interface ThumbnailProps {
  active: boolean;
  [key: string]: any;
}

export const Thumbnail = ({ active, ...props }: ThumbnailProps) => (
  <img
    className={`w-12 h-12 relative object-cover rounded-md border-2 cursor-pointer ${
      active ? "border-white" : "border-transparent"
    }`}
    style={{ zIndex: FOOTER_Z_INDEX }}
    {...props}
  />
);

// Control Components
export const CollapsedControls = (props: any) => (
  <div
    className="bg-neutral-900 bg-opacity-90 p-2 relative rounded-lg gap-1 flex items-center justify-between flex-wrap min-w-0"
    {...props}
  />
);

export const ThumnailBar = (props: any) => (
  <div
    className="bg-neutral-900 bg-opacity-90 p-2 relative rounded-lg gap-1 flex items-center justify-between flex-wrap min-w-0"
    style={{ zIndex: HEADER_Z_INDEX }}
    {...props}
  />
);

export const ThumbnailScroller = (props: any) => (
  <div
    className="flex items-center justify-center gap-1 min-w-0"
    style={{ zIndex: HEADER_Z_INDEX }}
    {...props}
  />
);

export const VerticalThumbnailScroller = (props: any) => (
  <div
    className="flex flex-col items-center justify-center gap-2 min-w-0 h-full overflow-y-auto"
    style={{ zIndex: HEADER_Z_INDEX }}
    {...props}
  />
);

export const LeftGradientThumbnail = (props: any) => {
  const fractionalScale = (props.progressiveScale ?? 100) / 100;
  return (
    <img
      className={`w-12 h-12 relative object-cover rounded-md cursor-pointer shadow-md opacity-75 transform-gpu`}
      style={{
        opacity: fractionalScale,
      }}
      {...props}
    />
  );
};

export const RightGradientThumbnail = (props: any) => {
  const fractionalScale = (props.progressiveScale ?? 100) / 100;
  return (
    <img
      className={`w-12 h-12 relative object-cover rounded-md cursor-pointer shadow-md opacity-75 transform-gpu`}
      style={{
        opacity: fractionalScale,
      }}
      {...props}
    />
  );
};

export const PinnedThumbnail = (props: any) => (
  <div className={"rounded-md border-2 border-white"}>
    <img
      className={`w-12 h-12 relative object-cover rounded-md cursor-pointer shadow-md opacity-100 transform-gpu`}
      {...props}
    />
  </div>
);

export const NoGradientThumbnail = (props: any) => (
  <div className={"rounded-md border-2 border-white"}>
    <img
      className={`w-12 h-12 relative object-cover rounded-md cursor-pointer shadow-md opacity-100 transform-gpu`}
      {...props}
    />
  </div>
);

export const Header = (props: any) => (
  <div
    className="relative gap-2 flex items-center justify-center flex-wrap min-w-0"
    style={{
      zIndex: HEADER_Z_INDEX,
      ...props.style,
    }}
    {...props}
  />
);

export const HeaderGroup = (props: any) => (
  <div
    className="bg-neutral-900 bg-opacity-90 p-2 relative rounded-lg gap-1 flex items-center justify-between flex-wrap min-w-0"
    style={{
      zIndex: HEADER_Z_INDEX,
      ...props.style,
    }}
    {...props}
  />
);

export const PageCount = (props: any) => (
  <div
    className="text-white p-2 relative rounded-lg gap-1 flex items-center justify-between flex-wrap min-w-0"
    style={{
      zIndex: HEADER_Z_INDEX,
      ...props.style,
    }}
    {...props}
  />
);

export const HeaderPiP = (props: any) => (
  <div
    className="bg-gray-100 bg-opacity-90 p-1 relative rounded-lg gap-0.5 flex items-center justify-between min-w-0 flex-shrink"
    style={{
      zIndex: HEADER_Z_INDEX,
      ...props.style,
    }}
    {...props}
  />
);

// Image Components
export const ImageFullscreen = (props: any) => (
  <img
    className="relative w-full h-full overflow-auto"
    style={{ zIndex: IMAGE_Z_INDEX }}
    {...props}
  />
);

export const ReaderModeImageFullscreen = (props: any) => (
  <div className="flex w-full h-full gap-2" {...props.manipulation}>
    <img
      index={1}
      className="relative w-full h-full overflow-auto block"
      style={{ zIndex: IMAGE_Z_INDEX }}
      {...props.image1}
    />
    <img
      index={2}
      className="relative w-full h-full overflow-auto block"
      style={{ zIndex: IMAGE_Z_INDEX }}
      {...props.image2}
    />
  </div>
);

export const PdfFullscreen = (props: any) => (
  <Document file={props.file}>
    <Page
      pageNumber={props.pageNumber}
      className="relative w-full h-full overflow-auto"
    />
  </Document>
);

export const ImageComponent = (props: any) => (
  <img
    className="relative overflow-auto block"
    style={{ zIndex: IMAGE_Z_INDEX }}
    {...props}
  />
);

export const ImageContainer = (props: any) => (
  <div
    className="relative w-full h-full flex items-center justify-center overflow-scroll"
    style={{ zIndex: IMAGE_Z_INDEX }}
    {...props}
  />
);

export const ImageSpinnerWrapper = (props: any) => (
  <div
    className="flex items-center justify-center w-screen h-screen"
    {...props}
  />
);

export const FigureContainerFullScreen = (props: any) => (
  <div
    className="h-[80vh] w-full p-4 box-border flex flex-col items-center justify-center"
    {...props}
  />
);
