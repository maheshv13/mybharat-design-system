import { useState } from "react";

import SidebarItem from "./SidebarItem";

import styles from "./Sidebar.module.css";

import type { SidebarItemProps } from "./SidebarItem";

export interface SidebarGroupProps {
  links?: SidebarItemProps[];

  /**
   * Current application path.
   *
   * The consumer provides this value from
   * its routing solution.
   */
  currentPath?: string;
}

const SidebarGroup = ({
  links = [],
  currentPath,
}: SidebarGroupProps) => {
  /*
   * Detect collapsible parent.
   */
  const parent = links.find(
    (link) => link.collapsible
  );

  const children = parent
    ? links.filter(
        (link) => link !== parent
      )
    : links;

  const [open, setOpen] =
    useState(true);

  return (
    <div className={styles.group}>
      {/* ================= PARENT ================= */}

      {parent ? (
        <>
          <div
            className={styles.groupItem}
            onClick={() =>
              setOpen((current) => !current)
            }
          >
            <SidebarItem
              {...parent}
              isParent
              currentPath={currentPath}
            />

            <span className={styles.arrow}>
              {open ? "−" : "+"}
            </span>
          </div>

          {/* ================= CHILDREN ================= */}

          {open && (
            <ul className={styles.list}>
              {children.map((link) => (
                <SidebarItem
                  key={
                    link.id ?? link.label
                  }
                  {...link}
                  currentPath={currentPath}
                />
              ))}
            </ul>
          )}
        </>
      ) : (
        /* ================= NORMAL LIST ================= */

        <ul className={styles.list}>
          {children.map((link) => (
            <SidebarItem
              key={
                link.id ?? link.label
              }
              {...link}
              currentPath={currentPath}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default SidebarGroup;
