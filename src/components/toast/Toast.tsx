import type { ComponentPropsWithRef } from "react";

import BadgeCheckIcon from "@/assets/icons/BadgeCheckIcon.svg?react";

import { toastVariants } from "./Toast.variants";

export interface ToastProps extends Omit<
  ComponentPropsWithRef<"div">,
  "children"
> {
  message: string;
  actionLabel?: string;
  onActionClick?: () => void;
}

export function Toast({
  message,
  actionLabel,
  onActionClick,
  className,
  ...props
}: ToastProps) {
  const styles = toastVariants({ hasAction: !!actionLabel });

  if (!actionLabel) {
    return (
      <div className={styles.root({ className })} {...props}>
        <BadgeCheckIcon className={styles.icon()} aria-hidden="true" />
        <p className={styles.message()}>{message}</p>
      </div>
    );
  }

  return (
    <div className={styles.root({ className })} {...props}>
      <div className={styles.content()}>
        <BadgeCheckIcon className={styles.icon()} aria-hidden="true" />
        <p className={styles.message()}>{message}</p>
      </div>
      <button type="button" className={styles.action()} onClick={onActionClick}>
        {actionLabel}
      </button>
    </div>
  );
}
