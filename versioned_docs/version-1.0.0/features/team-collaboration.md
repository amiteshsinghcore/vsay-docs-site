---
sidebar_position: 3
---

import RBACDiagram from '@site/src/components/RBACDiagram';

# Team Collaboration

WebXTerm uses a **hierarchical Role-Based Access Control (RBAC)** model. A Superadmin manages the entire platform, Company Admins manage their own organizations, and Users can only access machines explicitly granted to them.

<RBACDiagram />

## Role-Based Access Control

### The Three-Tier Hierarchy

```
Super Administrator  (super_admin)
    └── Full platform control — manages all organizations, users, groups, machines
Company Admin  (company_admin)
    └── Manages their own organization — users, groups, machines, access
User  (user)
    └── Accesses only machines they have been explicitly granted access to
```

### Portal Roles

These roles control access to the WebXTerm web portal and admin functions.

| Role | Internal Name | Scope | Capabilities |
|------|--------------|-------|-------------|
| **Super Administrator** | `super_admin` | Platform-wide | Create/manage all organizations, manage all users & groups & machines, system configuration |
| **Company Admin** | `company_admin` | Organization | Manage users, groups, and machines within their organization; grant machine access to users |
| **User** | `user` | Machine-level | View and connect to machines they have been explicitly assigned |

**Super Administrator permissions:** `manage_organizations`, `manage_all_users`, `manage_all_groups`, `manage_all_machines`, `view_all_resources`, `system_configuration`

**Company Admin permissions:** `manage_users`, `manage_groups`, `manage_machines`, `view_org_resources`

**User permissions:** `view_assigned_machines`, `use_assigned_machines`, `view_own_profile`

### Machine Roles

When a user is granted access to a machine, they also receive a **machine role** that controls what they can do in a terminal session on that machine:

| Machine Role | Internal Name | What They Can Do |
|-------------|--------------|-----------------|
| **Sudo Access** | `sudo` | Full admin access — execute privileged commands, modify system files, install packages, manage services |
| **Non-Sudo Access** | `non-sudo` | Standard user access — run regular commands only, cannot execute privileged commands |

**Sudo permissions:** `execute_sudo_commands`, `modify_system_files`, `install_packages`, `manage_services`

**Non-Sudo permissions:** `execute_user_commands`, `read_system_info`

## RBAC Flow

1. **Superadmin** creates organizations (companies) via **User Management → Organizations**
2. **Superadmin** creates a Company Admin user and assigns them the `company_admin` role for their organization
3. **Company Admin** adds machines to their organization by registering `vsay-agent`
4. **Company Admin** invites users and grants them access to specific machines with a machine role (`sudo` or `non-sudo`)
5. **Users** connect only to machines they have been explicitly granted access to
6. If a user has **not logged in for 30 days**, their access is automatically revoked

## Managing Team Members

### Inviting New Members

1. Navigate to **User Management → Users**
2. Click **"Add User"**
3. Enter the email address and assign a portal role (`company_admin` or `user`)
4. Save — the user can now log in

### Granting Machine Access

Only a **Company Admin** can grant users access to machines:

1. Go to **Machines → [Select Machine] → Access**
2. Click **"Add User"**
3. Select the user and choose their machine role (`sudo` or `non-sudo`)
4. Save

To revoke access, remove the user from the machine's allowed list.

### Removing Members

1. Go to **User Management → Users**
2. Find the user and remove them

The user immediately loses access to all organization resources.

:::info[Automatic Access Revocation]
Users who have not logged in for **30 days** are automatically deprovisioned. Their access is revoked until re-enabled by a Company Admin.
:::

## Machine Management

Only **Company Admins** (and Superadmin) can add or delete machines:

- **Add machine**: Install and configure `vsay-agent` on the machine — it appears in the dashboard automatically
- **Delete machine**: Go to **Machines → [Machine] → Delete** — removes the machine from the organization

### Command Restrictions

When registering the agent, you can allow or restrict sudo in terminal sessions:

```bash
sudo vsay-agent configure \
  --token YOUR_BOOTSTRAP_TOKEN \
  --host http://your-webxterm-instance.com:8080 \
  --linux-user ubuntu \
  --allow-sudo    # Grant sudo access in sessions
```

## Best Practices

1. **Principle of Least Privilege** — assign `non-sudo` by default; only grant `sudo` where needed
2. **Regular Audits** — periodically review who has access to which machines
3. **Offboarding** — remove users immediately when they leave; auto-revocation at 30 days is a safety net, not a substitute
4. **Separate Production Access** — keep production machine access restricted to a small set of users
