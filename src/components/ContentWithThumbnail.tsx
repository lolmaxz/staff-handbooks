import React from "react";
import styles from "./ContentWithThumbnail.module.css";

interface Props {
  /** Path to the thumbnail image (relative to static/img) */
  thumbnail: string;
  /** Alt text for the thumbnail image */
  thumbnailAlt?: string;
  /** Content to display alongside the thumbnail */
  children: React.ReactNode;
}

export default function ContentWithThumbnail({ thumbnail, thumbnailAlt = "", children }: Props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>{children}</div>
      <div className={styles.thumbnail}>
        <img 
          src={require(`../../static/img/${thumbnail}`).default}
          alt={thumbnailAlt}
          className={styles.image}
        />
      </div>
    </div>
  );
}

