---
sidebar_position: 2
---

# Organization Management

VSAY Terminal is built on a multi-tenant architecture where each organization operates independently with its own users, machines, and configurations.

## Multi-Tenancy Overview

### What is an Organization?

An organization in VSAY Terminal is an isolated workspace that contains:

- **Users**: Team members with their roles and permissions
- **Machines**: Servers and infrastructure registered to the organization
- **Settings**: Configuration specific to the organization
- **Audit Logs**: Activity history within the organization
- **Billing**: Subscription and payment information

### Isolation Guarantees

Each organization is completely isolated:

- Users from one organization cannot see or access another organization's resources
- Machines are bound to a single organization
- Data is logically separated at the database level
- Audit logs are organization-specific

## Organization Structure

```
Organization
├── Admins
│   └── Full control over organization settings
├── Users
│   ├── Machine Admins
│   ├── Team Leads
│   ├── Developers
│   └── Viewers
├── Machines
│   ├── Production Servers
│   ├── Development Servers
│   └── Staging Servers
└── Settings
    ├── Authentication (OIDC)
    ├── Security Policies
    └── Integrations
```

## Organization Administration

### Creating an Organization

1. Sign up for VSAY Terminal
2. Click **"Create Organization"**
3. Enter organization details:
   - **Name**: Your organization's name
   - **Slug**: URL-friendly identifier (e.g., `acme-corp`)
   - **Industry**: For tailored recommendations
4. Complete setup wizard

### Organization Settings

Access organization settings:

1. Click your organization name in the top navigation
2. Select **"Organization Settings"**

#### General Settings

| Setting | Description |
|---------|-------------|
| **Name** | Display name of the organization |
| **Slug** | URL identifier |
| **Logo** | Custom logo for branding |
| **Timezone** | Default timezone for the organization |

#### Security Settings

| Setting | Description |
|---------|-------------|
| **Session Timeout** | Auto-logout after inactivity |
| **IP Allowlist** | Restrict access to specific IPs |
| **MFA Requirement** | Require MFA for all users |
| **Password Policy** | Minimum requirements for passwords |

## Organization Admins

### Admin Responsibilities

Organization admins have full control over:

- **User Management**: Invite, remove, and manage users
- **Machine Management**: Add, configure, and remove machines
- **Role Management**: Create and assign roles
- **Security Settings**: Configure authentication and security policies
- **Billing**: Manage subscription and payments
- **Audit Access**: View all organization activity

### Adding Admins

1. Go to **Team → Members**
2. Find the user to promote
3. Click **"Edit"**
4. Assign the **"Organization Admin"** role
5. Save changes

:::warning
Be cautious when granting admin access. Admins have full control including the ability to remove other admins.
:::

### Admin Best Practices

1. **Multiple Admins**: Have at least 2 admins to prevent lockout
2. **Dedicated Admin Account**: Consider a separate account for admin tasks
3. **Regular Review**: Audit admin access quarterly
4. **Document Changes**: Keep records of administrative actions

## Managing Users Within an Organization

### User Lifecycle

```
Invite → Pending → Active → (Suspended) → Removed
```

#### Inviting Users

1. Navigate to **Team → Members**
2. Click **"Invite Member"**
3. Enter email and select role
4. Send invitation

#### User States

| State | Description |
|-------|-------------|
| **Pending** | Invitation sent, not yet accepted |
| **Active** | User can access the organization |
| **Suspended** | Temporarily disabled access |
| **Removed** | No longer part of organization |

#### Suspending Users

Temporarily disable access without removing:

1. Find user in **Team → Members**
2. Click **"Suspend"**
3. User cannot access until reactivated

### Bulk User Management

For large teams:

1. Go to **Team → Bulk Actions**
2. Choose action:
   - **Import Users**: Upload CSV of users to invite
   - **Export Users**: Download user list
   - **Bulk Role Change**: Change roles for multiple users

## Machine Management

### Adding Machines

1. Navigate to **Machines**
2. Click **"Add Machine"**
3. Enter machine details:
   - Name, host, port
   - Authentication method
   - Description and tags
4. Configure access permissions
5. Save

### Machine Organization

Use tags and groups to organize machines:

- **Tags**: Label machines (e.g., `production`, `web-server`, `us-east`)
- **Groups**: Logical groupings for access control

### Machine Access

Control who can access each machine:

1. Go to **Machines → [Machine] → Access**
2. Add users or roles with access
3. Set access level (Full, Restricted, View Only)

## Cross-Organization Features

### Switching Organizations

If you belong to multiple organizations:

1. Click your organization name in the top navigation
2. Select **"Switch Organization"**
3. Choose the organization to switch to

### Organization Invitations

When invited to a new organization:

1. Check your email for the invitation
2. Click the invitation link
3. Accept or decline
4. If accepted, the organization appears in your switcher

## Organization Deletion

### Deleting an Organization

:::danger
Organization deletion is permanent and cannot be undone. All data including users, machines, logs, and settings will be permanently deleted.
:::

To delete an organization:

1. Go to **Organization Settings → Danger Zone**
2. Click **"Delete Organization"**
3. Type the organization name to confirm
4. Enter your password
5. Click **"Permanently Delete"**

### Before Deletion

- Export any data you need to keep
- Notify all organization members
- Cancel any active subscriptions
- Remove integrations

## Enterprise Features

### Multiple Organizations

Enterprise plans support managing multiple organizations:

- **Parent-Child Structure**: Create sub-organizations
- **Centralized Billing**: Single invoice for all organizations
- **Cross-Org Visibility**: Admins can view across organizations
- **Shared Resources**: Share machines between organizations

### Organization Policies

Set policies that apply across organizations:

- Security requirements
- Compliance settings
- Approved integrations
- User provisioning rules

## Best Practices

1. **Clear Naming**: Use descriptive organization names
2. **Role Documentation**: Document what each role is for
3. **Regular Audits**: Review users and permissions regularly
4. **Offboarding Process**: Have a checklist for removing users
5. **Backup Admins**: Always have multiple admins
6. **Environment Separation**: Consider separate orgs for prod/dev
7. **Compliance Alignment**: Configure settings to meet compliance needs
