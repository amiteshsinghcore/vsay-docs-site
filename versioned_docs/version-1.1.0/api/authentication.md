---
sidebar_position: 2
---

# Authentication API

Endpoints for user authentication and token management.

## How Authentication Works

WebXTerm uses **Keycloak** as its central identity platform in both Community and Enterprise editions:

- **Community Edition**: Keycloak manages users directly (email + password stored in Keycloak)
- **Enterprise Edition**: Keycloak acts as an identity broker — it connects to external providers (Microsoft, GitHub, Okta, etc.) and issues its own tokens regardless of which provider the user authenticated with

In both cases, the token that WebXTerm uses to call the machine backend API is **always issued by Keycloak**. The backend validates Keycloak tokens.

```
Community:   User (email/password) → Keycloak → OIDC token → WebXTerm Backend
Enterprise:  User (Microsoft/GitHub/Okta) → External IdP → Keycloak → OIDC token → WebXTerm Backend
```

See [Authentication & OIDC Integration](/docs/next/authentication/oidc-integration) for full setup details.

---

## Signup

### POST /api/signup

Create a new user account.

**Request Body:**

```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "yourpassword"
}
```

| Field | Type | Required | Description |
|:------|:-----|:--------:|:------------|
| username | string | Yes | Unique username |
| email | string | Yes | Valid email address |
| password | string | Yes | Minimum 6 characters |

**Response:**

```json
{
  "message": "User registered successfully",
  "user": {
    "id": "user_id",
    "username": "johndoe",
    "email": "john@example.com"
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

Authenticate and receive a JWT token.

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "yourpassword"
}
```

**Response:**

```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "user_id",
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

:::note Token Expiration
JWT tokens expire after 24 hours. Use the refresh endpoint to get a new token.
:::

---

## Refresh Token

### POST /api/auth/refresh

Get a new JWT token using your current valid token.

**Headers:**

```
Authorization: Bearer YOUR_CURRENT_TOKEN
```

**Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Example:**

```bash
curl -X POST https://your-webxterm-instance.com/api/auth/refresh \
  -H "Authorization: Bearer YOUR_CURRENT_TOKEN"
```

---

## Using Authentication

### HTTP Requests

Include the JWT token in Authorization header:

```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  https://your-webxterm-instance.com/api/machines
```

### WebSocket Connections

Pass the token as a query parameter:

```
wss://your-webxterm-instance.com/api/terminal/:agent_id/ws?token=YOUR_JWT_TOKEN
```

### Agent Registration

Use your API key (from the Profile page) when configuring the agent on your machine:

```bash
sudo vsay-agent configure \
  --token YOUR_API_KEY \
  --host http://your-webxterm-instance.com:8080 \
  --linux-user ubuntu
```

The agent connects to the backend over gRPC (port 50051) and authenticates using your API key. See [Getting Started](/docs/next/getting-started) for full installation details.
