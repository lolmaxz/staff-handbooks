import React from "react";
import styles from "./CardGrid.module.css";

interface CardGridProps {
  columns?: 2 | 3;
  children: React.ReactNode;
  className?: string;
}

interface CardProps {
  title: string;
  icon?: React.ReactNode;
  status?: "success" | "error" | "warning" | "info";
  href?: string;
  children: React.ReactNode;
  className?: string;
}

export function Card({ title, icon, status, href, children, className = "" }: CardProps) {
  const getStatusIcon = () => {
    switch (status) {
      case "success":
        return (
          <span className={styles.statusIcon} style={{ color: "#22c55e" }}>
            ✓
          </span>
        );
      case "error":
        return (
          <span className={styles.statusIcon} style={{ color: "#ef4444" }}>
            ✗
          </span>
        );
      case "warning":
        return (
          <span className={styles.statusIcon} style={{ color: "#f59e0b" }}>
            ⚠
          </span>
        );
      case "info":
        return (
          <span className={styles.statusIcon} style={{ color: "#3b82f6" }}>
            ℹ
          </span>
        );
      default:
        return null;
    }
  };

  const renderTitle = () => {
    const titleContent = (
      <>
        {icon && <span className={styles.cardIcon}>{icon}</span>}
        {getStatusIcon()}
        {title}
      </>
    );

    if (href) {
      return (
        <a href={href} className={styles.cardTitleLink}>
          {titleContent}
        </a>
      );
    }

    return <h4 className={styles.cardTitle}>{titleContent}</h4>;
  };

  return (
    <div className={`${styles.card} ${className}`}>
      {renderTitle()}
      <div className={styles.cardContent}>{children}</div>
    </div>
  );
}

export default function CardGrid({ columns = 2, children, className = "" }: CardGridProps) {
  const gridClass = columns === 3 ? styles.gridThree : styles.gridTwo;

  return <div className={`${styles.grid} ${gridClass} ${className}`}>{children}</div>;
}
