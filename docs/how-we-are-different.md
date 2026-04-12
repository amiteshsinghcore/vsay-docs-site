---
sidebar_position: 3
---

import ComparisonTable from '@site/src/components/ComparisonTable';

# How We Are Different

WebXTerm was built to solve problems that existing tools like Teleport don't address well — especially for teams managing infrastructure across multiple organizations from a single deployment.

## WebXTerm vs Teleport

<ComparisonTable />

:::tip[Reading the Table]
Rows marked with **✦** are areas where WebXTerm has a clear advantage over Teleport.
:::

## What Makes WebXTerm Unique

### True Multi-Tenancy — One Deployment, Many Companies

Teleport requires a **separate instance per organization**. If you're a managed service provider or running infrastructure for multiple companies, that means maintaining multiple Teleport clusters.

WebXTerm handles this natively. A single WebXTerm deployment can serve **multiple fully isolated organizations** — each with their own users, machines, and admin:

```
Superadmin
  ├── Company A  (company_admin A manages users, machines, access)
  ├── Company B  (company_admin B manages users, machines, access)
  └── Company C  (company_admin C manages users, machines, access)
```

Each company's data, users, and machines are **completely isolated** from each other.

---

### Hierarchical RBAC vs Flat Roles

Teleport has a flat role model — roles exist at the cluster level with no concept of org-level admins.

WebXTerm has a **three-tier hierarchy** built in:

| Role | What They Can Do |
|------|-----------------|
| **Super Administrator** | Create and manage all organizations, promote company admins, full platform control |
| **Company Admin** | Manage users, groups, machines, and access within their own organization only |
| **User** | Connect to machines they have been explicitly granted access to |

---

### Machine Roles — Sudo vs Non-Sudo

When granting a user access to a machine, you also assign a **machine role**:

| Machine Role | Access Level |
|-------------|-------------|
| **sudo** | Full privileged access — can run privileged commands, modify files, install packages |
| **non-sudo** | Standard access — regular commands only, no privilege escalation |

Teleport uses label-based RBAC which is more complex to manage at scale.

---

### Real-Time Monitoring

WebXTerm agents send **heartbeats every 30 seconds** with live CPU, memory, and disk stats. You can see the health of all your machines from a single dashboard — no external monitoring tool needed.

Teleport does not include built-in infrastructure monitoring.

---

### Built-in Issue Tracker

WebXTerm includes a **Community** module — a built-in issue tracker for reporting and tracking infrastructure problems directly within the platform. No need for a separate ticketing tool for internal ops.

Teleport has no equivalent.

---

### Dedicated VSCode Extension

WebXTerm has a first-class VSCode extension that lets you connect to machines directly from your editor. Teleport's VSCode integration is limited to piggybacking on the Remote SSH extension via `tsh`.

---

### No Custom Client Required

With WebXTerm you can connect from:
- **Browser** — full web terminal, no install needed
- **VSCode Extension** — connect from your editor
- **vsay-shell-cli** — lightweight CLI

Teleport requires installing and authenticating with `tsh` (their proprietary client) before you can do anything.

