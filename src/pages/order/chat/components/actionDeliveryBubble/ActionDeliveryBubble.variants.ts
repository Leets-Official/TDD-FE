import { tv } from "@/utils/cn";

export const actionDeliveryBubbleVariants = tv({
  slots: {
    wrapper:
      "flex w-60 flex-col items-start gap-xxs overflow-hidden rounded-sm border border-text-5 bg-bg-1 p-padding-m",
    content: "flex w-full flex-col items-start gap-xxs text-black",
    title: "w-full text-label",
    description: "w-full text-body-2",
  },
});
