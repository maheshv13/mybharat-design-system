import styles from "./InputArea.module.css";
import type { ComponentType, ReactNode, TextareaHTMLAttributes } from "react";

type InputAreaVariant = "default" | "error" | "success";
type InputAreaSize = "default" | "lg";
type IconComponent = ComponentType<{ className?: string }>;

interface InputAreaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id"> {
  id?: string;
  label?: ReactNode;
  description?: ReactNode;
  labelIcon?: IconComponent;
  icon?: IconComponent;
  descIcon?: IconComponent;
  variant?: InputAreaVariant;
  size?: InputAreaSize;
  required?: boolean;
}

const InputArea = ({
  id,
  label,
  placeholder,
  description,
  labelIcon: LabelIcon,
  icon: Icon,
  descIcon: DescIcon,
  variant="default",       // default | error | success
  size = "default",        // default | lg
  required = false,
  ...props
}: InputAreaProps) => { 
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

        <textarea
          id={id}
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

export default InputArea;
