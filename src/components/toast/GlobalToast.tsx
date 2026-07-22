import { useEffect } from "react";

import { useToastStore } from "@/stores/useToastStore";
import { cn } from "@/utils/cn";

import { Toast } from "./Toast";

const TOAST_DURATION_MS = 2000;
const FADE_DURATION_MS = 200;

export function GlobalToast() {
  const isToastOpen = useToastStore((state) => state.isToastOpen);
  const toastProps = useToastStore((state) => state.toastProps);
  const closeToast = useToastStore((state) => state.closeToast);
  const clearToast = useToastStore((state) => state.clearToast);

  useEffect(() => {
    if (!isToastOpen) return;

    const scheduledProps = toastProps;
    const timer = setTimeout(() => {
      if (useToastStore.getState().toastProps === scheduledProps) {
        closeToast();
      }
    }, TOAST_DURATION_MS);
    return () => clearTimeout(timer);
  }, [isToastOpen, toastProps, closeToast]);

  if (!toastProps) return null;

  return (
    <div
      onTransitionEnd={(event) => {
        if (event.propertyName === "opacity" && !isToastOpen) clearToast();
      }}
      style={{ transitionDuration: `${FADE_DURATION_MS}ms` }}
      className={cn(
        "fixed inset-x-0 bottom-30 z-50 flex justify-center px-4",
        "transition-opacity starting:opacity-0",
        isToastOpen ? "opacity-100" : "opacity-0"
      )}
    >
      <Toast {...toastProps} />
    </div>
  );
}
