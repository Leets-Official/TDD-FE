import { tv } from "@/utils/cn";

export const switchVariants = tv({
  slots: {
    track:
      "group inline-flex h-8 w-14 shrink-0 cursor-pointer items-center rounded-full bg-bg-5 px-1 transition-colors disabled:cursor-not-allowed data-[checked=true]:bg-primary",
    knob: "size-6 rounded-full bg-bg-1 transition-transform group-data-[checked=true]:translate-x-6",
  },
});
