---
sidebar_position: 3
---

# Machines API

Endpoints for managing SSH machines and connections.

## List Machines

### GET /machines

Get all machines accessible to the authenticated user.

**Headers:**

```
Authorization: Bearer YOUR_API_TOKEN
```

**Query Parameters:**

| Parameter | Type | Required | Description |
|:----------|:-----|:--------:|:------------|
| page | integer | No | Page number (default: 1) |
| limit | integer | No | Items per page (default: 20, max: 100) |
| status | string | No | Filter by status (online, offline) |
| tag | string | No | Filter by tag |
| search | string | No | Search by name or host |

**Response:**

```json
{
  "success": true,
  "data": {
    "machines": [
      {
        "id": "mch_123456",
        "name": "Production Server",
        "host": "192.168.1.100",
        "port": 22,
        "status": "online",
        "tags": ["production", "web"],
        "last_connected": "2024-01-01T12:00:00Z",
        "created_at": "2024-01-01T00:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 45,
      "total_pages": 3
    }
  }
}
```

**Example:**

```bash
curl -H "Authorization: Bearer YOUR_API_TOKEN" \
  "https://api.vsayterminal.com/v1/machines?status=online&limit=10"
```

---

## Get Machine

### GET /machines/:id

Get details of a specific machine.

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "mch_123456",
    "name": "Production Server",
    "host": "192.168.1.100",
    "port": 22,
    "username": "admin",
    "status": "online",
    "tags": ["production", "web"],
    "description": "Main production web server",
    "jump_host": null,
    "auth_type": "key",
    "last_connected": "2024-01-01T12:00:00Z",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
}
```

---

## Create Machine

### POST /machines

Add a new machine.

**Request Body:**

```json
{
  "name": "Production Server",
  "host": "192.168.1.100",
  "port": 22,
  "username": "admin",
  "auth_type": "key",
  "private_key": "-----BEGIN RSA PRIVATE KEY-----\n...",
  "tags": ["production", "web"],
  "description": "Main production web server"
}
```

| Field | Type | Required | Description |
|:------|:-----|:--------:|:------------|
| name | string | Yes | Display name for the machine |
| host | string | Yes | IP address or hostname |
| port | integer | No | SSH port (default: 22) |
| username | string | Yes | SSH username |
| auth_type | string | Yes | Authentication type (key, password) |
| private_key | string | Conditional | SSH private key (if auth_type is key) |
| password | string | Conditional | SSH password (if auth_type is password) |
| tags | array | No | Tags for organizing machines |
| description | string | No | Machine description |
| jump_host_id | string | No | ID of jump host machine |

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "mch_123456",
    "name": "Production Server",
    "host": "192.168.1.100",
    "status": "pending",
    "created_at": "2024-01-01T00:00:00Z"
  },
  "message": "Machine created successfully"
}
```

---

## Update Machine

### PUT /machines/:id

Update an existing machine.

**Request Body:**

```json
{
  "name": "Production Server (Updated)",
  "tags": ["production", "web", "updated"]
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "mch_123456",
    "name": "Production Server (Updated)",
    "updated_at": "2024-01-01T12:00:00Z"
  },
  "message": "Machine updated successfully"
}
```

---

## Delete Machine

### DELETE /machines/:id

Remove a machine.

**Response:**

```json
{
  "success": true,
  "message": "Machine deleted successfully"
}
```

---

## Test Connection

### POST /machines/:id/test

Test SSH connection to a machine.

**Response:**

```json
{
  "success": true,
  "data": {
    "connected": true,
    "latency_ms": 45,
    "server_info": {
      "os": "Ubuntu 22.04",
      "hostname": "prod-server-01"
    }
  }
}
```

---

## Connect to Machine

### POST /machines/:id/connect

Initiate an SSH session to a machine.

**Response:**

```json
{
  "success": true,
  "data": {
    "session_id": "sess_789012",
    "websocket_url": "wss://api.vsayterminal.com/v1/sessions/sess_789012/ws",
    "expires_at": "2024-01-01T13:00:00Z"
  }
}
```
