import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import clsx from "clsx";

import styles from "./index.module.css";

// function HomepageHeader() {
//   const {siteConfig} = useDocusaurusContext();
//   return (
//     <header className={clsx('hero hero--primary', styles.heroBanner)}>
//       <div className="container">
//         <Heading as="h1" className="hero__title">
//           {siteConfig.title}
//         </Heading>
//         <p className="hero__subtitle">{siteConfig.tagline}</p>
//         <div className={styles.buttons}>
//           <Link
//             className="button button--secondary button--lg"
//             to="/docs/intro">
//             Docusaurus Tutorial - 5min ⏱️
//           </Link>
//         </div>
//       </div>
//     </header>
//   );
// }

// export default function Home(): ReactNode {
//   const {siteConfig} = useDocusaurusContext();
//   return (
//     <Layout
//       title={`Hello from ${siteConfig.title}`}
//       description="Description will go into a meta tag in <head />">
//       <HomepageHeader />
//       <main>
//         <HomepageFeatures />
//       </main>
//     </Layout>
//   );
// }

function HomepageHeader() {
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
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
    <Layout title="Home" description="Eden Apis Staff Handbook - Your guide to roles, responsibilities, and procedures">
      <HomepageHeader />
      <main>
        <section className={styles.features}>
          <div className="container">
            <div className="row">
              {features.map((props, idx) => (
                <Feature key={idx} {...props} />
              ))}
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