---
sidebar_position: 1
---

# Authentication & OIDC Integration

:::note Keycloak is used in ALL versions
**Keycloak is the authentication layer in every edition** — v1.0.0 Community, v1.1.0 Enterprise, and v1.2.0 Enterprise. The VSAY backend only ever validates **Keycloak-issued tokens**, regardless of how the user logged in.

**What's new in v1.2.0:** Keycloak can now be configured as an **identity broker** — so users can sign in with Microsoft, GitHub, Okta, or Azure AD. Even then, the login data flows **through Keycloak** before reaching VSAY. The backend never talks to Microsoft or Okta directly.
:::

## Keycloak Is the Auth Layer in All Versions

VSAY Terminal uses **Keycloak** as its authentication platform in **every edition**. The version determines what Keycloak authenticates *against*, not whether Keycloak is used.

| Version | Keycloak Used? | What Keycloak Authenticates |
|:--------|:--------------:|:----------------------------|
| v1.0.0 Community | ✅ | Email + password (Keycloak manages users directly) |
| v1.1.0 Enterprise | ✅ | Email + password (Keycloak manages users directly) |
| v1.2.0 Enterprise | ✅ | Email + password **AND** external providers (Microsoft, GitHub, Okta, Azure AD) via Keycloak broker |

**The rule:** No matter how a user signs in, the token VSAY validates is **always issued by Keycloak**. The backend only ever talks to Keycloak.

## How Authentication Flows — All Versions

```
ALL VERSIONS (v1.0.0 / v1.1.0 / v1.2.0)
─────────────────────────────────────────

  User login
      │
      ▼
  Keycloak Realm
  (VSAY's identity layer)
      │
      ├── Email/Password? → Keycloak verifies directly
      │
      └── External Provider? (v1.2.0 only)
              │
              ▼
          Microsoft / GitHub / Okta / Azure AD
          (user authenticates with external provider)
              │
              ▼
          Back to Keycloak → Keycloak issues its own token
          (external provider identity is wrapped in a Keycloak token)
      │
      ▼
  Keycloak OIDC Token issued
      │
      ▼
  VSAY Machine Backend
  (validates Keycloak token — always the same validation logic)
```

**Key point for v1.2.0 OIDC:** When a user clicks "Sign in with GitHub", GitHub authenticates the user and sends their identity back to **Keycloak**. Keycloak then issues its own OIDC token to VSAY. The VSAY backend never sees the GitHub token — it only sees the Keycloak token, identical in format to an email/password login token.

---

## v1.0.0 & v1.1.0 — Email/Password via Keycloak

In Community (v1.0.0) and Enterprise v1.1.0, Keycloak stores and manages users directly:

1. User submits email + password to Keycloak
2. Keycloak verifies credentials against its own user store
3. Keycloak issues an OIDC access token
4. VSAY uses that token for all API calls (Web Terminal, Shell CLI, VSCode Extension)

Users and passwords live in the **Keycloak realm** — not in the VSAY application database. Password policies, hashing, and account management are all handled by Keycloak.

---

## v1.2.0 Enterprise — External Providers via Keycloak Broker

In Enterprise v1.2.0, Keycloak is configured as an **identity broker**. When a user clicks "Sign in with Microsoft" (or GitHub, Okta, etc.):

1. VSAY Terminal redirects to Keycloak
2. Keycloak redirects to the configured external provider (e.g., Microsoft Azure AD)
3. User authenticates with their external provider account
4. The external provider sends the user's identity back to **Keycloak** (not to VSAY)
5. Keycloak creates or links the local user account in the Keycloak realm
6. **Keycloak issues its own OIDC token** — containing the user's name, email, and groups from the external provider
7. VSAY Terminal receives the **Keycloak token** — same format as email/password login

The VSAY backend **never communicates with Microsoft, GitHub, or Okta directly**. It only validates Keycloak-issued tokens. This is what makes Keycloak the universal auth layer across all editions.

---

## Supported Identity Providers (Enterprise)

| Provider | Protocol | Notes |
|:---------|:---------|:------|
| **Microsoft Azure AD / Entra ID** | OIDC / OAuth 2.0 | Sign in with Microsoft work accounts |
| **GitHub** | OAuth 2.0 | Sign in with GitHub accounts |
| **Okta** | OIDC | Full SSO with Okta workforce identity |
| **Google Workspace** | OIDC | Sign in with Google organizational accounts |
| **Auth0** | OIDC | Auth0 as upstream IdP |
| **OneLogin** | OIDC / SAML | Enterprise SSO |
| **PingIdentity** | OIDC / SAML | Enterprise identity management |
| **Any OIDC-compliant provider** | OIDC | Custom provider configuration |

---

## Setting Up External Providers in Keycloak (Enterprise)

### Prerequisites

- A running Keycloak instance connected to your VSAY Terminal deployment
- Admin access to the Keycloak admin console
- Admin access to your external identity provider

### Step 1: Create an Application in Your Identity Provider

#### Microsoft Azure AD / Entra ID

