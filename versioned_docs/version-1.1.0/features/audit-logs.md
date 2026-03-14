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

See the [Machines API](/docs/next/api/machines) for the full response format.

## Compliance Features

### Retention Policies

Configure how long logs are retained:

1. Go to **Organization Settings → Compliance**
2. Set **Log Retention Period**:
   - 30 days (default)
   - 90 days
   - 1 year
   - Custom (up to 7 years)

:::warning
Check your industry's compliance requirements before setting retention periods. Some regulations require minimum retention periods.
:::

### Immutability

Audit logs in WebXTerm are:

- **Append-only**: Logs cannot be modified or deleted
- **Tamper-evident**: Any tampering attempts are detected
- **Cryptographically signed**: Ensures log integrity

### Compliance Standards

WebXTerm audit logs help you comply with:

- **SOC 2 Type II**: Comprehensive activity logging
- **HIPAA**: Protected health information access tracking
- **GDPR**: User activity and data access records
- **PCI DSS**: Cardholder data environment access logs
- **ISO 27001**: Information security event logging

## Exporting Logs

### Manual Export

1. Navigate to **Audit Logs**
2. Apply desired filters
3. Click **"Export"**
4. Choose format:
   - **CSV**: For spreadsheet analysis
   - **JSON**: For programmatic processing
   - **PDF**: For formal reporting

### Automated Export

Set up automated log exports:

1. Go to **Organization Settings → Integrations**
2. Configure a **Log Export**:
   - **S3 Bucket**: Export to AWS S3
   - **GCS Bucket**: Export to Google Cloud Storage
   - **SIEM**: Send to your SIEM solution

### SIEM Integration

WebXTerm integrates with popular SIEM solutions:

- **Splunk**: Direct integration or via HEC
- **Datadog**: Log forwarding integration
- **Elastic/ELK**: Logstash or direct API
- **Azure Sentinel**: Webhook integration

## Alerts on Audit Events

Create alerts for specific audit events:

1. Go to **Organization Settings → Alerts**
2. Click **"Create Alert"**
3. Select audit event triggers:
   - Failed login attempts
   - Privilege escalation (sudo)
   - After-hours access
   - Access to sensitive machines
   - Unusual command patterns

## Best Practices

1. **Regular review**: Schedule weekly audit log reviews
2. **Set up alerts**: Don't rely solely on manual review
3. **Export to SIEM**: Centralize logs for correlation
4. **Retention compliance**: Ensure retention meets regulatory requirements
5. **Access control**: Limit who can view audit logs
6. **Document incidents**: When investigating, document findings
7. **Test your exports**: Verify automated exports are working
