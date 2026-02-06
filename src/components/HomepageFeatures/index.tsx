import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  icon: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Secure SSH Access',
    icon: '🔐',
    description: (
      <>
        Connect to your machines through encrypted tunnels with enterprise-grade
        security. All connections are authenticated, authorized, and logged.
      </>
    ),
  },
  {
    title: 'Web Terminal',
    icon: '💻',
    description: (
      <>
        Access your servers directly from your browser - no local SSH client required.
        Full terminal emulation with copy/paste, colors, and keyboard shortcuts.
      </>
    ),
  },
  {
    title: 'Team Collaboration',
    icon: '👥',
    description: (
      <>
        Share access with team members safely using Role-Based Access Control.
        Define exactly what permissions each colleague should have.
      </>
    ),
  },
];

function Feature({title, icon, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <span style={{fontSize: '4rem'}}>{icon}</span>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