1. Go to **Azure Portal → Azure Active Directory → App registrations**
2. Click **New registration**
3. Set:
   - **Name**: VSAY Terminal
   - **Redirect URI**: `https://your-keycloak.com/realms/vsay/broker/microsoft/endpoint`
4. After creation, go to **Certificates & secrets → New client secret**
5. Note the **Application (client) ID** and **Client secret**
6. Go to **API permissions → Add permission → Microsoft Graph → openid, email, profile**

#### GitHub

1. Go to **GitHub → Settings → Developer settings → OAuth Apps**
2. Click **New OAuth App**
3. Set:
   - **Application name**: VSAY Terminal
   - **Homepage URL**: `https://your-vsay-instance.com`
   - **Authorization callback URL**: `https://your-keycloak.com/realms/vsay/broker/github/endpoint`
4. Note the **Client ID** and **Client Secret**

#### Okta

1. Log into your **Okta admin console**
2. Go to **Applications → Create App Integration**
3. Select **OIDC - OpenID Connect → Web Application**
4. Set:
   - **Sign-in redirect URI**: `https://your-keycloak.com/realms/vsay/broker/okta/endpoint`
   - **Sign-out redirect URI**: `https://your-vsay-instance.com`
5. Note the **Client ID** and **Client Secret**
6. Note your **Okta domain** (e.g., `your-org.okta.com`)

#### Google Workspace

1. Go to **Google Cloud Console → APIs & Services → Credentials**
2. Click **Create Credentials → OAuth client ID**
3. Set:
   - **Application type**: Web application
   - **Authorized redirect URIs**: `https://your-keycloak.com/realms/vsay/broker/google/endpoint`
4. Note the **Client ID** and **Client Secret**

---

### Step 2: Configure the Identity Provider in Keycloak

1. Log into your **Keycloak Admin Console**
2. Select your VSAY realm
3. Go to **Identity Providers → Add provider**
4. Select the provider type (Microsoft, GitHub, OIDC, etc.)
5. Enter the credentials from Step 1:

```
Client ID:     [from your provider]
Client Secret: [from your provider]
Display Name:  Sign in with Microsoft   (or GitHub, Okta, etc.)
```

6. For **OIDC providers**, also set the **Discovery URL** (issuer):
   - Azure AD: `https://login.microsoftonline.com/{tenant-id}/v2.0`
   - Okta: `https://your-org.okta.com/oauth2/default`
   - Google: `https://accounts.google.com`

7. Under **Mappers**, configure how provider claims map to Keycloak user attributes:

| Provider Attribute | Keycloak Attribute |
|:------------------|:------------------|
| `email` | `email` |
| `name` / `displayName` | `firstName`, `lastName` |
| `groups` / `roles` | Keycloak roles (optional) |

8. Click **Save**

---

### Step 3: Enable the Provider on the VSAY Login Page

1. In Keycloak Admin Console → **Realm Settings → Login**
2. The configured identity providers automatically appear as login buttons
3. Users will see **"Sign in with Microsoft"** (or GitHub, Okta) on the VSAY login page

:::warning
Before disabling email/password login, make sure all users can authenticate via the external provider. Keep password login enabled as a fallback during initial rollout.
:::

---

## User Provisioning

### First Login — Automatic Account Creation

When a user logs in via an external provider for the first time:

1. Keycloak checks if a local account with that email already exists
2. If not, Keycloak **automatically creates** a linked user account (Just-in-Time provisioning)
3. User details (name, email) are populated from the provider's claims
4. The user is assigned the **default role** configured in Keycloak
5. The user gains access to machines based on their role and machine-level permissions

### Group-Based Role Mapping

Map groups from your identity provider to VSAY Terminal roles:

1. In Keycloak → **Identity Providers → [Your Provider] → Mappers**
2. Add a **Role Importer** or **Hardcoded Role** mapper
3. Example mappings:

| Provider Group | VSAY Role |
|:--------------|:----------|
| `vsay-admins` | `admin` |
| `engineering` | `user` |
| `devops-team` | `user` |

Users will automatically receive roles based on their group membership in the external provider.

---

## Keycloak Realm Configuration Reference

When deploying VSAY Terminal, your Keycloak realm should be configured with:

| Setting | Recommended Value |
|:--------|:-----------------|
| **Access Token Lifespan** | 15–60 minutes |
| **SSO Session Max** | 8–24 hours |
| **Refresh Token** | Enabled |
| **PKCE** | Required (S256) |
| **Token Endpoint Auth Method** | `client_secret_post` or `client_secret_basic` |

---

## Troubleshooting

### "Invalid redirect URI"
- Ensure the callback URL in your provider matches exactly: `https://your-keycloak.com/realms/vsay/broker/{provider-alias}/endpoint`
- Check for trailing slashes or http vs https mismatches

### "User not found after login"
- Verify the `email` claim is included in the token from your provider
- Check claim mapper configuration in Keycloak

### "Sign in with [Provider] button not showing"
- Confirm the identity provider is enabled in Keycloak realm settings
- Check that the provider's client ID and secret are saved correctly

### "Groups not syncing"
- Ensure your provider sends group claims in the token (not just userinfo endpoint)
- Add a Group mapper in Keycloak → Identity Providers → [Provider] → Mappers
