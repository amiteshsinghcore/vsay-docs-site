---
sidebar_position: 7
---

# Roadmap

This page lists features that are planned or in progress for WebXTerm. Items marked as **In Progress** are actively being built. Items marked as **Planned** are on the roadmap but not yet started.

:::info
Current implemented features are documented throughout the rest of this documentation. This page covers what's coming next.
:::

## Authentication & Security

| Feature | Status | Description |
|:--------|:------:|:------------|
| IP Whitelisting | 🔵 Planned | Restrict machine or organization access to specific IP addresses or CIDR ranges |
| MFA Enforcement | 🔵 Planned | Require multi-factor authentication for all users or specific roles |
| Session Timeout | 🔵 Planned | Configurable inactivity timeout to automatically close idle terminal sessions |
| Concurrent Session Limits | 🔵 Planned | Limit how many active sessions a single user can have simultaneously |

## Session Recording & Audit

| Feature | Status | Description |
|:--------|:------:|:------------|
| Full Terminal Session Playback | 🟡 In Progress | Record and replay complete terminal sessions (full I/O stream), not just command history |
| Log Export (CSV / JSON / PDF) | 🔵 Planned | Manually export command logs and audit history to common formats |
| Automated Log Export | 🔵 Planned | Scheduled export to AWS S3, Google Cloud Storage, or SIEM solutions |
| SIEM Integration | 🔵 Planned | Direct integration with Splunk, Datadog, Elastic/ELK, and Azure Sentinel |
| Log Retention Policies | 🔵 Planned | Configurable retention periods (30 days, 90 days, 1 year, custom) with auto-archival |

## Team & Access Management

| Feature | Status | Description |
|:--------|:------:|:------------|
| User Invitations by Email | 🟡 In Progress | Invite team members to your organization by email with role pre-assignment |
| Granular Role System | 🔵 Planned | Additional built-in roles beyond admin/user — Team Lead, Developer, Viewer with per-permission control |
| Custom Roles | 🔵 Planned | Create organization-specific roles with a custom permission set |
| Access Groups | 🔵 Planned | Group users together and assign machine access to the whole group at once |

## Monitoring & Alerts

| Feature | Status | Description |
|:--------|:------:|:------------|
| Alerts & Notifications | 🟡 In Progress | Trigger alerts for machine offline, high resource usage, failed logins, and sensitive commands |
| Notification Channels | 🔵 Planned | Send alerts via Email, Slack, Webhook, and PagerDuty |
| Response Time Monitoring | 🔵 Planned | Track agent round-trip latency as a health metric |
| Custom Reports | 🔵 Planned | Generate usage, access, and security reports with custom time ranges and filters |
| Report Export | 🔵 Planned | Export reports as CSV, JSON, or PDF |

## Machine Management

| Feature | Status | Description |
|:--------|:------:|:------------|
| Machine Tags & Groups | 🔵 Planned | Tag machines (e.g., `production`, `staging`) and manage access by tag |
| Batch Command Execution | 🔵 Planned | Run a command across multiple machines simultaneously |
| Machine Health Thresholds | 🔵 Planned | Set CPU/memory/disk alert thresholds per machine |

## Enterprise & Organization

| Feature | Status | Description |
|:--------|:------:|:------------|
| Organization Admin Console | 🟡 In Progress | Full organization management UI — create orgs, manage members, view org-level audit logs |
| Cross-Organization Switching | 🔵 Planned | Users with access to multiple organizations can switch between them without re-logging in |
| Billing & Subscription Management | 🔵 Planned | Manage plan, seats, and payment from within the WebXTerm dashboard |

---

## Status Legend

| Symbol | Meaning |
|:------:|:--------|
| ✅ | Implemented — available now |
| 🟡 | In Progress — being actively built |
| 🔵 | Planned — on the roadmap |

---

:::tip[Suggest a Feature]
Have a feature request? Use the [Community issue tracker](/docs/next/features/community) to submit and vote on ideas.
:::
