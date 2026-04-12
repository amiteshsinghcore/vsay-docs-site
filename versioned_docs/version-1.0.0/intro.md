---
sidebar_position: 2
sidebar_label: Documentation
---

# Webxterm Documentation

:::info[Community Edition]
This is the free Community Edition. For **OIDC/OAuth2 Login** (Microsoft, GitHub, Okta, Azure AD), **Keycloak Authentication**, and **Multi-tenancy**, [switch to the Enterprise Edition](https://docs.webxterm.me/docs/next/intro).
:::

WebXTerm is a full-fledged **Privileged Access Management (PAM)** and **Role-Based Access Control (RBAC)** solution that allows you to securely connect to your machines from anywhere. Install the lightweight `vsay-agent` on any machine and get instant access through the web, CLI, or your IDE — with complete audit trails, role-based access control, and real-time infrastructure monitoring. This documentation will guide you through all the features and help you get the most out of the platform.

![WebXTerm Dashboard](/img/dashboards/dashboards.jpeg)

## What Makes Us Different?

Unlike traditional PAM solutions, WebXTerm uses an **agent-based architecture** — install a lightweight agent on any machine and it connects outbound to the backend. No open ports, no SSH key management, no bastion hosts. Access your machines from anywhere through:

| Access Method | Description |
|:--------------|:------------|
| **Web Terminal** | Browser-based terminal access with full terminal capabilities |
| **WebXTerm VSCode Extension** | Manage and connect to machines directly from your IDE |
| **WebXTerm Shell CLI** | Command-line tool for terminal access and machine management |

## Features

| Feature | Status | Description |
|:--------|:------:|:------------|
| Secure Remote Access (Agent-Based) | ✅ | Connect via vsay-agent — no inbound ports needed |
| Web Terminal | ✅ | Browser-based terminal access powered by xterm.js |
| Team Collaboration (RBAC) | ✅ | Role-based access management with per-machine user lists |
| Real-time Monitoring | ✅ | CPU/memory/disk stats from agent heartbeats every 30s |
| Session & Command Recording | ✅ | All commands logged with user, timestamp, and exit code |
| Audit Logs | ✅ | Complete activity history across all machines |
| Community (Issue Tracker) | ✅ | Collaborative issue tracking for your team |
| TLS Encryption | ✅ | Secure data in transit between agent and backend |
| WebXTerm Shell CLI | ✅ | Command-line tool for terminal access and machine management |
| WebXTerm VSCode Extension | ✅ | Integrated IDE terminal, file browser, and port forwarding |
| API Access | ✅ | REST API for integrations and automation |
| MTLS (Mutual TLS) | ✅ | Certificate-based mutual authentication between agents and backend |

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
- **Secure Remote Access:** Connect to your machines through agent-based WebSocket tunneling — no inbound ports, no SSH key management.
- **Web Terminal:** Full browser-based terminal access powered by xterm.js — connect from anywhere with no local tools required.
- **Team Collaboration:** Share machine access with team members using role-based access control and per-machine allowed user lists.
- **Real-time Monitoring:** Live CPU, memory, disk, and network stats from every agent — plus online/offline status tracking.
- **Session & Command Recording:** Every command executed in a terminal session is logged with user, machine, timestamp, and exit code.
- **Audit Logs:** Complete activity history across all machines — who ran what, when, and from which client.
- **Community:** Built-in issue tracker for your team — create tickets, post solutions, and track infrastructure problems collaboratively.

### Authentication — Built-in JWT

WebXTerm Community Edition v1.0.0 uses its own **JWT-based authentication**. When you sign up or log in with email and password, credentials are hashed with bcrypt and stored in MongoDB. The backend issues a signed JWT (HS256) that is used for all API calls — no external identity provider required.

### Enterprise-Only Features
- **Keycloak Authentication:** Enterprise editions use Keycloak for credential storage and verification, enabling centralized user management.
- **External Identity Providers:** Sign in with Microsoft, GitHub, Okta, Azure AD via OIDC/OAuth2 (see [Enterprise Edition](https://docs.webxterm.me/docs/next/intro)).
- **Multi-tenancy:** Organization-based access control with isolated workspaces per organization.

## Quick Links

- [Getting Started](/docs/getting-started) - Install the agent and connect to your first machine
- [Secure Remote Access](/docs/features/ssh-access) - Learn how the agent-based architecture works
- [Web Terminal](/docs/features/web-terminal) - Use the browser-based terminal
- [Team Collaboration](/docs/features/team-collaboration) - Manage team access and roles
- [Session & Command Recording](/docs/features/audit-logs) - Audit logs and command history
- [Real-time Monitoring](/docs/features/monitoring) - Track machine health and activity

### Upgrade to Enterprise
- [OIDC/OAuth2 Login](https://docs.webxterm.me/docs/next/authentication/oidc-integration) - Set up Microsoft and GitHub login
- [Organization Management](https://docs.webxterm.me/docs/next/authentication/multi-tenancy) - Configure multi-tenancy

### API Reference
- [API Overview](/docs/api/overview) - Complete API documentation

## External Links

| Resource | URL |
|:---------|:----|
| **Website** | [webxterm.me](https://webxterm.me/) |
| **Community & Support** | [community.webxterm.me](https://community.webxterm.me/) |
| **Documentation** | [docs.webxterm.me](https://docs.webxterm.me/) |

## Products & Clients

| Product | Description |
|:--------|:------------|
| [WebXTerm Shell CLI](/docs/products/vsay-shell-cli) | Go CLI tool — `vsay-shell-cli connect <machine>` |
| [WebXTerm VSCode Extension](/docs/products/vsay-vscode-extension) | Integrated IDE terminal, file browser, and port forwarding |
| [WebXTerm Agent](/docs/getting-started) | Lightweight daemon installed on machines — the core of the system |

## Why Webxterm Terminal Enterprise?

WebXTerm Enterprise is designed for organizations that need:

1. **Full PAM Solution** - Complete privileged access management with agent-based access control
2. **Enterprise RBAC** - Granular role-based access control for teams
3. **Zero-Trust Security** - Every connection verified with TLS/MTLS encryption
4. **Complete Visibility** - Know who accessed what and when with audit logs
5. **SSO/OIDC Support** - Integrate with Keycloak and your existing identity provider
6. **Multi-Organization** - Manage multiple teams and projects with isolated access
7. **Multi-Channel Access** - Web Terminal, Shell CLI, and VSCode Extension
