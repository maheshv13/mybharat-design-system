"use client";

import { useState } from "react";
import { MdExpandMore } from "react-icons/md";

import { Button } from "../../atoms/Button";
import { Text } from "../../atoms/Text";
import { Icon } from "../../atoms";

import NavigationItem from "../NavigationLinks/NavigationItem";

import {
  isNavigationItemActive,
  isPathActive,
} from "../NavigationLinks/navigationUtils";

import type {
  ModalOpenState,
  NavigationActionHandlers,
  NavigationLink,
} from "../NavigationLinks/navLinkUtils";

import styles from "./MobileMenu.module.css";

export interface MobileMenuProps {
  links?: NavigationLink[];

  isAuthenticated?: boolean;

  currentPath?: string;

  navActionHandlers?: NavigationActionHandlers;

  modalOpenState?: ModalOpenState;
}

const MobileMenu = ({
  links = [],
  isAuthenticated = false,
  currentPath = "",
  navActionHandlers = {},
  modalOpenState = {},
}: MobileMenuProps) => {
  const [open, setOpen] =
    useState(false);

  const [openSubMenu, setOpenSubMenu] =
    useState<number | null>(null);

  const [openThirdLevel, setOpenThirdLevel] =
    useState<string | null>(null);

  const toggleSubMenu = (
    index: number
  ) => {
    setOpenSubMenu(
      openSubMenu === index
        ? null
        : index
    );
  };

  const toggleThirdLevel = (
    key: string
  ) => {
    setOpenThirdLevel(
      openThirdLevel === key
        ? null
        : key
    );
  };

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

  return (
    <div className={styles.menuRoot}>
      {/* Hamburger Button */}

      <div
        className={
          styles.togglePosition
        }
      >
        <button
          type="button"
          className={styles.toggle}
          onClick={() =>
            setOpen(!open)
          }
          aria-expanded={open}
          aria-label={
            open
              ? "Close menu"
              : "Open menu"
          }
        >
          {open ? (
            <Icon
              name="close"
              size="lg"
            />
          ) : (
            <Icon
              name="hamburger"
              size="lg"
            />
          )}
        </button>
      </div>

      {/* Mobile Dropdown */}

      {open && (
        <div
          className={
            styles.dropdown
          }
        >
          {links.map(
            (link, index) => {
              const childLinks =
                link.children ?? [];

              const hasChildren =
                childLinks.length >
                0;

              /*
               * NORMAL LEVEL 1 LINK
               */

              if (!hasChildren) {
                return (
                  <NavigationItem
                    key={
                      link.to ||
                      link.href ||
                      link.label
                    }
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

              /*
               * LEVEL 1 WITH LEVEL 2
               */

              const parentActive =
                isParentActive(link);

              return (
                <div
                  key={link.label}
                >
                  {/* LEVEL 1 TRIGGER */}

                  <button
                    type="button"
                    onClick={() =>
                      toggleSubMenu(
                        index
                      )
                    }
                    className={`${styles.submenuToggle} ${
                      parentActive
                        ? styles.active
                        : ""
                    }`}
                    aria-expanded={
                      openSubMenu ===
                      index
                    }
                  >
                    <span>
                      {link.label}
                    </span>

                    <MdExpandMore
                      className={`${styles.transition} ${
                        openSubMenu ===
                        index
                          ? styles.arrowOpen
                          : ""
                      }`}
                    />
                  </button>

                  {/* LEVEL 2 */}

                  {openSubMenu ===
                    index && (
                    <div
                      className={
                        styles.submenu
                      }
                    >
                      {childLinks.map(
                        (
                          subLink,
                          childIndex
                        ) => {
                          const subChildLinks =
                            subLink.children ??
                            [];

                          const hasThirdLevel =
                            subChildLinks.length >
                            0;

                          const thirdLevelKey =
                            `${index}-${childIndex}`;

                          /*
                           * NORMAL LEVEL 2 LINK
                           */

                          if (
                            !hasThirdLevel
                          ) {
                            return (
                              <NavigationItem
                                key={
                                  subLink.to ||
                                  subLink.href ||
                                  subLink.label
                                }
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
                                  styles.submenuLink
                                }
                              />
                            );
                          }

                          /*
                           * LEVEL 2 WITH LEVEL 3
                           */

                          const subLinkActive =
                            isParentActive(
                              subLink
                            );

                          return (
                            <div
                              key={
                                subLink.to ||
                                subLink.href ||
                                subLink.label
                              }
                            >
                              {/* LEVEL 2 TRIGGER */}

                              <button
                                type="button"
                                onClick={() =>
                                  toggleThirdLevel(
                                    thirdLevelKey
                                  )
                                }
                                className={`${styles.submenuToggle} ${
                                  subLinkActive
                                    ? styles.active
                                    : ""
                                }`}
                                aria-expanded={
                                  openThirdLevel ===
                                  thirdLevelKey
                                }
                              >
                                <span>
                                  {
                                    subLink.label
                                  }
                                </span>

                                <MdExpandMore
                                  className={`${styles.transition} ${
                                    openThirdLevel ===
                                    thirdLevelKey
                                      ? styles.arrowOpen
                                      : ""
                                  }`}
                                />
                              </button>

                              {/* LEVEL 3 */}

                              {openThirdLevel ===
                                thirdLevelKey && (
                                <div
                                  className={
                                    styles.submenu
                                  }
                                >
                                  {subChildLinks.map(
                                    (
                                      thirdLevelLink
                                    ) => (
                                      <NavigationItem
                                        key={
                                          thirdLevelLink.to ||
                                          thirdLevelLink.href ||
                                          thirdLevelLink.label
                                        }
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
                                          styles.submenuLink
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
                  )}
                </div>
              );
            }
          )}

          {/* Authentication Actions */}

          {!isAuthenticated ? (
            <div
              className={
                styles.authActions
              }
            >
              <Button
                label="Login"
                variant="primary"
                size="default"
              />

              <Button
                label="Register"
                variant="primary-outlined"
                size="default"
              />
            </div>
          ) : (
            <>
              <Button
                label="Dashboard"
                variant="primary-outlined"
                size="default"
              />

              <Button
                label="Logout"
                variant="secondary"
                size="default"
              />
            </>
          )}

          {/* Support Section */}

          <div
            className={
              styles.support
            }
          >
            <Text variant="">
              Toll Free : 14472 Or
              18002122729
            </Text>

            <Text
              variant="link"
              href="https://support.mybharat.gov.in"
              target="_blank"
              rel="noopener noreferrer"
            >
              support.mybharat.gov.in
            </Text>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;