import { tv } from "@/utils/cn";

export const dormitoryVerificationCardVariants = tv({
  slots: {
    root: "flex w-full flex-col gap-2 rounded-lg bg-white px-4 py-6 shadow-card",
    title: "text-label text-text-1",
    statusRow: "flex items-center justify-between",
    icon: "size-4 shrink-0",
    status: "text-caption-1",
    description: "text-caption-2 text-text-4",
    chevron: "size-6 shrink-0 cursor-pointer text-chevron",
  },
  variants: {
    status: {
      verified: {
        status: "text-text-1",
      },
      unverified: {
        status: "text-text-1",
      },
      failed: {
        status: "text-error",
        description: "text-error",
      },
    },
  },
  defaultVariants: {
    status: "unverified",
  },
});
