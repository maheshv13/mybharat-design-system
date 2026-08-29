import { useEffect, useRef, useState } from "react";
import type { TransitionEvent } from "react";

import SlideItem from "../../molecules/SlideItem/SlideItem";
import type { SlideItemProps } from "../../molecules/SlideItem/SlideItem";
import { Icon } from "../../atoms/Icon";

import styles from "./Slider.module.css";

export interface SliderProps {
  slides?: SlideItemProps[];
  autoPlay?: boolean;
  interval?: number;
}

const Slider = ({
  slides = [],
  autoPlay = true,
  interval = 3000,
}: SliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const animationFrameRef = useRef<number | null>(null);

  // Clone the first slide at the end
  const extendedSlides =
    slides.length > 1
      ? [...slides, slides[0]]
      : slides;

  const nextSlide = () => {
    if (slides.length <= 1) return;

    setCurrentIndex((prev) => {
      if (prev >= slides.length) {
        return prev;
      }

      return prev + 1;
    });
  };

  const prevSlide = () => {
    if (slides.length <= 1) return;

    setCurrentIndex((prev) => {
      return prev === 0
        ? slides.length - 1
        : prev - 1;
    });
  };

  const handleTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
    // Ignore transition events from child elements
    if (event.target !== event.currentTarget) return;

    // Reached cloned first slide
    if (currentIndex === slides.length) {
      // Disable transition
      setIsTransitioning(false);

      // Move instantly to real first slide
      setCurrentIndex(0);

      // Re-enable transition
      animationFrameRef.current = requestAnimationFrame(() => {
        animationFrameRef.current = requestAnimationFrame(() => {
          setIsTransitioning(true);
        });
      });
    }
  };

  // Autoplay
  useEffect(() => {
    if (
      !autoPlay ||
      isPaused ||
      slides.length <= 1
    ) {
      return undefined;
    }

    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= slides.length) {
          return prev;
        }

        return prev + 1;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [
    autoPlay,
    isPaused,
    interval,
    slides.length,
  ]);

  // Cleanup animation frames
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // IMPORTANT:
  // Conditional return must come AFTER all Hooks
  if (!slides.length) return null;

  const activeDotIndex =
    currentIndex === slides.length
      ? 0
      : currentIndex;

  return (
    <div
      className={styles.slider}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides */}
      <div
        className={styles.track}
        onTransitionEnd={handleTransitionEnd}
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: isTransitioning
            ? "transform 0.5s ease"
            : "none",
        }}
      >
        {extendedSlides.map((slide, index) => (
          <SlideItem
            key={`${slide.image}-${index}`}
            image={slide.image}
            alt={slide.alt}
            heading={slide.heading}
            description={slide.description}
            link={slide.link}
          />
        ))}
      </div>

      {/* Previous */}
      <button
        className={styles.prev}
        onClick={prevSlide}
        type="button"
        title="Previous slide"
        aria-label="Previous slide"
      >
        <Icon name="arrowLeft" size="xl" />
      </button>

      {/* Next */}
      <button
        className={styles.next}
        onClick={nextSlide}
        type="button"
        title="Next slide"
        aria-label="Next slide"
      >
        <Icon name="arrowRight" size="xl" />
      </button>

      {/* Dots */}
      <div className={styles.dots}>
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            title={`Go to slide ${index + 1}`}
            aria-label={`Go to slide ${index + 1}`}
            className={`${styles.dot} ${
              index === activeDotIndex
                ? styles.active
                : ""
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;