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

const roleToColorMap: Record<string, string> = {
  // -- Department Positions --
  "Lewd Governor": "#db1cb8",
  Admin: "#db1cb8",
  "Horny Resources (HR)": "#2a6eef",
  "Committee Member": "#db1cb8",
  "Event Committee": "#00e6c3",
  "Server Committee": "#db1cb8",
  // -- Event Team Head Positions --
  "Event Team Head": "#f75edb",
  "Head Moderator": "#db1cb8",
  "Head of Security": "#3fa7ff",
  // -- Event Team Positions --
  "Senior Event Team": "#ffc857",
  "Event Host": "#a259f7",
  "Event Security": "#ff5e5b",
  "Event Team Trial": "#3fa7ff",
  Moderator: "#e68027",
  Helper: "#38c8e8",
  // -- Separate Staff Members --
  lolmaxz: "#00B9ff",
  lusaffi: "#00B9ff",
  krenki: "#00B9ff",
  deldepth: "#00B9ff",
  echo1108: "#00B9ff",
  "s4.ryn": "#00B9ff",
  Solii: "#00B9ff",
  cdkinetic: "#00B9ff",
  verbaldrop: "#00B9ff",
  nightmarediztydoo: "#00B9ff",
  defovr: "#00B9ff",
  cobramaia: "#00B9ff",
  vervacious_: "#00B9ff",
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

  let tint: string;

  if (!color) {
    const roleColor = roleToColorMap[role];
    if (roleColor) {
      tint = roleColor;
    }
  }

  if (!tint) {
    tint = color ?? "var(--ifm-color-primary)";
  }

  return (
    <span className={clsx(styles.badge)} style={{ color: tint, background: `${tint}22` }}>
      @{role}
      {/* Only render the icon if it exists */}
      {src && <img src={src} className={styles.icon} alt="" aria-hidden="true" />}
    </span>
  );
}
