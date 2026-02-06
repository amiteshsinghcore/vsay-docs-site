---
sidebar_position: 3
---

# Team Collaboration

VSAY Terminal makes it easy to share access with team members safely through Role-Based Access Control (RBAC). Define exactly what permissions each team member should have when accessing machines.

## Role-Based Access Control

Every user in your organization is assigned one or more roles that determine what they can do.

### Built-in Roles

| Role | Description | Permissions |
|------|-------------|-------------|
| **Organization Admin** | Full control over the organization | All permissions |
| **Machine Admin** | Manage machines and connections | Add/edit/delete machines, connect to all machines |
| **Team Lead** | Manage team members and moderate access | View users, assign roles to team members, connect to assigned machines |
| **Developer** | Standard access to assigned machines | Connect to assigned machines, view own activity |
| **Viewer** | Read-only access | View machine list, view own activity |

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

### Assigning Machine Access

Not all users need access to all machines. Control access at the machine level:

1. Go to **Machines → [Select Machine] → Access**
2. Click **"Add User"** or **"Add Role"**
3. Select users or roles to grant access
4. Set the access level:
   - **Full Access**: Can connect and run any command
   - **Restricted**: Limited command execution (if configured)
   - **View Only**: Can see machine status but cannot connect

### Access Groups

Create access groups for easier management:

1. Go to **Team → Access Groups**
2. Click **"Create Group"**
3. Name the group (e.g., "Production Servers Team")
4. Add users to the group
5. Assign machines to the group

Now you can manage access for multiple users at once by modifying group membership.

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
