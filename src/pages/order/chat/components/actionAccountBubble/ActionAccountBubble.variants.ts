import { tv } from "@/utils/cn";

export const actionAccountBubbleVariants = tv({
  slots: {
    wrapper:
      "flex w-60 flex-col items-start gap-xxs overflow-hidden rounded-sm border border-text-5 bg-bg-1 p-padding-m",
    content: "flex w-full flex-col items-start gap-xxl text-black",
    title: "w-full text-label",
    body: "flex w-full flex-col items-start",
    primaryText: "w-full text-label",
    secondaryText: "text-body-2",
  },
});
