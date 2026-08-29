import { useRef, useState, useEffect } from "react";
import type { KeyboardEvent, MouseEvent, TouchEvent } from "react";
import styles from "./TileGroup.module.css";
import Tile from "../../atoms/Tile/Tile";
import type { TileProps } from "../../atoms/Tile/Tile";
import { Icon } from "../../atoms/Icon";

const TILE_WIDTH = 180;
const GAP = 12;

export interface TileGroupProps {
  tiles?: TileProps[];
}

const TileGroup = ({ tiles = [] }: TileGroupProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);

  // 👉 swipe state
  const startX = useRef(0);
  const isDragging = useRef(false);

  // ✅ detect visible tiles
  const calculateItemsPerView = () => {
    const el = containerRef.current;
    if (!el) return;

    const visibleWidth = el.clientWidth;
    const itemFullWidth = TILE_WIDTH + GAP;

    const count = Math.floor(visibleWidth / itemFullWidth);
    setItemsPerView(count || 1);
  };

  useEffect(() => {
    calculateItemsPerView();

    const observer = new ResizeObserver(calculateItemsPerView);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const step = itemsPerView <= 2 ? 1 : itemsPerView;
  const totalSteps = tiles.length - itemsPerView;

  const scrollToIndex = (index: number) => {
    const el = containerRef.current;
    if (!el) return;

    const scrollAmount = index * (TILE_WIDTH + GAP);

    // cancel any ongoing scroll (important)
    el.style.scrollBehavior = "auto";
    el.scrollLeft = el.scrollLeft;

    requestAnimationFrame(() => {
      el.style.scrollBehavior = "smooth";
      el.scrollTo({
        left: scrollAmount,
      });
    });

    setCurrentIndex(index);
  };

  const handleNext = () => {
    const nextIndex = Math.min(currentIndex + step, totalSteps);
    scrollToIndex(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = Math.max(currentIndex - step, 0);
    scrollToIndex(prevIndex);
  };

  // =========================
  // ✅ Swipe / Drag Support
  // =========================

  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    startX.current = e.touches[0].clientX;
    isDragging.current = true;
  };

  const onTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;

    const endX = e.changedTouches[0].clientX;
    const diff = startX.current - endX;

    if (Math.abs(diff) > 50) {
      diff > 0 ? handleNext() : handlePrev();
    }

    isDragging.current = false;
  };

  const onMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    startX.current = e.clientX;
    isDragging.current = true;
  };

  const onMouseUp = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;

    const diff = startX.current - e.clientX;

    if (Math.abs(diff) > 50) {
      diff > 0 ? handleNext() : handlePrev();
    }

    isDragging.current = false;
  };

  // =========================
  // ✅ Keyboard Accessibility
  // =========================

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") handleNext();
    if (e.key === "ArrowLeft") handlePrev();
  };

  const isSlider = tiles.length > itemsPerView;

  return (
    <div
      className={styles.wrapper}
      tabIndex={0} // ✅ focusable
      onKeyDown={handleKeyDown}
      role="region"
      aria-label="Tile carousel"
    >
      {isSlider && (
        <button
          className={`${styles.arrow} ${styles.left}`}
          onClick={handlePrev}
          disabled={currentIndex === 0}
          aria-label="Previous tiles"
        >
          <Icon 
            name="arrowLeft" 
            size={32}
            />
        </button>
      )}

      <div className={styles.viewport}>
        <div
          ref={containerRef}
          className={styles.container}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
        >
          {tiles.map((tile, index) => (
            <div
              key={index}
              className={styles.tileWrapper}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${tiles.length}`}
            >
              <Tile 
                variant="inverse"
                {...tile} 
                />
            </div>
          ))}
        </div>
      </div>

      {isSlider && (
        <button
          className={`${styles.arrow} ${styles.right}`}
          onClick={handleNext}
          disabled={currentIndex >= totalSteps}
          aria-label="Next tiles"
        >
          <Icon 
            name="arrowRight" 
            size={32}
            />
        </button>
      )}
    </div>
  );
};

export default TileGroup;