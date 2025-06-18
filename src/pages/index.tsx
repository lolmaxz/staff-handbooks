import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import clsx from "clsx";
import { useEffect } from "react";

import styles from "./index.module.css";

function HomepageHeader() {
  useEffect(() => {
    // Add a class to the navbar for blur/transparency
    const navbar = document.querySelector(".navbar");
    if (navbar) navbar.classList.add("navbarBlur");

    // 3 independent springy, chill orbs
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let targetX = mouseX;
    let targetY = mouseY;
    const orbCount = 3;
    let springX = Array(orbCount).fill(mouseX);
    let springY = Array(orbCount).fill(mouseY);
    let offsetTargetX = Array(orbCount).fill(0);
    let offsetTargetY = Array(orbCount).fill(0);
    let offsetX = Array(orbCount).fill(0);
    let offsetY = Array(orbCount).fill(0);
    const maxDist = 48;

    const handleMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const animate = () => {
      for (let i = 0; i < orbCount; i++) {
        // Occasionally pick a new random offset target
        if (Math.random() < 0.02) {
          offsetTargetX[i] = (Math.random() - 0.5) * 2 * maxDist;
          offsetTargetY[i] = (Math.random() - 0.5) * 2 * maxDist;
        }
        // Smoothly move offset toward its target
        offsetX[i] += (offsetTargetX[i] - offsetX[i]) * 0.04;
        offsetY[i] += (offsetTargetY[i] - offsetY[i]) * 0.04;
        // Spring the orb toward the cursor + offset
        springX[i] += (targetX + offsetX[i] - springX[i]) * 0.1;
        springY[i] += (targetY + offsetY[i] - springY[i]) * 0.1;
        document.documentElement.style.setProperty(`--mouse-x${i + 1}`, `${springX[i]}px`);
        document.documentElement.style.setProperty(`--mouse-y${i + 1}`, `${springY[i]}px`);
      }
      requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      if (navbar) navbar.classList.remove("navbarBlur");
      document.removeEventListener("mousemove", handleMouseMove);
      // Clean up CSS variables
      for (let i = 1; i <= orbCount; i++) {
        document.documentElement.style.removeProperty(`--mouse-x${i}`);
        document.documentElement.style.removeProperty(`--mouse-y${i}`);
      }
    };
  }, []);

  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)} style={{ marginTop: 0, paddingTop: 0, position: "relative" }}>
      <div className="container" style={{ marginTop: "2.5rem", position: "relative", zIndex: 2 }}>
        <div className="heroCardOverlay">
          <div className="scanlines"></div>
          <div className="glitch-layers">
            <div className="glitch-layer"></div>
            <div className="glitch-layer"></div>
            <div className="glitch-layer"></div>
          </div>
        </div>
        <h1 className="hero__title">Eden Apis Staff Handbooks</h1>
        <p className="hero__subtitle">Your guide to roles, responsibilities, and procedures for any staff position.</p>
        <div className={styles.buttons}>
          <Link className="button button--secondary button--lg" to="/docs/intro">
            Get Started!
          </Link>
        </div>
      </div>
    </header>
  );
}

function Feature({ title, description, icon }) {
  return (
    <div className={clsx("col col--4", styles.feature)}>
      <div className="text--center">
        <img src={icon} className={styles.featureIcon} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

const features = [
  {
    title: "Roles & Responsibilities",
    description: "Understand the different staff roles and what is expected from each position.",
    icon: "../img/roles_icon.svg", // Replace with your own icon
  },
  {
    title: "Training Resources",
    description: "Access guides on verification processes, chat moderation, and more.",
    icon: "../img/training_icon.svg", // Replace with your own icon
  },
  {
    title: "Procedures & Policies",
    description: "Learn about server rule violations, ban procedures, and voting mechanisms.",
    icon: "../img/policies_icon.svg", // Replace with your own icon
  },
];

const handbooks = [
  {
    title: "General Handbook",
    description: "All-purpose basic handbook with information all staff needs to know!",
    link: "./docs/general-handbook",
    icon: "../img/general_icon.svg", // Replace with your own icon
  },
  {
    title: "Server Staff Handbook",
    description: "Guidelines and procedures for server staff members!",
    link: "/docs/server-staff-handbook",
    icon: "../img/server_icon.svg", // Replace with your own icon
  },
  {
    title: "Event Staff Handbook",
    description: "Handbook for the team that manages events!",
    link: "./docs/event-staff-handbook",
    icon: "../img/event_icon.svg", // Replace with your own icon
  },
];

export default function Home(): JSX.Element {
  return (
    <Layout
      title="Home"
      description="Eden Apis Staff Handbooks - Your guide to roles, responsibilities, and procedures for any staff position."
    >
      <div className="heroPulseBG" />
      <HomepageHeader />
      <main>
        <section className={styles.features}>
          <div className="container">
            <div className="row">
              {/* {features.map((props, idx) => (
                <Feature key={idx} {...props} />
              ))} */}
            </div>
          </div>
        </section>
        <section className={styles.handbooks}>
          <div className="container" style={{ marginBottom: "4rem" }}>
            <div className="row">
              {handbooks.map((handbook, idx) => (
                <div key={idx} className="col col--4">
                  <div className={clsx(styles.handbookCard, "text--center")}>
                    <h3>{handbook.title}</h3>
                    <p>{handbook.description}</p>
                    <Link className="button button--secondary button--sm" to={handbook.link}>
                      Read More
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
