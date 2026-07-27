import { tv } from "@/utils/cn";

export const textFieldVariants = tv({
  slots: {
    wrapper: "flex flex-col has-[input:disabled]:opacity-30",
    label: "mb-xxs text-body-1 text-text-1",
    inputWrapper:
      "flex h-[64px] items-center gap-xxs rounded-md border border-text-5 bg-bg-1 pr-padding-m pl-padding-l transition-colors focus-within:border-text-1 has-[input:disabled]:cursor-not-allowed",
    input:
      "flex-1 bg-transparent text-body-1 text-text-1 outline-none placeholder:text-text-5 disabled:cursor-not-allowed",
    iconButton:
      "flex shrink-0 cursor-pointer items-center justify-center p-3 text-text-4 transition-colors hover:text-text-1 disabled:cursor-not-allowed [&_svg]:size-6",
    feedback: "mt-1 px-padding-s text-caption-1 text-text-4",
  },
  variants: {
    state: {
      default: {},
      error: {
        inputWrapper: "border-error focus-within:border-error",
        feedback: "text-error",
      },
    },
  },
  defaultVariants: {
    state: "default",
  },
});
