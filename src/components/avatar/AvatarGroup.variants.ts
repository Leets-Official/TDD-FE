import { tv } from "@/utils/cn";

export const avatarGroupVariants = tv({
  slots: {
    root: "flex items-center -space-x-2",
    avatar: "relative z-10 border-2 border-text-1-w",
    overflow:
      "relative z-10 inline-flex shrink-0 items-center justify-center rounded-full border-2 border-text-1-w bg-bg-3 text-text-3",
    empty: "relative z-0",
  },
  variants: {
    size: {
      56: { overflow: "size-14 text-l" },
      48: { overflow: "size-12 text-m" },
      40: { overflow: "size-10 text-s" },
      36: { overflow: "size-9 text-xs" },
      24: { overflow: "size-6 text-xxs" },
      20: { overflow: "size-5 text-[7px]" },
      15: {
        root: "-space-x-[7px]",
        overflow: "size-[15px] text-[6px]",
      },
    },
  },
  defaultVariants: {
    size: 24,
  },
});
