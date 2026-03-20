---
sidebar_position: 2
---

# Authentication API

Endpoints for user authentication, OTP verification, tenant selection, and token management. All auth routes live under `/api/auth/`.

## How Authentication Works

WebXTerm uses **Keycloak** as its credential store and **vsay-auth** as the dedicated authentication service that sits in front of the machine backend:

- **Email/Password login**: vsay-auth verifies credentials against Keycloak, then issues its own signed JWT
- **OIDC/OAuth2 login (Microsoft / GitHub)**: vsay-auth handles OAuth2 directly with the provider, matches the returned email to an existing account, and issues a JWT — Keycloak is not involved in this path
- **All subsequent requests**: The JWT issued by vsay-auth is sent as a Bearer token; vsay-auth validates it before proxying to the machine backend

```
Email/Password:
  User → POST /api/auth/login → vsay-auth verifies via Keycloak → JWT issued by vsay-auth

OIDC/OAuth2 Login (Enterprise):
  User → GET /api/auth/oidc/microsoft → Microsoft OAuth2 → callback → vsay-auth looks up email → JWT issued

All API calls after login:
  Client (Authorization: Bearer <JWT>) → vsay-auth validates → proxied to machine backend
```

See [Authentication & OIDC Integration](/docs/next/authentication/oidc-integration) for the full Keycloak and OIDC/OAuth2 login setup guide.

---

## Signup

### POST /api/auth/signup

Create a new user account and organization. This creates a Keycloak realm for the organization and registers the user as the initial `company_admin`.

**Request Body:**

```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "yourpassword",
  "first_name": "John",
  "last_name": "Doe",
  "organization_name": "my-org",
  "company_name": "My Company Inc"
}
```

| Field | Type | Required | Notes |
|:------|:-----|:--------:|:------|
| `username` | string | Yes | 3–50 characters, globally unique across all organizations |
| `email` | string | Yes | Valid email address |
| `password` | string | Yes | Minimum 8 characters |
| `first_name` | string | Yes | User's first name |
| `last_name` | string | Yes | User's last name |
| `organization_name` | string | Yes | Becomes the Keycloak realm name (lowercased, spaces → hyphens) |
| `company_name` | string | Yes | Display name for the organization |

**Response `201 Created`:**

```json
{
  "message": "User created successfully. Please check your email to verify your account.",
  "user_id": "64f1a2b3c4d5e6f7a8b9c0d1",
  "username": "johndoe",
  "organization": "My Company Inc"
}
```

**Example:**

```bash
curl -X POST https://your-webxterm-instance.com/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "email": "john@example.com",
    "password": "yourpassword",
    "first_name": "John",
    "last_name": "Doe",
    "organization_name": "my-org",
    "company_name": "My Company Inc"
  }'
```

:::note First user is company_admin
The user who signs up becomes the `company_admin` for the organization. They can invite additional users via the admin panel.
:::

---

## Login

### POST /api/auth/login

Authenticate with email and password. The response varies depending on:
- Whether the user belongs to **one or multiple organizations** (multi-tenancy)
- Whether **OTP is enabled** (Enterprise, UI clients only)
- The **client source** (`ui`, `cli`, or `vscode`)

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "yourpassword"
}
```

:::info Source Detection
vsay-auth detects the calling client from the `User-Agent` header. CLI and VSCode clients skip OTP — OTP is only triggered for `ui` (browser) logins when enabled.
:::

### Response Scenarios

#### Scenario A — Direct token (single tenant, OTP disabled or CLI/VSCode)

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "username": "johndoe",
    "email": "john@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "tenant_id": "my-org",
    "tenant_name": "My Company Inc",
    "role": "company_admin",
    "machine_role": "",
    "groups": [],
    "email_verified": false,
    "api_key": "your_api_key_for_agents"
  },
  "expires_in": 86400,
  "session_token": "eyJhbGciOiJIUzI1NiIs...",
  "available_tenants": [
    {
      "tenant_id": "my-org",
      "tenant_name": "My Company Inc",
      "username": "johndoe",
      "user_id": "64f1a2b3c4d5e6f7a8b9c0d1"
    }
  ]
}
```

| Field | Description |
|:------|:------------|
| `token` | JWT Bearer token to use for all API requests |
| `expires_in` | Token lifetime in seconds (default: 86400 = 24 hours) |
| `session_token` | Short-lived token used for tenant switching from the navbar |
| `available_tenants` | All organizations this email has access to |

#### Scenario B — OTP required (UI client, OTP enabled, single tenant)

```json
{
  "message": "OTP sent to your email",
  "requires_otp": true,
  "username": "johndoe",
  "tenants": [
    {
      "tenant_id": "my-org",
      "tenant_name": "My Company Inc",
      "username": "johndoe",
      "user_id": "64f1a2b3c4d5e6f7a8b9c0d1"
    }
  ],
  "session_token": "eyJhbGciOiJIUzI1NiIs...",
  "otp_expires_in_min": 10
}
```

