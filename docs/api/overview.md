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
X-RateLimit-Limit: 300
X-RateLimit-Remaining: 299
X-RateLimit-Reset: 1640000000
```

## API Sections

- [Authentication](/docs/next/api/authentication) - Login, tokens, and OIDC
- [Machines](/docs/next/api/machines) - Machine management endpoints
- [Users](/docs/next/api/users) - User management endpoints
- [Organizations](/docs/next/api/organizations) - Organization management (Enterprise)
- [Sessions](/docs/next/api/sessions) - SSH session endpoints
