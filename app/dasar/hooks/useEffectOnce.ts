import { useEffect, useRef } from "react";

export function useEffectOnce(effect: () => void | (() => void)) {
  const hasRun = useRef(false);
  const cleanupRef = useRef<void | (() => void)>(undefined);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    cleanupRef.current = effect();

    return () => {
      cleanupRef.current?.();
    };
  }, []);
}