When `requires_otp: true` is returned, call [`POST /api/auth/verify-otp`](#verify-otp) with the `username` and the 6-digit code sent to the user's email.

#### Scenario C — Tenant selection required (user belongs to multiple organizations)

```json
{
  "requires_tenant_selection": true,
  "tenants": [
    {
      "tenant_id": "org-a",
      "tenant_name": "Organization A",
      "username": "johndoe",
      "user_id": "64f1a2b3c4d5e6f7a8b9c0d1"
    },
    {
      "tenant_id": "org-b",
      "tenant_name": "Organization B",
      "username": "johndoe",
      "user_id": "64f1a2b3c4d5e6f7a8b9c0d2"
    }
  ],
  "session_token": "eyJhbGciOiJIUzI1NiIs..."
}
```

When `requires_tenant_selection: true` is returned, display a workspace picker and call [`POST /api/auth/select-tenant`](#select-tenant) with the chosen `tenant_id` and the `session_token`.

**Example:**

```bash
curl -X POST https://your-webxterm-instance.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "john@example.com", "password": "yourpassword"}'
```

---

## Select Tenant

### POST /api/auth/select-tenant

Exchange a `session_token` (from login) and a chosen `tenant_id` for a full JWT. Used when the user belongs to multiple organizations.

**Request Body:**

```json
{
  "session_token": "eyJhbGciOiJIUzI1NiIs...",
  "tenant_id": "org-a"
}
```

**Response `200 OK` (OTP disabled or CLI/VSCode):**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { ... },
  "expires_in": 86400,
  "session_token": "eyJhbGciOiJIUzI1NiIs...",
  "available_tenants": [...]
}
```

**Response `200 OK` (OTP enabled, UI client):**

```json
{
  "message": "OTP sent to your email",
  "requires_otp": true,
  "username": "johndoe",
  "otp_expires_in_min": 10
}
```

When `requires_otp: true`, call [`POST /api/auth/verify-otp`](#verify-otp) to complete login.

**Example:**

```bash
curl -X POST https://your-webxterm-instance.com/api/auth/select-tenant \
  -H "Content-Type: application/json" \
  -d '{"session_token": "SESSION_TOKEN", "tenant_id": "org-a"}'
```

---

## Verify OTP

### POST /api/auth/verify-otp

Verify the 6-digit OTP sent to the user's email and receive a JWT. This endpoint is called after login returns `requires_otp: true`.

**Request Body:**

```json
{
  "username": "johndoe",
  "otp_code": "847291"
}
```

| Field | Type | Required | Notes |
|:------|:-----|:--------:|:------|
| `username` | string | Yes | The `username` value returned by the login/select-tenant response |
| `otp_code` | string | Yes | Exactly 6 digits, sent to the user's registered email |

**Response `200 OK`:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "username": "johndoe",
    "email": "john@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "tenant_id": "my-org",
    "tenant_name": "My Company Inc",
    "role": "company_admin",
    "machine_role": "",
    "groups": [],
    "email_verified": false,
    "api_key": "your_api_key_for_agents"
  },
  "expires_in": 86400,
  "session_token": "eyJhbGciOiJIUzI1NiIs...",
  "available_tenants": [...]
}
```

**Example:**

```bash
curl -X POST https://your-webxterm-instance.com/api/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{"username": "johndoe", "otp_code": "847291"}'
```

---

## Logout

### POST /api/auth/logout

Log out the current user. Requires a valid Bearer token.

**Headers:**

```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response `200 OK`:**

```json
{
  "message": "Logged out successfully"
}
```

**Example:**

```bash
curl -X POST https://your-webxterm-instance.com/api/auth/logout \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

:::note Token invalidation
WebXTerm uses short-lived JWTs (default 24 hours). Logout is logged server-side for audit purposes. To force expiry, rotate the JWT secret or reduce the `JWT_EXPIRY_HOURS` setting.
:::

---

## Refresh Token

### POST /api/auth/refresh

Get a new JWT token from a still-valid existing token.

**Request Body:**

```json
{
  "token": "YOUR_CURRENT_JWT_TOKEN"
}
```

**Response `200 OK`:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "expires_in": 86400
}
```

**Example:**

```bash
curl -X POST https://your-webxterm-instance.com/api/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{"token": "YOUR_CURRENT_JWT_TOKEN"}'
```

:::note Refresh window
The current token must still be valid (not expired) to refresh. If it has already expired, the user must log in again.
:::

---

## OIDC/OAuth2 Login (Enterprise)

OIDC/OAuth2 login is handled via standard OAuth2 redirect flows. These are browser-redirect endpoints, not JSON API calls.

| Method | Endpoint | Description |
|:-------|:---------|:------------|
| GET | `/api/auth/oidc/microsoft` | Redirect to Microsoft OAuth2 login |
| GET | `/api/auth/oidc/microsoft/callback` | Microsoft OAuth2 callback (handled by vsay-auth) |
| GET | `/api/auth/oidc/github` | Redirect to GitHub OAuth2 login |
| GET | `/api/auth/oidc/github/callback` | GitHub OAuth2 callback (handled by vsay-auth) |

### How OIDC/OAuth2 Login Works

1. User clicks "Sign in with Microsoft" (or GitHub) in the WebXTerm UI
2. Browser is redirected to `/api/auth/oidc/microsoft`
3. vsay-auth redirects to the provider's OAuth2 authorization page
4. User authenticates with their Microsoft/GitHub account
5. Provider redirects back to the vsay-auth callback URL
6. vsay-auth extracts the user's email from the provider token
7. vsay-auth looks up the email in its user database
   - If a matching account exists → JWT issued, user redirected to dashboard
   - If no account found → error (user must be registered first)
8. If user belongs to **multiple organizations**, browser is redirected to the workspace picker with a `session_token`; call [`POST /api/auth/select-tenant`](#select-tenant) to complete login

:::important Account must exist first
OIDC/OAuth2 login does not auto-create new accounts. The user's email must already be registered (via signup or admin invitation) before they can use OIDC/OAuth2 login.
:::

### Configure Microsoft Login

Set these environment variables on the vsay-auth service:

```env
MICROSOFT_CLIENT_ID=your-azure-app-client-id
MICROSOFT_CLIENT_SECRET=your-azure-app-client-secret
MICROSOFT_TENANT_ID=your-azure-tenant-id   # or omit for multi-tenant "common"
OIDC_REDIRECT_BASE_URL=https://your-webxterm-instance.com
```

Redirect URI to register in Azure App Registration:
```
https://your-webxterm-instance.com/api/auth/oidc/microsoft/callback
```

### Configure GitHub Login

```env
GITHUB_CLIENT_ID=your-github-oauth-app-client-id
GITHUB_CLIENT_SECRET=your-github-oauth-app-client-secret
OIDC_REDIRECT_BASE_URL=https://your-webxterm-instance.com
```

Authorization callback URL to register in your GitHub OAuth App:
```
https://your-webxterm-instance.com/api/auth/oidc/github/callback
```

---

## JWT Token Structure

Every JWT issued by vsay-auth (HS256) contains these claims:

```json
{
  "user_id":     "64f1a2b3c4d5e6f7a8b9c0d1",
  "username":    "johndoe",
  "email":       "john@example.com",
  "tenant_id":   "my-org",
  "tenant_name": "My Company Inc",
  "role":        "company_admin",
  "machine_role": "user",
  "groups":      ["devops"],
  "keycloak_id": "kc-uuid-here",
  "source":      "ui",
  "iss":         "vsay-auth",
  "exp":         1234567890,
  "iat":         1234567890
}
```

| Claim | Description |
|:------|:------------|
| `user_id` | MongoDB ObjectID of the user |
| `tenant_id` | Keycloak realm name / organization identifier |
| `role` | Organization-level role: `super_admin`, `company_admin`, or `user` |
| `machine_role` | Machine-level role for per-machine access control |
| `groups` | Keycloak groups the user belongs to |
| `source` | Client type: `ui`, `cli`, or `vscode` |
| `iss` | Always `vsay-auth` |

---

## Using Authentication

### HTTP Requests

Include the JWT token in the `Authorization` header:

```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  https://your-webxterm-instance.com/api/machines
```

### WebSocket Terminal Connections

Pass the token as a query parameter:

```
wss://your-webxterm-instance.com/api/terminal/:agent_id/ws?token=YOUR_JWT_TOKEN
```

### Agent Registration

Use your **API key** (from the Profile page or the `api_key` field in the login response) when configuring the agent on a machine:

```bash
sudo vsay-agent configure \
  --token YOUR_API_KEY \
  --host https://your-webxterm-instance.com \
  --linux-user ubuntu
