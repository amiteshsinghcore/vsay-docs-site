---
sidebar_position: 4
---

# Real-time Monitoring

WebXTerm provides comprehensive real-time monitoring capabilities to track server health, performance, and user activity across all your machines.

## Overview Dashboard

The monitoring dashboard gives you a bird's-eye view of your infrastructure:

- **Active Sessions**: See who's currently connected to which machines
- **Server Health**: Quick status indicators for all machines
- **Recent Activity**: Latest commands and actions across the organization
- **Alerts**: Any issues requiring attention

## Server Health Monitoring

### Health Metrics

The `vsay-agent` sends a heartbeat every 30 seconds containing live system statistics. These are displayed in real time on the machine detail page and the dashboard.

| Metric | Description | Source |
|--------|-------------|--------|
| **Connection Status** | Online / Offline — based on last heartbeat | Agent heartbeat |
| **CPU Usage (%)** | Current processor utilization | Agent heartbeat |
| **Memory Usage (%)** | RAM utilization | Agent heartbeat |
| **Disk Usage (%)** | Storage utilization | Agent heartbeat |
| **Network Inbound** | Inbound network throughput (MB/s) | Agent heartbeat |
| **Network Outbound** | Outbound network throughput (MB/s) | Agent heartbeat |
| **Uptime** | Seconds since the machine last booted | Agent heartbeat |

### Offline Detection

A background reconciler checks all machines every minute. If a machine has not sent a heartbeat within the **offline timeout** (default: 2 minutes), its status is automatically set to **Offline**. The machine returns to **Online** as soon as the agent reconnects and sends a heartbeat.

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
- **User**: Who ran the command (username)
- **Machine**: Which server it was run on
- **Command**: The full command text
- **Success**: Whether the command exited successfully (exit code 0)
- **Source**: Which client the session came from (`ui`, `cli`, or `vscode`)

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

- **Terminate**: End an active session immediately via the Sessions panel or the API (`DELETE /api/terminal/sessions/:session_id`)

## Alerts and Notifications

:::
Alerts and notification channels (Email, Slack, Webhook, PagerDuty) are on the [roadmap](/docs/next/roadmap). Currently, machine offline detection happens automatically via the reconciler — machines are marked offline if no heartbeat is received within 2 minutes.
:::

## Reports and Export

:::
Log export (CSV/JSON/PDF), custom reports, and SIEM integrations are on the [roadmap](/docs/next/roadmap). Currently, all command history and session data is available via the Audit Logs page and the REST API.
:::

## Best Practices

1. **Set meaningful alerts**: Don't alert on everything - focus on actionable items
2. **Regular review**: Check dashboards daily, review reports weekly
3. **Baseline metrics**: Understand normal patterns to detect anomalies
4. **Retention policy**: Define how long to keep detailed logs
5. **Privacy balance**: Monitor enough for security without invading privacy
