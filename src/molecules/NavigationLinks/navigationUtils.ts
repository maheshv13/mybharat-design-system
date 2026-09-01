import type { NavigationLink } from "./navLinkUtils";

/**
 * Normalizes a pathname before comparison.
 *
 * Examples:
 *
 * /about/      -> /about
 * /About       -> /about
 * /my_page     -> /my-page
 * /about/?x=1  -> /about
 */
export const normalizePath = (
  path = ""
): string => {
  if (!path) {
    return "";
  }

  const normalized = path
    .split("?")[0]
    .split("#")[0]
    .replace(/\/+$/, "")
    .replace(/_/g, "-")
    .toLowerCase();

  return normalized || "/";
};

/**
 * Extracts the pathname from either:
 *
 * /about
 * /about?test=1
 * https://example.com/about
 *
 * No window or browser API is used.
 */
export const getPathname = (
  url?: string
): string => {
  if (!url) {
    return "";
  }

  try {
    return new URL(
      url,
      "http://design-system.local"
    ).pathname;
  } catch {
    return url;
  }
};

/**
 * Checks whether a navigation URL matches
 * the current application path.
 */
export const isPathActive = (
  href: string | undefined,
  currentPath: string
): boolean => {
  if (!href || !currentPath) {
    return false;
  }

  return (
    normalizePath(
      getPathname(href)
    ) ===
    normalizePath(currentPath)
  );
};

/**
 * Checks whether any child or descendant
 * of the navigation item is active.
 */
export const hasActiveChild = (
  link: NavigationLink,
  currentPath: string
): boolean => {
  const children =
    link.children ?? [];

  return children.some((child) => {
    const childPath =
      child.href || child.to;

    if (
      isPathActive(
        childPath,
        currentPath
      )
    ) {
      return true;
    }

    return hasActiveChild(
      child,
      currentPath
    );
  });
};

/**
 * Returns true when:
 *
 * - the link itself is active
 * OR
 * - one of its descendants is active
 */
export const isNavigationItemActive = (
  link: NavigationLink,
  currentPath: string
): boolean => {
  const linkPath =
    link.href || link.to;

  return (
    isPathActive(
      linkPath,
      currentPath
    ) ||
    hasActiveChild(
      link,
      currentPath
    )
  );
};