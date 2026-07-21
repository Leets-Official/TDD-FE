import { useEffect, useRef, type RefObject } from "react";

export function useOutsideClick(
  refs: RefObject<Element | null> | RefObject<Element | null>[],
  handler: (event: MouseEvent | TouchEvent) => void,
  enabled = true
): void {
  const handlerRef = useRef(handler);
  useEffect(() => {
    handlerRef.current = handler;
  });

  const refList = Array.isArray(refs) ? refs : [refs];

  useEffect(() => {
    if (!enabled) return;

    const listener = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      const isInside = refList.some((ref) => ref.current?.contains(target));
      if (isInside) return;
      handlerRef.current(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, ...refList]);
}
