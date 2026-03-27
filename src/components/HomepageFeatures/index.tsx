import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import { ShieldCheck, TerminalSquare, Users } from 'lucide-react';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number; color?: string }>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Secure Remote Access',
    Icon: ShieldCheck,
    description: (
      <>
        Install a lightweight agent on any Linux machine and connect instantly —
        no open ports, no SSH keys, no bastion hosts. All connections are
        authenticated, authorized, and logged.
      </>
    ),
  },
  {
    title: 'Web Terminal',
    Icon: TerminalSquare,
    description: (
      <>
        Access your servers directly from your browser - no local SSH client required.
        Full terminal emulation with copy/paste, colors, and keyboard shortcuts.
      </>
    ),
  },
  {
    title: 'Team Collaboration',
    Icon: Users,
    description: (
      <>
        Share access with team members safely using Role-Based Access Control.
        Define exactly what permissions each colleague should have.
      </>
    ),
  },
];

function Feature({title, Icon, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center" style={{padding: '1.5rem 0'}}>
        <Icon size={56} strokeWidth={1.5} color="var(--ifm-color-primary)" />
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
