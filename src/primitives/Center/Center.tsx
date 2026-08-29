import styles from "./Center.module.css";
import type { ComponentPropsWithoutRef, CSSProperties, ElementType, ReactNode } from "react";

type CenterOwnProps<T extends ElementType> = {
  as?: T;
  children?: ReactNode;
  inline?: boolean;
  full?: boolean;
  textAlign?: CSSProperties["textAlign"];
  className?: string;
};

export type CenterProps<T extends ElementType = "div"> = CenterOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof CenterOwnProps<T>>;

const Center = <T extends ElementType = "div">({
as,
  children,
  inline = false,
  full = false,
  textAlign = "center",
  className = "",
  ...props
}: CenterProps<T>) => {
  const Component: ElementType = as || "div";

  const classes = [styles.center];

  if (inline) classes.push(styles.inline);
  if (full) classes.push(styles.full);
  if (className) classes.push(className);

  const style: CSSProperties = {
    textAlign
  };

  return (
    <Component className={classes.join(" ")} style={style} {...props}>
      {children}
    </Component>
  );
};

export default Center;
