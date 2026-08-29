import styles from "./Input.module.css";
import type { ComponentType, InputHTMLAttributes, ReactNode } from "react";

type InputVariant = "default" | "error" | "success" | "filter";
type InputSize = "default" | "lg";
type IconComponent = ComponentType<{ className?: string }>;

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "size"> {
  id?: string;
  label?: ReactNode;
  description?: ReactNode;
  labelIcon?: IconComponent;
  icon?: IconComponent;
  descIcon?: IconComponent;
  variant?: InputVariant;
  size?: InputSize;
  required?: boolean;
}

const Input = ({
  id,
  label,
  placeholder,
  type,
  description,
  labelIcon: LabelIcon,
  icon: Icon,
  descIcon: DescIcon,
  variant="default",       // default | error | success | filter
  size = "default",        // default | lg
  required = false,
  ...props
}: InputProps) => { 
  const sizeClass = size !== "default" ? styles[size] : ""
  const variantClass = variant !== "default" ? styles[variant] : ""

  return (
    <div className={styles.wrapper}>
      { label && (
      <label htmlFor={id} className={styles.label}>
        <span className={styles.labelicon}>
          {LabelIcon && <LabelIcon className={styles.labelicon} />}
        </span> 
        {label}
        {required && <span className={styles.required} aria-hidden="true">  *</span>}
      </label>
      )
      }
      <div className={`${styles.section} ${sizeClass} ${variantClass}`}>
        {Icon && <span className={styles.icon}><Icon /></span>}

        <input
          id={id}
          type={type}
          className={styles.formcontrol}
          placeholder={placeholder}
          {...props}
        />
      </div>

      {description && <div className={styles.description}>
        <span>
          {DescIcon && <DescIcon className={styles.descicon} />}
        </span>  
        {description}
      </div>}
    </div>
  )
}

export default Input;
