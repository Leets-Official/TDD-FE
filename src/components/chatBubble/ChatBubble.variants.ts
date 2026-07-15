import { tv } from "@/utils/cn";

export const chatBubbleVariants = tv({
  slots: {
    profile: "flex items-start gap-xxs",
    textColumn: "flex flex-col items-start gap-1",
    nickname: "text-body-2 text-black",
    wrapper: "flex items-end gap-1",
    bubble:
      "flex shrink-0 items-center overflow-hidden px-padding-m py-padding-xxs",
    message: "text-body-1 whitespace-nowrap",
    time: "shrink-0 text-caption-2 whitespace-nowrap text-text-4",
  },
  variants: {
    isMine: {
      true: {
        bubble: "rounded-tl-sm rounded-br-sm rounded-bl-sm bg-secondary",
        message: "text-text-1",
      },
      false: {
        bubble: "rounded-tr-sm rounded-br-sm rounded-bl-sm bg-bg-3",
        message: "text-black",
      },
    },
  },
  defaultVariants: {
    isMine: false,
  },
});
