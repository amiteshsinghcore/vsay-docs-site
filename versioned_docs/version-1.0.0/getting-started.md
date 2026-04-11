---
sidebar_position: 1
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

:::
WebXTerm Community Edition uses its own built-in JWT authentication. Your email and password are hashed with bcrypt and stored securely — no external identity provider required.
:::

:::
OIDC/OAuth2 login with **Microsoft, GitHub, Okta, Azure AD**, and Keycloak-based authentication are available in the **Enterprise Edition**. [Learn more](/docs/next/authentication/oidc-integration).
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

WebXTerm works by installing a lightweight agent (`vsay-agent`) on the machine you want to access. The agent connects back to the WebXTerm backend over gRPC — no inbound firewall rules required.

![Machines Page](/img/mechines/machines.jpeg)

### Install the Agent

Download and install `vsay-agent` on your machine. Choose the package for your operating system and architecture:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="linux-amd64" label="Linux (amd64)" default>

```bash
curl -LO https://releases.vsayterminal.com/vsay-agent/latest/vsay-agent-linux-amd64.tar.gz
tar -xzf vsay-agent-linux-amd64.tar.gz
sudo mv vsay-agent /usr/local/bin/
```

Or via DEB package (Debian/Ubuntu):
```bash
sudo dpkg -i vsay-agent_amd64.deb
```

</TabItem>
<TabItem value="linux-arm64" label="Linux (arm64)">

```bash
curl -LO https://releases.vsayterminal.com/vsay-agent/latest/vsay-agent-linux-arm64.tar.gz
tar -xzf vsay-agent-linux-arm64.tar.gz
sudo mv vsay-agent /usr/local/bin/
```

</TabItem>
<TabItem value="macos-intel" label="macOS (Intel)">

```bash
curl -LO https://releases.vsayterminal.com/vsay-agent/latest/vsay-agent-darwin-amd64.tar.gz
tar -xzf vsay-agent-darwin-amd64.tar.gz
sudo mv vsay-agent /usr/local/bin/
```

</TabItem>
<TabItem value="macos-arm" label="macOS (Apple Silicon)">

```bash
curl -LO https://releases.vsayterminal.com/vsay-agent/latest/vsay-agent-darwin-arm64.tar.gz
tar -xzf vsay-agent-darwin-arm64.tar.gz
sudo mv vsay-agent /usr/local/bin/
```

</TabItem>
<TabItem value="windows" label="Windows">

```powershell
Invoke-WebRequest -Uri "https://releases.vsayterminal.com/vsay-agent/latest/vsay-agent-windows-amd64.zip" -OutFile "vsay-agent.zip"
Expand-Archive vsay-agent.zip -DestinationPath "C:\Program Files\vsay-agent\"
# Add C:\Program Files\vsay-agent\ to your PATH
```

</TabItem>
</Tabs>

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
| `--linux-user` | The system user that terminal sessions will run as |
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

:::
See the full feature comparison on the [How We Are Different](/docs/how-we-are-different) page.
:::
