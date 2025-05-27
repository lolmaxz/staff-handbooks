import styles from "./AuditFlag.module.css";

type Kind = "NEW" | "CHANGED" | "DEPRECATED";

export default function AuditFlag({ type = "NEW" }: { type: Kind }) {
  return <span className={`${styles.flag} ${styles[type]}`}>{type}</span>;
}
