
import styles from "./Radio.module.css";
import type { InputHTMLAttributes, ReactNode } from "react";

type LabelPosition = "right" | "left";

interface RadioProps extends Omit<
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

const Radio = ({
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
}: RadioProps) => {
  return (
    <div className={styles.wrapper}>
      {labelPosition === "left" && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}

      <input
        {...rest}
        type="radio"
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

export default Radio;
