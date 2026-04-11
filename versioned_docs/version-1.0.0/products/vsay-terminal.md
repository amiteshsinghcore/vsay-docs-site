---
sidebar_position: 1
---

# WebXTerm (Web Dashboard)

WebXTerm is the **web-based dashboard** — the primary interface for managing your machines, connecting via browser terminal, monitoring server health, and collaborating with your team.

## Overview

The web dashboard provides:

- **Machines dashboard** — see all registered machines with online/offline status and real-time health metrics
- **Web Terminal** — browser-based terminal sessions powered by xterm.js, no local tools required
- **Team management** — invite members, assign roles, and control per-machine access
- **Audit logs** — full command and session history across all machines
- **Community** — built-in issue tracker for your infrastructure team (available in all editions)
- **Profile & API key** — manage your account and generate agent registration keys

## Accessing the Dashboard

Navigate to your WebXTerm instance in any modern browser:

```
http://your-webxterm-instance.com
```

### Login

Enter your email and password on the login page. Community Edition uses its own built-in authentication — credentials are hashed with bcrypt and stored securely.

:::
Sign in with external providers (Microsoft, GitHub, Okta, Azure AD) is available in [Enterprise Edition](/docs/next/authentication/oidc-integration).
:::

## Dashboard Pages

### Machines

The Machines page lists all registered agents:

| Column | Description |
|:-------|:------------|
| **Name** | Machine display name |
| **Status** | Online / Offline (based on agent heartbeat) |
| **CPU / Memory / Disk** | Live stats from the last agent heartbeat |
| **Connect** | Opens a Web Terminal session |

Click **"Connect"** on any online machine to open a full terminal session in the browser.

### Web Terminal

The browser terminal is powered by **xterm.js** and connects over WebSocket to the `vsay-agent` running on the machine:

```
Browser  →  WebSocket (wss://)  →  WebXTerm Backend  →  gRPC stream  →  vsay-agent  →  PTY shell
```

- Full color and Unicode support
- Copy/paste works natively
- All commands are logged to the audit log with user, timestamp, and exit code

### Add Machine

Register a new machine to your dashboard:

1. Go to **Machines → Add Machine**
2. Copy the displayed install command
3. Run it on your server to install and configure `vsay-agent`
4. The machine appears in your dashboard within seconds

### Profile

The Profile page shows your account details and your **API Key** — used to register `vsay-agent` on machines.

:::tip
If your API key is compromised, regenerate it from the Profile page. All agents using the old key will disconnect and need to be reconfigured.
:::

### Community

The Community page is the built-in issue tracker for your team — create tickets, post solutions, and track infrastructure problems collaboratively. [Learn more →](/docs/features/community)

## Supported Browsers

| Browser | Support |
|:--------|:-------:|
| Chrome / Chromium | ✅ |
| Firefox | ✅ |
| Safari | ✅ |
| Edge | ✅ |

## External Links

| Resource | URL |
|:---------|:----|
| **Website** | [webxterm.me](https://webxterm.me/) |
| **Community & Support** | [community.webxterm.me](https://community.webxterm.me/) |
| **Documentation** | [docs.webxterm.me](https://docs.webxterm.me/) |

## Community vs Enterprise

| Feature | Community | Enterprise |
|:--------|:---------:|:----------:|
| Machines dashboard | ✅ | ✅ |
| Web Terminal | ✅ | ✅ |
| Team management (RBAC) | ✅ | ✅ |
| Audit logs | ✅ | ✅ |
| Community (Issue Tracker) | ✅ | ✅ |
| Real-time monitoring | ✅ | ✅ |
| OIDC/OAuth2 Login | ❌ | ✅ |
| Multi-tenancy (Organizations) | ❌ | ✅ |
