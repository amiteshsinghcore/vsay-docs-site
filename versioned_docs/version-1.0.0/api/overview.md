---
sidebar_position: 1
---

# API Overview

VSAY Terminal provides a RESTful API for programmatic access to all features. This documentation covers authentication, available endpoints, and usage examples.

## Base URL

```
https://api.vsayterminal.com/v1
```

## Authentication

All API requests require authentication using a Bearer token:

```bash
curl -H "Authorization: Bearer YOUR_API_TOKEN" \
  https://api.vsayterminal.com/v1/machines
```

## Response Format

All responses are returned in JSON format:

```json
{
  "success": true,
  "data": { ... },
  "message": "Operation completed successfully"
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid or expired token"
  }
}
```

## HTTP Status Codes

| Code | Description |
|:-----|:------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Internal Server Error |

## Rate Limiting

API requests are rate-limited to ensure fair usage:

| Plan | Requests/Minute |
|:-----|:---------------:|
| Community | 60 |
| Enterprise | 300 |

Rate limit headers are included in all responses:

```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 59
X-RateLimit-Reset: 1640000000
```

## API Sections

- [Authentication](/docs/api/authentication) - Login and token management
- [Machines](/docs/api/machines) - Machine management endpoints
- [Users](/docs/api/users) - User management endpoints
- [Sessions](/docs/api/sessions) - SSH session endpoints

:::info Enterprise API Features
Looking for **OIDC authentication** and **Organization management** APIs? [Upgrade to Enterprise Edition](/docs/next/api/overview).
:::
