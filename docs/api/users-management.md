---
sidebar_position: 7
---

# Users & Roles API (Enterprise)

Endpoints for user management, role assignment, and listing. These endpoints are served by the **vsay-auth** service. Most write operations require `company_admin` or `super_admin` role.

:::info[Enterprise Only]
These endpoints are available in Enterprise editions. Community edition exposes only `GET /api/users` (admin list) and `GET /api/profile/*` via the machine backend.
:::

---

## Current User

### GET /api/users/me

Get the profile of the currently authenticated user.

**Headers:**

```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response:**

```json
{
  "user": {
    "id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "username": "johndoe",
    "email": "john@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "tenant_id": "my-org",
    "tenant_name": "My Company Inc",
    "role": "company_admin",
    "machine_role": "user",
    "groups": ["devops"],
    "email_verified": true,
    "api_key": "your_api_key"
  }
}
```

---

## List Users

### GET /api/users

List all users in the current organization. Requires `company_admin` or `super_admin` role.

**Response:**

```json
{
  "users": [
    {
      "id": "64f1a2b3c4d5e6f7a8b9c0d1",
      "username": "johndoe",
      "email": "john@example.com",
      "first_name": "John",
      "last_name": "Doe",
      "role": "company_admin",
      "machine_role": "user",
      "groups": ["devops"],
      "enabled": true,
      "email_verified": true,
      "created_at": "2026-01-01T00:00:00Z",
      "last_login": "2026-02-06T12:00:00Z"
    }
  ]
}
```

---

## Get User

### GET /api/users/:id

Get details of a specific user by their ID.

**Response:** Same shape as the user object in [List Users](#list-users).

---

## Create User

### POST /api/users

Create a new user in the organization. Requires `company_admin` role. Creates the user in both Keycloak and MongoDB.

**Request Body:**

```json
{
  "username": "janedoe",
  "email": "jane@example.com",
  "password": "initialpassword",
  "first_name": "Jane",
  "last_name": "Doe",
  "role": "user",
  "machine_role": "user",
  "groups": ["devops"]
}
```

| Field | Type | Required | Notes |
|:------|:-----|:--------:|:------|
| `username` | string | Yes | 3–50 characters, globally unique |
| `email` | string | Yes | Valid email |
| `password` | string | Yes | Minimum 8 characters |
| `first_name` | string | Yes | |
| `last_name` | string | Yes | |
| `role` | string | No | `company_admin` or `user` (default: `user`) |
| `machine_role` | string | No | Machine-level role |
| `groups` | string[] | No | Group names to assign |

**Response `201 Created`:**

```json
{
  "user": {
    "id": "64f1a2b3c4d5e6f7a8b9c0d2",
    "username": "janedoe",
    "email": "jane@example.com",
    ...
  }
}
```

:::tip[OIDC/OAuth2 users without a password]
If the user will log in exclusively via Microsoft or GitHub OIDC/OAuth2, you can create the account here without a password — just register with a placeholder and have them use the OIDC/OAuth2 login flow.
:::

---

## Update User

### PUT /api/users/:id

Update a user's details. Requires `company_admin` role.

**Request Body:** Any subset of updatable fields:

```json
{
  "first_name": "Jane",
  "last_name": "Smith",
  "role": "company_admin",
  "machine_role": "user",
  "groups": ["devops", "sre"],
  "enabled": true
}
```

**Response:**

```json
{
  "user": { ... }
}
```

---

## Delete User

### DELETE /api/users/:id

Delete a user from the organization. Requires `company_admin` role. Removes the user from both Keycloak and MongoDB.

**Response:**

```json
{
  "message": "User deleted successfully"
}
```

---

## Roles

### GET /api/roles

List all available roles in the system.

**Response:**

```json
{
  "roles": [
    { "name": "super_admin", "description": "Platform-level administrator" },
    { "name": "company_admin", "description": "Organization administrator" },
    { "name": "user", "description": "Standard user" }
  ]
}
```

---

### GET /api/roles/portal

List portal-level roles (organization-level access roles).

---

### GET /api/roles/machine

List machine-level roles (used for per-machine access control).

---

### GET /api/users/:id/roles

Get the roles assigned to a specific user.

**Response:**

```json
{
  "roles": ["company_admin"]
}
```

---

### POST /api/users/:id/roles

Assign roles to a user. Requires `company_admin` role.

**Request Body:**

```json
{
  "roles": ["company_admin"]
}
```

**Response:**

```json
{
  "message": "Roles assigned successfully"
}
```
