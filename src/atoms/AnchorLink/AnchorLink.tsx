import type {
  AnchorHTMLAttributes,
  MouseEventHandler,
  ReactNode,
} from "react";

import { Text } from "../Text";
import styles from "./AnchorLink.module.css";

export interface AnchorLinkProps
  extends Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    "href" | "onClick" | "children"
  > {
  children: ReactNode;

  href?: string;
  to?: string;

  onClick?: MouseEventHandler<HTMLAnchorElement>;

  target?: string;
  rel?: string;

  variant?: "default" | "button";

  className?: string;
}

const AnchorLink = ({
  children,
  href,
  to,
  onClick,
  target,
  rel,
  variant = "default",
  className = "",
  ...props
}: AnchorLinkProps) => {
  const variantClass =
    styles[variant] || styles.default;

  const runtime = globalThis as typeof globalThis & {
    process?: {
      env?: {
        NODE_ENV?: string;
      };
    };
  };

  const isDevelopment =
    runtime.process?.env?.NODE_ENV !== "production";

  // Development validation
  if (isDevelopment) {
    if (!href && !to && !onClick) {
      throw new Error(
        'AnchorLink requires "href", "to", or "onClick".'
      );
    }

    if ((href || to) && onClick) {
      console.warn(
        "AnchorLink: Avoid mixing navigation and onClick action."
      );
    }

    if (!["default", "button"].includes(variant)) {
      console.warn(
        `AnchorLink: Unknown variant "${variant}". Falling back to "default".`
      );
    }
  }

  /*
   * For now, use href as the actual anchor destination.
   *
   * If "to" is used with React Router, handle it separately
   * with RouterLink rather than passing "to" to <a>.
   */
  const resolvedHref = href || to;

  const isExternal =
    href &&
    (href.startsWith("http://") ||
      href.startsWith("https://") ||
      href.startsWith("//"));

  const classes = [
    styles.link,
    variantClass,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Text
      as="a"
      variant="base"
      href={resolvedHref}
      onClick={onClick}
      target={
        isExternal
          ? "_blank"
          : target
      }
      rel={
        isExternal
          ? "noopener noreferrer"
          : rel
      }
      className={classes}
      {...props}
    >
      {children}
    </Text>
  );
};

export default AnchorLink;