import { tv } from "@/utils/cn";

export const sliderVariants = tv({
  slots: {
    root: "w-full select-none",
    track: "relative flex h-2 items-center gap-[2px]",
    segment: "h-full flex-1 rounded-[3px] bg-bg-5",
    thumb:
      "absolute top-1/2 size-6 -translate-x-1/2 -translate-y-1/2 cursor-grab touch-none rounded-full bg-bg-1 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.30),0px_4px_8px_3px_rgba(0,0,0,0.15)] focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none active:cursor-grabbing",
    labels: "relative mt-3.5 h-6",
    label: "absolute -translate-x-1/2 text-label text-black",
  },
  variants: {
    active: {
      true: {
        segment: "bg-primary",
      },
    },
  },
});
