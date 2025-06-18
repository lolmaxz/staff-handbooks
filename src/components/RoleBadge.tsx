import clsx from "clsx";
import styles from "./RoleBadge.module.css";

/** image files kept in static/img/ */
type IconFile = `${string}.svg` | `${string}.png` | `${string}.jpg` | `${string}.webp`;

/** optional lookup so you don't repeat filenames */
const iconMap: Record<string, IconFile> = {
  Moderator: "moderator_role_icon.png",
  Admin: "admin_role_icon.png",
  "Lewd Governor": "admin_role_icon.png",
  Helper: "Cutie_helper_role_icon.png",
  // add more role→file pairs as you grow
};

interface Props {
  role: string; // shown after the leading "@"
  badgeIcon?: IconFile; // override, if not using the map
  color?: string; // tint (HEX or CSS var)
}

export default function RoleBadge({ role, badgeIcon, color }: Props) {
  const file = badgeIcon ?? iconMap[role] ?? "roles_icon_none.svg";

  let src: string | undefined;
  try {
    src = require(`@site/static/img/${file}`).default;
  } catch (e) {
    src = undefined; // If not found, just don't show the icon
  }

  const tint = color ?? "var(--ifm-color-primary)";

  return (
    <span className={clsx(styles.badge)} style={{ color: tint, background: `${tint}22` }}>
      @{role}
      {/* Only render the icon if it exists */}
      {src && <img src={src} className={styles.icon} alt="" aria-hidden="true" />}
    </span>
  );
}
