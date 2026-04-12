import React, { useState } from 'react';
import styles from './styles.module.css';

type Status = 'yes' | 'no' | 'partial' | 'paid';

interface Row {
  feature: string;
  webxterm: { status: Status; note?: string };
  teleport: { status: Status; note?: string };
}

interface Group {
  label: string;
  icon: string;
  rows: Row[];
}

const groups: Group[] = [
  {
    label: 'Security',
    icon: '🔐',
    rows: [
      {
        feature: 'No custom client required',
        webxterm: { status: 'yes', note: 'Browser, VSCode, or CLI' },
        teleport: { status: 'no', note: 'Requires tsh custom client' },
      },
      {
        feature: 'Self-hosted — you own the data',
        webxterm: { status: 'yes' },
        teleport: { status: 'partial', note: 'Self-hosted or SaaS' },
      },
      {
        feature: 'mTLS (Mutual TLS)',
        webxterm: { status: 'yes' },
        teleport: { status: 'yes' },
      },
      {
        feature: '2FA out of the box',
        webxterm: { status: 'yes' },
        teleport: { status: 'yes' },
      },
      {
        feature: 'SSO / OIDC Login',
        webxterm: { status: 'paid', note: 'Enterprise' },
        teleport: { status: 'paid', note: 'Paid plans only' },
      },
      {
        feature: 'Session & Command Recording',
        webxterm: { status: 'yes' },
        teleport: { status: 'yes' },
      },
      {
        feature: 'Audit Logs',
        webxterm: { status: 'yes' },
        teleport: { status: 'yes' },
      },
    ],
  },
  {
    label: 'Access & Clients',
    icon: '🖥',
    rows: [
      {
        feature: 'Web Terminal (browser-based)',
        webxterm: { status: 'yes' },
        teleport: { status: 'yes' },
      },
      {
        feature: 'VSCode Extension',
        webxterm: { status: 'yes', note: 'Dedicated extension' },
        teleport: { status: 'partial', note: 'Via Remote SSH only' },
      },
      {
        feature: 'Shell CLI',
        webxterm: { status: 'yes', note: 'vsay-shell-cli' },
        teleport: { status: 'partial', note: 'tsh (proprietary client)' },
      },
      {
        feature: 'Simple agent install (one command)',
        webxterm: { status: 'yes' },
        teleport: { status: 'partial', note: 'Complex multi-step setup' },
      },
    ],
  },
  {
    label: 'Monitoring & Operations',
    icon: '📊',
    rows: [
      {
        feature: 'Real-time Monitoring (CPU / Mem / Disk)',
        webxterm: { status: 'yes' },
        teleport: { status: 'no' },
      },
      {
        feature: 'Built-in Issue Tracker',
        webxterm: { status: 'yes' },
        teleport: { status: 'no' },
      },
    ],
  },
  {
    label: 'Multi-Tenancy & RBAC',
    icon: '🏢',
    rows: [
      {
        feature: 'True Multi-tenancy (multiple orgs, one instance)',
        webxterm: { status: 'yes' },
        teleport: { status: 'no', note: 'Requires separate instances per org' },
      },
      {
        feature: 'Hierarchical Roles (Superadmin → Admin → User)',
        webxterm: { status: 'yes' },
        teleport: { status: 'no', note: 'Flat role assignments only' },
      },
      {
        feature: 'Per-company isolated user management',
        webxterm: { status: 'yes' },
        teleport: { status: 'no', note: 'No native org isolation' },
      },
      {
        feature: 'Machine access control per user / group',
        webxterm: { status: 'yes' },
        teleport: { status: 'partial', note: 'Role-based labels only' },
      },
    ],
  },
];

function StatusCellDiv({ status, note }: { status: Status; note?: string }) {
  const map = {
    yes:     { symbol: '✓', cls: styles.yes },
    no:      { symbol: '✕', cls: styles.no },
    partial: { symbol: '⚠', cls: styles.partial },
    paid:    { symbol: '💳', cls: styles.paid },
  } as const;
  const { symbol, cls } = map[status];

  return (
    <div className={`${styles.cell} ${cls}`}>
      <span className={styles.statusIcon}>{symbol}</span>
      {note && <span className={styles.note}>{note}</span>}
    </div>
  );
}

export default function ComparisonTable() {
  const [closed, setClosed] = useState<Set<string>>(new Set());

  const toggle = (label: string) => {
    setClosed(prev => {
      const next = new Set(prev);
      next.has(label) ? next.delete(label) : next.add(label);
      return next;
    });
  };

  return (
    <div className={styles.wrapper}>
      {/* Column headers */}
      <div className={styles.colHeaders}>
        <div className={styles.colFeature}>Feature</div>
        <div className={`${styles.colProduct} ${styles.colWebXTerm}`}>
          <span className={styles.productPip} style={{ background: '#00e676' }} />
          WebXTerm
        </div>
        <div className={`${styles.colProduct} ${styles.colTeleport}`}>
          <span className={styles.productPip} style={{ background: '#818cf8' }} />
          Teleport
        </div>
      </div>

      {groups.map((g) => {
        const isOpen = !closed.has(g.label);
        return (
          <div key={g.label} className={styles.group}>
            {/* Group header */}
            <button className={styles.groupBtn} onClick={() => toggle(g.label)}>
              <span className={styles.groupIcon}>{g.icon}</span>
              <span className={styles.groupLabel}>{g.label}</span>
              <span className={styles.groupCount}>{g.rows.length} features</span>
              <span className={`${styles.groupChevron} ${isOpen ? styles.chevronOpen : ''}`}>›</span>
            </button>

            {/* Rows */}
            {isOpen && (
              <div>
                {g.rows.map((row, i) => {
                  const webxtermWins =
                    row.webxterm.status === 'yes' && row.teleport.status !== 'yes';
                  return (
                    <div
                      key={i}
                      className={`${styles.row} ${webxtermWins ? styles.rowHighlight : ''}`}
                    >
                      <div className={styles.featureCell}>
                        {webxtermWins && <span className={styles.winBadge}>✦</span>}
                        {row.feature}
                      </div>
                      <StatusCellDiv {...row.webxterm} />
                      <StatusCellDiv {...row.teleport} />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}

      {/* Legend */}
      <div className={styles.legend}>
        <span className={styles.yes}>✓ Included</span>
        <span className={styles.partial}>⚠ Partial / Limited</span>
        <span className={styles.no}>✕ Not available</span>
        <span className={styles.paid}>💳 Paid plan only</span>
        <span className={styles.winLegend}>✦ WebXTerm advantage</span>
      </div>
    </div>
  );
}
