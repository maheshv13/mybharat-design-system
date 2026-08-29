import type { ReactNode } from "react";
import AccordionItem from "./AccordionItem";
import useAccordion from "./useAccordion";

export interface AccordionItemData {
  title: ReactNode;
  content: ReactNode;
}

export interface AccordionProps {
  items?: AccordionItemData[];
  allowMultiple?: boolean;
  openIndexes?: number[];
  onChange?: (indexes: number[]) => void;
  className?: string;
}

const Accordion = ({
  items = [],
  allowMultiple = false,
  openIndexes,
  onChange,  
  className = "",
}: AccordionProps) => {
  
 const { openIndexes: currentOpenIndexes, toggleIndex } =
  useAccordion({
    allowMultiple,
    openIndexes,
    onChange,
  });

  return (
    <div className={className}>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          isOpen={currentOpenIndexes.includes(index)}
          onToggle={() => toggleIndex(index)}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
};

export default Accordion;
