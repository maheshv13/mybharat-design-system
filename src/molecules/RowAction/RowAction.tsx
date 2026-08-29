import styles from "./RowAction.module.css";
import { Button } from "../../atoms/Button";

export interface RowActionProps {
  onEdit?: () => void;
  onDelete?: () => void;
  OnDelete?: () => void;
}

const RowAction = ({
  onEdit,
  onDelete,
  OnDelete,
}: RowActionProps) => {
  return(
    <div className={styles.rowActions}>
      <Button
        icon="edit" 
        iconPosition="left" 
        variant="blue-outlined"
        size="sm" 
        onClick={onEdit}
      />

      <Button
        icon="delete"
        iconPosition="left" 
        variant="danger-outlined"
        size="sm" 
        onClick={OnDelete ?? onDelete}
      />
    </div>
  )
}

export default RowAction;

