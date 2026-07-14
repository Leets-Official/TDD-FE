import { tv } from "@/utils/cn";

export const avatarGroupVariants = tv({
  slots: {
    root: "flex items-center -space-x-2",
    avatar: "relative z-10 border-2 border-text-1-w",
    overflow:
      "relative z-10 inline-flex shrink-0 items-center justify-center rounded-full border-2 border-text-1-w bg-bg-3 text-text-3",
    empty:
      "relative z-0 shrink-0 rounded-full border border-dashed border-divider-2 bg-bg-1",
  },
  variants: {
    size: {
      56: { overflow: "size-14 text-l", empty: "size-14" },
      48: { overflow: "size-12 text-m", empty: "size-12" },
      40: { overflow: "size-10 text-s", empty: "size-10" },
      36: { overflow: "size-9 text-xs", empty: "size-9" },
      24: { overflow: "size-6 text-xxs", empty: "size-6" },
      20: { overflow: "size-5 text-[7px]", empty: "size-5" },
      15: { overflow: "size-[15px] text-[6px]", empty: "size-[15px]" },
    },
  },
  defaultVariants: {
    size: 24,
  },
});
