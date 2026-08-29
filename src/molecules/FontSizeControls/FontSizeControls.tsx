import { Button } from "../../atoms/Button";
import styles from "./FontSizeControls.module.css";

const FontSizeControls = () => {
  return (
    <div className={styles.controls}>
      <Button
        variant="default"
        size="xs"
        label="A-"
      />
      <Button
        variant="default"
        size="xs"
        label="A"
      />
      <Button
        variant="default"
        size="xs"
        label="A+"
      />
    </div>
  );
}

export default FontSizeControls;