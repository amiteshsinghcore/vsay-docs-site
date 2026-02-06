---
sidebar_position: 2
---

# Authentication API

Endpoints for user authentication, token management, and OIDC integration.

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

---

## OIDC Login (Enterprise)

### GET /auth/oidc/authorize

Initiate OIDC authentication flow.

**Query Parameters:**

| Parameter | Type | Required | Description |
|:----------|:-----|:--------:|:------------|
| provider | string | Yes | OIDC provider (okta, azure, google) |
| redirect_uri | string | Yes | Callback URL after authentication |
| state | string | Yes | CSRF protection token |

**Example:**

```bash
curl "https://api.vsayterminal.com/v1/auth/oidc/authorize?provider=okta&redirect_uri=https://app.example.com/callback&state=abc123"
```

---

### POST /auth/oidc/callback

Handle OIDC callback and exchange code for tokens.

**Request Body:**

```json
{
  "code": "authorization_code_from_provider",
  "state": "abc123",
  "provider": "okta"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "refresh_token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "usr_123456",
      "email": "user@example.com",
      "name": "John Doe",
      "organization_id": "org_789"
    }
  }
}
```

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
    "organization": {
      "id": "org_789",
      "name": "Acme Corp"
    },
    "created_at": "2024-01-01T00:00:00Z"
  }
}
```
