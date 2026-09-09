import { Icon } from "../../atoms/Icon";
import type { IconProps } from "../../atoms/Icon"; // Import IconProps
import { Text } from "../../atoms/Text";
import { AnchorLink } from "../../atoms/AnchorLink";
import type { ReactNode } from "react";
import styles from "./ListItem.module.css";

const ALLOWED_ICON_POSITIONS = ["left", "right", "top", "center"] as const;
const ALLOWED_ICON_SIZES = ["xs", "sm", "md", "lg", "xl"] as const;

type IconPosition = (typeof ALLOWED_ICON_POSITIONS)[number];
type IconSize = (typeof ALLOWED_ICON_SIZES)[number];

export interface ListItemProps {
  as?: "li" | "div";
  children?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  iconName?: IconProps["name"]; // Updated to use the strong union type from IconProps
  showIcon?: boolean;
  iconPosition?: IconPosition;
  iconBackground?: string;
  iconColor?: string;
  iconSize?: IconSize;
  href?: string;
  to?: string;
  linkVariant?: "default" | "dark";
  className?: string;
}

const validateVariant = <T extends string>(
  value: T,
  allowed: readonly T[],
  fallback: T,
  propName: string,
): T => {
  if (!allowed.includes(value)) {
    console.warn(
      `Invalid "${propName}" value: "${value}". Allowed values: ${allowed.join(", ")}`
    );
    return fallback;
  }
  return value;
};

const ListItem = ({
  as,
  children,
  title,
  description,
  iconName,
  showIcon = true,
  iconPosition = "left",
  iconBackground,
  iconColor,
  iconSize = "md",
  href,
  to,
  linkVariant = "default",
  className = ""
}: ListItemProps) => {
  const Component: "li" | "div" = as || "li";

  const safeIconPosition = validateVariant(
    iconPosition,
    ALLOWED_ICON_POSITIONS,
    "left",
    "iconPosition"
  );

  const safeIconSize = validateVariant(
    iconSize,
    ALLOWED_ICON_SIZES,
    "md",
    "iconSize"
  );

  // Layout control
  const layoutClasses = {
    left: styles.left,
    right: styles.right,
    top: styles.top,
    center: styles.center
  };

  const iconSizeClassMap = {
    xs: styles.iconXs,
    sm: styles.iconSm,
    md: styles.iconMd,
    lg: styles.iconLg,
    xl: styles.iconXl
  };

  const containerClass = layoutClasses[safeIconPosition];

  // Content alignment fix
  const contentAlignment =
    safeIconPosition === "center" ? styles.contentCenter : styles.contentStart;

  const renderIcon = () =>
    showIcon && iconName ? (
      <div className={iconSizeClassMap[safeIconSize]}>
        <Icon
          name={iconName}
          size={safeIconSize}
          background={!!iconBackground}
          backgroundColor={iconBackground}
          color={iconColor}
        />
      </div>
    ) : null;

  const renderTitle = () => {
    if (!title) return null;

    if (href || to) {
      return (
        <AnchorLink
          href={href}
          to={to}
          variant={linkVariant}
          className={`${styles.titleLink} ${safeIconPosition === "center" ? styles.centerText : ""}`}
        >
          <Text as="span">{title}</Text>
        </AnchorLink>
      );
    }

    return (
      <Text
        as="h5"
        className={`${styles.titleText} ${safeIconPosition === "center" ? styles.centerText : ""}`}
      >
        {title}
      </Text>
    );
  };

  const renderContent = () => (
    <div className={`${styles.content} ${contentAlignment}`}>
      {renderTitle()}
      {description && (
        <Text className={styles.description} variant="helper">
          {description}
        </Text>
      )}
    </div>
  );

  return (
    <Component
      className={className}
      role={Component === "div" ? "listitem" : undefined}
    >
      <div className={containerClass}>
        {children ? (
          children
        ) : (
          <>
            {renderIcon()}
            {renderContent()}
          </>
        )}
      </div>
    </Component>
  );
};

export default ListItem;
