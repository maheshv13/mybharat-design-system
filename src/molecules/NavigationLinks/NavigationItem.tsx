import { NavLinkItem } from "../../atoms/NavLinkItem";

import {
  getActionControlId,
  isActionLink,
  resolveActionClick,
} from "./navLinkUtils";

import type {
  ModalOpenState,
  NavigationActionHandlers,
  NavigationLink,
} from "./navLinkUtils";

import styles from "./NavigationLinks.module.css";

export interface NavigationItemProps {
  link: NavigationLink;
  navActionHandlers?: NavigationActionHandlers;
  modalOpenState?: ModalOpenState;
  className?: string;
  isActive?: boolean;
}

const NavigationItem = ({
  link,
  navActionHandlers = {},
  modalOpenState = {},
  className = "",
  isActive = false,
}: NavigationItemProps) => {
  if (isActionLink(link)) {
    const isExpanded = link.action
      ? Boolean(
          modalOpenState[
            link.action
          ]
        )
      : false;

    const controlId =
      getActionControlId(
        link.action
      );

    return (
      <button
        type="button"
        className={`${styles.actionLink} ${className}`}
        onClick={resolveActionClick(
          link,
          navActionHandlers
        )}
        aria-haspopup="dialog"
        aria-expanded={
          isExpanded
        }
        aria-controls={controlId}
      >
        {link.label}
      </button>
    );
  }

  return (
    <NavLinkItem
      to={link.to}
      href={link.href}
      label={link.label}
      isActive={isActive}
      className={className}
    />
  );
};

export default NavigationItem;