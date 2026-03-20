---
sidebar_position: 1
---

# Authentication & OIDC Integration

:::note Keycloak is the credential store — vsay-auth is the auth service
**Keycloak stores users and verifies passwords** in Enterprise editions. vsay-auth calls Keycloak to verify credentials, then issues its own signed JWT (HS256). All clients use **vsay-auth's JWT** — not a Keycloak OIDC token.

**Community Edition** uses its own bcrypt + JWT auth — no Keycloak.

**For OIDC/OAuth2 login (Enterprise):** vsay-auth talks directly to Microsoft or GitHub via OAuth2. Keycloak is **not** involved in the OIDC/OAuth2 login path.
:::

## The Two Auth Paths

### Path 1 — Email + Password (All Editions)

Used in all Enterprise editions. Community Edition uses its own bcrypt-based auth without Keycloak.

```
User submits email + password
        │
        ▼
vsay-auth service
        │
        ├─ Looks up user in MongoDB (finds their Keycloak realm/tenant)
        │
        ▼
Keycloak realm (password verification)
        │
        └─ Credentials valid? ──► vsay-auth issues its own JWT (HS256, issuer: vsay-auth)
                                        │
                                        ▼
                              Client uses JWT for all API calls
```

Keycloak stores the hashed password and verifies it. vsay-auth never sees or stores the Keycloak OIDC token — it only uses Keycloak as a credential verifier and user store, then issues its own JWT.

### Path 2 — OIDC/OAuth2 Login (Enterprise)

Used when a user clicks "Sign in with Microsoft" or "Sign in with GitHub":

```
User clicks "Sign in with Microsoft"
        │
        ▼
GET /api/auth/oidc/microsoft  (vsay-auth)
        │
        ▼
Microsoft OAuth2 authorization page
(user authenticates with their Microsoft account)
        │
        ▼
GET /api/auth/oidc/microsoft/callback  (vsay-auth)
        │
        ├─ Exchanges authorization code for id_token (server-side, over TLS)
        ├─ Extracts email from id_token
        │
        ▼
vsay-auth looks up email in MongoDB
        │
        ├─ Account found → vsay-auth issues its own JWT
        └─ Account not found → error ("No account found for this email")
```

**Key point:** vsay-auth talks directly to Microsoft/GitHub — Keycloak is **not** involved in OIDC/OAuth2 login. The result is the same vsay-auth JWT as email/password login.

:::warning OIDC/OAuth2 login requires an existing account
OIDC/OAuth2 login does **not** auto-register new users. The user's email must already exist in the system (registered via signup or invited by an admin) before they can log in via OIDC/OAuth2 with Microsoft or GitHub.
:::

---

## Version Summary

| Edition | Email/Password | OIDC/OAuth2 Login (Microsoft, GitHub) |
|:--------|:-------------:|:--------------------------------:|
| Community | ✅ via bcrypt + own JWT | ❌ |
| Enterprise (without OIDC) | ✅ via Keycloak + vsay-auth JWT | ❌ |
| Enterprise (with OIDC) | ✅ via Keycloak + vsay-auth JWT | ✅ direct OAuth2 via vsay-auth |

In all cases, the token the client receives is **vsay-auth's own JWT** (HS256, signed with `JWT_SECRET`). The backend validates this token — not a Keycloak OIDC token.

---

## Multi-Tenancy and OIDC/OAuth2 Login

If a user's email is registered in **multiple organizations**, OIDC/OAuth2 login works the same as email/password login:

1. vsay-auth finds all organizations for that email
2. Returns a `session_token` and a `tenants` list to the frontend (same `requires_tenant_selection` response)
3. User picks their organization in the workspace picker
4. Frontend calls `POST /api/auth/select-tenant` with the `session_token` and chosen `tenant_id`
5. vsay-auth issues the full JWT for the selected tenant

---

## Setting Up Microsoft Login (Enterprise)

### Step 1: Register an Azure App

1. Go to **Azure Portal → Azure Active Directory → App registrations**
2. Click **New registration**
3. Set:
   - **Name**: WebXTerm
   - **Supported account types**: Choose based on your needs (single tenant or multi-tenant)
   - **Redirect URI**: `https://your-webxterm-instance.com/api/auth/oidc/microsoft/callback`
4. After creation go to **Certificates & secrets → New client secret** — note the value
5. Note the **Application (client) ID** from the Overview page

### Step 2: Configure vsay-auth

Add to your vsay-auth environment:

```env
MICROSOFT_CLIENT_ID=your-azure-application-client-id
MICROSOFT_CLIENT_SECRET=your-azure-client-secret-value
MICROSOFT_TENANT_ID=your-azure-tenant-id   # omit to allow any Microsoft account ("common")
OIDC_REDIRECT_BASE_URL=https://your-webxterm-instance.com
FRONTEND_URL=https://your-webxterm-instance.com
```

vsay-auth requests only `openid profile email` scopes — no Microsoft Graph API or admin consent required.

