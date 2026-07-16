import { tv } from "@/utils/cn";

export const statusBadgeVariants = tv({
  base: "inline-flex items-center rounded-sm border px-padding-xxs text-body-2",
  variants: {
    status: {
      recruiting: "border-divider-2 bg-bg-1 text-text-1",
      matched: "border-transparent bg-secondary text-primary",
      arrived: "border-transparent bg-text-1-color text-white",
      cancelled: "border-transparent bg-bg-3 text-text-4",
    },
  },
  defaultVariants: {
    status: "recruiting",
  },
});
