---
sidebar_position: 1
---

# OIDC Integration

VSAY Terminal supports OpenID Connect (OIDC) for Single Sign-On (SSO), allowing your team to authenticate using your organization's identity provider.

## Overview

OIDC integration provides:

- **Single Sign-On**: Users authenticate with your existing identity provider
- **Centralized User Management**: Manage users in one place
- **Enhanced Security**: Leverage your IdP's security features (MFA, conditional access)
- **Automatic Provisioning**: Users are automatically created on first login

## Supported Identity Providers

VSAY Terminal works with any OIDC-compliant identity provider:

| Provider | Status |
|----------|--------|
| **Okta** | Fully Supported |
| **Azure AD / Entra ID** | Fully Supported |
| **Google Workspace** | Fully Supported |
| **Auth0** | Fully Supported |
| **Keycloak** | Fully Supported |
| **OneLogin** | Fully Supported |
| **PingIdentity** | Fully Supported |
| **Custom OIDC** | Supported (any compliant provider) |

## Setting Up OIDC

### Prerequisites

Before configuring OIDC, you'll need:

- Admin access to your identity provider
- Admin access to your VSAY Terminal organization
- Your VSAY Terminal callback URL: `https://your-domain.vsayterminal.com/auth/callback`

### Step 1: Create an Application in Your IdP

#### Okta

1. Log into your Okta admin console
2. Go to **Applications → Create App Integration**
3. Select **OIDC - OpenID Connect**
4. Select **Web Application**
5. Configure:
   - **Name**: VSAY Terminal
   - **Sign-in redirect URI**: `https://your-domain.vsayterminal.com/auth/callback`
   - **Sign-out redirect URI**: `https://your-domain.vsayterminal.com`
6. Save and note the **Client ID** and **Client Secret**

#### Azure AD / Entra ID

1. Go to **Azure Portal → Azure Active Directory**
2. Navigate to **App registrations → New registration**
3. Configure:
   - **Name**: VSAY Terminal
   - **Redirect URI**: Web - `https://your-domain.vsayterminal.com/auth/callback`
4. After creation, go to **Certificates & secrets**
5. Create a new **Client secret**
6. Note the **Application (client) ID** and **Client secret**

#### Google Workspace

1. Go to **Google Cloud Console**
2. Create a new project or select existing
3. Navigate to **APIs & Services → Credentials**
4. Click **Create Credentials → OAuth client ID**
5. Configure:
   - **Application type**: Web application
   - **Authorized redirect URIs**: `https://your-domain.vsayterminal.com/auth/callback`
6. Note the **Client ID** and **Client Secret**

### Step 2: Configure VSAY Terminal

1. Go to **Organization Settings → Authentication**
2. Click **"Configure OIDC"**
3. Enter your IdP details:

```
Provider Name: Your Identity Provider
Client ID: [from Step 1]
Client Secret: [from Step 1]
Issuer URL: https://your-idp.com (e.g., https://your-org.okta.com)
```

4. Configure claim mappings (usually auto-detected):

| VSAY Field | OIDC Claim |
|------------|------------|
| Email | `email` |
| Name | `name` or `preferred_username` |
| Groups | `groups` (optional) |

5. Click **"Test Connection"** to verify
6. Save the configuration

### Step 3: Enable SSO

1. Still in **Authentication** settings
2. Toggle **"Enable OIDC Login"**
3. Choose login behavior:
   - **SSO Only**: Users can only log in via OIDC
   - **SSO + Password**: Users can choose either method
4. Save changes

:::warning
Before enabling "SSO Only", ensure all users can authenticate via your IdP. Consider keeping password login as a backup initially.
:::

## User Provisioning

### Automatic Provisioning

When a user logs in via OIDC for the first time:

1. VSAY Terminal creates a new user account
2. User details are populated from OIDC claims
3. Default role is assigned (configurable)
4. User gains access based on their role

Configure default provisioning:

1. Go to **Organization Settings → Authentication → Provisioning**
2. Set **Default Role** for new OIDC users
3. Optionally enable **Group Mapping** (see below)

### Group-Based Role Mapping

Map IdP groups to VSAY Terminal roles:

1. Ensure your IdP sends group claims
2. Go to **Authentication → Group Mapping**
3. Create mappings:

| IdP Group | VSAY Terminal Role |
|-----------|-------------------|
| `vsay-admins` | Organization Admin |
| `vsay-developers` | Developer |
| `engineering` | Machine Admin |

4. Users will automatically receive roles based on their group membership

### Just-in-Time (JIT) Provisioning

Enable JIT provisioning for automatic account creation:

1. Go to **Authentication → Provisioning**
2. Enable **"Auto-create users on first login"**
3. Configure:
   - Default role for new users
   - Required email domain (optional)
   - Auto-assign to machines/groups (optional)

## Advanced Configuration

### Custom Claims

If your IdP uses non-standard claim names:

1. Go to **Authentication → Claim Mapping**
2. Map your custom claims:

```
email_claim: custom_email
name_claim: display_name
groups_claim: member_of
```

### Token Settings

Configure token handling:

- **Access Token Lifetime**: How long tokens are valid
- **Refresh Token**: Enable/disable token refresh
- **Session Duration**: Max session length

### Multi-IdP Support

VSAY Terminal supports multiple identity providers:

1. Configure primary IdP as above
2. Click **"Add Identity Provider"**
3. Configure additional IdP
4. Users can choose their IdP at login

## Security Considerations

### Required Security Features

We recommend enabling these in your IdP:

- **Multi-Factor Authentication (MFA)**: Require MFA for all users
- **Conditional Access**: Restrict access by location, device, etc.
- **Session Policies**: Set appropriate session timeouts

### PKCE Support

VSAY Terminal uses PKCE (Proof Key for Code Exchange) for enhanced security:

- Prevents authorization code interception attacks
- Required for public clients
- Automatically enabled

### Token Validation

All OIDC tokens are validated:

- Signature verification against IdP public keys
- Issuer validation
- Audience validation
- Expiration checking

## Troubleshooting

### Common Issues

**"Invalid redirect URI"**
- Ensure the callback URL in your IdP exactly matches VSAY Terminal's URL
- Check for trailing slashes

**"User not found"**
- Verify email claim is being sent
- Check claim mapping configuration

**"Invalid client credentials"**
- Verify Client ID and Secret are correct
- Ensure the secret hasn't expired

**"Groups not syncing"**
- Verify your IdP is sending group claims
- Check group claim name mapping
- Ensure groups are included in the token (not just userinfo)

### Testing OIDC

Use the built-in test tool:

1. Go to **Authentication → OIDC Configuration**
2. Click **"Test Connection"**
3. Review the test results for any issues