### How the Microsoft Callback Works

vsay-auth exchanges the authorization code for an `id_token` entirely server-side (no browser sees the token). It decodes the JWT payload of the `id_token` to extract the user's email — no Graph API call is made. The email is matched against existing accounts in MongoDB.

---

## Setting Up GitHub Login (Enterprise)

### Step 1: Create a GitHub OAuth App

1. Go to **GitHub → Settings → Developer settings → OAuth Apps**
2. Click **New OAuth App**
3. Set:
   - **Application name**: WebXTerm
   - **Homepage URL**: `https://your-webxterm-instance.com`
   - **Authorization callback URL**: `https://your-webxterm-instance.com/api/auth/oidc/github/callback`
4. Note the **Client ID** and generate a **Client Secret**

### Step 2: Configure vsay-auth

```env
GITHUB_CLIENT_ID=your-github-oauth-app-client-id
GITHUB_CLIENT_SECRET=your-github-oauth-app-client-secret
OIDC_REDIRECT_BASE_URL=https://your-webxterm-instance.com
FRONTEND_URL=https://your-webxterm-instance.com
```

vsay-auth requests `user:email read:user` scopes. If the user's GitHub email is set to private, vsay-auth automatically fetches it from `/user/emails` using the access token.

---

## Keycloak Configuration Reference

Keycloak is used for **email/password authentication** and **user storage**. Each organization that signs up gets its own Keycloak realm. When deploying, configure your Keycloak instance with:

| Setting | Recommended Value |
|:--------|:-----------------|
| **Access Token Lifespan** | 15–60 minutes |
| **SSO Session Max** | 8–24 hours |
| **Refresh Token** | Enabled |
| **PKCE** | Required (S256) |
| **Token Endpoint Auth Method** | `client_secret_post` or `client_secret_basic` |

vsay-auth connects to Keycloak using these environment variables:

```env
KEYCLOAK_URL=https://your-keycloak-instance.com
KEYCLOAK_REALM=master            # admin realm for vsay-auth's admin API access
KEYCLOAK_CLIENT_ID=vsay-auth
KEYCLOAK_CLIENT_SECRET=your-client-secret
KEYCLOAK_ADMIN_USERNAME=admin
KEYCLOAK_ADMIN_PASSWORD=your-admin-password
```

---

## Supported Social Providers

Currently built-in:

| Provider | Protocol | Notes |
|:---------|:---------|:------|
| **Microsoft Azure AD / Entra ID** | OAuth2 / OIDC | Personal, work, or school accounts |
| **GitHub** | OAuth2 | Personal accounts; handles private email via `/user/emails` |

Additional providers (Okta, Google, Auth0, etc.) can be configured by extending vsay-auth's OIDC handler — the pattern is identical to the Microsoft/GitHub implementations.

---

## User Provisioning

### Adding Users for OIDC/OAuth2 Login

Since OIDC/OAuth2 login does not auto-register accounts, users must be added first:

1. **Self-signup**: User registers with email/password at `/api/auth/signup` — afterwards they can also sign in with Microsoft/GitHub using the same email
2. **Admin invitation**: Company admin creates the user in the admin panel — the user can then log in via OIDC/OAuth2 without ever setting a password

### Role Assignment

User roles are set at registration (or by the admin) and stored in both MongoDB and Keycloak:

| Role | Description |
|:-----|:------------|
| `super_admin` | Platform-level admin; can manage all organizations |
| `company_admin` | Organization admin; can manage users and machines in their org |
| `user` | Standard user; access to machines based on per-machine permissions |

---

## Troubleshooting

### "No account found for this email" on OIDC/OAuth2 login
- The user's email from Microsoft/GitHub does not match any registered account
- Have the user register first via `/api/auth/signup` using the same email address

### "Could not retrieve email from GitHub"
- The user's GitHub primary email is private and not accessible
- Ask the user to make their GitHub email public, or grant email access in the OAuth app's requested scopes (`user:email` is already requested — the user may need to re-authorize)

### "Microsoft login is not configured"
- `MICROSOFT_CLIENT_ID` is not set on the vsay-auth service
- Add the environment variable and restart the service

### "Invalid redirect URI" (Microsoft)
- The redirect URI in Azure App Registration must exactly match: `https://your-webxterm-instance.com/api/auth/oidc/microsoft/callback`
- Check for trailing slashes, http vs https, or typos

### OIDC/OAuth2 login button not appearing
- The OIDC/OAuth2 login buttons are shown only when the corresponding `MICROSOFT_CLIENT_ID` or `GITHUB_CLIENT_ID` env vars are set on vsay-auth
- Restart vsay-auth after adding environment variables

### Login works but wrong organization selected
- If the user belongs to multiple organizations, they should see a workspace picker after OIDC/OAuth2 login
- If the picker is not showing, check that the frontend handles the `requires_selection=true` parameter in the OAuth callback redirect
