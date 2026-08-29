import styles from "./Select.module.css";
import type { ComponentType, ReactNode, SelectHTMLAttributes } from "react";

type SelectSize = "default" | "lg";
type SelectVariant = "default" | "filter" | "multi";
type IconComponent = ComponentType<{ className?: string }>;

interface SelectOption {
  value: string;
  label: ReactNode;
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "id" | "size" | "multiple" | "value" | "onChange"> {
  id?: string;
  label?: ReactNode;
  options?: SelectOption[];
  placeholder?: string;
  description?: ReactNode;
  error?: ReactNode;
  labelIcon?: IconComponent;
  icon?: IconComponent;
  descIcon?: IconComponent;
  size?: SelectSize;
  variant?: SelectVariant;
  multiple?: boolean;
  value?: string | number | readonly string[];
  onChange?: (value: string | string[]) => void;
}

const Select = ({
  id,
  label,
  options = [],
  placeholder,
  description,
  error,
  labelIcon: LabelIcon,
  icon: Icon,
  descIcon: DescIcon,
  size = "default",
  required = false,
  variant = "default",   // default | filter | multi
  multiple = false,      
  value,
  onChange,
  ...props
}: SelectProps) => {

  const sizeClass = size !== "default" ? styles[size] : "";
  const variantClass = styles[variant] || "";

  const descriptionId = description ? `${id}-desc` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  const ariaDescribedBy = [descriptionId, errorId]
    .filter(Boolean)
    .join(" ");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (multiple) {
      const selectedValues = Array.from(
        e.target.selectedOptions,
        (opt) => opt.value
      );
      onChange?.(selectedValues);
    } else {
      onChange?.(e.target.value);
    }
  };

  return (
    <div className={styles.wrapper}>

      {/* Label */}
      {label && (
        <label htmlFor={id} className={styles.label}>
          {LabelIcon && <LabelIcon className={styles.labelicon} />}
          {label}
          {required && (
            <span className={styles.required} aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      {/* Input */}
      <div
        className={`
          ${styles.section}
          ${sizeClass}
          ${variantClass}
          ${error ? styles.error : ""}
        `}
      >
        {Icon && (
          <span className={styles.icon}>
            <Icon />
          </span>
        )}

        <select
          id={id}
          className={styles.formcontrol}
          multiple={multiple}                     // ✅ key change
          value={value}
          onChange={handleChange}
          aria-required={required}
          aria-invalid={!!error}
          aria-describedby={ariaDescribedBy || undefined}
          required={required}
          size={multiple ? 4 : undefined}         // ✅ better UX
          {...props}
        >
          {!multiple && placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}

          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Description */}
      {description && (
        <div id={descriptionId} className={styles.description}>
          {DescIcon && <DescIcon className={styles.descicon} />}
          {description}
        </div>
      )}

      {/* Error */}
      {error && (
        <p
          id={errorId}
          className={`${styles.description} ${styles.errorText}`}
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default Select;
