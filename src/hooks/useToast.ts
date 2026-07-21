import { useToastStore } from "@/stores/useToastStore";

export function useToast() {
  const openToast = useToastStore((state) => state.openToast);
  const closeToast = useToastStore((state) => state.closeToast);

  return { openToast, closeToast };
}
