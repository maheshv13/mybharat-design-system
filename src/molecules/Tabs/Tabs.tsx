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
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  variant?: "default" | "filled";
  index: number;
  tabsRef: MutableRefObject<Array<HTMLButtonElement | null>>;
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
        isFilled && isActive ? styles.activeFilled : ""
      }`}
      onClick={onClick}
    >
      {item.icon && <Icon name={item.icon} size="md" />}

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
  const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);
  const tabsListRef = useRef<HTMLDivElement | null>(null);

  /*
   * Creates a unique ID for every Tabs instance.
   *
   * This is important when multiple Tabs components
   * exist on the same page.
   */
  const tabsId = useId();

  const [internalIndex, setInternalIndex] =
    useState(defaultActiveIndex);

  const [indicatorStyle, setIndicatorStyle] = useState<CSSProperties>({});
  const [filledIndicatorStyle, setFilledIndicatorStyle] =
    useState<CSSProperties>({});

  const keyToIndexMap = useMemo(() => {
    const map: Record<string, number> = {};

    items.forEach((item, index) => {
      if (item.key !== undefined) {
        map[String(item.key)] = index;
      }
    });

    return map;
  }, [items]);

  const isControlled = activeKey !== undefined;

  const activeIndex = isControlled
    ? keyToIndexMap[String(activeKey)] ?? 0
    : internalIndex;

  const resolvedVariant =
    variant === "filled" ? "filled" : "default";

  const resolvedOrientation =
    orientation === "vertical" || variant === "vertical"
      ? "vertical"
      : "horizontal";

  const handleChange = (index: number) => {
    if (!isControlled) {
      setInternalIndex(index);
    }

    if (onChange) {
      const selectedItem = items[index];

      onChange(selectedItem?.key ?? index);
    }
  };

  /*
   * Calculate indicator position
   */
  useEffect(() => {
    const currentTab = tabsRef.current[activeIndex];

    if (!currentTab) return;

    /*
     * Filled / Capsule indicator
     */
    if (resolvedVariant === "filled") {
      setFilledIndicatorStyle({
        width: `${currentTab.offsetWidth}px`,
        height: `${currentTab.offsetHeight}px`,
        transform:
          resolvedOrientation === "horizontal"
            ? `translateX(${currentTab.offsetLeft}px)`
            : `translateY(${currentTab.offsetTop}px)`,
      });

      return;
    }

    /*
     * Default indicator
     */
    if (resolvedOrientation === "horizontal") {
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
  }, [
    activeIndex,
    resolvedVariant,
    resolvedOrientation,
    items,
  ]);

  /*
   * Keep the active tab visible WITHOUT
   * scrolling the page.
   *
   * This is important when multiple Tabs
   * components exist on the same page.
   */
  useEffect(() => {
    const currentTab = tabsRef.current[activeIndex];
    const tabList = tabsListRef.current;

    if (!currentTab || !tabList) return;

    /*
     * Only handle horizontal scrolling here.
     */
    if (resolvedOrientation !== "horizontal") return;

    const tabLeft = currentTab.offsetLeft;
    const tabRight =
      tabLeft + currentTab.offsetWidth;

    const visibleLeft = tabList.scrollLeft;
    const visibleRight =
      visibleLeft + tabList.clientWidth;

    /*
     * Tab is hidden on the left.
     */
    if (tabLeft < visibleLeft) {
      tabList.scrollTo({
        left: Math.max(tabLeft - 16, 0),
        behavior: "smooth",
      });
    }

    /*
     * Tab is hidden on the right.
     */
    else if (tabRight > visibleRight) {
      tabList.scrollTo({
        left:
          tabRight -
          tabList.clientWidth +
          16,
        behavior: "smooth",
      });
    }
  }, [activeIndex, resolvedOrientation]);

  /*
   * Recalculate indicators when the window
   * size changes.
   */
  useEffect(() => {
    const handleResize = () => {
      const currentTab = tabsRef.current[activeIndex];

      if (!currentTab) return;

      if (resolvedVariant === "filled") {
        setFilledIndicatorStyle({
          width: `${currentTab.offsetWidth}px`,
          height: `${currentTab.offsetHeight}px`,
          transform:
            resolvedOrientation === "horizontal"
              ? `translateX(${currentTab.offsetLeft}px)`
              : `translateY(${currentTab.offsetTop}px)`,
        });

        return;
      }

      if (resolvedOrientation === "horizontal") {
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
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, [
    activeIndex,
    resolvedVariant,
    resolvedOrientation,
  ]);

  return (
    <div
      className={`${styles.tabs} ${
        styles[resolvedOrientation]
      } ${
        resolvedVariant === "filled"
          ? styles.filled
          : ""
      }`}
    >
      <Stack gap="md">
        <div
          ref={tabsListRef}
          role="tablist"
          aria-orientation={resolvedOrientation}
          className={styles.tabList}
        >
          {/* Animated filled capsule */}
          {resolvedVariant === "filled" && (
            <div
              className={styles.filledIndicator}
              style={filledIndicatorStyle}
            />
          )}

          {/* Tab buttons */}
          {items.map((item, index) => {
            const isActive =
              index === activeIndex;

            const tabId = `${tabsId}-tab-${index}`;
            const panelId = `${tabsId}-tabpanel-${index}`;

            return (
              <TabItem
                key={item.key ?? index}
                item={item}
                index={index}
                isActive={isActive}
                tabsRef={tabsRef}
                variant={resolvedVariant}
                tabId={tabId}
                panelId={panelId}
                onClick={() =>
                  handleChange(index)
                }
              />
            );
          })}

          {/* Default animated indicator */}
          {resolvedVariant === "default" && (
            <div
              className={styles.indicator}
              style={indicatorStyle}
            />
          )}
        </div>

        {/* Tab Panel */}
        <div className={styles.tabPanelWrapper}>
          {items.map((item, index) => {
            if (index !== activeIndex) return null;

            const tabId = `${tabsId}-tab-${index}`;
            const panelId = `${tabsId}-tabpanel-${index}`;

            return (
              <div
                key={item.key ?? index}
                role="tabpanel"
                id={panelId}
                aria-labelledby={tabId}
                className={styles.tabPanel}
              >
                {typeof item.content === "string" ? (
                  <Text>{item.content}</Text>
                ) : (
                  item.content
                )}
              </div>
            );
          })}
        </div>
      </Stack>
    </div>
  );
};

export default Tabs;
