import { useEffect, useId, useRef, type ReactNode } from "react";

import Logo from "@/assets/Logo.svg?react";
import { Button } from "@/components/button/Button";

import { modalVariants } from "./Modal.variants";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  hasLogo?: boolean;
  title: string;
  description?: ReactNode;
  caption?: string;
  outlineLabel?: string;
  onOutlineClick?: () => void;
  primaryLabel?: string;
  onPrimaryClick?: () => void;
  isDestructive?: boolean;
  // false면 ESC·배경 클릭으로 닫히지 않아 버튼으로만 빠져나갈 수 있습니다
  isDismissible?: boolean;
}

export function Modal({
  isOpen,
  onClose,
  hasLogo = false,
  title,
  description,
  caption,
  outlineLabel,
  onOutlineClick,
  primaryLabel,
  onPrimaryClick,
  isDestructive = false,
  isDismissible = true,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const styles = modalVariants();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (!isOpen) {
      dialog.close();
      return;
    }

    if (!dialog.open) {
      dialog.showModal();
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog()}
      aria-labelledby={titleId}
      onClose={onClose}
      onCancel={(event) => {
        if (!isDismissible) event.preventDefault();
      }}
      onClick={(event) => {
        if (!isDismissible) return;
        if (event.target === dialogRef.current) onClose();
      }}
    >
      <div className={styles.container()}>
        <div className={styles.contents()}>
          {hasLogo && <Logo className={styles.logo()} />}
          <div className={styles.titleBody()}>
            <p id={titleId} className={styles.title()}>
              {title}
            </p>
            {description && (
              <div className={styles.description()}>{description}</div>
            )}
          </div>
          {caption && <p className={styles.caption()}>{caption}</p>}
        </div>
        {(outlineLabel || primaryLabel) && (
          <div className={styles.buttons()}>
            {outlineLabel && (
              <Button
                variant="outline"
                size="medium"
                className={styles.outlineButton()}
                onClick={onOutlineClick}
              >
                {outlineLabel}
              </Button>
            )}
            {primaryLabel && (
              <Button
                variant={isDestructive ? "destructive" : "default"}
                size="medium"
                className={styles.primaryButton()}
                onClick={onPrimaryClick}
              >
                {primaryLabel}
              </Button>
            )}
          </div>
        )}
      </div>
    </dialog>
  );
}
