---
sidebar_position: 2
---

# Authentication API

Endpoints for user authentication and token management.

## Login

### POST /auth/login

Authenticate user with email and password.

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "your_password"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "refresh_token": "eyJhbGciOiJIUzI1NiIs...",
    "expires_at": "2024-01-01T12:00:00Z",
    "user": {
      "id": "usr_123456",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "admin"
    }
  }
}
```

**Example:**

```bash
curl -X POST https://api.vsayterminal.com/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "your_password"}'
```

:::tip Enterprise Feature
Need **OIDC/SSO authentication**? [Upgrade to Enterprise Edition](/docs/next/api/authentication) for Single Sign-On support.
:::

---

## Refresh Token

### POST /auth/refresh

Refresh an expired access token.

**Request Body:**

```json
{
  "refresh_token": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "expires_at": "2024-01-01T12:00:00Z"
  }
}
```

---

## Logout

### POST /auth/logout

Invalidate current session and tokens.

**Headers:**

```
Authorization: Bearer YOUR_API_TOKEN
```

**Response:**

```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## Get Current User

### GET /auth/me

Get the currently authenticated user's profile.

**Headers:**

```
Authorization: Bearer YOUR_API_TOKEN
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "usr_123456",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "admin",
    "created_at": "2024-01-01T00:00:00Z"
  }
}
```
