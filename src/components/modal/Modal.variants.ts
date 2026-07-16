import { tv } from "@/utils/cn";

export const modalVariants = tv({
  slots: {
    dialog:
      "m-auto w-90.5 max-w-[calc(100vw-2rem)] overflow-hidden rounded-lg border-0 bg-white p-0 backdrop:bg-black/40",
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
