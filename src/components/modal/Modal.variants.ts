import { tv } from "@/utils/cn";

export const modalVariants = tv({
  slots: {
    backdrop: "fixed inset-0 z-50 flex items-center justify-center bg-black/40",
    card: "flex w-[362px] flex-col items-end overflow-hidden rounded-lg bg-white",
    container:
      "flex w-full flex-col items-start gap-9 px-padding-l pt-9 pb-padding-l",
    contents: "flex w-full flex-col items-start gap-8",
    titleBody: "flex w-full flex-col items-start gap-4 text-text-1",
    title: "w-full text-title-2",
    description: "w-full text-body-1",
    caption: "w-full text-caption-1 text-text-5",
    buttons: "flex w-full items-center gap-m",
    outlineButton: "h-16 flex-1",
    primaryButton: "h-16 flex-1",
  },
});
