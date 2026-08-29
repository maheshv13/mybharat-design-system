import type { AnchorHTMLAttributes, ReactNode } from "react";
import styles from "./NavLinkItem.module.css";

interface NavLinkItemProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children"> {
  to?: string;
  href?: string;
  label?: ReactNode;
  children?: ReactNode;
  isActive?: boolean;
  currentPath?: string;
}

const NavLinkItem = ({
  to,
  href,
  label,
  children,
  className = "",
  isActive: customIsActive,
  currentPath,
  ...props
}: NavLinkItemProps) => {
  // Final URL
  const finalLink = href || to || "#";

  // Convert full URL → pathname
  const getPathname = (url: string) => {
    if (!url) return "";

    try {
      return new URL(url, window.location.origin).pathname;
    } catch {
      return url;
    }
  };

  // Normalize paths
  const normalize = (path = "") =>
    path
      .replace(/\/+$/, "") // remove trailing slash
      .replace(/_/g, "-") // convert underscores → hyphens
      .toLowerCase();

  const activePath = normalize(
    currentPath ?? (typeof window !== "undefined" ? window.location.pathname : "")
  );
  const linkPath = normalize(getPathname(finalLink));

  // Active state
  const isCurrentlyActive =
    typeof customIsActive === "boolean"
      ? customIsActive
      : activePath.startsWith(linkPath);

  const classes = `
    parentButton
    ${isCurrentlyActive ? styles.active : ""}
    ${className}
  `;

  return (
    <a
      href={finalLink}
      className={classes}
      {...props}
    >
      {label || children}
    </a>
  );
};

export default NavLinkItem;
