import { tv } from "@/utils/cn";

export const toastVariants = tv({
  slots: {
    root: "flex w-86 items-center gap-2 rounded-sm bg-bg-6 px-padding-m",
    content: "flex min-w-0 flex-1 items-center gap-2",
    icon: "size-6 shrink-0",
    message: "text-body-2 text-white",
    action:
      "shrink-0 cursor-pointer rounded-sm px-padding-m py-padding-xxs text-label text-primary",
  },
  variants: {
    hasAction: {
      true: {
        root: "h-16 py-1",
      },
      false: {
        root: "py-padding-s",
        message: "whitespace-nowrap",
      },
    },
  },
  defaultVariants: {
    hasAction: false,
  },
});
