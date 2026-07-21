import { tv } from "@/utils/cn";

export const textareaVariants = tv({
  slots: {
    wrapper: "flex flex-col gap-xxs",
    label: "pl-1 text-body-1 text-text-1",
    textarea:
      "min-h-36 w-full resize-none scrollbar-none rounded-md border border-text-5 bg-bg-1 py-xl pr-padding-m pl-padding-l text-body-1 text-text-1 transition-colors outline-none placeholder:text-text-5 focus:border-text-1 [&::-webkit-scrollbar]:hidden",
  },
});
