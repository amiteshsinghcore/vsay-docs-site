import React, { useState } from 'react';
import styles from './styles.module.css';

type ActiveNode = 'superadmin' | 'company' | 'user' | 'machine' | null;

function PermissionTag({ label }: { label: string }) {
  return <span className={styles.permTag}>{label}</span>;
}

function FlowArrow({
  label,
  active,
}: {
  label: string;
  active: boolean;
}) {
  return (
    <div className={styles.flowArrow}>
      <div className={`${styles.arrowTrack} ${active ? styles.arrowActive : ''}`}>
        <div className={styles.arrowLine} />
        <div className={`${styles.arrowHead} ${active ? styles.arrowHeadActive : ''}`} />
        <div className={`${styles.signalDot} ${styles.dot1}`} />
        <div className={`${styles.signalDot} ${styles.dot2}`} />
        <div className={`${styles.signalDot} ${styles.dot3}`} />
      </div>
      <div className={`${styles.arrowLabel} ${active ? styles.arrowLabelActive : ''}`}>{label}</div>
    </div>
  );
}

export default function RBACDiagram() {
  const [active, setActive] = useState<ActiveNode>(null);

  // An upstream hover should glow downstream cards too
  const companyActive = active === 'superadmin' || active === 'company';
  const userActive    = active === 'company'    || active === 'user';
  const machineActive = active === 'user'       || active === 'machine';

  return (
    <div className={styles.wrapper}>
      <div className={styles.badge} />
      <h2 className={styles.title}>
        How <span className={styles.brand}>RBAC</span> Works
      </h2>
      <p className={styles.subtitle}>
        Hierarchical access control — Superadmin → Company Admin → User → Machine
      </p>

      <div className={styles.diagramScroller}>
      <div className={styles.diagram}>

        {/* ── SUPERADMIN ── */}
        <div
          className={`${styles.card} ${styles.cardPurple} ${active === 'superadmin' ? styles.cardActive : ''}`}
          onMouseEnter={() => setActive('superadmin')}
          onMouseLeave={() => setActive(null)}
        >
          <div className={styles.roleIcon}>👑</div>
          <div className={styles.roleName}>Super Administrator</div>
          <div
            className={styles.roleTag}
            style={{ background: 'rgba(139,92,246,0.15)', color: '#a78bfa', borderColor: 'rgba(139,92,246,0.3)' }}
          >
            super_admin
          </div>
          <div className={styles.perms}>
            <PermissionTag label="manage_organizations" />
            <PermissionTag label="manage_all_users" />
            <PermissionTag label="manage_all_groups" />
            <PermissionTag label="manage_all_machines" />
            <PermissionTag label="system_configuration" />
          </div>
        </div>

        {/* ── ARROW 1 ── */}
        <FlowArrow label="Creates org · assigns admin" active={active === 'superadmin'} />

        {/* ── COMPANY ADMIN ── */}
        <div
          className={`${styles.card} ${styles.cardBlue} ${companyActive ? styles.cardActive : ''}`}
          onMouseEnter={() => setActive('company')}
          onMouseLeave={() => setActive(null)}
        >
          <div className={styles.roleIcon}>🏢</div>
          <div className={styles.roleName}>Company Admin</div>
          <div
            className={styles.roleTag}
            style={{ background: 'rgba(59,130,246,0.15)', color: '#60a5fa', borderColor: 'rgba(59,130,246,0.3)' }}
          >
            company_admin
          </div>
          <div className={styles.perms}>
            <PermissionTag label="manage_users" />
            <PermissionTag label="manage_groups" />
            <PermissionTag label="manage_machines" />
            <PermissionTag label="view_org_resources" />
          </div>
          <div className={styles.cardNote}>Registers machines · Grants user access</div>
        </div>

        {/* ── ARROW 2 ── */}
        <FlowArrow label="Grants machine access (sudo / non-sudo)" active={companyActive} />

        {/* ── USER ── */}
        <div
          className={`${styles.card} ${styles.cardGreen} ${userActive ? styles.cardActive : ''}`}
          onMouseEnter={() => setActive('user')}
          onMouseLeave={() => setActive(null)}
        >
          <div className={styles.roleIcon}>👤</div>
          <div className={styles.roleName}>User</div>
          <div
            className={styles.roleTag}
            style={{ background: 'rgba(0,230,118,0.12)', color: '#00e676', borderColor: 'rgba(0,230,118,0.3)' }}
          >
            user
          </div>
          <div className={styles.perms}>
            <PermissionTag label="view_assigned_machines" />
            <PermissionTag label="use_assigned_machines" />
            <PermissionTag label="view_own_profile" />
          </div>
          <div className={`${styles.cardNote} ${styles.cardNoteWarn}`}>
            ⏱ Auto-revoked after 30 days inactive
          </div>
        </div>

        {/* ── ARROW 3 ── */}
        <FlowArrow label="Connects via Web / CLI / VSCode" active={userActive} />

        {/* ── MACHINE ── */}
        <div
          className={`${styles.card} ${styles.cardOrange} ${machineActive ? styles.cardActive : ''}`}
          onMouseEnter={() => setActive('machine')}
          onMouseLeave={() => setActive(null)}
        >
          <div className={styles.roleIcon}>🖥</div>
          <div className={styles.roleName}>Machine</div>
          <div
            className={styles.roleTag}
            style={{ background: 'rgba(245,158,11,0.12)', color: '#fbbf24', borderColor: 'rgba(245,158,11,0.3)' }}
          >
            vsay-agent
          </div>
          <div className={styles.machineRoles}>
            <div className={styles.machineRole}>
              <span
                className={styles.machineRoleDot}
                style={{ background: '#f87171', boxShadow: '0 0 6px rgba(248,113,113,0.8)' }}
              />
              <div>
                <div className={styles.machineRoleTitle}>sudo</div>
                <div className={styles.machineRoleSub}>
                  Privileged — exec commands, modify files, install packages
                </div>
              </div>
            </div>
            <div className={styles.machineRole}>
              <span
                className={styles.machineRoleDot}
                style={{ background: '#34d399', boxShadow: '0 0 6px rgba(52,211,153,0.8)' }}
              />
              <div>
                <div className={styles.machineRoleTitle}>non-sudo</div>
                <div className={styles.machineRoleSub}>
                  Standard — run commands, read system info
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      </div>

      {/* ── LEGEND ── */}
      <div className={styles.legend}>
        <span><span className={styles.ldot} style={{ background: '#a78bfa', boxShadow: '0 0 5px rgba(167,139,250,0.8)' }} /> Superadmin — full platform</span>
        <span><span className={styles.ldot} style={{ background: '#60a5fa', boxShadow: '0 0 5px rgba(96,165,250,0.8)' }}  /> Company Admin — manages org</span>
        <span><span className={styles.ldot} style={{ background: '#00e676', boxShadow: '0 0 5px rgba(0,230,118,0.8)' }}  /> User — assigned machines only</span>
        <span><span className={styles.ldot} style={{ background: '#fbbf24', boxShadow: '0 0 5px rgba(251,191,36,0.7)' }} /> Machine — sudo or non-sudo</span>
      </div>
    </div>
  );
}
