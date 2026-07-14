import { tv } from "@/utils/cn";

export const avatarVariants = tv({
  slots: {
    root: "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-bg-3",
    image: "size-full object-cover",
    fallbackIcon: "text-text-5",
  },
  variants: {
    size: {
      56: { root: "size-14", fallbackIcon: "size-7" },
      48: { root: "size-12", fallbackIcon: "size-6" },
      40: { root: "size-10", fallbackIcon: "size-5" },
      36: { root: "size-9", fallbackIcon: "size-[18px]" },
      24: { root: "size-6", fallbackIcon: "size-3.5" },
      20: { root: "size-5", fallbackIcon: "size-3" },
      15: { root: "size-[15px]", fallbackIcon: "size-[9px]" },
    },
  },
  defaultVariants: {
    size: 40,
  },
});
