---
sidebar_position: 2
---

# Authentication API

Endpoints for user authentication, OTP verification, tenant selection, and token management. All auth routes live under `/api/auth/`.

## How Authentication Works

WebXTerm Enterprise uses **Keycloak** as the credential store and **vsay-auth** as the dedicated authentication service in front of the machine backend:

- vsay-auth calls Keycloak to verify email + password credentials
- vsay-auth then issues its own signed JWT (HS256) — **not** a Keycloak OIDC token
- All API calls use this vsay-auth JWT as a Bearer token

```
User (email + password) → POST /api/auth/login
    → vsay-auth verifies via Keycloak
    → vsay-auth issues its own JWT
    → Client uses JWT for all API calls
```

:::tip OIDC/OAuth2 Login (Next Enterprise)
For **Microsoft** and **GitHub** OIDC/OAuth2 login, see the [next Enterprise Edition](/docs/next/authentication/oidc-integration).
:::

---

## Signup

### POST /api/auth/signup

Create a new user account and organization. This creates a dedicated Keycloak realm for the organization and registers the first user as `company_admin`.

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
The user who signs up becomes the `company_admin` for that organization. They can invite additional users via the admin panel.
:::

---

## Login

### POST /api/auth/login

Authenticate with email and password. The response varies depending on:
- Whether the user belongs to **one or multiple organizations** (multi-tenancy)
- Whether **OTP is enabled** (UI clients only)
- The **client source** (`ui`, `cli`, or `vscode`)

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "yourpassword"
}
```

:::info Source Detection
vsay-auth detects the calling client from the `User-Agent` header. CLI and VSCode clients skip OTP — OTP is only triggered for `ui` (browser) logins when enabled by the admin.
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

#### Scenario B — OTP required (UI client, OTP enabled, single tenant)

```json
{
  "message": "OTP sent to your email",
  "requires_otp": true,
  "username": "johndoe",
  "tenants": [ { "tenant_id": "my-org", ... } ],
  "session_token": "eyJhbGciOiJIUzI1NiIs...",
  "otp_expires_in_min": 10
}
```

Call [`POST /api/auth/verify-otp`](#verify-otp) with the `username` and the 6-digit code sent to the user's email.

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

Display a workspace picker and call [`POST /api/auth/select-tenant`](#select-tenant) with the chosen `tenant_id`.

**Example:**

```bash
curl -X POST https://your-webxterm-instance.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "john@example.com", "password": "yourpassword"}'
```

---

## Select Tenant

### POST /api/auth/select-tenant

Exchange a `session_token` and a chosen `tenant_id` for a full JWT. Used when a user belongs to multiple organizations.

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

Then call [`POST /api/auth/verify-otp`](#verify-otp) to complete login.

---

## Verify OTP

### POST /api/auth/verify-otp

Verify the 6-digit OTP sent to the user's email and receive a JWT. Called after login or select-tenant returns `requires_otp: true`.

**Request Body:**

```json
{
  "username": "johndoe",
  "otp_code": "847291"
}
```

| Field | Type | Required | Notes |
|:------|:-----|:--------:|:------|
| `username` | string | Yes | The `username` value returned in the OTP challenge response |
| `otp_code` | string | Yes | Exactly 6 digits sent to the user's email |

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

---

## JWT Token Structure

Every JWT issued by vsay-auth contains:

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
| `tenant_id` | Keycloak realm name / organization identifier |
| `role` | `super_admin`, `company_admin`, or `user` |
| `source` | Client type: `ui`, `cli`, or `vscode` |
| `iss` | Always `vsay-auth` |

---

## Using Authentication

### HTTP Requests

```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  https://your-webxterm-instance.com/api/machines
```

### WebSocket Terminal Connections

```
wss://your-webxterm-instance.com/api/terminal/:agent_id/ws?token=YOUR_JWT_TOKEN
```

### Agent Registration

Use your **API key** (from the `api_key` field in the login response, or from the Profile page):

```bash
sudo vsay-agent configure \
  --token YOUR_API_KEY \
  --host https://your-webxterm-instance.com \
  --linux-user ubuntu
```

---

## Login Flow Reference

```
POST /api/auth/login
        │
        ├─ Single tenant + OTP disabled (or CLI/VSCode)
        │   └─ { token, user, expires_in, session_token }  ✅ Done
        │
        ├─ Single tenant + OTP enabled (UI only)
        │   └─ { requires_otp: true, username, otp_expires_in_min }
        │       └─ POST /api/auth/verify-otp { username, otp_code }
        │           └─ { token, user, expires_in }  ✅ Done
        │
        └─ Multiple tenants
            └─ { requires_tenant_selection: true, tenants, session_token }
                └─ POST /api/auth/select-tenant { session_token, tenant_id }
                    ├─ OTP disabled → { token, user, expires_in }  ✅ Done
                    └─ OTP enabled → { requires_otp: true, username }
                        └─ POST /api/auth/verify-otp  ✅ Done
```
