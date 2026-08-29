import { Text } from "../../atoms/Text";
import styles from "./SupportSection.module.css";

const SupportSection = () => {
  return (
    <div className={styles.support}>
      <Text variant="">
        Toll Free : 14472 Or 18002122729
      </Text>

      <span>|</span>
      
      <Text
      as="a"
      variant="link"
      href="https://support.mybharat.gov.in"
      target="_blank"
      rel="noopener noreferrer"
      color="white"
      >
        
      support.mybharat.gov.in
      </Text>
    </div>
  )
}

export default SupportSection;