import { create } from "zustand";

import type { ToastProps } from "@/components/toast/Toast";

type ToastContentProps = Pick<
  ToastProps,
  "message" | "actionLabel" | "onActionClick"
>;

interface ToastStore {
  isToastOpen: boolean;
  toastProps: ToastContentProps | undefined;
  openToast: (props: ToastContentProps) => void;
  closeToast: () => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  isToastOpen: false,
  toastProps: undefined,

  openToast: (props) => set({ isToastOpen: true, toastProps: props }),
  closeToast: () => set({ isToastOpen: false, toastProps: undefined }),
}));
