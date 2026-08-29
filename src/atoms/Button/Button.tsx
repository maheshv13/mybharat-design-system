import type {
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

import { Icon } from "../Icon";
import type { IconName } from "../Icon";

import styles from "./Button.module.css";

type ButtonVariant = string;

type ButtonSize =
  | "default"
  | "xxs"
  | "xs"
  | "sm"
  | "lg";

type IconPosition = "left" | "right";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  label?: ReactNode;

  variant?: ButtonVariant;
  size?: ButtonSize;

  /**
   * Icon name from ICON_REGISTRY
   * Example: "arrow", "arrowRight", "calendar"
   */
  icon?: IconName;

  iconPosition?: IconPosition;

  className?: string;
}

const Button = ({
  children,
  label,

  variant = "primary",
  size = "default",

  icon,
  iconPosition = "left",

  disabled = false,
  type = "button",
  className = "",

  ...props
}: ButtonProps) => {
  const content = children ?? label;

  const classes = [
    styles.button,
    styles[variant],
    styles[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === "left" && (
        <Icon
          size="md"
          name={icon}
          className={styles.icon}
        />
      )}

      {content}

      {icon && iconPosition === "right" && (
        <Icon
          name={icon}
          className={styles.icon}
        />
      )}
    </button>
  );
};

export type {
  ButtonProps,
  ButtonVariant,
  ButtonSize,
  IconPosition,
};

export default Button;