import { tv } from "@/utils/cn";

export const buttonVariants = tv({
  base: "inline-flex cursor-pointer items-center justify-center gap-1 transition-colors disabled:cursor-not-allowed",
  variants: {
    variant: {
      default:
        "bg-primary text-white hover:bg-primary-hover active:bg-primary-pressed disabled:bg-disabled",
      outline:
        "border border-divider-1 text-text-1 hover:bg-secondary-hover active:bg-secondary-pressed disabled:bg-white disabled:text-disabled",
      text: "text-text-1 hover:bg-secondary-hover active:bg-secondary-pressed disabled:bg-white disabled:text-disabled",
    },
    size: {
      medium: "rounded-md px-padding-l py-m text-label",
      small: "rounded-sm px-padding-m py-s text-body-2",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "medium",
  },
});
