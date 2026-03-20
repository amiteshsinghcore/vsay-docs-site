import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      {/* Animated background blobs */}
      <div className={styles.blobsContainer}>
        <div className={clsx(styles.blob, styles.blob1)} />
        <div className={clsx(styles.blob, styles.blob2)} />
        <div className={clsx(styles.blob, styles.blob3)} />
      </div>

      <div className="container" style={{position: 'relative', zIndex: 1}}>
        {/* Badge */}
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          Machines Management Platform
        </div>

        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg"
            to="/docs/getting-started">
            Get Started
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            View Docs
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Documentation"
      description="WebXTerm - Secure SSH access management portal documentation">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
