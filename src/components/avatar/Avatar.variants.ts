import { tv } from "@/utils/cn";

export const avatarVariants = tv({
  slots: {
    root: "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-bg-3",
    image: "size-full object-cover",
    empty:
      "block shrink-0 rounded-full border border-dashed border-divider-2 bg-bg-1",
  },
  variants: {
    size: {
      56: { root: "size-14", empty: "size-14" },
      48: { root: "size-12", empty: "size-12" },
      40: { root: "size-10", empty: "size-10" },
      36: { root: "size-9", empty: "size-9" },
      24: { root: "size-6", empty: "size-6" },
      20: { root: "size-5", empty: "size-5" },
      15: { root: "size-[15px]", empty: "size-[15px]" },
    },
  },
  defaultVariants: {
    size: 40,
  },
});
