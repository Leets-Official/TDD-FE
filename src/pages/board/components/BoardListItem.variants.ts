import { tv } from "@/utils/cn";

export const boardListItemVariants = tv({
  slots: {
    root: "flex w-full flex-col items-center",
    button:
      "flex w-full flex-col items-start gap-4 bg-bg-1 px-5 pt-6 pb-4 text-left transition-colors hover:bg-hover",
    texts: "flex w-full flex-col items-start gap-2",
    title: "w-full text-title-2 text-text-1",
    content: "line-clamp-2 w-full text-body-1 text-text-3",
    detail: "flex items-center gap-1 text-caption-1 text-text-4",
    comment: "flex items-center gap-1",
    commentIcon: "size-4 text-text-5",
    dot: "size-0.5 shrink-0 rounded-full bg-[#d9d9d9]",
    divider: "h-px w-full bg-divider-1",
  },
});
