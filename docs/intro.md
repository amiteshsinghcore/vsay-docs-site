---
sidebar_position: 1
---

# VSAY Terminal Documentation

:::info You are viewing Enterprise Edition - Version 1.1.0
This documentation covers all VSAY Terminal features including **OIDC/SSO Integration** (Keycloak) and **Multi-tenancy**.
For the free Community Edition, [switch to version 1.0.0](/docs/intro).
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
- **Session Recording** — Record and playback terminal sessions for compliance
- **Just-in-Time Access** — Grant temporary access with automatic expiration
- **Credential Vaulting** — Securely store and rotate SSH credentials

### Role-Based Access Control (RBAC)
- **Granular Permissions** — Define exactly who can access which machines
- **Custom Roles** — Create roles tailored to your organization's needs
- **Team Hierarchy** — Organize users into teams with inherited permissions
- **Machine-Level Policies** — Set access policies per machine or group

## All Features Included

### Core Features
- **Secure SSH Access:** Connect to your machines through encrypted tunnels with enterprise-grade security.
- **Web Terminal:** Connect to your machine from VSAY Terminal interface and run commands directly from your browser.
- **Team Collaboration:** Share access with team members safely based on Role Management.
- **Real-time Monitoring:** Track server health and performance with real-time updates.
- **Audit Logs:** Maintain compliance and security with detailed logs of all activities.

### Enterprise-Only Features
- **OIDC Integration:** Single Sign-On support via **Keycloak** with OIDC providers (Okta, Azure AD, Google, etc.) for seamless authentication.
- **MTLS Security:** Mutual TLS for certificate-based authentication.
- **Multi-tenancy:** Organization-based access control where each organization has its own admin to manage machines and users.

## Quick Links

- [Getting Started](/docs/next/getting-started) - Set up your first connection
- [SSH Access](/docs/next/features/ssh-access) - Learn about secure SSH connections
- [Web Terminal](/docs/next/features/web-terminal) - Use the browser-based terminal
- [Team Collaboration](/docs/next/features/team-collaboration) - Manage team access and roles

### Enterprise Features
- [OIDC Integration](/docs/next/authentication/oidc-integration) - Set up Single Sign-On with Keycloak
- [Organization Management](/docs/next/authentication/multi-tenancy) - Configure multi-tenancy

### API Reference
- [API Overview](/docs/next/api/overview) - Complete API documentation

## Products

- [VSAY Shell CLI](/docs/next/products/vsay-shell-cli) - Command-line interface for SSH management
- [VSAY VSCode Extension](/docs/next/products/vsay-vscode-extension) - Integrated IDE experience

## Why VSAY Terminal Enterprise?

VSAY Terminal Enterprise is designed for organizations that need:

1. **Full PAM Solution** - Complete privileged access management with session recording
2. **Enterprise RBAC** - Granular role-based access control for teams
3. **Zero-Trust Security** - Every connection verified with TLS/MTLS encryption
4. **Complete Visibility** - Know who accessed what and when with audit logs
5. **SSO/OIDC Support** - Integrate with Keycloak and your existing identity provider
6. **Multi-Organization** - Manage multiple teams and projects with isolated access
7. **Multi-Channel Access** - Web, CLI, VSCode Extension, and Agents
