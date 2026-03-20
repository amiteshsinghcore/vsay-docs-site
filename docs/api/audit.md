---
sidebar_position: 10
---

# Audit Logs API (Enterprise)

Endpoints for retrieving audit logs across the organization. Available to `company_admin` and `super_admin` roles. Served by the **vsay-auth** service.

---

## Get Audit Logs

### GET /api/audit

Retrieve audit log entries for the current organization. Supports filtering by date, user, action type, and tenant.

**Headers:**

```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Query Parameters:**

| Parameter | Type | Description |
|:----------|:-----|:------------|
| `page` | int | Page number (default: 1) |
| `limit` | int | Results per page (default: 50) |
| `user_id` | string | Filter by user ID |
| `action` | string | Filter by action type (e.g., `login`, `logout`, `machine_access`) |
| `from` | string | Start date (ISO 8601, e.g., `2026-01-01T00:00:00Z`) |
| `to` | string | End date (ISO 8601) |

**Response:**

```json
{
  "logs": [
    {
      "id": "audit_123",
      "user_id": "64f1a2b3c4d5e6f7a8b9c0d1",
      "username": "johndoe",
      "tenant_id": "my-org",
      "action": "login",
      "resource": "auth",
      "ip_address": "203.0.113.42",
      "user_agent": "Mozilla/5.0...",
      "source": "ui",
      "status": "success",
      "timestamp": "2026-02-06T12:00:00Z"
    }
  ],
  "total": 142,
  "page": 1,
  "limit": 50
}
```

**Common action types:**

| Action | Description |
|:-------|:------------|
| `login` | User logged in |
| `logout` | User logged out |
| `login_failed` | Failed login attempt |
| `signup` | New user registered |
| `token_refresh` | JWT token refreshed |
| `machine_access` | User connected to a machine terminal |
| `command_executed` | Command executed on a machine |
| `user_created` | Admin created a new user |
| `user_updated` | Admin updated a user |
| `user_deleted` | Admin deleted a user |
| `machine_registered` | New agent registered |
| `machine_deleted` | Machine removed |

**Example:**

```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  "https://your-webxterm-instance.com/api/audit?action=login&from=2026-02-01T00:00:00Z"
```

---

## Get Tenants in Audit Scope

### GET /api/audit/tenants

For `super_admin` users, returns all tenants (organizations) available in the audit log scope. `company_admin` users see only their own tenant.

**Response:**

```json
{
  "tenants": [
    {
      "tenant_id": "my-org",
      "tenant_name": "My Company Inc"
    },
    {
      "tenant_id": "another-org",
      "tenant_name": "Another Organization"
    }
  ]
}
```

Use a `tenant_id` from this list to filter audit logs to a specific organization (super admin only).
