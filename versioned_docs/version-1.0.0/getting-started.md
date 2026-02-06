---
sidebar_position: 2
---

# Getting Started

This guide will help you set up VSAY Terminal Community Edition and connect to your first machine.

## Prerequisites

Before you begin, ensure you have:

- An active VSAY Terminal account
- At least one server/machine you want to connect to

## Step 1: Sign Up or Login

![Login Page](/img/login/login-page.png)

### Using Email/Password

1. Navigate to the login page
2. Enter your email and password
3. Click **"Sign In"**

### Create an Account

If you don't have an account:

1. Click **"Sign Up"**
2. Enter your email and create a password
3. Verify your email
4. Log in to your dashboard

:::tip Enterprise Feature
Looking for **OIDC/SSO login**? [Upgrade to Enterprise Edition](/docs/next/intro) for Single Sign-On support.
:::

## Step 2: Register Your First Machine

![Machines Page](/img/mechines/machines.jpeg)

To connect to a machine through VSAY Terminal:

1. Navigate to **Machines** in your dashboard
2. Click **"Add Machine"**
3. Enter the machine details:
   - **Name**: A friendly name for the machine
   - **Host**: The IP address or hostname
   - **Port**: SSH port (default: 22)
   - **Description**: Optional description

4. Configure authentication:
   - Upload SSH key or use password authentication
   - Set up any required jump hosts

5. Click **"Save"**

## Step 3: Connect to Your Machine

Once your machine is registered:

1. Go to the **Machines** list
2. Find your machine and click **"Connect"**
3. The Web Terminal will open in a new tab
4. You're now connected! Start running commands.

## Next Steps

Now that you're connected, explore more features:

- [Set up team collaboration](/docs/features/team-collaboration) - Add team members and assign roles
- [Configure monitoring](/docs/features/monitoring) - Track server health and command history
- [Review audit logs](/docs/features/audit-logs) - Understand your compliance capabilities

## Feature Comparison

See what's included in your Community Edition and what's available with Enterprise:

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

:::info Upgrade to Enterprise
Unlock **OIDC/SSO Integration**, **Multi-tenancy**, and **Priority Support** with [Enterprise Edition](/docs/next/intro).
:::
