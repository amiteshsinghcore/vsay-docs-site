---
sidebar_position: 6
---

# Sessions API

Endpoints for managing SSH sessions and terminal connections.

## List Sessions

### GET /sessions

Get all active SSH sessions.

**Headers:**

```
Authorization: Bearer YOUR_API_TOKEN
```

**Query Parameters:**

| Parameter | Type | Required | Description |
|:----------|:-----|:--------:|:------------|
| status | string | No | Filter by status (active, ended) |
| machine_id | string | No | Filter by machine |
| user_id | string | No | Filter by user |
| from | string | No | Start date (ISO 8601) |
| to | string | No | End date (ISO 8601) |

**Response:**

```json
{
  "success": true,
  "data": {
    "sessions": [
      {
        "id": "sess_123456",
        "user": {
          "id": "usr_123",
          "name": "John Doe"
        },
        "machine": {
          "id": "mch_456",
          "name": "Production Server"
        },
        "status": "active",
        "started_at": "2024-01-01T12:00:00Z",
        "last_activity": "2024-01-01T12:30:00Z",
        "ip_address": "192.168.1.50"
      }
    ]
  }
}
```

---

## Get Session

### GET /sessions/:id

Get details of a specific session.

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "sess_123456",
    "user": {
      "id": "usr_123",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "machine": {
      "id": "mch_456",
      "name": "Production Server",
      "host": "192.168.1.100"
    },
    "status": "active",
    "started_at": "2024-01-01T12:00:00Z",
    "last_activity": "2024-01-01T12:30:00Z",
    "ip_address": "192.168.1.50",
    "user_agent": "Mozilla/5.0...",
    "commands_count": 42
  }
}
```

---

## Create Session

### POST /sessions

Create a new SSH session (connect to a machine).

**Request Body:**

```json
{
  "machine_id": "mch_456",
  "terminal_size": {
    "cols": 120,
    "rows": 40
  }
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "session_id": "sess_123456",
    "websocket_url": "wss://api.vsayterminal.com/v1/sessions/sess_123456/ws",
    "token": "session_token_for_ws_auth",
    "expires_at": "2024-01-01T13:00:00Z"
  }
}
```

---

## WebSocket Connection

### WSS /sessions/:id/ws

Connect to an active session via WebSocket for real-time terminal interaction.

**Connection:**

```javascript
const ws = new WebSocket('wss://api.vsayterminal.com/v1/sessions/sess_123456/ws');

ws.onopen = () => {
  // Authenticate
  ws.send(JSON.stringify({
    type: 'auth',
    token: 'session_token_for_ws_auth'
  }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.type === 'output') {
    // Display terminal output
    terminal.write(data.data);
  }
};

// Send input
ws.send(JSON.stringify({
  type: 'input',
  data: 'ls -la\n'
}));

// Resize terminal
ws.send(JSON.stringify({
  type: 'resize',
  cols: 120,
  rows: 40
}));
```

**Message Types:**

| Type | Direction | Description |
|:-----|:----------|:------------|
| auth | Client → Server | Authenticate session |
| input | Client → Server | Send terminal input |
| resize | Client → Server | Resize terminal |
| output | Server → Client | Terminal output |
| error | Server → Client | Error message |
| disconnect | Server → Client | Session ended |

---

## Terminate Session

### DELETE /sessions/:id

Terminate an active SSH session.

**Response:**

```json
{
  "success": true,
  "message": "Session terminated successfully"
}
```

---

## Get Session Logs

### GET /sessions/:id/logs

Get command history and output logs for a session.

**Query Parameters:**

| Parameter | Type | Required | Description |
|:----------|:-----|:--------:|:------------|
| format | string | No | Output format (json, text) |

**Response:**

```json
{
  "success": true,
  "data": {
    "session_id": "sess_123456",
    "logs": [
      {
        "timestamp": "2024-01-01T12:00:00Z",
        "type": "command",
        "content": "ls -la"
      },
      {
        "timestamp": "2024-01-01T12:00:01Z",
        "type": "output",
        "content": "total 42\ndrwxr-xr-x 5 user user 4096 Jan 1 12:00 .\n..."
      }
    ]
  }
}
```

---

## Session Statistics

### GET /sessions/stats

Get session statistics for the organization.

**Query Parameters:**

| Parameter | Type | Required | Description |
|:----------|:-----|:--------:|:------------|
| period | string | No | Time period (day, week, month) |

**Response:**

```json
{
  "success": true,
  "data": {
    "total_sessions": 1250,
    "active_sessions": 15,
    "total_duration_hours": 4500,
    "unique_users": 25,
    "top_machines": [
      {
        "machine_id": "mch_456",
        "name": "Production Server",
        "sessions_count": 350
      }
    ]
  }
}
```
