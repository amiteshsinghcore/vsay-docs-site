---
sidebar_position: 3
---

# Team Collaboration

VSAY Terminal makes it easy to share access with team members safely through Role-Based Access Control (RBAC). Define exactly what permissions each team member should have when accessing machines.

## Role-Based Access Control

Every user in VSAY Terminal is assigned a role that determines what they can do across the platform.

### Built-in Roles

| Role | Description | Permissions |
|------|-------------|-------------|
| **Admin** | Full control — manage users, machines, and organization settings | All permissions |
| **User** | Standard access to machines they are explicitly granted access to | Connect to allowed machines, view own activity |

### Custom Roles

Create custom roles tailored to your organization's needs:

1. Go to **Organization Settings → Roles**
2. Click **"Create Role"**
3. Name the role and add a description
4. Select permissions from the available list
5. Save the role

## Managing Team Members

### Inviting New Members

1. Navigate to **Team → Members**
2. Click **"Invite Member"**
3. Enter the email address
4. Select the role(s) to assign
5. Optionally, select specific machines they can access
6. Click **"Send Invitation"**

The invited user will receive an email with instructions to join your organization.

### Assigning Roles

To change a user's role:

1. Go to **Team → Members**
2. Find the user and click **"Edit"**
3. Modify their assigned roles
4. Save changes

:::info
Role changes take effect immediately. The user may need to refresh their session to see updated permissions.
:::

### Removing Members

To remove a team member:

1. Go to **Team → Members**
2. Find the user and click **"Remove"**
3. Confirm the removal

The user will immediately lose access to all organization resources.

## Machine Access Control

### Allowed Users per Machine

Each machine has an `allowed_users` list that controls exactly which team members can connect to it. This gives you fine-grained control beyond role-level permissions.

1. Go to **Machines → [Select Machine] → Access**
2. Click **"Add User"**
3. Select the user to grant access

To revoke access, remove the user from the machine's allowed list.

### Command Restrictions

When installing the `vsay-agent` on a machine, you can restrict what commands are allowed in terminal sessions:

```bash
sudo vsay-agent configure \
  --token YOUR_API_KEY \
  --host http://your-vsay-instance.com:8080 \
  --linux-user ubuntu \
  --allow-sudo    # Grant sudo access in sessions
```

The backend can also push configuration updates to the agent to update allowed/blocked commands without restarting the agent.

## Permission Reference

### Organization Permissions

| Permission | Description |
|------------|-------------|
| `org:admin` | Full organization admin access |
| `org:settings` | Modify organization settings |
| `org:billing` | Access billing and subscription |
| `org:audit` | View audit logs |

### User Permissions

| Permission | Description |
|------------|-------------|
| `users:view` | View team member list |
| `users:invite` | Invite new members |
| `users:edit` | Edit member details and roles |
| `users:remove` | Remove members from organization |

### Machine Permissions

| Permission | Description |
|------------|-------------|
| `machines:view` | View machine list |
| `machines:add` | Add new machines |
| `machines:edit` | Edit machine configuration |
| `machines:delete` | Remove machines |
| `machines:connect` | Connect to machines (also requires machine-level access) |

## Best Practices

1. **Principle of Least Privilege**: Give users only the access they need
2. **Use Groups**: Manage access through groups rather than individual assignments
3. **Regular Audits**: Periodically review who has access to what
4. **Offboarding Process**: Immediately remove access when team members leave
5. **Document Roles**: Keep documentation of what each custom role is for
6. **Separate Environments**: Use different roles for production vs development access
