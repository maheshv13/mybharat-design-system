import { useState } from "react";
import SidebarItem from "./SidebarItem";
import styles from "./Sidebar.module.css";
import type { SidebarItemProps } from "./SidebarItem";

export interface SidebarGroupProps {
  links?: SidebarItemProps[];
}

const SidebarGroup = ({ links = [] }: SidebarGroupProps) => {

  // Detect parent
  const parent = links.find(link => link.collapsible);
  const children = parent
    ? links.filter(link => link !== parent)
    : links;

  const [open, setOpen] = useState(true);

  return (
    <div className={styles.group}>

      {/* ================= PARENT (Collapsible) ================= */}
      {parent ? (
        <>
          <div
            className={styles.groupItem}
            onClick={() => setOpen(!open)}
          >
            <SidebarItem
              {...parent}
              isParent
            />

            <span className={styles.arrow}>
              {open ? "−" : "+"}
            </span>
          </div>

          {/* Children */}
          {open && (
            <ul className={styles.list}>
              {children.map((link) => (
                <SidebarItem
                  key={link.id ?? link.label}
                  {...link}
                  active={window.location.pathname === link.href}
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
              key={link.id ?? link.label}
              {...link}
              active={window.location.pathname === link.href}
            />
          ))}
        </ul>

      )}

    </div>
  );
};

export default SidebarGroup;