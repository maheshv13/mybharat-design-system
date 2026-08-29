import { useState } from "react";
import type { ImgHTMLAttributes } from "react";
import styles from "./Image.module.css";

type ImageVariant = "overlay" | "inline" | "hover";
type ImageSize = "" | "xs" | "sm" | "md";

interface ImageGeo {
  lat?: string | number;
  lng?: string | number;
  label?: string;
}

interface ImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt"> {
  src: string;
  alt?: string;
  geo?: ImageGeo;
  variant?: ImageVariant;
  size?: ImageSize;
}

const Image = ({
  src,
  alt = "",
  geo,
  variant = "overlay", // overlay | inline | hover
  size = "", // xs | sm | md 
  className = "",
  ...props
}: ImageProps) => {

  const [imgSrc] = useState<string>(src);

  const hasGeo = geo?.lat && geo?.lng;

  // No geo → fallback to pure image
  if (!hasGeo) {
    return (
      <img
        src={imgSrc}
        alt={alt}
        className={`${styles.image} ${styles[size]} ${className}`}
        onError={(e) => {
          e.currentTarget.onerror = null;
        }}
        {...props}
      />
    );
  }

  const geoContent = (
    <div className={`${styles.geoTag} ${styles[variant]}`}>
      📍 {geo.label || `${geo.lat}, ${geo.lng}`}
    </div>
  );

  // INLINE variant (no wrapper needed)
  if (variant === "inline") {
    return (
      <div className={`${styles.inlineWrapper} ${className}`}>
        <img src={src} alt={alt} className={styles.image} {...props} />
        {geoContent}
      </div>
    );
  }

  // overlay & hover need wrapper
  return (
    <div className={`${styles.wrapper} ${styles[variant]} ${className}`}>
      <img src={src} alt={alt} className={styles.image} {...props} />
      {geoContent}
    </div>
  );
};

export default Image;
