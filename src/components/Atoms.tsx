import React from "react";
import { IconButton, Spinner, Tooltip } from "@chakra-ui/react";
import { Thumbnail, ImageSpinnerWrapper } from "./StyledComponents";
import { HEADER_Z_INDEX } from "../utils/constants";

export interface ISpinnerProps {
  size?: "sm" | "md" | "lg";
}
export function SpinnerAtom(props: ISpinnerProps) {
  const { size = "md" } = props;
  return (
    <ImageSpinnerWrapper>
      <Spinner zIndex={HEADER_Z_INDEX} size={size} />
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
  tooltip,
}: IActionButtonProps) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger>
        <IconButton
          zIndex={HEADER_Z_INDEX}
          onClick={onClick}
          disabled={disabled}
          aria-label={"action-button"}
        >
          {icon}
        </IconButton>
      </Tooltip.Trigger>

      <Tooltip.Positioner>
        <Tooltip.Content>{tooltip}</Tooltip.Content>
      </Tooltip.Positioner>
    </Tooltip.Root>
  );
}
