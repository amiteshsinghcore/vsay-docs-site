---
sidebar_position: 1
---

# API Overview

WebXTerm Community Edition v1.0.0 provides a RESTful API for integrating with your applications and automating machine management. All requests go to the machine backend directly.

## Base URL

```
https://your-webxterm-instance.com/api
```

## Authentication

All API requests (except signup/login) require a JWT Bearer token:

```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  https://your-webxterm-instance.com/api/machines
```

### Getting a Token

1. Login via `POST /api/login`
2. Use the returned `token` in the Authorization header
3. Tokens expire after 24 hours — use `POST /api/auth/refresh` to renew

## Response Format

Responses are flat JSON objects. Fields vary by endpoint.

Successful responses:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { ... }
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
| 403 | Forbidden |
| 404 | Not Found |
| 409 | Conflict |
| 500 | Internal Server Error |

---

## Complete Endpoint Reference

### Authentication (Public)
| Method | Endpoint | Description |
|:-------|:---------|:------------|
| POST | `/api/signup` | Create new account |
| POST | `/api/login` | Login and get JWT token |
| POST | `/api/auth/refresh` | Refresh JWT token |

### Machines (Protected)
| Method | Endpoint | Description |
|:-------|:---------|:------------|
| GET | `/api/machines` | List all machines |
| POST | `/api/machines` | Create pending machine (get registration token) |
| GET | `/api/machines/by-id/:machine_id` | Get machine by MongoDB ObjectID |
| GET | `/api/machines/:agent_id` | Get machine details |
| DELETE | `/api/machines/:agent_id` | Delete machine |
| POST | `/api/machines/:agent_id/command` | Execute command on machine |
| GET | `/api/machines/:agent_id/logs` | Get command execution logs |
| GET | `/api/machines/:agent_id/logs/search` | Search command logs |
| GET | `/api/machines/:agent_id/sessions` | Get all sessions for machine |
| GET | `/api/machines/:agent_id/sessions/active` | Get active sessions for machine |
| GET | `/api/machines/:agent_id/access/users` | List users with access |
| POST | `/api/machines/:agent_id/access/grant` | Grant user access |
| POST | `/api/machines/:agent_id/access/revoke` | Revoke user access |

### Terminal (Protected)
| Method | Endpoint | Description |
|:-------|:---------|:------------|
| WS | `/api/terminal/:agent_id/ws` | WebSocket terminal connection |
| GET | `/api/terminal/sessions` | List active terminal sessions |
| DELETE | `/api/terminal/sessions/:session_id` | Close a terminal session |
| GET | `/api/sessions/:session_id` | Get session details and command log |

### Dashboard (Protected)
| Method | Endpoint | Description |
|:-------|:---------|:------------|
| GET | `/api/dashboard/stats` | Overview statistics |
| GET | `/api/dashboard/recent-machines` | Last 5 active machines |
| GET | `/api/dashboard/recent-activity` | Last 10 command activities |

### Profile (Protected)
| Method | Endpoint | Description |
|:-------|:---------|:------------|
| GET | `/api/profile` | Get current user profile |
| POST | `/api/profile/regenerate-api-key` | Generate new API key |
| POST | `/api/profile/reset-password` | Change password |
| POST | `/api/profile/upload-avatar` | Update profile avatar |

### Users (Protected, admin only)
| Method | Endpoint | Description |
|:-------|:---------|:------------|
| GET | `/api/users` | List all users (admin only) |

### Community (Protected)
| Method | Endpoint | Description |
|:-------|:---------|:------------|
| GET | `/api/community/issues` | List all issues |
| POST | `/api/community/issues` | Create new issue |
| GET | `/api/community/issues/:id` | Get issue details |
| PUT | `/api/community/issues/:id` | Update issue |
| DELETE | `/api/community/issues/:id` | Delete issue |
| GET | `/api/community/issues/:id/fixes` | List fixes for issue |
| POST | `/api/community/issues/:id/fixes` | Post a fix |
| POST | `/api/community/issues/:id/fixes/:fix_id/like` | Like a fix |
| DELETE | `/api/community/issues/:id/fixes/:fix_id/like` | Remove like |
| POST | `/api/community/issues/:id/fixes/:fix_id/accept` | Accept fix as solution |
| POST | `/api/community/upload` | Upload image attachment |

### Health (Public)
| Method | Endpoint | Description |
|:-------|:---------|:------------|
| GET | `/health` | Health check — no auth required |

---

## WebSocket Terminal

```
wss://your-webxterm-instance.com/api/terminal/:agent_id/ws?token=YOUR_JWT_TOKEN
```

---

## API Sections

- [Authentication](/docs/api/authentication) — Login and signup
- [Machines](/docs/api/machines) — Machine management and access control
- [Sessions](/docs/api/sessions) — Terminal sessions and dashboard
- [Profile](/docs/api/users) — User profile and API keys
