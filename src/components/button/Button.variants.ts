import { tv } from "@/utils/cn";

export const buttonVariants = tv({
  base: "inline-flex cursor-pointer items-center justify-center gap-1 transition-colors disabled:cursor-not-allowed",
  variants: {
    variant: {
      default:
        "bg-primary text-white hover:bg-primary-hover active:bg-primary-pressed disabled:bg-disabled",
      destructive:
        "bg-error text-white hover:bg-error/90 active:bg-error/80 disabled:bg-disabled",
      outline:
        "border-[1.5px] border-divider-2 text-text-1 hover:bg-hover active:bg-pressed disabled:bg-white disabled:text-disabled",
      text: "text-text-1 hover:bg-hover active:bg-pressed disabled:bg-white disabled:text-disabled",
    },
    size: {
      medium: "h-16 rounded-md px-padding-l py-l text-label",
      small: "h-11 rounded-sm px-padding-m py-s text-body-2",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "medium",
  },
});
