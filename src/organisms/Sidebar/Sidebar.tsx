import SidebarItem from "./SidebarItem";
import styles from "./Sidebar.module.css";

import type { IconName } from "../../atoms/Icon";

export interface SidebarItemData {
  id?: string | number;
  label: string;
  href?: string;
  icon?: IconName;
  children?: SidebarItemData[];
  collapsible?: boolean;
}

export interface SidebarProps {
  items?: SidebarItemData[];

  /**
   * Current application path.
   *
   * The consumer should provide this value from
   * its routing solution.
   *
   * Example with Next.js:
   * currentPath={pathname}
   */
  currentPath?: string;
}

const Sidebar = ({
  items = [],
  currentPath,
}: SidebarProps) => {
  return (
    <ul className={styles.sidebar}>
      {items.map((item) => (
        <SidebarItem
          key={item.id ?? item.label}
          {...item}
          currentPath={currentPath}
        />
      ))}
    </ul>
  );
};

export default Sidebar;
