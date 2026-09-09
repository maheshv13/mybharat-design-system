import { Image } from "../../atoms/Image";
import { Text } from "../../atoms/Text";
import { AnchorLink } from "../../atoms/AnchorLink";
import type { ReactNode } from "react";
import styles from "./SlideItem.module.css";

export interface SlideItemProps {
  image: string;
  alt?: string;
  heading?: ReactNode;
  description?: ReactNode;
  link?: string;
}

const SlideItem = ({
  image,
  alt,
  heading,
  description,
  link
  }: SlideItemProps) => {
  
  const hasContent = heading || description || link;
  
  return (
    <div className={styles.slide}>
      {hasContent &&  (
        <div className={styles.contentColumn}>
          {heading && <Text as="h1">{heading}</Text>}
          {description && <Text as="p" className={styles.description}>{description}</Text>}
          {link && <AnchorLink href={link}>Know More</AnchorLink>}
        </div>
      )}
     
      <div className={`${styles.imageColumn} ${hasContent ? styles.imageWithContent : ""}`}>
        <Image src={image} alt={alt}/>
      </div>
    </div>
  )
} 

export default SlideItem