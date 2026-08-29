import styles from "./Container.module.css";
import type { HTMLAttributes, ReactNode } from "react";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  size?: string | number;
}

const Container = ({
  children,
  className = "",
  ...props
}: ContainerProps) => {

  const classes = [styles.container, className].join(" ");

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default Container;
