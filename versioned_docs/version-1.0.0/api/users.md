---
sidebar_position: 4
---

# Profile API

Endpoints for managing your user profile and API keys.

## Get Profile

### GET /api/profile

Get your user profile information.

**Headers:**

```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response:**

```json
{
  "user": {
    "id": "user_123",
    "username": "johndoe",
    "email": "john@example.com",
    "api_key": "vsay_ak_xxxxxxxxxxxxx",
    "avatar_url": "https://example.com/avatar.png",
    "created_at": "2026-01-01T00:00:00Z"
  }
}
```

---

## Regenerate API Key

### POST /api/profile/regenerate-api-key

Generate a new API key. The old key will be invalidated immediately.

**Headers:**

```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response:**

```json
{
  "message": "API key regenerated",
  "api_key": "vsay_ak_newkeyhere"
}
```

:::warning Important
Regenerating your API key will disconnect all agents using the old key. You'll need to re-register your agents with the new key.
:::

---

## Reset Password

### POST /api/profile/reset-password

Change your account password.

**Request Body:**

```json
{
  "current_password": "oldpassword",
  "new_password": "newpassword"
}
```

| Field | Type | Required | Description |
|:------|:-----|:--------:|:------------|
| current_password | string | Yes | Your current password |
| new_password | string | Yes | New password (min 6 chars) |

**Response:**

```json
{
  "message": "Password updated successfully"
}
```

---

## Update Avatar

### POST /api/profile/upload-avatar

Update your profile avatar URL.

**Request Body:**

```json
{
  "avatar_url": "https://example.com/new-avatar.png"
}
```

**Response:**

```json
{
  "message": "Avatar updated",
  "avatar_url": "https://example.com/new-avatar.png"
}
```

---

## API Key Usage

Your API key is used when registering the VSAY Agent on your machines:

```bash
# Register agent with your API key
vsay-agent --token YOUR_API_KEY --host your-vsay-instance.com
```

The API key authenticates the agent to connect and register with your account. Keep it secure and regenerate it if compromised.
