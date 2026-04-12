---
sidebar_position: 5
---

# Audit Logs

WebXTerm maintains comprehensive audit logs of all activities, helping you meet compliance requirements and maintain security visibility.

## What's Logged

WebXTerm logs all significant activities across your organization:

### Session & Command Events

Every command typed in a terminal session is automatically captured and stored with full context:

| Field | Description |
|-------|-------------|
| **Machine** | Which machine the command was run on |
| **User** | Who executed the command |
| **Command** | The full command text |
| **Timestamp** | Exact time of execution |
| **Success** | Whether the command exited successfully (exit code 0) |
| **Source** | Which client was used — Web Terminal, Shell CLI, or VSCode Extension |

### Authentication Events

| Event | Details Captured |
|-------|------------------|
| **Login Success** | User, timestamp, IP address, authentication method |
| **Login Failure** | User (if known), timestamp, IP address, failure reason |
| **Logout** | User, timestamp, session duration |
| **Password Change** | User, timestamp |

### Administrative Events

| Event | Details Captured |
|-------|------------------|
| **Machine Registered** | User, machine hostname, OS, IP address |
| **Machine Deleted** | User, machine |
| **API Key Regenerated** | User, timestamp |
| **Role Changed** | Admin, user, old role, new role |

## Viewing Audit Logs

### Accessing Logs

1. Navigate to **Organization Settings → Audit Logs**
2. You'll see a chronological list of all events
3. Use filters to narrow down the results

### Filtering Options

Filter audit logs by:

- **Time Range**: Last hour, day, week, month, or custom range
- **Event Type**: Authentication, session, administrative
- **User**: Specific user's activities
- **Machine**: Events related to specific machines
- **Severity**: Info, warning, critical

### Search

Search through logs using:
- **Keywords**: Find specific text in log entries
- **User email**: All activities by a user
- **IP address**: All activities from an IP
- **Machine name**: All activities on a machine

## Log Details

Each command log entry contains:

```json
{
  "id": "68abc123def456",
  "machine_id": "68xyz789abc012",
  "machine_name": "production-web-01",
  "user_id": "68usr789abc012",
  "username": "johndoe",
  "command": "sudo systemctl restart nginx",
  "timestamp": "2026-02-06T14:30:22Z",
  "success": true
}
```

**Via the API:**

```bash
# Get command logs for a machine (last 100)
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  https://your-webxterm-instance.com/api/machines/{agent_id}/logs
```

See the [Machines API](/docs/api/machines) for the full response format.

:::info[Coming Soon]
**Log retention policies**, **automated exports** (S3/GCS), **SIEM integrations** (Splunk, Datadog, Elastic), and **alert rules** are on the roadmap and not yet available.
:::

## Best Practices

1. **Regular review**: Schedule weekly audit log reviews
2. **Access control**: Limit who can view audit logs
3. **Document incidents**: When investigating, document findings from the audit log
