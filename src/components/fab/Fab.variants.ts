import { tv } from "@/utils/cn";

export const fabVariants = tv({
  slots: {
    root: "inline-flex shrink-0 cursor-pointer items-center justify-center gap-1 rounded-md bg-primary text-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.15),0px_1px_1.5px_0px_rgba(0,0,0,0.3)] transition-colors hover:bg-primary-hover active:bg-primary-pressed",
    icon: "size-5 shrink-0",
    label: "text-label whitespace-nowrap",
  },
  variants: {
    hasLabel: {
      true: { root: "h-16 min-w-17 px-padding-l py-padding-m" },
      false: { root: "size-16 p-padding-m" },
    },
  },
  defaultVariants: {
    hasLabel: true,
  },
});
