import {
  useState,
  useRef,
  useEffect,
  useMemo,
  useId,
} from "react";

import type {
  CSSProperties,
  MouseEvent,
  MutableRefObject,
  ReactNode,
} from "react";

import { Text } from "../../atoms/Text";
import { Icon } from "../../atoms/Icon";
import type { IconName } from "../../atoms/Icon";

import styles from "./Tabs.module.css";
import Stack from "../../primitives/Stack/Stack";

export interface TabData {
  label: ReactNode;
  content: ReactNode;
  icon?: IconName;
  count?: ReactNode;
  key?: string | number;
}

export interface TabItemProps {
  item: TabData;
  isActive: boolean;
  onClick: (
    event: MouseEvent<HTMLButtonElement>
  ) => void;
  variant?: "default" | "filled";
  index: number;
  tabsRef: MutableRefObject<
    Array<HTMLButtonElement | null>
  >;
  tabId: string;
  panelId: string;
}

export interface TabsProps {
  items?: TabData[];
  variant?: "default" | "filled" | "vertical";
  defaultActiveIndex?: number;
  activeKey?: string | number;
  onChange?: (key: string | number) => void;
  orientation?: "horizontal" | "vertical";
}

export const TabItem = ({
  item,
  isActive,
  onClick,
  variant = "default",
  index,
  tabsRef,
  tabId,
  panelId,
}: TabItemProps) => {
  const isFilled = variant === "filled";

  return (
    <button
      ref={(el) => {
        tabsRef.current[index] = el;
      }}
      type="button"
      role="tab"
      aria-selected={isActive}
      aria-controls={panelId}
      id={tabId}
      className={`${styles.tabButton} ${
        isActive ? styles.active : ""
      } ${isFilled ? styles.filledTabButton : ""} ${
        isFilled && isActive
          ? styles.activeFilled
          : ""
      }`}
      onClick={onClick}
    >
      {item.icon && (
        <Icon name={item.icon} size="md" />
      )}

      <Text as="span">
        {item.label}

        {item.count !== undefined && (
          <span className={styles.count}>
            ({item.count})
          </span>
        )}
      </Text>
    </button>
  );
};

