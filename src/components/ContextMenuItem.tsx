import React from "react";
import styles from "./ContextMenuItem.module.css";

export interface ContextMenuItemProps {
  /** Text shown on the menu row. */
  label: string;
  /** Optional icon, such as a bot avatar. */
  image?: string;
  /** Right-hand arrow. "thick" matches Discord's heavy submenu chevron. */
  arrow?: boolean | "thick";
}

const CHEVRON = (
  <svg className={styles.chevron} viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M9.3 5.3a1 1 0 0 1 1.4 0l6 6a1 1 0 0 1 0 1.4l-6 6a1 1 0 0 1-1.4-1.4L14.58 12 9.3 6.7a1 1 0 0 1 0-1.4Z"
    />
  </svg>
);

const THICK_CHEVRON = (
  <svg className={styles.chevronThick} viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M0 0 0 1.2 1.1 2.4 1.1 3.6 2.3 4.8 2.3 6 3.4 7.2 3.4 8.4 8 9.6 13.7 10.8 14.9 12 13.7 13.2 8 14.4 3.4 15.6 3.4 16.8 2.3 18 2.3 19.2 1.1 20.4 1.1 21.6 0 22.8 0 24 3.4 24 5.7 22.8 8 21.6 10.3 20.4 12.6 19.2 14.9 18 17.1 16.8 19.4 15.6 21.7 14.4 24 13.2 24 12 24 10.8 21.7 9.6 19.4 8.4 17.1 7.2 14.9 6 12.6 4.8 10.3 3.6 8 2.4 5.7 1.2 3.4 0Z"
    />
  </svg>
);

export function ContextMenuItem({ label, image, arrow = true }: ContextMenuItemProps) {
  const marker = arrow === "thick" ? THICK_CHEVRON : arrow ? CHEVRON : <span className={styles.chevronSpacer} />;
  return (
    <div className={styles.menu}>
      <div className={styles.item}>
        {image ? <img className={styles.avatar} src={image} alt="" /> : null}
        <span className={styles.label}>{label}</span>
        {marker}
      </div>
    </div>
  );
}

const STEP_ARROW = (
  <svg className={styles.stepArrow} viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M9.3 5.3a1 1 0 0 1 1.4 0l6 6a1 1 0 0 1 0 1.4l-6 6a1 1 0 0 1-1.4-1.4L14.58 12 9.3 6.7a1 1 0 0 1 0-1.4Z" />
  </svg>
);

export default function ContextMenuChain({ children }: { children: React.ReactNode }) {
  const items = React.Children.toArray(children);
  return (
    <div className={styles.chain} role="group" aria-label="Context menu path">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const row =
          isLast && React.isValidElement<{ arrow?: boolean | "thick" }>(item) && item.props.arrow !== false
            ? React.cloneElement(item, { arrow: "thick" })
            : item;
        return (
          <React.Fragment key={index}>
            {index > 0 ? STEP_ARROW : null}
            {row}
          </React.Fragment>
        );
      })}
    </div>
  );
}
