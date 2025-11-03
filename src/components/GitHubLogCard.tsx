import React from "react";
import styles from "./GitHubLogCard.module.css";

export interface GitHubLogCardProps {
  title: string; // e.g., "FictionalUser [123456789012345678]"
  when: string; // e.g., "When: 2024-06-16"
  why: string; // e.g., "Why: Oversharing/Negativity in public channels."
  result: string; // e.g., "Result: Informal warning issued."
  loggedBy: string; // e.g., "Logged By: Moderator 1"
  avatarUrl?: string; // optional profile picture URL
  note?: string; // optional, additional details
}

export default function GitHubLogCard({ title, when, why, result, loggedBy, avatarUrl, note }: GitHubLogCardProps) {
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.header}>
        <div className={styles.badge}>Draft</div>
        <div className={styles.title}>{title}</div>
      </div>
      <div className={styles.body}>
        <div className={styles.metaBlock}>
          <div className={styles.metaLine}>{when}</div>
          <div className={styles.metaLine}>{why}</div>
          <div className={styles.metaLine}>{result}</div>
          <div className={styles.metaLine}>{loggedBy}</div>
        </div>
        <div className={styles.profileBlock}>
          <div className={styles.profileRow}>
            <div className={styles.avatarContainer}>
              <img
                src={avatarUrl || "https://cdn.discordapp.com/embed/avatars/2.png"}
                className={styles.avatar}
                alt="Profile"
              />
            </div>
            <div className={styles.profileInfo}>
              <div className={styles.profileName}>FictionalUser</div>
              <div className={styles.profileSub}>Mutual Friends (0) • Mutual Servers (1)</div>
              <div className={styles.profileSince}>Member Since • 16 May 2020</div>
            </div>
          </div>
          {note && <div className={styles.note}>Note: {note}</div>}
        </div>
      </div>
    </div>
  );
}
