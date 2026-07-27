import { tv } from "@/utils/cn";

export const chatInputVariants = tv({
  slots: {
    wrapper:
      "flex w-full items-center gap-xxs border-t border-divider-1 bg-bg-1 px-padding-m py-padding-m",
    textField: "min-w-0 flex-1",
    sendButton:
      "shrink-0 bg-primary text-white hover:bg-primary-hover active:bg-primary-pressed disabled:cursor-not-allowed disabled:bg-bg-3 disabled:text-text-5",
  },
});
