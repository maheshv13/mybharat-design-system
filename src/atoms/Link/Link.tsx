import { Text } from "../Text";
import type { AnchorHTMLAttributes, ComponentType, MouseEventHandler, ReactNode } from "react";
import styles from "./Link.module.css";

declare const process: { env: { NODE_ENV?: string } };

type LinkVariant = "default" | "dark";

interface LinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "href" | "onClick" | "variant"> {
  children?: ReactNode;
  href?: string;
  to?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  variant?: LinkVariant;
}

type LinkTextProps = Omit<LinkProps, "variant"> & {
  as: "a" | "button";
  variant: "link";
};

const LinkText = Text as unknown as ComponentType<LinkTextProps>;

const Link = ({
  children,
  href,
  to,
  onClick,
  target,
  rel,
  variant = "default",
  className = "",
  ...props
}: LinkProps) => {
  const variantClass = styles[variant] || styles.default;

  // updated validation
  if (process.env.NODE_ENV !== "production") {
    if (!href && !to && !onClick) {
      throw new Error(
        'Link requires "href", "to", or "onClick".'
      );
    }

    if ((href || to) && onClick) {
      console.warn(
        "Link: Avoid mixing navigation and onClick action."
      );
    }
  }

  const isExternal =
    href && (href.startsWith("http") || href.startsWith("//"));

  const classes = `${styles.link} ${variantClass} ${className}`;

  // Decide element type
  const Component = href || to ? "a" : "button";

  return (
    <LinkText
      variant="link"
      as={Component}
      href={href}
      onClick={onClick}
      target={Component === "a" && isExternal ? "_blank" : target}
      rel={Component === "a" && isExternal ? "noopener noreferrer" : rel}
      className={classes}
      {...props}
    >
      {children}
    </LinkText>
  );
};

export default Link;