const Tabs = ({
  items = [],
  variant = "default",
  defaultActiveIndex = 0,
  activeKey,
  onChange,
  orientation = "horizontal",
}: TabsProps) => {
  const tabsRef = useRef<
    Array<HTMLButtonElement | null>
  >([]);

  const tabsListRef =
    useRef<HTMLDivElement | null>(null);

  const tabsId = useId();

  const [internalIndex, setInternalIndex] =
    useState(defaultActiveIndex);

  const [isMobile, setIsMobile] =
    useState(false);

  const [indicatorStyle, setIndicatorStyle] =
    useState<CSSProperties>({});

  const [
    filledIndicatorStyle,
    setFilledIndicatorStyle,
  ] = useState<CSSProperties>({});

  /*
   * Desktop arrow visibility
   */
  const [canScrollLeft, setCanScrollLeft] =
    useState(false);

  const [canScrollRight, setCanScrollRight] =
    useState(false);

  /*
   * Detect mobile viewport.
   */
  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(max-width: 768px)"
    );

    const updateMobileState = () => {
      setIsMobile(mediaQuery.matches);
    };

    updateMobileState();

    mediaQuery.addEventListener(
      "change",
      updateMobileState
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        updateMobileState
      );
    };
  }, []);

  /*
   * Map tab key → index.
   */
  const keyToIndexMap = useMemo(() => {
    const map: Record<string, number> = {};

    items.forEach((item, index) => {
      if (item.key !== undefined) {
        map[String(item.key)] = index;
      }
    });

    return map;
  }, [items]);

  const isControlled =
    activeKey !== undefined;

  const activeIndex = isControlled
    ? keyToIndexMap[String(activeKey)] ?? 0
    : internalIndex;

  /*
   * Desktop variant.
   */
  const resolvedVariant =
    variant === "filled"
      ? "filled"
      : "default";

  /*
   * Desktop orientation.
   */
  const resolvedOrientation =
    orientation === "vertical" ||
    variant === "vertical"
      ? "vertical"
      : "horizontal";

  /*
   * Mobile presentation.
   *
   * All mobile tabs become:
   * - Filled
   * - Horizontal
   */
  const presentationVariant = isMobile
    ? "filled"
    : resolvedVariant;

  const presentationOrientation = isMobile
    ? "horizontal"
    : resolvedOrientation;

  /*
   * Handle tab selection.
   */
  const handleChange = (index: number) => {
    if (!isControlled) {
      setInternalIndex(index);
    }

    if (onChange) {
      const selectedItem = items[index];

      onChange(
        selectedItem?.key ?? index
      );
    }
  };

  /*
   * Check horizontal scroll position.
   *
   * This controls whether the desktop
   * left/right navigation buttons are
   * enabled.
   */
  const updateScrollButtons = () => {
    const tabList =
      tabsListRef.current;

    if (!tabList) {
      return;
    }

    const maxScrollLeft =
      tabList.scrollWidth -
      tabList.clientWidth;

    setCanScrollLeft(
      tabList.scrollLeft > 1
    );

    setCanScrollRight(
      tabList.scrollLeft <
        maxScrollLeft - 1
    );
  };

  /*
   * Scroll tabs left/right.
   */
  const scrollTabs = (
    direction: "left" | "right"
  ) => {
    const tabList =
      tabsListRef.current;

    if (!tabList) {
      return;
    }

    const scrollAmount =
      Math.max(
        tabList.clientWidth * 0.6,
        200
      );

    tabList.scrollBy({
      left:
        direction === "left"
          ? -scrollAmount
          : scrollAmount,
      behavior: "smooth",
    });
  };

  /*
   * Update scroll button state when
   * the tab list is scrolled.
   */
  useEffect(() => {
    const tabList =
      tabsListRef.current;

    if (!tabList) {
      return;
    }

    updateScrollButtons();

    tabList.addEventListener(
      "scroll",
      updateScrollButtons,
      { passive: true }
    );

    return () => {
      tabList.removeEventListener(
        "scroll",
        updateScrollButtons
      );
    };
  }, [
    items,
    presentationOrientation,
    presentationVariant,
  ]);

  /*
   * Update scroll buttons when the
   * window size changes.
   */
  useEffect(() => {
    const handleResize = () => {
      updateScrollButtons();
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, []);

  /*
   * Update indicator position.
   */
  useEffect(() => {
    const currentTab =
      tabsRef.current[activeIndex];

    if (!currentTab) {
      return;
    }

    if (
      presentationVariant ===
      "filled"
    ) {
      setFilledIndicatorStyle({
        width: `${currentTab.offsetWidth}px`,
        height: `${currentTab.offsetHeight}px`,
        transform:
          presentationOrientation ===
          "horizontal"
            ? `translateX(${currentTab.offsetLeft}px)`
            : `translateY(${currentTab.offsetTop}px)`,
      });

      return;
    }

    if (
      presentationOrientation ===
      "horizontal"
    ) {
      setIndicatorStyle({
        width: `${currentTab.offsetWidth}px`,
        transform: `translateX(${currentTab.offsetLeft}px)`,
      });

      return;
    }

    setIndicatorStyle({
      height: `${currentTab.offsetHeight}px`,
      transform: `translateY(${currentTab.offsetTop}px)`,
    });
  }, [
    activeIndex,
    presentationVariant,
    presentationOrientation,
    items,
  ]);

  /*
   * Keep active tab visible.
   */
  useEffect(() => {
    const currentTab =
      tabsRef.current[activeIndex];

    const tabList =
      tabsListRef.current;

    if (!currentTab || !tabList) {
      return;
    }

    if (
      presentationOrientation !==
      "horizontal"
    ) {
      return;
    }

    const tabLeft =
      currentTab.offsetLeft;

    const tabRight =
      tabLeft +
      currentTab.offsetWidth;

    const visibleLeft =
      tabList.scrollLeft;

    const visibleRight =
      visibleLeft +
      tabList.clientWidth;

    if (tabLeft < visibleLeft) {
      tabList.scrollTo({
        left: Math.max(
          tabLeft - 16,
          0
        ),
        behavior: "smooth",
      });
    } else if (
      tabRight > visibleRight
    ) {
      tabList.scrollTo({
        left:
          tabRight -
          tabList.clientWidth +
          16,
        behavior: "smooth",
      });
    }
  }, [
    activeIndex,
    presentationOrientation,
  ]);

  /*
   * Recalculate indicator and scroll
   * buttons on resize.
   */
  useEffect(() => {
    const handleResize = () => {
      const currentTab =
        tabsRef.current[activeIndex];

      if (!currentTab) {
        updateScrollButtons();
        return;
      }

      if (
        presentationVariant ===
        "filled"
      ) {
        setFilledIndicatorStyle({
          width: `${currentTab.offsetWidth}px`,
          height: `${currentTab.offsetHeight}px`,
          transform:
            presentationOrientation ===
            "horizontal"
              ? `translateX(${currentTab.offsetLeft}px)`
              : `translateY(${currentTab.offsetTop}px)`,
        });
      } else if (
        presentationOrientation ===
        "horizontal"
      ) {
        setIndicatorStyle({
          width: `${currentTab.offsetWidth}px`,
          transform: `translateX(${currentTab.offsetLeft}px)`,
        });
      } else {
        setIndicatorStyle({
          height: `${currentTab.offsetHeight}px`,
          transform: `translateY(${currentTab.offsetTop}px)`,
        });
      }

      updateScrollButtons();
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, [
    activeIndex,
    presentationVariant,
    presentationOrientation,
  ]);

  /*
   * Do not show navigation arrows for
   * vertical tabs.
   *
   * They are only useful for horizontal
   * desktop tabs.
   */
  const showNavigation =
    !isMobile &&
    presentationOrientation ===
      "horizontal";

  return (
    <div
      className={`${styles.tabs} ${
        styles[presentationOrientation]
      } ${
        presentationVariant ===
        "filled"
          ? styles.filled
          : ""
      }`}
    >
      <Stack gap="md">
        <div className={styles.tabNavigation}>
          {showNavigation && (
            <button
              type="button"
              className={`${styles.scrollButton} ${
                !canScrollLeft
                  ? styles.scrollButtonDisabled
                  : ""
              }`}
              onClick={() =>
                scrollTabs("left")
              }
              disabled={!canScrollLeft}
              aria-label="Scroll tabs left"
            >
              <span
                className={
                  styles.scrollArrow
                }
                aria-hidden="true"
              >
                ‹
              </span>
            </button>
          )}

          <div
            ref={tabsListRef}
            role="tablist"
            aria-orientation={
              presentationOrientation
            }
            className={styles.tabList}
          >
            {/* Animated Filled Capsule */}
            {presentationVariant ===
              "filled" && (
              <div
                className={
                  styles.filledIndicator
                }
                style={
                  filledIndicatorStyle
                }
              />
            )}

            {/* Tab Buttons */}
            {items.map(
              (item, index) => {
                const isActive =
                  index ===
                  activeIndex;

                const tabId =
                  `${tabsId}-tab-${index}`;

                const panelId =
                  `${tabsId}-tabpanel-${index}`;

                return (
                  <TabItem
                    key={
                      item.key ??
                      index
                    }
                    item={item}
                    index={index}
                    isActive={
                      isActive
                    }
                    tabsRef={
                      tabsRef
                    }
                    variant={
                      presentationVariant
                    }
                    tabId={
                      tabId
                    }
                    panelId={
                      panelId
                    }
                    onClick={() =>
                      handleChange(
                        index
                      )
                    }
                  />
                );
              }
            )}

            {/* Default Indicator */}
            {presentationVariant ===
              "default" && (
              <div
                className={
                  styles.indicator
                }
                style={
                  indicatorStyle
                }
              />
            )}
          </div>

          {showNavigation && (
            <button
              type="button"
              className={`${styles.scrollButton} ${
                !canScrollRight
                  ? styles.scrollButtonDisabled
                  : ""
              }`}
              onClick={() =>
                scrollTabs("right")
              }
              disabled={!canScrollRight}
              aria-label="Scroll tabs right"
            >
              <span
                className={
                  styles.scrollArrow
                }
                aria-hidden="true"
              >
                ›
              </span>
            </button>
          )}
        </div>

        {/* Tab Panel */}
        <div
          className={
            styles.tabPanelWrapper
          }
        >
          {items.map(
            (item, index) => {
              if (
                index !==
                activeIndex
              ) {
                return null;
              }

              const tabId =
                `${tabsId}-tab-${index}`;

              const panelId =
                `${tabsId}-tabpanel-${index}`;

              return (
                <div
                  key={
                    item.key ??
                    index
                  }
                  role="tabpanel"
                  id={panelId}
                  aria-labelledby={
                    tabId
                  }
                  className={
                    styles.tabPanel
                  }
                >
                  {typeof item.content ===
                  "string" ? (
                    <Text>
                      {
                        item.content
                      }
                    </Text>
                  ) : (
                    item.content
                  )}
                </div>
              );
            }
          )}
        </div>
      </Stack>
    </div>
  );
};

export default Tabs;