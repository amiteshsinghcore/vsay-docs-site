---
sidebar_position: 1
---

# VSAY Terminal Documentation

:::info You are viewing Enterprise Edition - Version 1.1.0
This documentation covers VSAY Terminal Enterprise v1.1.0 features including **Multi-tenancy** and **Mutual TLS**.
For the free Community Edition, [switch to version 1.0.0](/docs/intro). For **OIDC/SSO** (Okta, GitHub, Microsoft), [see Enterprise v1.2.0](/docs/next/intro).
:::

VSAY Terminal is a full-fledged **Privileged Access Management (PAM)** and **Role-Based Access Control (RBAC)** solution that allows you to securely connect to your Linux machines from anywhere. Install the lightweight `vsay-agent` on any machine and get instant access through the web, CLI, or your IDE — with complete audit trails, role-based access control, and real-time infrastructure monitoring.

![VSAY Terminal Dashboard](/img/dashboards/dashboards.jpeg)

## What Makes Us Different?

Unlike traditional PAM solutions, VSAY Terminal uses an **agent-based architecture** — install a lightweight agent on any Linux machine and it connects outbound to the backend. No open ports, no SSH key management, no bastion hosts. Access your machines from anywhere through:

| Access Method | Description |
|:--------------|:------------|
| **Web Terminal** | Browser-based terminal access with full terminal capabilities |
| **VSAY VSCode Extension** | Manage and connect to machines directly from your IDE |
| **VSAY Shell CLI** | Command-line tool for terminal access and machine management |

## Feature Comparison

| Feature | Community | Enterprise v1.1.0 |
|:--------|:---------:|:-----------------:|
| Secure Remote Access (Agent-Based) | ✅ | ✅ |
| Web Terminal | ✅ | ✅ |
| Team Collaboration (RBAC) | ✅ | ✅ |
| Real-time Monitoring | ✅ | ✅ |
| Session & Command Recording | ✅ | ✅ |
| Audit Logs | ✅ | ✅ |
| Community (Issue Tracker) | ✅ | ✅ |
| TLS Encryption | ✅ | ✅ |
| VSAY Shell CLI | ✅ | ✅ |
| VSAY VSCode Extension | ✅ | ✅ |
| API Access | ✅ | ✅ |
| Keycloak Authentication | ✅ | ✅ |
| MTLS (Mutual TLS) | ❌ | ✅ |
| Multi-tenancy (Organizations) | ❌ | ✅ |
| Organization API | ❌ | ✅ |
| Priority Support | ❌ | ✅ |
| External SSO (Okta, GitHub, Microsoft…) | ❌ | ❌ — [Available in v1.2.0](/docs/next/authentication/oidc-integration) |

## PAM & RBAC Capabilities

### Privileged Access Management (PAM)
- **Centralized Control** — Manage all machine connections from a single dashboard
- **Agent-Based Access** — Lightweight `vsay-agent` on each machine; outbound-only connection, no inbound firewall rules needed
- **Session & Command Recording** — Every command executed in a terminal session is recorded with user, timestamp, and exit code
- **Machine Monitoring** — Real-time CPU, memory, and disk stats reported via agent heartbeats every 30 seconds
- **Offline Detection** — Machines are automatically marked offline if the agent stops heartbeating

### Role-Based Access Control (RBAC)
- **Granular Permissions** — Define exactly who can access which machines
- **User Roles** — Assign roles (admin / user) to control what each team member can do
- **Machine-Level Access Control** — Restrict which users are allowed to connect to a specific machine
- **Machine-Level Policies** — Set command restrictions and sudo access per machine via agent config

## All Features Included

### Core Features
- **Secure Remote Access:** Connect to your Linux machines through agent-based WebSocket tunneling — no inbound ports, no SSH key management.
- **Web Terminal:** Full browser-based terminal access powered by xterm.js — connect from anywhere with no local tools required.
- **Team Collaboration:** Share machine access with team members using role-based access control and per-machine allowed user lists.
- **Real-time Monitoring:** Live CPU, memory, disk, and network stats from every agent — plus online/offline status tracking.
- **Session & Command Recording:** Every command executed in a terminal session is logged with user, machine, timestamp, and exit code.
- **Audit Logs:** Complete activity history across all machines — who ran what, when, and from which client.
- **Community:** Built-in issue tracker for your team — create tickets, post solutions, and track infrastructure problems collaboratively.

### Authentication — Keycloak

VSAY Terminal v1.1.0 uses **Keycloak** for authentication in both editions:

- **Community**: Keycloak manages email/password users directly
- **Enterprise v1.1.0**: Same Keycloak email/password — plus MTLS and multi-tenancy

:::tip OIDC/SSO Available in v1.2.0
External identity providers (Okta, Microsoft, GitHub, Azure AD) are available in **Enterprise v1.2.0**. [Upgrade to v1.2.0](/docs/next/intro) to enable SSO.
:::

### Enterprise v1.1.0 Features
- **MTLS Security:** Mutual TLS for certificate-based authentication between agents and backend.
- **Multi-tenancy:** Organization-based access control where each organization has its own admin to manage machines and users.

## Quick Links

- [Getting Started](/docs/1.1.0/getting-started) - Install the agent and connect to your first machine
- [Secure Remote Access](/docs/1.1.0/features/ssh-access) - Learn how the agent-based architecture works
- [Web Terminal](/docs/1.1.0/features/web-terminal) - Use the browser-based terminal
- [Team Collaboration](/docs/1.1.0/features/team-collaboration) - Manage team access and roles
- [Session & Command Recording](/docs/1.1.0/features/audit-logs) - Audit logs and command history
- [Real-time Monitoring](/docs/1.1.0/features/monitoring) - Track machine health and activity

### Enterprise Features
- [Organization Management](/docs/1.1.0/authentication/multi-tenancy) - Configure multi-tenancy

### API Reference
- [API Overview](/docs/1.1.0/api/overview) - Complete API documentation

## Products & Clients

| Product | Description |
|:--------|:------------|
| [VSAY Shell CLI](/docs/1.1.0/products/vsay-shell-cli) | Go CLI tool — `vsay-shell-cli connect <machine>` |
| [VSAY VSCode Extension](/docs/1.1.0/products/vsay-vscode-extension) | Integrated IDE terminal, file browser, and port forwarding |
| [VSAY Agent](/docs/1.1.0/getting-started) | Lightweight daemon installed on Linux machines — the core of the system |

## Why VSAY Terminal Enterprise?

VSAY Terminal Enterprise is designed for organizations that need:

1. **Full PAM Solution** - Complete privileged access management with agent-based access control
2. **Enterprise RBAC** - Granular role-based access control for teams
3. **Zero-Trust Security** - Every connection verified with TLS/MTLS encryption
4. **Complete Visibility** - Know who accessed what and when with audit logs
5. **Multi-Organization** - Manage multiple teams and projects with isolated access
6. **Multi-Channel Access** - Web Terminal, Shell CLI, and VSCode Extension
