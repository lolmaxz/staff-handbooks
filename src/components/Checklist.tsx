import React from "react";
import FancyChecklist from "./FancyChecklist";

/* ── Child component ─────────────────────────── */
function ChecklistItem(props: { id: string; children: React.ReactNode }) {
  return null; // never rendered directly
}

/* ── Type guard to filter only <Checklist.Item> ─*/
function isChecklistItem(node: React.ReactNode): node is React.ReactElement<{ id: string; children: React.ReactNode }> {
  return React.isValidElement(node) && (node.type === ChecklistItem || (node.type as any).displayName === "ChecklistItem");
}

/* ── Parent wrapper ──────────────────────────── */
interface ChecklistProps {
  checklistId: string;
  title?: string;
  borderColor?: string;
  children: React.ReactNode;
}

export default function Checklist({ checklistId, title, borderColor, children }: ChecklistProps) {
  const items = React.Children.toArray(children)
    .filter(isChecklistItem)
    .map((el) => {
      const { id, children: label } = el.props;
      return { id, label };
    });

  return <FancyChecklist checklistId={checklistId} title={title} borderColor={borderColor} items={items} />;
}

ChecklistItem.displayName = "ChecklistItem";
Checklist.Item = ChecklistItem;
