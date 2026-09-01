"use client";

import { useState } from "react";

import { Icon } from "../../atoms/Icon";
import NavigationItem from "./NavigationItem";

import styles from "./NavigationLinks.module.css";

import {
  isNavigationItemActive,
  isPathActive,
} from "./navigationUtils";

import type {
  ModalOpenState,
  NavigationActionHandlers,
  NavigationLink,
} from "./navLinkUtils";

export interface NavigationLinksProps {
  links?: NavigationLink[];
  currentPath?: string;
  navActionHandlers?: NavigationActionHandlers;
  modalOpenState?: ModalOpenState;
}

const NavigationLinks = ({
  links = [],
  currentPath = "",
  navActionHandlers = {},
  modalOpenState = {},
}: NavigationLinksProps) => {
  const [openSubMenus, setOpenSubMenus] =
    useState<Record<string, boolean>>(
      {}
    );

  const isActive = (
    href?: string
  ): boolean =>
    isPathActive(
      href,
      currentPath
    );

  const isParentActive = (
    link: NavigationLink
  ): boolean =>
    isNavigationItemActive(
      link,
      currentPath
    );

  const toggleSubMenu = (
    key: string
  ) => {
    setOpenSubMenus((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  return (
    <nav
      className={styles.NavigationLinks}
      aria-label="Main navigation"
    >
      {links.map(
        (link, index) => {
          const childLinks =
            link.children ?? [];

          const hasChildren =
            childLinks.length > 0;

          /*
           * LEVEL 1 - NORMAL LINK
           */

          if (!hasChildren) {
            return (
              <NavigationItem
                key={`${link.label}-${index}`}
                link={link}
                navActionHandlers={
                  navActionHandlers
                }
                modalOpenState={
                  modalOpenState
                }
                isActive={isActive(
                  link.href ||
                    link.to
                )}
              />
            );
          }

          const parentActive =
            isParentActive(link);

          /*
           * LEVEL 1 - DROPDOWN
           */

          return (
            <div
              key={`${link.label}-${index}`}
              className={styles.menuItem}
            >
              {/* LEVEL 1 TRIGGER */}

              <button
                type="button"
                className={`${styles.parentButton} ${
                  parentActive
                    ? styles.active
                    : styles.inactive
                }`}
                aria-haspopup="true"
                aria-expanded={false}
              >
                <span>
                  {link.label}
                </span>

                <Icon
                  name="dropdown"
                  size="sm"
                />
              </button>

              {/* LEVEL 2 */}

              <div
                className={
                  styles.dropdown
                }
              >
                {childLinks.map(
                  (
                    subLink,
                    childIndex
                  ) => {
                    const thirdLevelLinks =
                      subLink.children ??
                      [];

                    const hasThirdLevel =
                      thirdLevelLinks.length >
                      0;

                    /*
                     * LEVEL 2 -
                     * NORMAL LINK
                     */

                    if (
                      !hasThirdLevel
                    ) {
                      return (
                        <NavigationItem
                          key={`${subLink.label}-${childIndex}`}
                          link={
                            subLink
                          }
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

                    /*
                     * LEVEL 2 -
                     * HAS LEVEL 3
                     */

                    const subMenuKey =
                      `${index}-${childIndex}`;

                    const isThirdLevelOpen =
                      Boolean(
                        openSubMenus[
                          subMenuKey
                        ]
                      );

                    const subLinkActive =
                      isParentActive(
                        subLink
                      );

                    return (
                      <div
                        key={`${subLink.label}-${childIndex}`}
                        className={
                          styles.nestedMenu
                        }
                      >
                        {/* LEVEL 2 TRIGGER */}

                        <button
                          type="button"
                          className={`${styles.nestedTrigger} ${
                            subLinkActive
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
                          aria-haspopup="true"
                        >
                          <span>
                            {
                              subLink.label
                            }
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

                        {/* LEVEL 3 */}

                        {isThirdLevelOpen && (
                          <div
                            className={
                              styles.thirdLevelMenu
                            }
                          >
                            {thirdLevelLinks.map(
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
        }
      )}
    </nav>
  );
};

export default NavigationLinks;