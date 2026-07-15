import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import { Button } from "@/components/button/Button";
import { useOutsideClick } from "@/hooks/useOutsideClick";

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
  const cardRef = useRef<HTMLDivElement>(null);
  const styles = modalVariants();

  useOutsideClick(cardRef, onClose, isOpen);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className={styles.backdrop()}>
      <div
        ref={cardRef}
        role="dialog"
        aria-modal="true"
        className={styles.card()}
      >
        <div className={styles.container()}>
          <div className={styles.contents()}>
            <div className={styles.titleBody()}>
              <p className={styles.title()}>{title}</p>
              {description && (
                <p className={styles.description()}>{description}</p>
              )}
            </div>
            {caption && <p className={styles.caption()}>{caption}</p>}
          </div>
          {(outlineLabel ?? primaryLabel) && (
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
      </div>
    </div>,
    document.body
  );
}
