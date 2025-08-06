import { MutableRefObject, useCallback, useEffect } from "react";
import canUseDom from "../utils/canUseDom";
import { debuginfo } from "../utils/log";

export function useContainerDimensions(
  containerWidthRef: MutableRefObject<number>,
  containerHeightRef: MutableRefObject<number>
) {
  // Set container dimensions
  const setContainerWidthHeight = useCallback(() => {
    debuginfo(
      `Setting container dimensions: width=${containerWidthRef.current}, height=${containerHeightRef.current}`
    );
    if (canUseDom) {
      containerWidthRef.current = window.innerWidth;
      containerHeightRef.current = window.innerHeight;
    }
  }, []);
  // Initialize container dimensions on mount
  useEffect(() => {
    setContainerWidthHeight();
  }, [setContainerWidthHeight]);
}
