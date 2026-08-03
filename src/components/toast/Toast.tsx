import type { ComponentPropsWithRef } from "react";

import BadgeCheckIcon from "@/assets/icons/BadgeCheckIcon.svg?react";
import ErrorIcon from "@/assets/icons/ErrorIcon.svg?react";
import WarningIcon from "@/assets/icons/WarningIcon.svg?react";

import { toastVariants } from "./Toast.variants";

export type ToastVariant = "success" | "warning" | "error";

const TOAST_ICON: Record<ToastVariant, typeof BadgeCheckIcon> = {
  success: BadgeCheckIcon,
  warning: WarningIcon,
  error: ErrorIcon,
};

export interface ToastProps extends Omit<
  ComponentPropsWithRef<"div">,
  "children"
> {
  message: string;
  variant?: ToastVariant;
  actionLabel?: string;
  onActionClick?: () => void;
}

export function Toast({
  message,
  variant = "success",
  actionLabel,
  onActionClick,
  className,
  ...props
}: ToastProps) {
  const styles = toastVariants({ variant, hasAction: !!actionLabel });
  const Icon = TOAST_ICON[variant];

  // 실패 알림은 읽던 내용을 끊고 바로 안내합니다.
  const liveRegion =
    variant === "success"
      ? ({ role: "status", "aria-live": "polite" } as const)
      : ({ role: "alert", "aria-live": "assertive" } as const);

  if (!actionLabel) {
    return (
      <div {...liveRegion} className={styles.root({ className })} {...props}>
        <Icon className={styles.icon()} aria-hidden="true" />
        <p className={styles.message()}>{message}</p>
      </div>
    );
  }

  return (
    <div {...liveRegion} className={styles.root({ className })} {...props}>
      <div className={styles.content()}>
        <Icon className={styles.icon()} aria-hidden="true" />
        <p className={styles.message()}>{message}</p>
      </div>
      <button type="button" className={styles.action()} onClick={onActionClick}>
        {actionLabel}
      </button>
    </div>
  );
}
