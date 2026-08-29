import { Text } from "../../atoms/Text"
import { Icon } from "../../atoms/Icon"
import { Image } from "../../atoms/Image"
import type { ReactNode } from "react";
import styles from "./SocialLinks.module.css";

export interface SocialLinksProps {
  SocialLinksHeading?: ReactNode;
}

const SocialLinks = ({
  SocialLinksHeading
}: SocialLinksProps) => {

  return (
    <div>
     { SocialLinksHeading && (
      <h6 className={styles.heading}> {SocialLinksHeading} </h6>
     )} 
    <div className={styles.links}>
      <Text variant="default"as="a"href="#" aria-label="twitter">
        <Icon name="twitter" size={24} /></Text>

      <Text variant="default"as="a"href="#" aria-label="instagram">
        <Icon name="instagram" size={24} color="#d62976" /></Text>

      <Text variant="default"as="a"href="#" aria-label="facebook">
        <Icon name="facebook" size={24} color="#1877F2" /></Text>

      <Text variant="default"as="a"href="#" aria-label="linkedin">
        <Icon name="linkedin" size={24} color="#0A66C2"/></Text>

      <Text variant="default"as="a"href="#" aria-label="whatsapp">
        <Icon name="whatsapp" size={24} color="#25D366"/></Text>
        
      <Text variant="default"as="a"href="#" aria-label="youtube">
        <Icon name="youtube" size={24} color="#d62976" /></Text>
    </div>
  </div>  
  )
}

export default SocialLinks;