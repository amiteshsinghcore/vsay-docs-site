---
sidebar_position: 1
---

# API Overview

WebXTerm provides a RESTful API for integrating with your applications and automating machine management. The API is served by two services:

- **vsay-auth** — handles all authentication, user management, groups, roles, admin, and audit; proxies all other requests to the machine backend
- **vsay-machine-backend** — handles machines, terminals, sessions, dashboard, profile, and community

All requests go through a single base URL.

## Base URL

```
https://your-webxterm-instance.com/api
```

## Authentication

All API requests (except auth endpoints) require a JWT Bearer token issued by vsay-auth:

```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  https://your-webxterm-instance.com/api/machines
```

### Getting a Token

1. Login via `POST /api/auth/login`
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
| 400 | Bad Request — missing or invalid fields |
| 401 | Unauthorized — missing or expired token |
| 403 | Forbidden — insufficient role/permissions |
| 404 | Not Found |
| 409 | Conflict — duplicate username/organization |
| 500 | Internal Server Error |

---

## Complete Endpoint Reference

### Authentication (Public — vsay-auth)
| Method | Endpoint | Description |
|:-------|:---------|:------------|
| POST | `/api/auth/signup` | Create new account and organization |
| POST | `/api/auth/login` | Login — returns token, OTP challenge, or tenant selection |
| POST | `/api/auth/select-tenant` | Select organization for multi-tenant accounts |
| POST | `/api/auth/verify-otp` | Verify email OTP and receive JWT (UI logins) |
| POST | `/api/auth/logout` | Logout current session |
| POST | `/api/auth/refresh` | Refresh JWT token |
| GET | `/api/auth/oidc/microsoft` | Initiate Microsoft OIDC/OAuth2 login (Enterprise) |
| GET | `/api/auth/oidc/github` | Initiate GitHub OIDC/OAuth2 login (Enterprise) |

### Machines (Protected — machine backend)
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

### Terminal (Protected — machine backend)
| Method | Endpoint | Description |
|:-------|:---------|:------------|
| WS | `/api/terminal/:agent_id/ws` | WebSocket terminal connection |
| GET | `/api/terminal/sessions` | List active terminal sessions |
| DELETE | `/api/terminal/sessions/:session_id` | Close a terminal session |
| GET | `/api/sessions/:session_id` | Get session details and command log |

### Dashboard (Protected — machine backend)
| Method | Endpoint | Description |
|:-------|:---------|:------------|
| GET | `/api/dashboard/stats` | Overview statistics (machines, CPU, memory, disk) |
| GET | `/api/dashboard/recent-machines` | Last 5 active machines |
| GET | `/api/dashboard/recent-activity` | Last 10 command activities |

### Profile (Protected — machine backend)
| Method | Endpoint | Description |
|:-------|:---------|:------------|
| GET | `/api/profile` | Get current user profile |
| POST | `/api/profile/regenerate-api-key` | Generate new API key |
| POST | `/api/profile/reset-password` | Change password |
| POST | `/api/profile/upload-avatar` | Update profile avatar |

### Community (Protected — machine backend)
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

### Users (Protected — vsay-auth, Enterprise)
| Method | Endpoint | Description |
|:-------|:---------|:------------|
| GET | `/api/users/me` | Get current user profile |
| GET | `/api/users` | List organization users (admin) |
| GET | `/api/users/:id` | Get user by ID |
| POST | `/api/users` | Create user (admin) |
| PUT | `/api/users/:id` | Update user (admin) |
| DELETE | `/api/users/:id` | Delete user (admin) |
| GET | `/api/users/:id/roles` | Get user roles |
| POST | `/api/users/:id/roles` | Assign user roles (admin) |

### Roles (Protected — vsay-auth, Enterprise)
| Method | Endpoint | Description |
|:-------|:---------|:------------|
| GET | `/api/roles` | List all roles |
| GET | `/api/roles/portal` | List portal-level roles |
| GET | `/api/roles/machine` | List machine-level roles |

### Groups (Protected — vsay-auth, Enterprise)
| Method | Endpoint | Description |
|:-------|:---------|:------------|
| GET | `/api/groups` | List all groups |
| GET | `/api/groups/:id` | Get group details |
| POST | `/api/groups` | Create group (admin) |
| PUT | `/api/groups/:id` | Update group (admin) |
| DELETE | `/api/groups/:id` | Delete group (admin) |
| GET | `/api/groups/:id/members` | List group members |
| POST | `/api/groups/:id/members` | Add member (admin) |
| DELETE | `/api/groups/:id/members` | Remove member (admin) |
| GET | `/api/groups/:id/machines` | List group machines |
| POST | `/api/groups/:id/machines` | Add machines to group (admin) |
| DELETE | `/api/groups/:id/machines/:machine_id` | Remove machine from group (admin) |

### Audit (Protected — vsay-auth, Enterprise, company_admin+)
| Method | Endpoint | Description |
|:-------|:---------|:------------|
| GET | `/api/audit` | Get audit logs (filterable) |
| GET | `/api/audit/tenants` | List tenants in audit scope |

### Admin — Organizations (Protected — vsay-auth, super_admin only)
| Method | Endpoint | Description |
|:-------|:---------|:------------|
| GET | `/api/admin/organizations` | List all organizations |
| POST | `/api/admin/organizations` | Create organization |
| GET | `/api/admin/organizations/:id` | Get organization |
| PUT | `/api/admin/organizations/:id` | Update organization |
| DELETE | `/api/admin/organizations/:id` | Delete organization |
| GET | `/api/admin/organizations/:id/stats` | Organization statistics |
| GET | `/api/admin/organizations/:id/users` | List organization users |
| GET | `/api/admin/organizations/:id/groups` | List organization groups |

### Health (Public)
| Method | Endpoint | Description |
|:-------|:---------|:------------|
| GET | `/health` | Health check — no auth required |

---

## WebSocket Terminal

For real-time terminal access, connect via WebSocket:

```
wss://your-webxterm-instance.com/api/terminal/:agent_id/ws?token=YOUR_JWT_TOKEN
```

---

## API Reference Sections

- [Authentication](/docs/next/api/authentication) — Login, signup, OTP, tenant selection, OIDC/OAuth2
- [Machines](/docs/next/api/machines) — Machine management and access control
- [Sessions](/docs/next/api/sessions) — Terminal sessions and dashboard stats
- [Profile](/docs/next/api/users) — User profile and API keys
- [Community](/docs/next/api/community) — Issue tracker and fixes
- [Users & Roles](/docs/next/api/users-management) — User management and role assignment (Enterprise)
- [Groups](/docs/next/api/groups) — Group management (Enterprise)
- [Admin](/docs/next/api/admin) — Organization administration (super admin)
- [Audit Logs](/docs/next/api/audit) — Audit log access (Enterprise)
