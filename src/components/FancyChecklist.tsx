import clsx from "clsx";
import { useEffect, useState } from "react";
import styles from "./FancyChecklist.module.css";

// FancyChecklist.tsx
interface Item {
  id: string;
  label: React.ReactNode; // ← was string
}

interface Props {
  checklistId: string;
  items: Item[]; // now uses the widened Item
  title?: string;
  borderColor?: string;
}

export default function FancyChecklist({ checklistId, items, title, borderColor }: Props) {
  const [doneIds, setDoneIds] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(checklistId) || "[]");
    } catch {
      return [];
    }
  });

  const reset = () => setDoneIds([]);

  // persist on every change
  useEffect(() => {
    localStorage.setItem(checklistId, JSON.stringify(doneIds));
  }, [doneIds, checklistId]);

  const toggle = (id: string) => setDoneIds((d) => (d.includes(id) ? d.filter((x) => x !== id) : [...d, id]));

  const total = items.length;
  const completed = doneIds.length;
  const pct = Math.round((completed / total) * 100);

  const tint = borderColor ?? "#5865F2"; //  default to Discord blurple

  return (
    <div
      className={styles.card}
      style={
        {
          "--card-border": tint, // card outline
          "--check-color": tint, // checkbox border / fill
          "--blurple": tint, // progress‑bar colour
        } as React.CSSProperties
      }
    >
      {title && <h3 className={styles.title}>{title}</h3>}
      <button className={styles.resetBtn} onClick={reset} title="Reset checklist">
        ⟳ Reset
      </button>
      {/* progress bar */}
      <div className={styles.progressBar}>
        <span className={styles.progressFill} style={{ width: `${pct}%` }} />
      </div>
      <p className={styles.progressText}>
        {completed}/{total} completed
      </p>

      <ul className={styles.list}>
        {items.map((item) => {
          const checked = doneIds.includes(item.id);
          return (
            <li key={item.id} className={styles.listItem}>
              <label className={styles.label}>
                <input type="checkbox" checked={checked} onChange={() => toggle(item.id)} />
                <span className={clsx(styles.checkbox, checked && styles.checked)}>
                  {checked && (
                    <svg viewBox="0 0 20 20" className={styles.checkIcon}>
                      <polyline points="4 11 8 15 16 6" />
                    </svg>
                  )}
                </span>
                <span className={clsx(styles.text, checked && styles.textDone)}>{item.label}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
