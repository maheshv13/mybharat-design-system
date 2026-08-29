import type { MouseEvent, MouseEventHandler } from "react";

export interface NavigationLink {
  label: string;
  href?: string;
  to?: string;
  type?: string;
  action?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  children?: NavigationLink[];
}

export type NavigationActionHandlers = Record<string, (event?: MouseEvent<HTMLButtonElement>) => void>;
export type ModalOpenState = Record<string, boolean>;

export const isActionLink = (link: NavigationLink): boolean =>
  link?.type === "action" ||
  typeof link?.onClick === "function" ||
  Boolean(link?.action);

export const getActionControlId = (action?: string): string | undefined =>
  action ? `${action.toLowerCase().replace(/_/g, "-")}-dialog` : undefined;

export const resolveActionClick = (
  link: NavigationLink,
  navActionHandlers: NavigationActionHandlers,
): MouseEventHandler<HTMLButtonElement> => (event) => {
  event.preventDefault();

  if (typeof link.onClick === "function") {
    link.onClick(event);
    return;
  }

  if (link.action) {
    navActionHandlers?.[link.action]?.(event);
  }
};
