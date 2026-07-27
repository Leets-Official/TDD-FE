import { tv } from "@/utils/cn";

export const chatTextFieldVariants = tv({
  slots: {
    wrapper: "flex items-start",
    inputWrapper:
      "flex flex-1 items-center rounded-md bg-bg-3 px-padding-l py-padding-s",
    input:
      "flex-1 bg-transparent text-body-1 text-text-1 outline-none placeholder:text-text-5 disabled:cursor-not-allowed",
  },
});
