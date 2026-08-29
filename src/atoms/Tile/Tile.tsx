import styles from "./Tile.module.css";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type TileVariant = "default" | "bordered" | "inverse";
type IconPosition = "left" | "right";

export interface TileProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children"> {
  label: string;
  url?: string;
  icon?: ReactNode;
  iconPosition?: IconPosition;
  active?: boolean;
  variant?: TileVariant;
}

const Tile = ({
  label,
  url,
  onClick,
  target = "_self",
  rel,
  className = "",
  variant = "default", // default | bordered | inverse
  icon,               
  iconPosition = "left", // left | right
  active = false,     
}: TileProps) => {
  const isExternal = target === "_blank";

  return (
    <a
      href={url}
      target={target}
      rel={isExternal ? "noopener noreferrer" : rel}
      onClick={onClick}
      className={`
        ${styles.tile}
        ${styles[variant]}
        ${active ? styles.active : ""}
        ${className}
      `}
      title={label}
    >
      {icon && iconPosition === "left" && (
        <span className={styles.icon}>{icon}</span>
      )}

      <span className={styles.label}>{label}</span>

      {icon && iconPosition === "right" && (
        <span className={styles.icon}>{icon}</span>
      )}
    </a>
  );
};

export default Tile;
