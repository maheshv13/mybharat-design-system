import React from "react"; 
import styles from "./Banner.module.css"; 
import Section from "../../primitives/Section/Section"; 
import TileGroup from "../../molecules/TileGroup/TileGroup"; 
import type { TileProps } from "../../atoms/Tile/Tile";
import type { MouseEventHandler, ReactNode } from "react"; 
 
export interface BannerProps { 
  variant?: string; 
  title?: string; 
  highLightedWord?: string; 
  description?: ReactNode; 
  tiles?: TileProps[]; // Updated type here
  imageUrl?: string; 
  imageAlt?: string; 
  onImageClick?: MouseEventHandler<HTMLDivElement>; 
} 
 
const Banner = ({ 
  variant = "default", // default | with-tiles | image 
  title, 
  highLightedWord, 
  description, 
  tiles = [], 
  imageUrl, 
  imageAlt = "Banner", 
  onImageClick, 
}: BannerProps) => { 
  const isImageBanner = !!imageUrl; 
 
  // Helper to highlight word in title 
  const renderTitle = () => { 
    if (!title) return null; 
 
    if (!highLightedWord) { 
      return <h1 className={styles.bannerTitle}>{title}</h1>; 
    } 
 
    const parts = title.split(highLightedWord); 
 
    return ( 
      <h1 className={styles.bannerTitle}> 
        {parts[0]} 
        <span className={styles.highlight}> {highLightedWord} </span> 
        {parts[1]} 
      </h1> 
    ); 
  }; 
 
  return ( 
    <Section 
      className={ 
        isImageBanner ? styles.bannerImageSection : styles.bannerSection 
      } 
    > 
      <div className={`${styles.banner} ${styles[variant]}`}> 
 
        {/* Content (Title + Description + Tiles) */} 
        {!isImageBanner && ( 
          <div className={styles.bannerContent}> 
             
            <div className={styles.bannerText}>
              {renderTitle()} 
              {description && ( 
                <p className={styles.bannerDescription}>{description}</p> 
              )} 
            </div> 
 
            {/* Tiles can appear WITH title & description */} 
            {variant === "with-tiles" && tiles?.length > 0 && ( 
              <div className={styles.bannerTile}> 
                <TileGroup tiles={tiles} /> 
              </div> 
            )} 
          </div> 
        )} 
 
        {/* Image override */} 
        {isImageBanner && ( 
          <div 
            className={styles.bannerImage} 
            onClick={onImageClick} 
            role={onImageClick ? "button" : undefined} 
          > 
            <img src={imageUrl} alt={imageAlt} /> 
          </div> 
        )} 
      </div> 
    </Section> 
  ); 
}; 
 
export default Banner;