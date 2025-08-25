import React, { useEffect } from "react";
import { ImageSpinnerWrapper } from "./StyledComponents";

export function SpinnerAtom() {
  return (
    <ImageSpinnerWrapper>
      <p> Loading... </p>
    </ImageSpinnerWrapper>
  );
}

export interface IActionButtonProps {
  onClick: (
    event: React.MouseEvent<HTMLButtonElement> | KeyboardEvent | undefined
  ) => void;
  onHoldDown?: () => void;
  icon: JSX.Element;
  disabled?: boolean;
  holdDelay?: number; // Delay before starting hold action
  holdInterval?: number; // Interval for repeating hold action
  tooltip?: string;
  keyboardKeys?: string[]; // Keys that can trigger the button
}

export function ActionButtonAtom({
  onClick,
  onHoldDown,
  icon,
  holdDelay = 250, // Start holding after 500ms
  holdInterval = 500, // Repeat every 100ms
  disabled = false,
  keyboardKeys = [],
}: IActionButtonProps) {
  const [holding, setHolding] = React.useState(false);

  const holdTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const holdIntervalRef = React.useRef<NodeJS.Timeout | null>(null);

  const startHold = () => {
    if (holding || disabled) return;

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (keyboardKeys.includes(e.key) && !disabled) {
        e.preventDefault(); // Prevent default browser behavior
        e.stopPropagation(); // Stop event bubbling

        // Call onClick with the keyboard event
        onClick(e);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [keyboardKeys, disabled, onClick]); // Add dependencies

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
