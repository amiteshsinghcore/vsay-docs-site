---
sidebar_position: 3
---

# Machines API

Endpoints for managing registered machines, access control, sessions, and executing commands.

## Register a Machine (Create Pending)

### POST /api/machines

Create a pending machine entry and receive a registration token. The agent on the target machine uses this token to self-register with the backend.

**Request Body:**

```json
{
  "name": "production-server",
  "description": "Main production server",
  "linux_user": "ubuntu"
}
```

**Response `201 Created`:**

```json
{
  "machine": {
    "agent_id": "abc123def456",
    "name": "production-server",
    "status": "pending",
    "registration_token": "reg_token_here"
  }
}
```

Then configure the agent on the target machine with this token:

```bash
sudo vsay-agent configure \
  --token reg_token_here \
  --host https://your-webxterm-instance.com \
  --linux-user ubuntu
```

---

## List Machines

### GET /api/machines

Get all machines registered to your account.

**Headers:**

```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response:**

```json
{
  "machines": [
    {
      "agent_id": "abc123def456",
      "name": "production-server",
      "description": "Main production server",
      "os": "Ubuntu 22.04",
      "ip_address": "192.168.1.100",
      "status": "online",
      "cpu_percent": 25.5,
      "memory_percent": 60.2,
      "disk_percent": 45.0,
      "network_rx_bytes": 1024000,
      "network_tx_bytes": 512000,
      "uptime": "5d 12h 30m",
      "last_active": "2026-02-06T12:00:00Z"
    }
  ]
}
```

**Example:**

```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  https://your-webxterm-instance.com/api/machines
```

---

## Get Machine by MongoDB ID

### GET /api/machines/by-id/:machine_id

Get machine details using the MongoDB ObjectID (useful when you have the internal `_id` rather than the `agent_id`).

**Response:** Same shape as [Get Machine Details](#get-machine-details).

---

## Get Machine Details

### GET /api/machines/:agent_id

Get details of a specific machine.

**Response:**

```json
{
  "machine": {
    "agent_id": "abc123def456",
    "name": "production-server",
    "description": "Main production server",
    "os": "Ubuntu 22.04",
    "ip_address": "192.168.1.100",
    "status": "online",
    "cpu_percent": 25.5,
    "memory_percent": 60.2,
    "disk_percent": 45.0,
    "network_rx_bytes": 1024000,
    "network_tx_bytes": 512000,
    "uptime": "5d 12h 30m",
    "last_active": "2026-02-06T12:00:00Z",
    "metadata": {
      "environment": "production",
      "team": "backend"
    }
  }
}
```

---

## Execute Command

### POST /api/machines/:agent_id/command

Send a command to be executed on a machine.

**Request Body:**

```json
{
  "command": "ls -la /var/log"
}
```

**Response:**

```json
{
  "message": "Command sent",
  "command": "ls -la /var/log"
}
```

:::info
Command output is streamed via the WebSocket terminal connection, not returned in this API response. Use this endpoint for automated command execution.
:::

---

## Get Command Logs

### GET /api/machines/:agent_id/logs

Get command execution history for a machine.

**Response:**

```json
{
  "logs": [
    {
      "id": "log_123",
      "command": "ls -la",
      "user_id": "user_456",
      "username": "johndoe",
      "timestamp": "2026-02-06T12:00:00Z",
      "success": true,
      "source": "ui",
      "session_id": "sess_789"
    }
  ]
}
```

**Log Sources:**

| Source | Description |
|:-------|:------------|
| ui | Command from Web Terminal |
| cli | Command from WebXTerm Shell CLI |
| vscode | Command from VSCode Extension |

---

## Search Command Logs

### GET /api/machines/:agent_id/logs/search

Search command execution history for a machine by keyword.

**Query Parameters:**

| Parameter | Type | Description |
|:----------|:-----|:------------|
| `q` | string | Search term (matches against command text) |
| `limit` | int | Max results to return (optional) |

**Example:**

```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  "https://your-webxterm-instance.com/api/machines/abc123/logs/search?q=nginx"
```

**Response:** Same shape as [Get Command Logs](#get-command-logs) filtered to matching entries.

---

## Machine Sessions

### GET /api/machines/:agent_id/sessions

Get all terminal sessions (past and active) for a specific machine.

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
      "status": "closed",
      "started_at": "2026-02-06T12:00:00Z",
      "ended_at": "2026-02-06T12:30:00Z",
      "browser": "Chrome",
      "os": "macOS"
    }
  ]
}
```

---

### GET /api/machines/:agent_id/sessions/active

Get only the currently active (open) terminal sessions for a specific machine.

**Response:** Same shape as above, filtered to sessions with `status: "active"`.

---

## Machine Access Control

### GET /api/machines/:agent_id/access/users

List all users who have been granted access to this machine.

**Response:**

```json
{
  "users": [
    {
      "user_id": "user_456",
      "username": "janedoe",
      "email": "jane@example.com",
      "role": "user"
    }
  ]
}
```

---

### POST /api/machines/:agent_id/access/grant

Grant a user access to connect to this machine. Only the machine owner or an admin can grant access.

**Request Body:**

```json
{
  "user_id": "user_456"
}
```

**Response:**

```json
{
  "message": "Access granted"
}
```

**Example:**

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"user_id": "user_456"}' \
  https://your-webxterm-instance.com/api/machines/abc123/access/grant
```

---

### POST /api/machines/:agent_id/access/revoke

Revoke a user's access to this machine.

**Request Body:**

```json
{
  "user_id": "user_456"
}
```

**Response:**

```json
{
  "message": "Access revoked"
}
```

---

## Delete Machine

### DELETE /api/machines/:agent_id

Remove a machine from your account.

**Response:**

```json
{
  "message": "Machine deleted successfully"
}
```

**Example:**

```bash
curl -X DELETE \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  https://your-webxterm-instance.com/api/machines/abc123def456
```

---

## WebSocket Terminal

### WS /api/terminal/:agent_id/ws

Open a WebSocket connection for real-time terminal access.

**Connection URL:**

```
wss://your-webxterm-instance.com/api/terminal/:agent_id/ws?token=YOUR_JWT_TOKEN
```

**JavaScript Example:**

```javascript
const agentId = 'abc123def456';
const token = 'your_jwt_token';

const ws = new WebSocket(
  `wss://your-webxterm-instance.com/api/terminal/${agentId}/ws?token=${token}`
);

ws.onopen = () => {
  console.log('Connected to terminal');
};

ws.onmessage = (event) => {
  // Terminal output - write to your terminal emulator
  console.log(event.data);
};

// Send command input
ws.send('ls -la\n');

// Resize terminal (send as JSON)
ws.send(JSON.stringify({
  type: 'resize',
  cols: 120,
  rows: 40
}));
```

**Message Types:**

| Type | Direction | Description |
|:-----|:----------|:------------|
| text | Client → Server | Terminal input (commands) |
| resize | Client → Server | Resize terminal (JSON) |
| output | Server → Client | Terminal output |
