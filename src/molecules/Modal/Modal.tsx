import { useEffect } from "react";
import type { HTMLAttributes, MouseEvent, ReactNode } from "react";
import styles from "./Modal.module.css";

export interface ModalProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  isOpen?: boolean;
  onClose?: () => void;
  title?: ReactNode;
  children?: ReactNode;
  withLogo?: boolean;
  size?: string;
  closeOnOverlay?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  id?: string;
}

const Modal = ({
  isOpen = false,
  onClose,
  title,
  children,
  withLogo = false,
  size = "md",
  closeOnOverlay = true,
  closeOnEscape = true,
  showCloseButton = true,
  className = "",
  id,
  ...props
}: ModalProps) => {
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, closeOnEscape, onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = () => {
    if (closeOnOverlay) {
      onClose?.();
    }
  };

  const handleModalClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const classes = [
    styles.modal,
    styles[`size-${size}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={styles.overlay}
      onClick={handleOverlayClick}
    >
      <div
        id={id}
        className={classes}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
        onClick={handleModalClick}
        {...props}
      >
        {(title || showCloseButton) && (
          <div className={styles.header}>
            {title && (
              <h5
                id="modal-title"
                className={styles.title}
              >
                {title}
              </h5>
            )}

            {withLogo && (
                <div>
                  <img width="120" src="https://cdn-beta.mybharats.in/mybharat/assets/img/yuva_landing/mybharatlogo_opt_2x.png" alt="Logo"></img>
                </div>
            )}

            {showCloseButton && (
              <button
                type="button"
                className={styles.closeButton}
                onClick={onClose}
                aria-label="Close modal"
              >
                ×
              </button>
            )}
          </div>
        )}

        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
