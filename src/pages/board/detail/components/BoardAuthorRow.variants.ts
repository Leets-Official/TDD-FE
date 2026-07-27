import { tv } from "@/utils/cn";

export const boardAuthorRowVariants = tv({
  slots: {
    root: "flex items-center gap-2",
    texts: "flex flex-col",
    nickname: "text-text-1",
    time: "text-text-4",
  },
  variants: {
    variant: {
      post: {
        texts: "gap-1",
        nickname: "text-body-2",
        time: "text-caption-1",
      },
      comment: {
        nickname: "text-caption-1",
        time: "text-caption-2",
      },
    },
  },
  defaultVariants: {
    variant: "comment",
  },
});
