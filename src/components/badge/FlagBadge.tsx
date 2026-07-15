import type { ComponentPropsWithRef } from "react";

import { flagBadgeVariants } from "./FlagBadge.variants";

export type FlagBadgeProps = ComponentPropsWithRef<"span">;

export function FlagBadge({ className, children, ...props }: FlagBadgeProps) {
  return (
    <span className={flagBadgeVariants({ className })} {...props}>
      {children}
    </span>
  );
}
