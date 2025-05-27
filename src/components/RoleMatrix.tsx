import styles from "./RoleMatrix.module.css";

interface Entry {
  role: string;
  actions: string[]; // list of verbs (column headers)
}

interface Props {
  /** Column order */
  actions: string[];
  /** Rows */
  data: Entry[];
}

export default function RoleMatrix({ actions, data }: Props) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th />
          {actions.map((a) => (
            <th key={a}>{a}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.role}>
            <td className={styles.role}>{row.role}</td>
            {actions.map((a) => (
              <td key={a} className={styles.cell}>
                {row.actions.includes(a) ? "✅" : "—"}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
