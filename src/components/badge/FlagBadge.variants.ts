import { tv } from "@/utils/cn";

export const flagBadgeVariants = tv({
  base: [
    "relative inline-flex h-5 shrink-0 items-center rounded-xs whitespace-nowrap",
    "bg-secondary px-padding-xxs",
    "text-caption-1 text-text-1-color",
    "before:absolute before:top-[5px] before:left-[-5px] before:h-0 before:w-0 before:content-['']",
    "before:border-t-[5px] before:border-t-transparent",
    "before:border-b-[5px] before:border-b-transparent",
    "before:border-r-[6px] before:border-r-secondary",
  ].join(" "),
});
