---
sidebar_position: 2
---

# Getting Started

This guide will help you set up VSAY Terminal and connect to your first machine.

## Prerequisites

Before you begin, ensure you have:

- An active VSAY Terminal account
- At least one server/machine you want to connect to
- Admin access to your organization (for initial setup)

## Step 1: Sign Up or Login

![Login Page](/img/login/login-page.png)

### Using OIDC (Recommended)

If your organization has configured OIDC authentication:

1. Navigate to the VSAY Terminal login page
2. Click **"Sign in with SSO"**
3. Select your identity provider
4. Complete the authentication flow
5. You'll be redirected to your dashboard

### Using Email/Password

1. Navigate to the login page
2. Enter your email and password
3. Click **"Sign In"**

## Step 2: Join or Create an Organization

VSAY Terminal uses organization-based multi-tenancy. Each organization has its own:

- Admin users who manage the organization
- Machines/servers registered under the organization
- Team members with various roles

### Creating a New Organization

![Create Account](/img/create-account/create-page.png)

If you're starting fresh:

1. Click **"Create Organization"** from your dashboard
2. Enter your organization name
3. Configure initial settings
4. You'll automatically become the organization admin

### Joining an Existing Organization

If you've been invited to an organization:

1. Check your email for the invitation link
2. Click the invitation link
3. Complete your profile setup
4. You'll be added to the organization with your assigned role

## Step 3: Register Your First Machine

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

## Step 4: Connect to Your Machine

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
- [Set up OIDC](/docs/next/authentication/oidc-integration) - Enable Single Sign-On for your organization

## Your Enterprise Features

You have access to all VSAY Terminal features:

| Feature | Status | Description |
|:--------|:------:|:------------|
| Secure SSH Access | ✅ | Connect through encrypted tunnels |
| Web Terminal | ✅ | Browser-based terminal access |
| Team Collaboration (RBAC) | ✅ | Role-based access management |
| Real-time Monitoring | ✅ | Track server health and performance |
| Audit Logs | ✅ | Complete activity logging |
| TLS Encryption | ✅ | Secure data in transit |
| VSAY Shell CLI | ✅ | Command-line interface tool |
| VSAY VSCode Extension | ✅ | IDE integration |
| API Access | ✅ | REST API for integrations |
| MTLS (Mutual TLS) | ✅ | Certificate-based authentication |
| OIDC/SSO (Keycloak) | ✅ | Single Sign-On with your identity provider |
| Multi-tenancy (Organizations) | ✅ | Organization-based access control |
| Organization API | ✅ | Multi-tenancy API endpoints |
| Priority Support | ✅ | Dedicated enterprise support |

:::tip All Features Unlocked
As an Enterprise user, you have access to all VSAY Terminal features including OIDC integration and multi-tenancy support.
:::
