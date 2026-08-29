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
}

const Sidebar = ({ items = [] }: SidebarProps) => {
  return (
    <ul className={styles.sidebar}>
      {items.map((item) => (
        <SidebarItem key={item.id ?? item.label} {...item} />
      ))}
    </ul>
  );
};

export default Sidebar;