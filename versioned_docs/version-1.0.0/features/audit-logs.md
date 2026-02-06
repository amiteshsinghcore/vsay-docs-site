---
sidebar_position: 5
---

# Audit Logs

VSAY Terminal maintains comprehensive audit logs of all activities, helping you meet compliance requirements and maintain security visibility.

## What's Logged

VSAY Terminal logs all significant activities across your organization:

### Authentication Events

| Event | Details Captured |
|-------|------------------|
| **Login Success** | User, timestamp, IP address, authentication method |
| **Login Failure** | User (if known), timestamp, IP address, failure reason |
| **Logout** | User, timestamp, session duration |
| **Password Change** | User, timestamp |
| **MFA Events** | Enrollment, verification, recovery |

### Session Events

| Event | Details Captured |
|-------|------------------|
| **Session Start** | User, machine, timestamp, source IP |
| **Session End** | User, machine, timestamp, duration, reason |
| **Command Executed** | User, machine, command, timestamp, exit code |
| **File Transfer** | User, machine, file path, direction, size |

### Administrative Events

| Event | Details Captured |
|-------|------------------|
| **User Invited** | Admin, invited user, roles assigned |
| **User Removed** | Admin, removed user |
| **Role Changed** | Admin, user, old role, new role |
| **Machine Added** | Admin, machine details |
| **Machine Modified** | Admin, machine, changes made |
| **Machine Deleted** | Admin, machine |
| **Settings Changed** | Admin, setting, old value, new value |

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

Click any log entry to see full details:

```json
{
  "event_id": "evt_abc123",
  "timestamp": "2024-01-15T14:30:22Z",
  "event_type": "session.command",
  "user": {
    "id": "usr_xyz789",
    "email": "developer@company.com",
    "name": "John Developer"
  },
  "machine": {
    "id": "mch_def456",
    "name": "production-web-01",
    "ip": "10.0.1.50"
  },
  "details": {
    "command": "sudo systemctl restart nginx",
    "exit_code": 0,
    "duration_ms": 1523
  },
  "context": {
    "session_id": "ses_ghi012",
    "source_ip": "203.0.113.50",
    "user_agent": "Mozilla/5.0..."
  }
}
```

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

Audit logs in VSAY Terminal are:

- **Append-only**: Logs cannot be modified or deleted
- **Tamper-evident**: Any tampering attempts are detected
- **Cryptographically signed**: Ensures log integrity

### Compliance Standards

VSAY Terminal audit logs help you comply with:

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

VSAY Terminal integrates with popular SIEM solutions:

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
