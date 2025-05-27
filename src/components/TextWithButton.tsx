import Link from "@docusaurus/Link";
import styles from "./TextWithButton.module.css";

interface Props {
  /** Sentence or short paragraph you want on the left */
  text: string;
  /** Button label */
  buttonLabel: string;
  /** Where the button should point (URL or site‑relative path) */
  buttonHref: string;
}

export default function TextWithButton({ text, buttonLabel, buttonHref }: Props) {
  return (
    <div className={styles.wrapper}>
      <p className={styles.text}>{text}</p>

      {/* Docusaurus already ships a “button” utility class */}
      <Link className="button button--primary button--sm" to={buttonHref}>
        {buttonLabel}
      </Link>
    </div>
  );
}
