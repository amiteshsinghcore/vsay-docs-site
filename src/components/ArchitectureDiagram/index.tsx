import React, { useState } from 'react';
import styles from './styles.module.css';

const ClientNodes = [
  { icon: '🌐', label: 'Browser', sub: 'Web Terminal' },
  { icon: '⬡', label: 'VS Code', sub: 'Extension' },
  { icon: '$_', label: 'VSAY CLI', sub: 'Shell Tool' },
];

const MachineNodes = [
  { icon: '🖥', label: 'prod-server-01', sub: 'Linux / x86', dot: 'green' },
  { icon: '💻', label: 'dev-laptop', sub: 'macOS / M1', dot: 'green' },
  { icon: '⬡', label: 'bare-metal-02', sub: 'Linux / ARM', dot: 'orange' },
];

function Arrow({ label, color, active }: { label: string; color: 'blue' | 'green'; active: boolean }) {
  return (
    <div className={styles.arrowBlock}>
      <div className={`${styles.arrowTrack} ${color === 'blue' ? styles.arrowTrackBlue : styles.arrowTrackGreen} ${active ? styles.arrowTrackActive : ''}`}>
        {/* static line */}
        <div className={styles.arrowLine} />
        {/* arrowhead */}
        <div className={`${styles.arrowHead} ${color === 'blue' ? styles.arrowHeadBlue : styles.arrowHeadGreen}`} />
        {/* animated signal dots */}
        <div className={`${styles.signalDot} ${styles.signalDot1} ${color === 'blue' ? styles.signalBlue : styles.signalGreen}`} />
        <div className={`${styles.signalDot} ${styles.signalDot2} ${color === 'blue' ? styles.signalBlue : styles.signalGreen}`} />
        <div className={`${styles.signalDot} ${styles.signalDot3} ${color === 'blue' ? styles.signalBlue : styles.signalGreen}`} />
      </div>
      <div className={styles.arrowLabel}>{label}</div>
    </div>
  );
}

export default function ArchitectureDiagram() {
  const [activeFlow, setActiveFlow] = useState<string | null>(null);

  return (
    <div className={styles.wrapper}>
      <div className={styles.badge}>Architecture</div>
      <h2 className={styles.title}>
        How <span className={styles.brand}>WebXTerm</span> Works
      </h2>
      <p className={styles.subtitle}>
        Agent-based, zero-trust architecture. The agent connects on one port that is 8081 outbound/inbound traffic —{' '}
        <strong>no open ports, no VPN, no bastion hosts.</strong>
      </p>

      <div className={styles.diagram}>

        {/* CLIENT LAYER */}
        <div className={styles.layer}>
          <div className={styles.layerLabel}>CLIENT LAYER</div>
          <div className={styles.nodeGroup}>
            {ClientNodes.map((n) => (
              <div key={n.label} className={styles.node}
                onMouseEnter={() => setActiveFlow('client')}
                onMouseLeave={() => setActiveFlow(null)}>
                <div className={styles.nodeIcon}>{n.icon}</div>
                <div className={styles.nodeLabel}>{n.label}</div>
                <div className={styles.nodeSub}>{n.sub}</div>
                <div className={`${styles.dot} ${styles.dotBlue}`} />
              </div>
            ))}
          </div>
        </div>

        {/* ARROW: client → portal */}
        <Arrow label="HTTPS / WSS" color="blue" active={activeFlow === 'client'} />

        {/* PORTAL */}
        <div className={styles.portalWrap}>
          <div className={`${styles.portal} ${activeFlow ? styles.portalGlow : ''}`}>
            <div className={styles.portalDot} />
            <div className={styles.portalIcon}>⊕</div>
            <div className={styles.portalTitle}>WebXTerm Portal</div>
            <div className={styles.portalSub}>Control Hub</div>
            <div className={styles.portalTags}>
              <span>Auth</span>
              <span>Router</span>
              <span>Audit</span>
              <span>Registry</span>
            </div>
          </div>
          <div className={styles.layerLabel} style={{ textAlign: 'center', marginTop: 8 }}>
            CONTROL PLANE
          </div>
        </div>

        {/* ARROW: portal → agent */}
        <Arrow label="gRPC / mTLS" color="green" active={activeFlow === 'agent'} />

        {/* AGENT */}
        <div className={styles.agentWrap}>
          <div className={`${styles.agent} ${activeFlow === 'agent' ? styles.agentGlow : ''}`}
            onMouseEnter={() => setActiveFlow('agent')}
            onMouseLeave={() => setActiveFlow(null)}>
            <div className={styles.portalDot} />
            <div className={styles.portalIcon}>⬡</div>
            <div className={styles.portalTitle}>vsay-agent</div>
            <div className={styles.portalSub}>On your machine</div>
            <div className={styles.portalTags}>
              <span>Outbound/Inbound on one port only (8081) </span>
              <span>Systemd</span>
              <span>Heartbeat</span>
            </div>
          </div>
          <div className={styles.layerLabel} style={{ textAlign: 'center', marginTop: 8 }}>
            AGENT
          </div>
        </div>

        {/* ARROW: agent → machines */}
        <Arrow label="LOCAL IPC" color="green" active={activeFlow === 'agent'} />

        {/* MACHINE LAYER */}
        <div className={styles.layer}>
          <div className={styles.layerLabel}>MACHINE LAYER</div>
          <div className={styles.nodeGroup}>
            {MachineNodes.map((n) => (
              <div key={n.label} className={styles.node}
                onMouseEnter={() => setActiveFlow('agent')}
                onMouseLeave={() => setActiveFlow(null)}>
                <div className={styles.nodeIcon}>{n.icon}</div>
                <div className={styles.nodeLabel}>{n.label}</div>
                <div className={styles.nodeSub}>{n.sub}</div>
                <div className={`${styles.dot} ${n.dot === 'green' ? styles.dotGreen : styles.dotOrange}`} />
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* LEGEND */}
      <div className={styles.legend}>
        <span><span className={styles.legendDotBlue} /> Client connection (HTTPS/WSS)</span>
        <span><span className={styles.legendDotGreen} /> Agent tunnel (gRPC/mTLS) — outbound</span>
        <span><span className={styles.legendDotOrange} /> Active session</span>
      </div>
    </div>
  );
}
