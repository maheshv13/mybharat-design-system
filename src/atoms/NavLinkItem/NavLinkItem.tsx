import type {
  AnchorHTMLAttributes,
  ReactNode,
} from "react";

import styles from "./NavLinkItem.module.css";

export interface NavLinkItemProps
  extends Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    "href" | "children"
  > {
  to?: string;
  href?: string;
  label?: ReactNode;
  children?: ReactNode;
  isActive?: boolean;
}

const NavLinkItem = ({
  to,
  href,
  label,
  children,
  className = "",
  isActive = false,
  ...props
}: NavLinkItemProps) => {
  const finalLink =
    href || to || "#";

  const classes = [
    styles.parentButton,
    isActive
      ? styles.active
      : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <a
      href={finalLink}
      className={classes}
      aria-current={
        isActive
          ? "page"
          : undefined
      }
      {...props}
    >
      {label || children}
    </a>
  );
};

export default NavLinkItem;