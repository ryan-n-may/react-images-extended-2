import {
  HEADER_Z_INDEX,
  FOOTER_Z_INDEX,
  MODAL_Z_INDEX,
  IMAGE_Z_INDEX,
} from "../utils/constants";

// Portal Components
export const HiddenPortal = (props: any) => (
  <div
    className="fixed inset-0 w-screen h-screen flex items-center justify-center invisible bg-transparent"
    style={{ zIndex: -MODAL_Z_INDEX }}
    {...props}
  />
);

export const PiPPortal = (props: any) => (
  <div
    className="fixed inset-0 w-screen h-screen bg-transparent"
    style={{ zIndex: MODAL_Z_INDEX }}
    {...props}
  />
);

export const Portal = (props: any) => (
  <div
    className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-80"
    style={{ zIndex: MODAL_Z_INDEX }}
    {...props}
  />
);

export const Component = (props: any) => (
  <div
    className="flex flex-col items-center justify-center overflow-hidden rounded-lg"
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
  <div className="flex items-center rounded-lg" {...props} />
);

export const ThumnailBar = (props: any) => (
  <div
    className="bg-gray-100 p-2 relative rounded-lg gap-1 flex items-center justify-between flex-wrap min-w-0"
    style={{ zIndex: HEADER_Z_INDEX }}
    {...props}
  />
);

export const ThumbnailScroller = (props: any) => (
  <div
    className="relative flex overflow-x-auto snap-x snap-mandatory items-center justify-center gap-3 p-4 bg-gray-100 rounded-lg"
    {...props}
  />
);

export const LeftGradientThumbnail = (props: any) => (
  <div
    className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-gray-100 via-gray-100/70 to-transparent z-10"
    {...props}
  >
    <Thumbnail {...props} />
  </div>
);

export const RightGradientThumbnail = (props: any) => (
  <div
    className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-gray-100 via-gray-100/70 to-transparent z-10"
    {...props}
  >
    <Thumbnail {...props} />
  </div>
);

export const NoGradientThumbnail = (props: any) => (
  <div
    className={`snap-center shrink-0 w-40 h-40 bg-white rounded-lg shadow-md scale-75 opacity-60 blur-[1px] rotate-y-12 transform-gpu`}
  >
    <Thumbnail {...props} />
  </div>
);

export const Header = (props: any) => (
  <div
    className="bg-gray-100 p-2 relative rounded-lg gap-1 flex items-center justify-between flex-wrap min-w-0"
    style={{
      zIndex: HEADER_Z_INDEX,
      ...props.style,
    }}
    {...props}
  />
);

export const HeaderPiP = (props: any) => (
  <div
    className="bg-gray-100 p-1 relative rounded-lg gap-0.5 flex items-center justify-between min-w-0 flex-shrink"
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
