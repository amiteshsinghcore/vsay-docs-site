---
sidebar_position: 2
---

# Getting Started

This guide will help you set up WebXTerm and connect to your first machine.

## Prerequisites

Before you begin, ensure you have:

- An active WebXTerm account
- At least one server/machine you want to connect to
- Admin access to your organization (for initial setup)

## Step 1: Sign Up or Login

![Login Page](/img/login/login-page.png)

1. Navigate to the WebXTerm login page
2. Enter your email and password
3. Click **"Sign In"**

:::note Powered by Keycloak
WebXTerm uses **Keycloak** as its identity platform. When you sign up or log in with email and password, your credentials are managed by Keycloak. This gives you enterprise-grade password security, session management, and account control — even in the Community Edition.
:::

:::info Enterprise Feature
Signing in with **Microsoft, GitHub, Okta, Azure AD**, or any other external provider is available in the **Enterprise Edition** — also powered by Keycloak as an identity broker. [Learn more](/docs/next/authentication/oidc-integration).
:::

## Step 2: Get Your API Key

After signing in, navigate to your **Profile** page to find your **API Key**. You'll need this to register the WebXTerm Agent on your machines.

![Profile Page](/img/create-account/create-page.png)

- Go to **Profile** in the top-right menu
- Copy your **API Key** — this is what authenticates the agent with your account

:::tip
If your API key is ever compromised, you can regenerate it from the Profile page. Note that regenerating it will disconnect all agents using the old key.
:::

## Step 3: Install & Register the Agent on Your Machine

WebXTerm works by installing a lightweight agent (`vsay-agent`) on the Linux machine you want to access. The agent connects back to the WebXTerm backend over gRPC — no inbound firewall rules required.

![Machines Page](/img/mechines/machines.jpeg)

### Install the Agent

Download and install `vsay-agent` on your Linux machine:

```bash
# Download the latest release for your architecture (amd64 example)
curl -LO https://releases.vsayterminal.com/vsay-agent/latest/vsay-agent-linux-amd64.tar.gz
tar -xzf vsay-agent-linux-amd64.tar.gz
sudo mv vsay-agent /usr/local/bin/
```

Or install via the DEB package (Debian/Ubuntu):

```bash
sudo dpkg -i vsay-agent_amd64.deb
```

### Configure the Agent

Run the configure command with your API key and the WebXTerm backend URL:

```bash
sudo vsay-agent configure \
  --token YOUR_API_KEY \
  --host http://your-webxterm-instance.com:8080 \
  --linux-user ubuntu
```

| Flag | Description |
|:-----|:------------|
| `--token` | Your API key from the Profile page |
| `--host` | URL of your WebXTerm backend |
| `--linux-user` | The Linux user that terminal sessions will run as |
| `--allow-sudo` | (Optional) Allow sudo commands in terminal sessions |

This command will:
1. Save the configuration to `/etc/vsay/agent.yaml`
2. Install and start a **systemd service** (`vsay-agent.service`) that auto-starts on boot

### Verify the Agent is Running

```bash
systemctl status vsay-agent
```

Once the agent starts, it registers itself with the backend and your machine will appear in the **Machines** dashboard within seconds.

## Step 4: Connect to Your Machine

Once your machine appears in the dashboard:

1. Go to the **Machines** list
2. Find your machine — it should show **Online** status
3. Click **"Connect"**
4. The Web Terminal opens and you're connected directly to your machine

## Next Steps

Now that you're connected, explore more features:

- [Team Collaboration](/docs/features/team-collaboration) - Add team members and assign roles, restrict machine access per user
- [Real-time Monitoring](/docs/features/monitoring) - Track server health, CPU/memory/disk stats from agent heartbeats
- [Audit Logs](/docs/features/audit-logs) - Review command history and session activity
- [Community](/docs/features/community) - Use the built-in issue tracker to report and track infrastructure problems

## Community Edition Features

| Feature | Status | Description |
|:--------|:------:|:------------|
| Secure Remote Access (Agent-Based) | ✅ | Connect via vsay-agent — no inbound ports needed |
| Web Terminal | ✅ | Browser-based terminal access |
| Team Collaboration (RBAC) | ✅ | Role-based access management |
| Real-time Monitoring | ✅ | CPU/memory/disk stats from agent heartbeats |
| Session & Command Recording | ✅ | All commands logged with user, timestamp, and exit code |
| Audit Logs | ✅ | Complete command and activity history |
| Community (Issue Tracker) | ✅ | Collaborative issue tracking for your team |
| TLS Encryption | ✅ | Secure data in transit |
| WebXTerm Shell CLI | ✅ | Command-line tool for terminal access |
| WebXTerm VSCode Extension | ✅ | IDE integration |
| API Access | ✅ | REST API for integrations |
| Keycloak Authentication | ✅ | Email/password login managed by Keycloak |
| MTLS (Mutual TLS) | ❌ | Enterprise only |
| External SSO (Microsoft, GitHub, Okta, Azure AD…) | ❌ | Enterprise only — federated via Keycloak |
| Multi-tenancy (Organizations) | ❌ | Enterprise only |
| Priority Support | ❌ | Enterprise only |

:::tip Upgrade to Enterprise
Need SSO with Keycloak, Okta, or Azure AD? Need Mutual TLS or multi-organization support? [See the Enterprise Edition](/docs/next/intro).
:::
