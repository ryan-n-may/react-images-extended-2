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

export interface IActionButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  icon: JSX.Element;
  disabled?: boolean;
  tooltip: string;
}

export function ActionButtonAtom({
  onClick,
  icon,
  disabled = false,
}: IActionButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label="action-button"
      disabled={disabled}
      className="flex items-center justify-center p-2 rounded hover:bg-gray-200 transition-colors"
      style={{ opacity: disabled ? 0.5 : 1 }}
    >
      {icon}
    </button>
  );
}
