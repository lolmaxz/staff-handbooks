import { useEffect, useMemo, useState } from "react";
import styles from "./Timestamp.module.css";

/** Discord’s style letters */
type Style = "t" | "T" | "d" | "D" | "f" | "F" | "R";

function parse(input: string | number, override?: Style): { unix: number; style: Style } {
  if (typeof input === "number") return { unix: input, style: override ?? "f" };

  // <t:1747208640:R>  or  <t:1747208640>
  const match = input.match(/^<t:(\d{1,12})(?::([tTdDfFR]))?>$/);
  if (match) {
    return {
      unix: Number(match[1]),
      style: (override ?? match[2] ?? "f") as Style,
    };
  }

  throw new Error("Invalid timestamp value");
}

export default function Timestamp({ value, style }: { value: string | number; style?: Style }) {
  const { unix, style: fmt } = useMemo(() => parse(value, style), [value, style]);
  const [now, setNow] = useState(Date.now());
  // The text depends on the viewer's time zone and clock, so it is only shown once the page runs
  // in the browser. Rendering it during the site build caused a React hydration warning.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    setNow(Date.now());
  }, []);

  /* live‑update every minute if using relative style */
  useEffect(() => {
    if (fmt !== "R") return;
    const id = setInterval(() => setNow(Date.now()), 1_000);
    return () => clearInterval(id);
  }, [fmt]);

  /* format once per render */
  const rendered = useMemo(() => {
    const date = new Date(unix * 1000);

    if (fmt === "R") {
      const diffSec = Math.round((date.getTime() - now) / 1000);
      const divs: [Intl.RelativeTimeFormatUnit, number][] = [
        ["year", 31_536_000],
        ["month", 2_592_000],
        ["day", 86_400],
        ["hour", 3_600],
        ["minute", 60],
        ["second", 1],
      ];
      for (const [unit, sec] of divs) {
        if (Math.abs(diffSec) >= sec || unit === "second") {
          const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" });
          return rtf.format(Math.round(diffSec / sec), unit);
        }
      }
    }

    const opts: Record<Style, Intl.DateTimeFormatOptions> = {
      t: { timeStyle: "short" },
      T: { timeStyle: "medium" },
      d: { dateStyle: "short" },
      D: { dateStyle: "long" },
      f: { dateStyle: "long", timeStyle: "short" },
      F: { dateStyle: "full", timeStyle: "short" },
      R: {},
    };
    return new Intl.DateTimeFormat(undefined, opts[fmt]).format(date);
  }, [unix, fmt, now]);

  return (
    <time dateTime={new Date(unix * 1000).toISOString()} className={styles.tag} title={mounted ? rendered : undefined} /* browser tooltip */>
      {mounted ? rendered : " "}
    </time>
  );
}
