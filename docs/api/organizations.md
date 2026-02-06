---
sidebar_position: 5
---

# Organizations API

:::info Enterprise Only
Organization management is available exclusively in VSAY Terminal Enterprise Edition.
:::

Endpoints for managing organizations in a multi-tenant environment.

## List Organizations

### GET /organizations

Get all organizations (Super Admin only).

**Headers:**

```
Authorization: Bearer YOUR_API_TOKEN
```

**Response:**

```json
{
  "success": true,
  "data": {
    "organizations": [
      {
        "id": "org_123456",
        "name": "Acme Corporation",
        "slug": "acme-corp",
        "plan": "enterprise",
        "members_count": 25,
        "machines_count": 50,
        "created_at": "2024-01-01T00:00:00Z"
      }
    ]
  }
}
```

---

## Get Organization

### GET /organizations/:id

Get details of a specific organization.

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "org_123456",
    "name": "Acme Corporation",
    "slug": "acme-corp",
    "plan": "enterprise",
    "settings": {
      "oidc_enabled": true,
      "oidc_provider": "okta",
      "allowed_domains": ["acme.com"],
      "session_timeout": 3600,
      "mfa_required": true
    },
    "limits": {
      "max_users": 100,
      "max_machines": 200,
      "max_sessions": 50
    },
    "usage": {
      "users": 25,
      "machines": 50,
      "active_sessions": 12
    },
    "created_at": "2024-01-01T00:00:00Z"
  }
}
```

---

## Create Organization

### POST /organizations

Create a new organization.

**Request Body:**

```json
{
  "name": "Acme Corporation",
  "slug": "acme-corp",
  "admin_email": "admin@acme.com",
  "plan": "enterprise"
}
```

| Field | Type | Required | Description |
|:------|:-----|:--------:|:------------|
| name | string | Yes | Organization display name |
| slug | string | Yes | URL-friendly identifier |
| admin_email | string | Yes | Email of the organization admin |
| plan | string | No | Plan type (default: enterprise) |

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "org_123456",
    "name": "Acme Corporation",
    "slug": "acme-corp",
    "created_at": "2024-01-01T00:00:00Z"
  },
  "message": "Organization created successfully"
}
```

---

## Update Organization

### PUT /organizations/:id

Update organization settings.

**Request Body:**

```json
{
  "name": "Acme Corp International",
  "settings": {
    "session_timeout": 7200,
    "mfa_required": true
  }
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "org_123456",
    "name": "Acme Corp International",
    "updated_at": "2024-01-01T12:00:00Z"
  },
  "message": "Organization updated successfully"
}
```

---

## Configure OIDC

### PUT /organizations/:id/oidc

Configure OIDC/SSO settings for the organization.

**Request Body:**

```json
{
  "enabled": true,
  "provider": "okta",
  "client_id": "your_client_id",
  "client_secret": "your_client_secret",
  "issuer_url": "https://your-domain.okta.com",
  "allowed_domains": ["acme.com", "acme.org"],
  "auto_create_users": true,
  "default_role": "member"
}
```

| Field | Type | Required | Description |
|:------|:-----|:--------:|:------------|
| enabled | boolean | Yes | Enable/disable OIDC |
| provider | string | Yes | Provider type (okta, azure, google, custom) |
| client_id | string | Yes | OAuth client ID |
| client_secret | string | Yes | OAuth client secret |
| issuer_url | string | Yes | OIDC issuer URL |
| allowed_domains | array | No | Allowed email domains |
| auto_create_users | boolean | No | Auto-provision users on first login |
| default_role | string | No | Default role for new users |

**Response:**

```json
{
  "success": true,
  "message": "OIDC configuration updated successfully"
}
```

---

## List Organization Members

### GET /organizations/:id/members

Get all members of an organization.

**Response:**

```json
{
  "success": true,
  "data": {
    "members": [
      {
        "id": "usr_123456",
        "email": "admin@acme.com",
        "name": "Admin User",
        "role": "org_admin",
        "joined_at": "2024-01-01T00:00:00Z"
      }
    ]
  }
}
```

---

## Delete Organization

### DELETE /organizations/:id

Delete an organization and all associated data.

:::warning Destructive Action
This action cannot be undone. All machines, users, and data will be permanently deleted.
:::

**Response:**

```json
{
  "success": true,
  "message": "Organization deleted successfully"
}
```
