import { tv } from "@/utils/cn";

export const tabBarVariants = tv({
  slots: {
    root: "inline-flex w-full border-b border-divider-1 px-padding-s",
    tab: "group relative -mb-px cursor-pointer px-padding-m py-padding-s text-label text-text-5 transition-colors focus-visible:ring-2 focus-visible:ring-text-1 focus-visible:outline-none data-[selected=true]:text-text-1",
    label:
      "relative inline-block after:absolute after:-inset-x-[5px] after:-bottom-padding-s after:hidden after:h-0.5 after:rounded-full after:bg-text-1 group-data-[selected=true]:after:block",
  },
});
