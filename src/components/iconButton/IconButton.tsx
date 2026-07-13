import type { ComponentPropsWithRef, ReactNode } from "react";

import { type VariantProps } from "@/utils/cn";

import { iconButtonVariants } from "./IconButton.variants";

export interface IconButtonProps
  extends
    ComponentPropsWithRef<"button">,
    VariantProps<typeof iconButtonVariants> {
  icon: ReactNode;
  "aria-label": string;
}

export function IconButton({
  icon,
  size,
  type = "button",
  className,
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      className={iconButtonVariants({ size, className })}
      {...props}
    >
      {icon}
    </button>
  );
}
