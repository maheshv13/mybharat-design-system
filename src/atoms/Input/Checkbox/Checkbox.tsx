
import styles from "./Checkbox.module.css";
import type { InputHTMLAttributes, ReactNode } from "react";

type LabelPosition = "right" | "left";

interface CheckboxProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "type" | "id" | "name" | "checked" | "disabled" | "defaultChecked"
  > {
  id?: string;
  label?: ReactNode;
  name?: string;
  labelPosition?: LabelPosition;
  required?: boolean;
  checked?: boolean;
  disabled?: boolean;
}

const Checkbox = ({
  id,
  label,
  name,
  value,
  labelPosition = "right",
  required = false,
  checked,
  disabled = false,
  onChange,
  className,
  ...rest
}: CheckboxProps) => {
  return (
    <div className={styles.wrapper}>
      {labelPosition === "left" && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}

      <input
        {...rest}
        type="checkbox"
        name={name}
        value={value}
        className={`${styles.formcontrol} ${className || ""}`}
        id={id}
        checked={checked}
        required={required}
        disabled={disabled}
        onChange={onChange}
      />

      {labelPosition === "right" && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
    </div>
  );
};

export default Checkbox;
