"use client";

import NavigationLinks from "../../molecules/NavigationLinks/NavigationLinks";
import MobileMenu from "../../molecules/MobileMenu/MobileMenu";
import { Button } from "../../atoms/Button";
import Branding from "../../molecules/Branding/Branding";
import FontSizeControls from "../../molecules/FontSizeControls/FontSizeControls";
import SupportSection from "../../molecules/SupportSection/SupportSection";
import Section from "../../primitives/Section/Section";
import styles from "./Header.module.css";
import UserDropdown from "../UserDropdown/UserDropdown";
import { Image } from "../../atoms/Image";

import type {
  NavigationActionHandlers,
  NavigationLink,
  ModalOpenState,
} from "../../molecules/NavigationLinks/navLinkUtils";

export interface HeaderProps {
  navLinks?: NavigationLink[];

  /**
   * Current application pathname.
   *
   * React:
   * Pass pathname from your router/application.
   *
   * Next.js:
   * Pass pathname from usePathname().
   */
  currentPath?: string;

  navActionHandlers?: NavigationActionHandlers;
  modalOpenState?: ModalOpenState;

  withTopabar?: boolean;
  variant?: "default" | "compact" | "auth";
  contained?: boolean;
  isAuthenticated?: boolean;
}

const Header = ({
  navLinks = [],
  currentPath = "",
  navActionHandlers = {},
  modalOpenState = {},
  withTopabar = true,
  variant = "default",
  contained = true,
  isAuthenticated = false,
}: HeaderProps) => {
  const headerClasses = [
    styles.header,
    styles[variant],
  ]
    .filter(Boolean)
    .join(" ");

  const showNavigation = variant !== "auth";

  return (
    <header className={headerClasses}>
      {/* ================= TOP BAR ================= */}

      {withTopabar && variant !== "auth" && (
        <Section
          className={styles.topBar}
          contained={contained}
          spaceY="none"
        >
          <div className={styles.topBarContent}>
            <div className={styles.utilityGroup}>
              <Image
                alt="India Flag"
                src="https://cdn-beta.mybharats.in/mybharat/assets/img/mybharat/Flag%20of%20India.png"
              />

              <span className={styles.governmentText}>
                Government of India
              </span>
            </div>

            <div className={styles.utilityGroup}>
              <FontSizeControls />
              <SupportSection />
            </div>
          </div>
        </Section>
      )}

      {/* ================= MAIN HEADER ================= */}

      <Section
        contained={contained}
        spaceY={
          variant === "compact"
            ? "none"
            : "xs"
        }
      >
        <div className={styles.mainRow}>
          {/* Logo */}

          <Branding
            hasEmblem={variant !== "auth"}
            hasSeperator={variant !== "auth"}
          />

          {/* Right Side */}

          <div className={styles.mainActions}>
            {/* Navigation */}

            {showNavigation && (
              <NavigationLinks
                links={navLinks}
                currentPath={currentPath}
                navActionHandlers={navActionHandlers}
                modalOpenState={modalOpenState}
              />
            )}

            {/* Authentication */}

            {showNavigation && (
              <div className={styles.headerRight}>
                {!isAuthenticated ? (
                  <>
                    <Button
                      label="Sign In"
                      variant="primary-outlined"
                      size="sm"
                      onClick={() =>
                        navActionHandlers.OPEN_LOGIN_MODAL?.()
                      }
                    />

                    <Button
                      label="Register Now"
                      variant="primary"
                      size="sm"
                    />
                  </>
                ) : (
                  <UserDropdown
                    user={{
                      name: "Mahesh Vhadadi",
                      email: "mahesh@example.com",
                      phone: "9876543210",
                    }}
                    menuItems={[
                      {
                        label: "My Profile",
                        icon: "dashboard",
                        onClick: () => {},
                      },
                      {
                        label: "Logout",
                        icon: "logout",
                        onClick: () => {},
                      },
                    ]}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </Section>

      {/* ================= MOBILE MENU ================= */}

      {showNavigation && (
        <MobileMenu
          links={navLinks}
          isAuthenticated={isAuthenticated}
          currentPath={currentPath}
          navActionHandlers={navActionHandlers}
          modalOpenState={modalOpenState}
        />
      )}
    </header>
  );
};

export default Header;