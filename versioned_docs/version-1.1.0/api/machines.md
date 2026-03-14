---
sidebar_position: 3
---

# Machines API

Endpoints for managing registered machines and executing commands.

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
  https://your-vsay-instance.com/api/machines
```

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
| cli | Command from VSAY Shell CLI |
| vscode | Command from VSCode Extension |

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
  https://your-vsay-instance.com/api/machines/abc123def456
```

---

## WebSocket Terminal

### WS /api/terminal/:agent_id/ws

Open a WebSocket connection for real-time terminal access.

**Connection URL:**

```
wss://your-vsay-instance.com/api/terminal/:agent_id/ws?token=YOUR_JWT_TOKEN
```

**JavaScript Example:**

```javascript
const agentId = 'abc123def456';
const token = 'your_jwt_token';

const ws = new WebSocket(
  `wss://your-vsay-instance.com/api/terminal/${agentId}/ws?token=${token}`
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
