import type { ComponentPropsWithRef } from "react";

import { type VariantProps } from "@/utils/cn";

import { buttonVariants } from "./Button.variants";

export interface ButtonProps
  extends
    ComponentPropsWithRef<"button">,
    VariantProps<typeof buttonVariants> {}

export function Button({
  variant,
  size,
  type = "button",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonVariants({ variant, size, className })}
      {...props}
    />
  );
}
