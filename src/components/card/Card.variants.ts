import { tv } from "@/utils/cn";

export const cardVariants = tv({
  base: "relative flex w-full flex-col gap-xxs rounded-lg border border-divider-3 bg-white px-padding-m shadow-[0px_2px_12px_0px_rgba(255,97,13,0.1)] transition-colors hover:bg-hover active:bg-pressed",
  variants: {
    hasStatus: {
      true: "pt-padding-l pb-8",
      false: "py-8",
    },
  },
  defaultVariants: {
    hasStatus: false,
  },
});
