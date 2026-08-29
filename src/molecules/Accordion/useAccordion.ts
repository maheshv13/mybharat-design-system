import { useState } from "react";

export interface UseAccordionOptions {
  allowMultiple?: boolean;
  openIndexes?: number[];
  onChange?: (indexes: number[]) => void;
}

const useAccordion = ({
  allowMultiple = false,
  openIndexes,
  onChange,
}: UseAccordionOptions) => {
    
  const [internalOpenIndexes, setInternalOpenIndexes] = useState<number[]>([]);

  const isControlled = openIndexes !== undefined;

  const currentOpenIndexes = isControlled
    ? openIndexes
    : internalOpenIndexes;
  
  const toggleIndex = (index: number) => {
    let newIndexes: number[];

    if (allowMultiple) {
      if (currentOpenIndexes.includes(index)) {
        newIndexes = currentOpenIndexes.filter((i) => i !== index);
      } else {
        newIndexes = [...currentOpenIndexes, index];
      }
    } else {
      if (currentOpenIndexes.includes(index)) {
        newIndexes = [];
      } else {
        newIndexes = [index];
      }
    }

    if (isControlled) {
      onChange?.(newIndexes);
    } else {
      setInternalOpenIndexes(newIndexes);
    }
  };

  return {
    openIndexes: currentOpenIndexes,
    toggleIndex,
  };
};

export default useAccordion;
