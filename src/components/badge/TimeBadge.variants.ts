import { tv } from "@/utils/cn";

export const timeBadgeVariants = tv({
  base: "inline-flex items-center gap-xxs rounded-sm px-3",
  variants: {
    variant: {
      default: "bg-bg-4 text-text-1",
      urgent: "bg-bg-4 text-error",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
