---
sidebar_position: 2
---

# Authentication API

Endpoints for user authentication and token management.

## How Authentication Works

WebXTerm Community Edition v1.0.0 uses its own **JWT-based authentication** — no external identity provider is required. Passwords are hashed with bcrypt and stored in MongoDB. The backend issues a signed JWT (HS256) on login, which is used for all subsequent API calls.

```
User (email + password) → POST /api/login → bcrypt verify → JWT issued by WebXTerm → API calls
```

:::info[Upgrading?]
For **Keycloak-based authentication**, **Multi-tenancy**, **Mutual TLS**, and **OIDC/OAuth2 Login (Microsoft, GitHub)**, see [Enterprise Edition](/docs/next/intro).
:::

---

## Signup

### POST /api/signup

Create a new user account. Returns a JWT token immediately upon successful registration.

**Request Body:**

```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "yourpassword"
}
```

| Field | Type | Required | Notes |
|:------|:-----|:--------:|:------|
| `username` | string | Yes | Unique display name |
| `email` | string | Yes | Valid email address, must be unique |
| `password` | string | Yes | Minimum 6 characters |

**Response `201 Created`:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "username": "johndoe",
    "email": "john@example.com",
    "api_key": "your_api_key_for_agents"
  }
}
```

**Example:**

```bash
curl -X POST https://your-webxterm-instance.com/api/signup \
  -H "Content-Type: application/json" \
  -d '{"username": "johndoe", "email": "john@example.com", "password": "yourpassword"}'
```

---

## Login

### POST /api/login

Authenticate with email and password to receive a JWT token.

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "yourpassword"
}
```

**Response `200 OK`:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "username": "johndoe",
    "email": "john@example.com",
    "api_key": "your_api_key_for_agents"
  }
}
```

**Example:**

```bash
curl -X POST https://your-webxterm-instance.com/api/login \
  -H "Content-Type: application/json" \
  -d '{"email": "john@example.com", "password": "yourpassword"}'
```

:::note[Token Expiration]
JWT tokens expire after 24 hours. Use the refresh endpoint to get a new token without logging in again.
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
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Example:**

```bash
curl -X POST https://your-webxterm-instance.com/api/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{"token": "YOUR_CURRENT_JWT_TOKEN"}'
```

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

Use your **API key** (from the `api_key` field in the signup/login response, or from the Profile page) when configuring the agent on a machine:

```bash
sudo vsay-agent configure \
  --token YOUR_API_KEY \
  --host https://your-webxterm-instance.com \
  --linux-user ubuntu
```

The agent communicates with the backend over gRPC and authenticates using the API key — it does not use the JWT token. See [Getting Started](/docs/getting-started) for full agent installation details.
