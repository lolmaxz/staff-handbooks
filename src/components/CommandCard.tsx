// src/components/CommandCard.tsx
import styles from "./CommandCard.module.css";
import Tooltip from "./Tooltip";

/** image files kept in static/img/ */
type IconFile = `${string}.svg` | `${string}.png` | `${string}.jpg` | `${string}.webp`;

/** optional lookup so you don’t repeat filenames */
const permissionMap: Record<string, IconFile> = {
  Moderator: "moderator_role_icon.png",
  Admin: "admin_role_icon.png",
  "Lewd Governor": "admin_role_icon.png",
  Helper: "Cutie_helper_role_icon.png",
  // add more role→file pairs as you grow
};

interface Props {
  /** command name */
  cmd: string;
  /** permission required to use the command */
  perms?: IconFile;
  /** cooldown time for the command */
  coolDown?: string;
  /** children to be displayed inside the card */
  children?: React.ReactNode;
  cardColor?: string; // tint (HEX or CSS var)
}

export default function CommandCard({ cmd, perms, coolDown, children, cardColor }: Props) {
  const file = permissionMap[perms] ?? "roles_icon.svg";

  // `require(...).default` is a **path string** for all image types
  const src: string = require(`@site/static/img/${file}`).default;

  //   const tint = color ?? "var(--ifm-color-primary)";

  const cardStyle = {
    "--card-color": cardColor ?? "var(--ifm-color-primary)",
  } as React.CSSProperties;

  return (
    <div className={styles.card} style={cardStyle}>
      <code className={styles.cmd}>{cmd}</code>
      {perms && (
        <Tooltip noDecoration={true} tip={perms + " only can use this."}>
          <img src={src} className={styles.icon} alt="" aria-hidden="true" />
        </Tooltip>
      )}
      {coolDown && <span className={styles.cd}>⏳ {coolDown}</span>}
      {children && <p className={styles.body}>{children}</p>}
    </div>
  );
}
