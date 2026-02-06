---
sidebar_position: 1
---

# API Overview

VSAY Terminal provides a RESTful API for integrating with your applications and automating machine management.

## Base URL

```
https://your-vsay-instance.com/api
```

## Authentication

All API requests (except signup/login) require a JWT Bearer token:

```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  https://your-vsay-instance.com/api/machines
```

### Getting a Token

1. Login via `/api/login` endpoint
2. Use the returned `token` in the Authorization header
3. Tokens expire after 24 hours — use `/api/auth/refresh` to renew

## Response Format

Successful responses:

```json
{
  "message": "Success",
  "data": { ... }
}
```

Error responses:

```json
{
  "error": "Error message here"
}
```

## HTTP Status Codes

| Code | Description |
|:-----|:------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 404 | Not Found |
| 500 | Internal Server Error |

## Available Endpoints

### Authentication (Public)
| Method | Endpoint | Description |
|:-------|:---------|:------------|
| POST | `/api/signup` | Create new account |
| POST | `/api/login` | Login and get token |
| POST | `/api/auth/refresh` | Refresh JWT token |

### Machines (Protected)
| Method | Endpoint | Description |
|:-------|:---------|:------------|
| GET | `/api/machines` | List all machines |
| GET | `/api/machines/:agent_id` | Get machine details |
| GET | `/api/machines/:agent_id/logs` | Get command logs |
| POST | `/api/machines/:agent_id/command` | Execute command |
| DELETE | `/api/machines/:agent_id` | Delete machine |

### Dashboard (Protected)
| Method | Endpoint | Description |
|:-------|:---------|:------------|
| GET | `/api/dashboard/stats` | Get statistics |
| GET | `/api/dashboard/recent-machines` | Recent machines |
| GET | `/api/dashboard/recent-activity` | Recent activity |

### Profile (Protected)
| Method | Endpoint | Description |
|:-------|:---------|:------------|
| GET | `/api/profile` | Get user profile |
| POST | `/api/profile/regenerate-api-key` | New API key |
| POST | `/api/profile/reset-password` | Change password |
| POST | `/api/profile/upload-avatar` | Update avatar |

### Terminal Sessions (Protected)
| Method | Endpoint | Description |
|:-------|:---------|:------------|
| GET | `/api/terminal/sessions` | List active sessions |
| DELETE | `/api/terminal/sessions/:id` | Close session |
| WS | `/api/terminal/:agent_id/ws` | WebSocket terminal |

## WebSocket Terminal

For real-time terminal access:

```
wss://your-vsay-instance.com/api/terminal/:agent_id/ws?token=YOUR_JWT_TOKEN
```

## API Sections

- [Authentication](/docs/api/authentication) - Login and signup
- [Machines](/docs/api/machines) - Machine management
- [Sessions](/docs/api/sessions) - Terminal sessions and dashboard
- [Users](/docs/api/users) - Profile management
