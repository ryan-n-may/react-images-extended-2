import { useEffect } from "react";
import { useCurrentFigure, useLightboxState } from "../ComponentState";
import { handleReset } from "../utils/manipulation";

export function useWindowResize() {
  const lightboxState = useLightboxState();
  const currentFigure = useCurrentFigure();
  const { windowRef } = lightboxState.state;

  useEffect(() => {
    if (!windowRef) return;

    const handleResize = () => {
      console.log("Window resized, resetting image");

      // Reset the current figure to default state
      if (currentFigure) {
        const resetState = handleReset(currentFigure);
        lightboxState.updateFigureManipulation(resetState);
      }
    };

    // Add resize listener
    windowRef.addEventListener("resize", handleResize);

    // Cleanup function
    return () => {
      windowRef.removeEventListener("resize", handleResize);
    };
  }, [windowRef, lightboxState]);

  return null; // This hook doesn't return anything
}
