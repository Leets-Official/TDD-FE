import { tv } from "@/utils/cn";

export const iconButtonVariants = tv({
  base: "inline-flex size-12 cursor-pointer items-center justify-center rounded-full text-black transition-colors hover:bg-hover active:bg-pressed",
  variants: {
    size: {
      big: "[&_svg]:size-9",
      large: "[&_svg]:size-7",
      medium: "[&_svg]:size-6",
    },
    tone: {
      ghost: "",
      manner: "rounded-md bg-bg-3 data-[selected=true]:bg-pressed",
    },
  },
  defaultVariants: {
    size: "medium",
    tone: "ghost",
  },
});
