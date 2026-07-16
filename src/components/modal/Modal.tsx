import { useEffect, useId, useRef } from "react";

import { Button } from "@/components/button/Button";

import { modalVariants } from "./Modal.variants";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  caption?: string;
  outlineLabel?: string;
  onOutlineClick?: () => void;
  primaryLabel?: string;
  onPrimaryClick?: () => void;
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  caption,
  outlineLabel,
  onOutlineClick,
  primaryLabel,
  onPrimaryClick,
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
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
    >
      <div className={styles.container()}>
        <div className={styles.contents()}>
          <div className={styles.titleBody()}>
            <p id={titleId} className={styles.title()}>
              {title}
            </p>
            {description && (
              <p className={styles.description()}>{description}</p>
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
                variant="default"
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