```

The agent communicates with the backend over gRPC and authenticates using the API key — it does not use the JWT token. See [Getting Started](/docs/next/getting-started) for full agent installation details.

---

## Complete Login Flow Reference

```
POST /api/auth/login
        │
        ├─ Single tenant + OTP disabled (or CLI/VSCode)
        │   └─ Response: { token, user, expires_in, session_token, available_tenants }
        │       └─ ✅ Done — use token for API calls
        │
        ├─ Single tenant + OTP enabled (UI only)
        │   └─ Response: { requires_otp: true, username, session_token, otp_expires_in_min }
        │       └─ POST /api/auth/verify-otp { username, otp_code }
        │           └─ Response: { token, user, expires_in, session_token, available_tenants }
        │               └─ ✅ Done
        │
        └─ Multiple tenants
            └─ Response: { requires_tenant_selection: true, tenants, session_token }
                └─ POST /api/auth/select-tenant { session_token, tenant_id }
                    │
                    ├─ OTP disabled (or CLI/VSCode)
                    │   └─ Response: { token, user, expires_in, ... }
                    │       └─ ✅ Done
                    │
                    └─ OTP enabled (UI only)
                        └─ Response: { requires_otp: true, username, otp_expires_in_min }
                            └─ POST /api/auth/verify-otp { username, otp_code }
                                └─ Response: { token, user, expires_in, ... }
                                    └─ ✅ Done
```
