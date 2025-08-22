import React from "react";
import { Thumbnail, ImageSpinnerWrapper } from "./StyledComponents";
import { debuginfo } from "../utils/log";

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
  onHoldDown?: () => void;
  icon: JSX.Element;
  disabled?: boolean;
  holdDelay?: number; // Delay before starting hold action
  holdInterval?: number; // Interval for repeating hold action
  tooltip?: string;
}

export function ActionButtonAtom({
  onClick,
  onHoldDown,
  icon,
  holdDelay = 250, // Start holding after 500ms
  holdInterval = 100, // Repeat every 100ms
  disabled = false,
}: IActionButtonProps) {
  const [holding, setHolding] = React.useState(false);

  const holdTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const holdIntervalRef = React.useRef<NodeJS.Timeout | null>(null);

  const startHold = () => {
    if (holding || disabled) return;
    debuginfo("Starting to hold action button");

    setHolding(true);

    // Start the hold action after delay
    holdTimeoutRef.current = setTimeout(() => {
      if (onHoldDown) {
        onHoldDown?.(); // First hold action

        // Continue holding at intervals
        holdIntervalRef.current = setInterval(() => {
          onHoldDown();
        }, holdInterval);
      }
    }, holdDelay);
  };

  const stopHold = () => {
    setHolding(false);

    if (holdTimeoutRef.current) {
      clearTimeout(holdTimeoutRef.current);
      holdTimeoutRef.current = null;
    }

    if (holdIntervalRef.current) {
      clearInterval(holdIntervalRef.current);
      holdIntervalRef.current = null;
    }
  };

  return (
    <button
      onClick={onClick}
      onMouseDown={startHold}
      onMouseLeave={stopHold}
      onMouseUp={stopHold}
      onMouseOut={stopHold}
      aria-label="action-button"
      disabled={disabled}
      className="flex items-center justify-center p-2 rounded hover:bg-neutral-600 transition-colors"
      style={{ opacity: disabled ? 0.5 : 1 }}
    >
      {icon}
    </button>
  );
}

export function GhostActionButtonAtom({ onClick, icon }: IActionButtonProps) {
  return (
    <>
      <button
        onClick={onClick}
        aria-label="action-button-ghost"
        className="flex items-center justify-center p-0 m-0"
      >
        {icon}
      </button>
    </>
  );
}
