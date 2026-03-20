---
sidebar_position: 8
---

# Groups API (Enterprise)

Endpoints for managing user groups and associating groups with machines. Groups allow you to organize users and control machine access in bulk. Available in Enterprise editions.

---

## List Groups

### GET /api/groups

List all groups in the current organization.

**Headers:**

```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response:**

```json
{
  "groups": [
    {
      "id": "grp_123",
      "name": "devops",
      "description": "DevOps team",
      "member_count": 5,
      "machine_count": 3,
      "created_at": "2026-01-01T00:00:00Z"
    }
  ]
}
```

---

## Get Group

### GET /api/groups/:id

Get details of a specific group.

**Response:**

```json
{
  "group": {
    "id": "grp_123",
    "name": "devops",
    "description": "DevOps team",
    "member_count": 5,
    "machine_count": 3,
    "created_at": "2026-01-01T00:00:00Z"
  }
}
```

---

## Create Group

### POST /api/groups

Create a new group. Requires `company_admin` role.

**Request Body:**

```json
{
  "name": "devops",
  "description": "DevOps team with production access"
}
```

**Response `201 Created`:**

```json
{
  "group": {
    "id": "grp_123",
    "name": "devops",
    "description": "DevOps team with production access"
  }
}
```

---

## Update Group

### PUT /api/groups/:id

Update group name or description. Requires `company_admin` role.

**Request Body:**

```json
{
  "name": "devops-team",
  "description": "Updated description"
}
```

---

## Delete Group

### DELETE /api/groups/:id

Delete a group. Requires `company_admin` role.

**Response:**

```json
{
  "message": "Group deleted successfully"
}
```

---

## Group Members

### GET /api/groups/:id/members

List all members of a group.

**Response:**

```json
{
  "members": [
    {
      "user_id": "64f1a2b3c4d5e6f7a8b9c0d1",
      "username": "johndoe",
      "email": "john@example.com",
      "role": "user"
    }
  ]
}
```

---

### POST /api/groups/:id/members

Add a user to a group. Requires `company_admin` role.

**Request Body:**

```json
{
  "user_id": "64f1a2b3c4d5e6f7a8b9c0d1"
}
```

**Response:**

```json
{
  "message": "Member added to group"
}
```

---

### DELETE /api/groups/:id/members

Remove a user from a group. Requires `company_admin` role.

**Request Body:**

```json
{
  "user_id": "64f1a2b3c4d5e6f7a8b9c0d1"
}
```

**Response:**

```json
{
  "message": "Member removed from group"
}
```

---

## Group Machines

### GET /api/groups/:id/machines

List all machines associated with a group. Members of this group have access to these machines.

**Response:**

```json
{
  "machines": [
    {
      "agent_id": "abc123def456",
      "name": "production-server",
      "status": "online"
    }
  ]
}
```

---

### POST /api/groups/:id/machines

Associate machines with a group, granting all group members access. Requires `company_admin` role.

**Request Body:**

```json
{
  "machine_ids": ["abc123def456", "def789ghi012"]
}
```

**Response:**

```json
{
  "message": "Machines added to group"
}
```

---

### DELETE /api/groups/:id/machines/:machine_id

Remove a machine from a group, revoking group-based access. Requires `company_admin` role.

**Response:**

```json
{
  "message": "Machine removed from group"
}
```
