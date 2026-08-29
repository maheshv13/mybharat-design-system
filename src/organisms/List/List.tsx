import ListItem from "../../molecules/ListItem/ListItem";
import { getLayoutClasses } from "./getLayoutClasses";
import type { Columns, Gap, LayoutVariant } from "./getLayoutClasses";
import type { ElementType, ReactNode } from "react";
import type { ListItemProps } from "../../molecules/ListItem/ListItem";

export interface ListData extends Omit<ListItemProps, "as"> {
  id?: string | number;
}

export interface ListProps {
  items?: ListData[];
  children?: ReactNode;
  as?: "ul" | "ol" | "div" | "nav";
  variant?: LayoutVariant;
  columns?: Columns;
  gap?: Gap;
  showIcon?: boolean;
  iconPosition?: "left" | "right" | "top" | "center";
  iconBackground?: string;
  iconColor?: string;
  iconSize?: "xs" | "sm" | "md" | "lg" | "xl";
  linkVariant?: "default" | "dark";
  className?: string;
}

const List = ({
  items,
  children,
  as: Component = "ul",
  variant = "vertical",
  columns,
  gap = "md",
  showIcon = true,
  iconPosition = "left",
  iconBackground,
  iconColor,
  iconSize = "lg",
  linkVariant = "default",
  className = ""
}: ListProps) => {

  const itemAs = Component === "div" ? "div" : "li";

  const containerClass = getLayoutClasses({
    variant,
    columns,
    gap
  });

  let content = children;

  if (items) {
    content = items.map((item, index) => (
      <ListItem
        key={item.id || index}
        as={itemAs}
        {...item}
        showIcon={showIcon}
        iconPosition={iconPosition}
        iconBackground={iconBackground}
        iconColor={iconColor}
        iconSize={iconSize}
        linkVariant={linkVariant}
      />
    ));
  }

  if (Component === "nav") {
    return (
      <nav className={className}>
        <ul className={containerClass}>{content}</ul>
      </nav>
    );
  }

  return (
    <Component
      className={`${containerClass} ${className}`}
      role={Component === "div" ? "list" : undefined}
    >
      {content}
    </Component>
  );
};

List.Item = ListItem;

export default List;