import type { ComponentPropsWithRef, ReactNode } from "react";

import { type VariantProps } from "@/utils/cn";

import { iconButtonVariants } from "./IconButton.variants";

export interface IconButtonProps
  extends
    ComponentPropsWithRef<"button">,
    VariantProps<typeof iconButtonVariants> {
  icon: ReactNode;
  "aria-label": string;
  selected?: boolean;
}

export function IconButton({
  icon,
  size,
  tone,
  selected,
  type = "button",
  className,
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      data-selected={selected}
      aria-pressed={selected}
      className={iconButtonVariants({ size, tone, className })}
      {...props}
    >
      {icon}
    </button>
  );
}
