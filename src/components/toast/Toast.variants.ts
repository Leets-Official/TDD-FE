import { tv } from "@/utils/cn";

export const toastVariants = tv({
  slots: {
    root: "flex w-86 items-center gap-2 rounded-sm bg-bg-6 px-padding-m",
    content: "flex min-w-0 flex-1 items-center gap-2",
    icon: "size-6 shrink-0",
    message: "text-body-2 whitespace-pre-line text-white",
    action:
      "shrink-0 cursor-pointer rounded-sm px-padding-m py-padding-xxs text-label text-primary",
  },
  variants: {
    // 아이콘 색만 달라집니다. success 아이콘은 색을 자체적으로 갖고 있습니다.
    variant: {
      success: {},
      warning: { icon: "text-warning" },
      error: { icon: "text-error" },
    },
    hasAction: {
      true: {
        root: "h-16 py-1",
      },
      false: {
        root: "py-padding-s",
        message: "min-w-0 wrap-break-word",
      },
    },
  },
  defaultVariants: {
    variant: "success",
    hasAction: false,
  },
});
