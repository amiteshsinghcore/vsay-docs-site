---
sidebar_position: 4
---

# Users API

Endpoints for user management and role assignments.

## List Users

### GET /users

Get all users in the organization.

**Headers:**

```
Authorization: Bearer YOUR_API_TOKEN
```

**Query Parameters:**

| Parameter | Type | Required | Description |
|:----------|:-----|:--------:|:------------|
| page | integer | No | Page number (default: 1) |
| limit | integer | No | Items per page (default: 20) |
| role | string | No | Filter by role (admin, member, viewer) |
| search | string | No | Search by name or email |

**Response:**

```json
{
  "success": true,
  "data": {
    "users": [
      {
        "id": "usr_123456",
        "email": "john@example.com",
        "name": "John Doe",
        "role": "admin",
        "status": "active",
        "last_login": "2024-01-01T12:00:00Z",
        "created_at": "2024-01-01T00:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 15
    }
  }
}
```

---

## Get User

### GET /users/:id

Get details of a specific user.

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "usr_123456",
    "email": "john@example.com",
    "name": "John Doe",
    "role": "admin",
    "status": "active",
    "permissions": {
      "machines": ["read", "write", "delete"],
      "users": ["read", "write"],
      "sessions": ["read", "write"]
    },
    "machine_access": [
      {
        "machine_id": "mch_123",
        "access_level": "full"
      }
    ],
    "last_login": "2024-01-01T12:00:00Z",
    "created_at": "2024-01-01T00:00:00Z"
  }
}
```

---

## Invite User

### POST /users/invite

Invite a new user to the organization.

**Request Body:**

```json
{
  "email": "newuser@example.com",
  "name": "New User",
  "role": "member",
  "machine_ids": ["mch_123", "mch_456"]
}
```

| Field | Type | Required | Description |
|:------|:-----|:--------:|:------------|
| email | string | Yes | User's email address |
| name | string | No | User's display name |
| role | string | Yes | Role (admin, member, viewer) |
| machine_ids | array | No | IDs of machines to grant access |

**Response:**

```json
{
  "success": true,
  "data": {
    "invitation_id": "inv_789012",
    "email": "newuser@example.com",
    "expires_at": "2024-01-08T00:00:00Z"
  },
  "message": "Invitation sent successfully"
}
```

---

## Update User

### PUT /users/:id

Update user details or role.

**Request Body:**

```json
{
  "name": "John Smith",
  "role": "admin"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "usr_123456",
    "name": "John Smith",
    "role": "admin",
    "updated_at": "2024-01-01T12:00:00Z"
  },
  "message": "User updated successfully"
}
```

---

## Update User Permissions

### PUT /users/:id/permissions

Update machine access permissions for a user.

**Request Body:**

```json
{
  "machine_access": [
    {
      "machine_id": "mch_123",
      "access_level": "full"
    },
    {
      "machine_id": "mch_456",
      "access_level": "read_only"
    }
  ]
}
```

| Access Level | Description |
|:-------------|:------------|
| full | Can connect, execute commands, transfer files |
| read_only | Can view machine details only |
| connect_only | Can connect but cannot transfer files |

**Response:**

```json
{
  "success": true,
  "message": "Permissions updated successfully"
}
```

---

## Remove User

### DELETE /users/:id

Remove a user from the organization.

**Response:**

```json
{
  "success": true,
  "message": "User removed successfully"
}
```

---

## Resend Invitation

### POST /users/invitations/:id/resend

Resend a pending invitation.

**Response:**

```json
{
  "success": true,
  "message": "Invitation resent successfully"
}
```
