import styles from "./Radio.module.css";
import type { InputHTMLAttributes, ReactNode } from "react";

type LabelPosition = "right" | "left";

interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "id" | "name" | "checked" | "disabled"> {
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
  labelPosition = "right", // right | left 
  required = false,
  checked = false,
  disabled = false
}: RadioProps) => {
  return(
    <div className={styles.wrapper}>  
      { labelPosition === "left" && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      
      <input 
        type="radio" 
        name={name}
        className={styles.formcontrol} 
        id={id}
        checked={checked}
        required={required}
        disabled={disabled}
        />
      
      { labelPosition === "right" && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
    </div>
  )
}

export default Radio;
