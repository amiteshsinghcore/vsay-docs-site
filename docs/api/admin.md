---
sidebar_position: 9
---

# Admin API (Super Admin)

Endpoints for platform-level administration. All endpoints in this section require the `super_admin` role. They are served by the **vsay-auth** service under the `/api/admin/` prefix.

:::warning Super Admin Only
These endpoints are restricted to `super_admin` users only. Organization-level admins (`company_admin`) do not have access to this API.
:::

---

## Organizations

### GET /api/admin/organizations

List all organizations registered on the platform.

**Headers:**

```
Authorization: Bearer YOUR_SUPER_ADMIN_JWT_TOKEN
```

**Response:**

```json
{
  "organizations": [
    {
      "id": "64f1a2b3c4d5e6f7a8b9c0d1",
      "name": "my-org",
      "display_name": "My Company Inc",
      "keycloak_realm": "my-org",
      "enabled": true,
      "user_count": 12,
      "machine_count": 5,
      "created_at": "2026-01-01T00:00:00Z"
    }
  ]
}
```

---

### POST /api/admin/organizations

Create a new organization. This creates the corresponding Keycloak realm.

**Request Body:**

```json
{
  "name": "new-org",
  "display_name": "New Organization Inc"
}
```

**Response `201 Created`:**

```json
{
  "organization": {
    "id": "64f1a2b3c4d5e6f7a8b9c0d2",
    "name": "new-org",
    "display_name": "New Organization Inc",
    "keycloak_realm": "new-org",
    "enabled": true
  }
}
```

---

### GET /api/admin/organizations/:id

Get details of a specific organization.

**Response:** Same shape as the organization object in [List Organizations](#get-apiadminorganizations).

---

### PUT /api/admin/organizations/:id

Update an organization's details or enabled status.

**Request Body:**

```json
{
  "display_name": "Updated Name Inc",
  "enabled": false
}
```

**Response:**

```json
{
  "organization": { ... }
}
```

:::warning Disabling an organization
Setting `enabled: false` prevents all users in that organization from logging in.
:::

---

### DELETE /api/admin/organizations/:id

Delete an organization and its Keycloak realm. This is irreversible.

**Response:**

```json
{
  "message": "Organization deleted successfully"
}
```

---

### GET /api/admin/organizations/:id/stats

Get usage statistics for a specific organization.

**Response:**

```json
{
  "stats": {
    "user_count": 12,
    "machine_count": 5,
    "online_machine_count": 3,
    "group_count": 2,
    "session_count_today": 24
  }
}
```

---

### GET /api/admin/organizations/:id/users

List all users in a specific organization.

**Response:**

```json
{
  "users": [
    {
      "id": "64f1a2b3c4d5e6f7a8b9c0d1",
      "username": "johndoe",
      "email": "john@example.com",
      "role": "company_admin",
      "enabled": true
    }
  ]
}
```

---

### GET /api/admin/organizations/:id/groups

List all groups in a specific organization.

**Response:**

```json
{
  "groups": [
    {
      "id": "grp_123",
      "name": "devops",
      "member_count": 5
    }
  ]
}
```
