import { useState } from "react";

import { Icon } from "../../atoms/Icon";
import { AnchorLink } from "../../atoms/AnchorLink";

import styles from "./Sidebar.module.css";

import type { IconName } from "../../atoms/Icon/Icon";

export interface SidebarItemProps {
  id?: string | number;
  label: string;
  href?: string;
  icon?: IconName;
  collapsible?: boolean;

  children?: Array<
    Omit<SidebarItemProps, "children"> & {
      children?: SidebarItemProps[];
    }
  >;

  /**
   * Explicitly control the active state.
   *
   * When provided, this takes precedence over
   * currentPath matching.
   */
  active?: boolean;

  /**
   * Indicates that this item is being rendered
   * as a parent item.
   */
  isParent?: boolean;

  /**
   * Current application path.
   *
   * The consumer provides this value.
   */
  currentPath?: string;
}

const SidebarItem = ({
  label,
  href,
  icon,
  children = [],
  active,
  currentPath,
}: SidebarItemProps) => {
  const hasChildren =
    children.length > 0;

  const [open, setOpen] =
    useState(false);

  /*
   * Explicit `active` takes precedence.
   *
   * Otherwise, determine the active state
   * from the current path supplied by the
   * consuming application.
   */
  const isActive =
    active ??
    (currentPath !== undefined &&
      href !== undefined &&
      currentPath === href);

  const handleItemClick = () => {
    if (hasChildren) {
      setOpen((current) => !current);
    }
  };

  return (
    <li>
      <div
        className={[
          styles.item,
          isActive ? styles.active : "",
        ]
          .filter(Boolean)
          .join(" ")}
        onClick={handleItemClick}
      >
        <div className={styles.itemInner}>
          {icon && (
            <Icon
              name={icon}
              size="md"
            />
          )}

          {href ? (
            <AnchorLink
              variant="dark"
              href={href}
            >
              {label}
            </AnchorLink>
          ) : (
            <span>{label}</span>
          )}
        </div>

        {hasChildren && (
          <span className={styles.arrow}>
            {open ? (
              <Icon
                name="dropdown"
                size="md"
              />
            ) : (
              <Icon
                name="arrowRight"
                size="md"
              />
            )}
          </span>
        )}
      </div>

      {hasChildren && open && (
        <ul className={styles.subList}>
          {children.map((child) => (
            <SidebarItem
              key={
                child.id ?? child.label
              }
              {...child}
              currentPath={currentPath}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default SidebarItem;
