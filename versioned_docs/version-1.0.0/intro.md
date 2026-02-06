---
sidebar_position: 1
---

# VSAY Terminal Documentation

:::info You are viewing Community Edition - Version 1.0.0
This is the free Community Edition with core PAM & RBAC features.
For **OIDC/SSO Integration** (Keycloak) and **Multi-tenancy**, [upgrade to Enterprise Edition (v1.1.0)](/docs/next/intro).
:::

VSAY Terminal is a full-fledged **Privileged Access Management (PAM)** and **Role-Based Access Control (RBAC)** solution that allows you to securely connect to your servers and machines from anywhere. This documentation will guide you through all the features and help you get the most out of the platform.

![VSAY Terminal Dashboard](/img/dashboards/dashboards.jpeg)

## What Makes Us Different?

Unlike traditional PAM solutions, VSAY Terminal brings privileged access management directly into your workflow with **multi-channel accessibility**:

| Access Method | Description |
|:--------------|:------------|
| **Web Terminal** | Browser-based SSH access with full terminal capabilities |
| **VSAY VSCode Extension** | Manage and connect to servers directly from your IDE |
| **VSAY Shell CLI** | Command-line tool for automation and scripting |
| **Agent-Based Access** | Deploy agents for seamless, secure connections |

## Feature Comparison

| Feature | Community | Enterprise |
|:--------|:---------:|:----------:|
| Secure SSH Access | ✅ | ✅ |
| Web Terminal | ✅ | ✅ |
| Team Collaboration (RBAC) | ✅ | ✅ |
| Real-time Monitoring | ✅ | ✅ |
| Audit Logs | ✅ | ✅ |
| TLS Encryption | ✅ | ✅ |
| VSAY Shell CLI | ✅ | ✅ |
| VSAY VSCode Extension | ✅ | ✅ |
| API Access | ✅ | ✅ |
| MTLS (Mutual TLS) | ❌ | ✅ |
| OIDC/SSO (Keycloak) | ❌ | ✅ |
| Multi-tenancy (Organizations) | ❌ | ✅ |
| Organization API | ❌ | ✅ |
| Priority Support | ❌ | ✅ |

## PAM & RBAC Capabilities

### Privileged Access Management (PAM)
- **Centralized Control** — Manage all SSH connections from a single dashboard
- **Session Monitoring** — Track active sessions in real-time
- **Credential Management** — Securely store SSH credentials
- **Access Policies** — Define who can access which machines

### Role-Based Access Control (RBAC)
- **Granular Permissions** — Define exactly who can access which machines
- **Custom Roles** — Create roles tailored to your team's needs
- **Team Management** — Organize users into teams with permissions
- **Machine-Level Policies** — Set access policies per machine

:::tip Upgrade to Enterprise
Looking for **Session Recording**, **OIDC/SSO with Keycloak**, **MTLS**, and **Multi-tenancy**?
[Upgrade to Enterprise Edition](/docs/next/intro) for advanced PAM features.
:::

## Community Features

- **Secure SSH Access:** Connect to your machines through encrypted tunnels with TLS security.
- **Web Terminal:** Connect to your machine from VSAY Terminal interface and run commands directly from your browser.
- **Team Collaboration:** Share access with team members safely based on Role Management.
- **Real-time Monitoring:** Track server health and performance with real-time updates.
- **Audit Logs:** Maintain compliance and security with detailed logs of all activities.

## Quick Links

- [Getting Started](/docs/getting-started) - Set up your first connection
- [SSH Access](/docs/features/ssh-access) - Learn about secure SSH connections
- [Web Terminal](/docs/features/web-terminal) - Use the browser-based terminal
- [Team Collaboration](/docs/features/team-collaboration) - Manage team access and roles

### API Reference
- [API Overview](/docs/api/overview) - Complete API documentation

## Products

- [VSAY Shell CLI](/docs/products/vsay-shell-cli) - Command-line interface for SSH management
- [VSAY VSCode Extension](/docs/products/vsay-vscode-extension) - Integrated IDE experience

## Why VSAY Terminal?

VSAY Terminal simplifies privileged access management for teams of all sizes:

1. **Full PAM Solution** - Centralized privileged access management
2. **Built-in RBAC** - Role-based access control for teams
3. **Zero-Trust Security** - Every connection verified with TLS encryption
4. **Complete Visibility** - Know who accessed what and when
5. **Easy Onboarding** - Add new team members in minutes
6. **Multi-Channel Access** - Web, CLI, VSCode Extension, and Agents
