import styles from "./SplitHero.module.css";
import type { ReactNode } from "react";

export interface SplitHeroProps {
  media?: ReactNode;
  children?: ReactNode;
  mediaPosition?: "left" | "right";
}

const SplitHero = ({
  media,
  children,
  mediaPosition = "left", // left | right
}: SplitHeroProps) => {
  return (
    <section
      className={`${styles.splitHero} ${
        mediaPosition === "left"
          ? styles.reverse
          : ""
      }`}
    >
      <div className={styles.media}>
        {media}
      </div>

      <div className={styles.contentColumn}>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </section>
  );
};

export default SplitHero;