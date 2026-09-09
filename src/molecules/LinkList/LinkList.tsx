
import { AnchorLink } from "../../atoms/AnchorLink";
import { Text } from "../../atoms/Text";
import type { MouseEventHandler, ReactNode } from "react";
import styles from "./LinkList.module.css";

export interface LinkListItem {
  label: ReactNode;
  href?: string;
  to?: string;
  type?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface LinkListProps {
  title?: ReactNode;
  links?: LinkListItem[];
  variant?: "default" | "dark";
}

const LinkList = ({
  title,
  links = [],
  variant = "default" 
}: LinkListProps) => {
  return (
    <div className={styles.wrapper}>
      <Text as="h6" className={styles.title}>
        {title}
      </Text>

      

      <ul>
        {links.map((link, index) => (
          <li key={typeof link.label === "string" ? link.label : index} className={styles.item}>

            {/* ✅ Navigation link */}
            {(link.href || link.to) && (
              <AnchorLink
                href={link.href} 
                to={link.to} 
                variant={variant === "dark" ? "dark" : "default"}
                >
                {link.label}
              </AnchorLink>
            )}

            {/* ✅ Action item (button-like) */}
            {link.type === "button" && (
              <Text
                as="button"
                variant={variant === "dark" ? "dark" : "default"}
                onClick={link.onClick}
                className="cursor-pointer"
              >
                {link.label}
              </Text>
            )}

          </li>
        ))}
      </ul>

    </div>
  );
};

export default LinkList;
