---
sidebar_position: 5
---

# Sessions & Dashboard API

Endpoints for terminal sessions and dashboard statistics.

## List Active Sessions

### GET /api/terminal/sessions

Get all active terminal sessions.

**Headers:**

```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response:**

```json
{
  "sessions": [
    {
      "session_id": "sess_123456",
      "agent_id": "abc123",
      "machine_name": "production-server",
      "user_id": "user_456",
      "username": "johndoe",
      "source": "ui",
      "status": "active",
      "started_at": "2026-02-06T12:00:00Z",
      "browser": "Chrome",
      "os": "macOS"
    }
  ]
}
```

**Session Sources:**

| Source | Description |
|:-------|:------------|
| ui | Web Terminal (Browser) |
| cli | VSAY Shell CLI |
| vscode | VSCode Extension |

---

## Close Session

### DELETE /api/terminal/sessions/:session_id

Terminate an active terminal session.

**Response:**

```json
{
  "message": "Session closed"
}
```

**Example:**

```bash
curl -X DELETE \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  https://your-vsay-instance.com/api/terminal/sessions/sess_123456
```

---

## Dashboard Statistics

### GET /api/dashboard/stats

Get overview statistics for your machines.

**Response:**

```json
{
  "online_count": 5,
  "offline_count": 2,
  "avg_cpu": 35.5,
  "avg_memory": 62.3,
  "avg_disk": 48.0
}
```

| Field | Description |
|:------|:------------|
| online_count | Number of online machines |
| offline_count | Number of offline machines |
| avg_cpu | Average CPU usage across online machines |
| avg_memory | Average memory usage across online machines |
| avg_disk | Average disk usage across online machines |

---

## Recent Activity

### GET /api/dashboard/recent-activity

Get recent command activity across all machines (last 10 activities).

**Response:**

```json
{
  "activities": [
    {
      "id": "log_123",
      "command": "systemctl status nginx",
      "machine_name": "production-server",
      "agent_id": "abc123",
      "username": "johndoe",
      "source": "ui",
      "timestamp": "2026-02-06T12:00:00Z"
    }
  ]
}
```

---

## Recent Machines

### GET /api/dashboard/recent-machines

Get recently active machines (last 5 machines).

**Response:**

```json
{
  "machines": [
    {
      "agent_id": "abc123",
      "name": "production-server",
      "status": "online",
      "cpu_percent": 25.5,
      "memory_percent": 60.2,
      "last_active": "2026-02-06T12:00:00Z"
    }
  ]
}
```

---

## Health Check

### GET /health

Check if the VSAY Terminal backend is running.

**Response:**

```json
{
  "status": "ok"
}
```

This endpoint does not require authentication.
