import styles from "./SidebarLayout.module.css";
import type { ReactNode } from "react";

export interface SidebarLayoutProps {
  sidebar?: ReactNode;
  children?: ReactNode;
}

const SidebarLayout = ({
  sidebar,
  children
}: SidebarLayoutProps) => {

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        {sidebar}
      </aside>

      <main className={styles.content}>
        {children}
      </main>
    </div>
  );
};

export default SidebarLayout;
