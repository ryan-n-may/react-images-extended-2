import React from "react";
import { Thumbnail, ImageSpinnerWrapper } from "./StyledComponents";

export function SpinnerAtom() {
  return (
    <ImageSpinnerWrapper>
      <p> Loading... </p>
    </ImageSpinnerWrapper>
  );
}

export interface IThumbnailAtomProps {
  index: number;
  src: string;
  size: string;
  thumbnail?: string;
  active?: boolean;
  onClick: (event: React.MouseEvent<HTMLImageElement>) => void;
}

export function ThumbnailAtom({
  index,
  src,
  active,
  onClick,
}: IThumbnailAtomProps) {
  return (
    <Thumbnail
      active={active ?? false}
      key={`thumbnail-${index}`}
      src={src}
      onClick={onClick}
    />
  );
}

export interface IIconSwitcherButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  icon: JSX.Element;
  iconOnHover: JSX.Element;
  disabled?: boolean;
}

export function IconSwitcherButton({
  onClick,
  icon,
  iconOnHover,
  disabled = false,
}: IIconSwitcherButtonProps) {
  const [showHoverIcon, setShowHoverIcon] = React.useState(false);

  return (
    <button
      onClick={onClick}
      aria-label="action-button"
      disabled={disabled}
      className="flex items-center justify-center p-2 rounded hover:bg-neutral-600 transition-colors"
      style={{ opacity: disabled ? 0.5 : 1 }}
      onMouseEnter={() => setShowHoverIcon(true)}
      onMouseLeave={() => setShowHoverIcon(false)}
    >
      {showHoverIcon ? iconOnHover : icon}
    </button>
  );
}

export interface IActionButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  icon: JSX.Element;
  disabled?: boolean;
  tooltip: string;
}

export function ActionButtonAtom({
  onClick,
  icon,
  tooltip,
  disabled = false,
}: IActionButtonProps) {
  const [showTooltip, setShowTooltip] = React.useState(false);
  return (
    <>
      {showTooltip && (
        <p
          className="absolute rounded-md text-white bg-neutral-900 p-1 m-0"
          style={{ transform: "translateY(50px)" }}
        >
          {tooltip}
        </p>
      )}
      <button
        onClick={onClick}
        aria-label="action-button"
        disabled={disabled}
        className="flex items-center justify-center p-2 rounded hover:bg-neutral-600 transition-colors"
        style={{ opacity: disabled ? 0.5 : 1 }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {icon}
      </button>
    </>
  );
}
