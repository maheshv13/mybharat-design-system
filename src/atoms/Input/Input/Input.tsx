import styles from "./Input.module.css";

import type {
  InputHTMLAttributes,
  ReactNode,
} from "react";

import { Icon } from "../../Icon";
import type { IconName } from "../../Icon/Icon";

type InputVariant =
  | "default"
  | "error"
  | "success"
  | "filter";

type InputSize =
  | "default"
  | "lg";

interface InputProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "id" | "size"
  > {
  id?: string;

  label?: ReactNode;
  description?: ReactNode;

  labelIcon?: IconName;
  icon?: IconName;
  descIcon?: IconName;

  variant?: InputVariant;
  size?: InputSize;
  required?: boolean;
}

const Input = ({
  id,
  label,
  placeholder,
  type = "text",
  description,

  labelIcon,
  icon,
  descIcon,

  variant = "default",
  size = "default",
  required = false,

  ...props
}: InputProps) => {
  const sizeClass =
    size !== "default"
      ? styles[size]
      : "";

  const variantClass =
    variant !== "default"
      ? styles[variant]
      : "";

  const sectionClasses = [
    styles.section,
    sizeClass,
    variantClass,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={styles.wrapper}>

      {/* ================= LABEL ================= */}
      {label && (
        <label
          htmlFor={id}
          className={styles.label}
        >
          {labelIcon && (
            <Icon
              name={labelIcon}
              size="sm"
              className={styles.labelicon}
            />
          )}

          {label}

          {required && (
            <span
              className={styles.required}
              aria-hidden="true"
            >
              *
            </span>
          )}
        </label>
      )}

      {/* ================= INPUT ================= */}
      <div className={sectionClasses}>

        {icon && (
          <Icon
            name={icon}
            size="md"
            className={styles.icon}
          />
        )}

        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className={styles.formcontrol}
          required={required}
          {...props}
        />

      </div>

      {/* ================= DESCRIPTION ================= */}
      {description && (
        <div className={styles.description}>

          {descIcon && (
            <Icon
              name={descIcon}
              size="sm"
              className={styles.descicon}
            />
          )}

          {description}

        </div>
      )}

    </div>
  );
};

export default Input;