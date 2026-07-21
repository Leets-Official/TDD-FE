import { useEffect } from "react";

import { useToastStore } from "@/stores/useToastStore";

import { Toast } from "./Toast";

const TOAST_DURATION_MS = 2000;

export function GlobalToast() {
  const isToastOpen = useToastStore((state) => state.isToastOpen);
  const toastProps = useToastStore((state) => state.toastProps);
  const closeToast = useToastStore((state) => state.closeToast);

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

  if (!isToastOpen || !toastProps) return null;

  return (
    <div className="fixed inset-x-0 bottom-30 z-50 flex justify-center px-4">
      <Toast {...toastProps} />
    </div>
  );
}
