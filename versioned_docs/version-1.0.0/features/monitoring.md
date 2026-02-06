---
sidebar_position: 4
---

# Real-time Monitoring

VSAY Terminal provides comprehensive real-time monitoring capabilities to track server health, performance, and user activity across all your machines.

## Overview Dashboard

The monitoring dashboard gives you a bird's-eye view of your infrastructure:

- **Active Sessions**: See who's currently connected to which machines
- **Server Health**: Quick status indicators for all machines
- **Recent Activity**: Latest commands and actions across the organization
- **Alerts**: Any issues requiring attention

## Server Health Monitoring

### Health Metrics

VSAY Terminal monitors key health indicators for each machine:

| Metric | Description |
|--------|-------------|
| **Connection Status** | Whether the machine is reachable |
| **Response Time** | Latency to the machine |
| **CPU Usage** | Current processor utilization |
| **Memory Usage** | RAM utilization |
| **Disk Usage** | Storage utilization |
| **Uptime** | How long the machine has been running |

### Health Checks

Configure automated health checks:

1. Go to **Machines → [Select Machine] → Monitoring**
2. Enable **Health Checks**
3. Configure check interval (e.g., every 5 minutes)
4. Set threshold alerts (e.g., alert when CPU > 90%)

### Status Indicators

- 🟢 **Healthy**: All metrics within normal range
- 🟡 **Warning**: Some metrics approaching thresholds
- 🔴 **Critical**: Machine unreachable or metrics exceeded thresholds

## Command Monitoring

### Real-time Command Logs

See commands as they're executed across your infrastructure:

1. Navigate to **Monitoring → Command Logs**
2. View the real-time stream of commands
3. Filter by:
   - **User**: See commands from specific users
   - **Machine**: Focus on a particular server
   - **Time Range**: Look at specific periods
   - **Command Pattern**: Search for specific commands

### Command Details

Each command log entry includes:

- **Timestamp**: When the command was executed
- **User**: Who ran the command
- **Machine**: Which server it was run on
- **Command**: The full command text
- **Exit Code**: Success or failure indicator
- **Duration**: How long the command took

:::info
Command logging respects your organization's privacy settings. Sensitive commands can be masked or excluded from logs.
:::

## User Activity Tracking

### Active Sessions

Monitor who's currently connected:

1. Go to **Monitoring → Active Sessions**
2. See all current connections with:
   - User name
   - Machine connected to
   - Session start time
   - Session duration
   - Connection source IP

### Session Actions

Organization admins can:

- **View**: Watch the session in read-only mode
- **Message**: Send a message to the user
- **Terminate**: End the session immediately (emergency use only)

## Alerts and Notifications

### Setting Up Alerts

Configure alerts for important events:

1. Go to **Organization Settings → Alerts**
2. Click **"Create Alert"**
3. Configure the alert:
   - **Trigger**: What event triggers the alert
   - **Conditions**: Any filters or thresholds
   - **Recipients**: Who should be notified
   - **Channels**: Email, Slack, webhook, etc.

### Alert Types

| Alert Type | Description |
|------------|-------------|
| **Machine Offline** | A machine becomes unreachable |
| **High Resource Usage** | CPU/Memory/Disk exceeds threshold |
| **Failed Login** | Unsuccessful authentication attempts |
| **Sensitive Command** | Specific commands are executed |
| **New Session** | User starts a new connection |
| **After Hours Access** | Connections outside business hours |

### Notification Channels

VSAY Terminal can send alerts through:

- **Email**: Direct to inbox
- **Slack**: Post to a channel or DM
- **Webhook**: Send to any HTTP endpoint
- **PagerDuty**: Integrate with incident management

## Reports

### Built-in Reports

Generate reports for analysis and compliance:

- **Usage Report**: Session counts and durations by user/machine
- **Command Report**: Most common commands, failed commands
- **Access Report**: Who accessed what and when
- **Security Report**: Failed attempts, unusual activity

### Custom Reports

Create custom reports:

1. Go to **Monitoring → Reports**
2. Click **"Create Report"**
3. Select metrics and filters
4. Set the time range
5. Generate or schedule the report

### Exporting Data

Export monitoring data for external analysis:

- **CSV**: For spreadsheet analysis
- **JSON**: For programmatic processing
- **PDF**: For sharing and archiving

## Best Practices

1. **Set meaningful alerts**: Don't alert on everything - focus on actionable items
2. **Regular review**: Check dashboards daily, review reports weekly
3. **Baseline metrics**: Understand normal patterns to detect anomalies
4. **Retention policy**: Define how long to keep detailed logs
5. **Privacy balance**: Monitor enough for security without invading privacy
