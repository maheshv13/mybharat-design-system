import { useState } from "react";
import { Icon } from "../../atoms/Icon";
import NavigationItem from "./NavigationItem";
import styles from "./NavigationLinks.module.css";
import type {
  ModalOpenState,
  NavigationActionHandlers,
  NavigationLink,
} from "./navLinkUtils";

export interface NavigationLinksProps {
  links?: NavigationLink[];
  navActionHandlers?: NavigationActionHandlers;
  modalOpenState?: ModalOpenState;
  currentPath?: string;
}

const NavigationLinks = ({
  links = [],
  navActionHandlers = {},
  modalOpenState = {},
  currentPath,
}: NavigationLinksProps) => {
  const activePath =
    currentPath ??
    (typeof window !== "undefined"
      ? window.location.pathname
      : "");

  // Controls only the third-level collapsible menus
  const [openSubMenus, setOpenSubMenus] = useState<
    Record<string, boolean>
  >({});

  // Get pathname from full URL
  const getPathname = (url?: string) => {
    if (!url) return "";

    try {
      return new URL(
        url,
        typeof window !== "undefined"
          ? window.location.origin
          : "http://localhost"
      ).pathname;
    } catch {
      return url;
    }
  };

  // Exact active match
  const isActive = (href?: string) => {
    if (!href) return false;

    return activePath === getPathname(href);
  };

  // Toggle only Level 3 menu
  const toggleSubMenu = (key: string) => {
    setOpenSubMenus((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  return (
    <nav className={styles.NavigationLinks}>
      {links.map((link, index) => {
        const childLinks = link.children ?? [];
        const hasChildren = childLinks.length > 0;

        // =====================================================
        // NORMAL LEVEL 1 LINK
        // =====================================================

        if (!hasChildren) {
          return (
            <NavigationItem
              key={`${link.label}-${index}`}
              link={link}
              navActionHandlers={navActionHandlers}
              modalOpenState={modalOpenState}
              isActive={isActive(link.href || link.to)}
            />
          );
        }

        // =====================================================
        // LEVEL 1 PARENT ACTIVE
        // =====================================================

        const isParentActive =
          isActive(link.href || link.to) ||
          childLinks.some(
            (subLink) =>
              isActive(subLink.href || subLink.to) ||
              subLink.children?.some((thirdLevelLink) =>
                isActive(
                  thirdLevelLink.href ||
                    thirdLevelLink.to
                )
              )
          );

        // =====================================================
        // LEVEL 1 DROPDOWN
        // =====================================================

        return (
          <div
            key={`${link.label}-${index}`}
            className={styles.menuItem}
          >
            {/* =================================================
                LEVEL 1 PARENT MENU
                ================================================= */}

            <button
              type="button"
              className={`${styles.parentButton} ${
                isParentActive
                  ? styles.active
                  : styles.inactive
              }`}
              aria-haspopup="true"
            >
              {link.label}

              <Icon
                name="dropdown"
                size="sm"
              />
            </button>

            {/* =================================================
                LEVEL 2 MENU
                ================================================= */}

            <div className={styles.dropdown}>
              {childLinks.map(
                (subLink, childIndex) => {
                  const hasThirdLevel =
                    Array.isArray(
                      subLink.children
                    ) &&
                    subLink.children.length > 0;

                  // =================================================
                  // NORMAL LEVEL 2 LINK
                  // =================================================

                  if (!hasThirdLevel) {
                    return (
                      <NavigationItem
                        key={`${subLink.label}-${childIndex}`}
                        link={subLink}
                        navActionHandlers={
                          navActionHandlers
                        }
                        modalOpenState={
                          modalOpenState
                        }
                        isActive={isActive(
                          subLink.href ||
                            subLink.to
                        )}
                        className={
                          styles.dropdownLink
                        }
                      />
                    );
                  }

                  // =================================================
                  // LEVEL 2 WITH LEVEL 3
                  // =================================================

                  const subMenuKey = `${index}-${childIndex}`;

                  const isThirdLevelOpen =
                    openSubMenus[subMenuKey];

                  const subChildLinks =
                    subLink.children ?? [];

                  const isSubLinkActive =
                    isActive(
                      subLink.href ||
                        subLink.to
                    ) ||
                    subChildLinks.some(
                      (thirdLevelLink) =>
                        isActive(
                          thirdLevelLink.href ||
                            thirdLevelLink.to
                        )
                    );

                  return (
                    <div
                      key={`${subLink.label}-${childIndex}`}
                      className={
                        styles.nestedMenu
                      }
                    >
                      {/* =========================================
                          LEVEL 2 COLLAPSIBLE TRIGGER
                          ========================================= */}

                      <button
                        type="button"
                        className={`${
                          styles.nestedTrigger
                        } ${
                          isSubLinkActive
                            ? styles.active
                            : styles.inactive
                        }`}
                        onClick={() =>
                          toggleSubMenu(
                            subMenuKey
                          )
                        }
                        aria-expanded={
                          isThirdLevelOpen
                        }
                      >
                        <span>
                          {subLink.label}
                        </span>

                        <Icon
                          name="dropdown"
                          size="sm"
                          className={
                            isThirdLevelOpen
                              ? styles.arrowOpen
                              : ""
                          }
                        />
                      </button>

                      {/* =========================================
                          LEVEL 3 COLLAPSIBLE MENU
                          ========================================= */}

                      {isThirdLevelOpen && (
                        <div
                          className={
                            styles.thirdLevelMenu
                          }
                        >
                          {subChildLinks.map(
                            (
                              thirdLevelLink,
                              thirdIndex
                            ) => (
                              <NavigationItem
                                key={`${thirdLevelLink.label}-${thirdIndex}`}
                                link={
                                  thirdLevelLink
                                }
                                navActionHandlers={
                                  navActionHandlers
                                }
                                modalOpenState={
                                  modalOpenState
                                }
                                isActive={isActive(
                                  thirdLevelLink.href ||
                                    thirdLevelLink.to
                                )}
                                className={
                                  styles.dropdownLink
                                }
                              />
                            )
                          )}
                        </div>
                      )}
                    </div>
                  );
                }
              )}
            </div>
          </div>
        );
      })}
    </nav>
  );
};

export default NavigationLinks;