---
sidebar_position: 6
---

# Community API

Endpoints for the built-in issue tracker — create issues, post fixes, and vote on solutions. Available in all editions.

## Issues

### POST /api/community/issues

Create a new issue.

**Headers:**

```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Request Body:**

```json
{
  "title": "Nginx not starting after reboot",
  "description": "After last system update, nginx fails to start with error: bind() to 0.0.0.0:80 failed",
  "machine_id": "abc123def456",
  "tags": ["nginx", "systemd"]
}
```

**Response `201 Created`:**

```json
{
  "issue": {
    "id": "issue_123",
    "title": "Nginx not starting after reboot",
    "description": "After last system update...",
    "machine_id": "abc123def456",
    "tags": ["nginx", "systemd"],
    "author_id": "user_456",
    "author_username": "johndoe",
    "status": "open",
    "created_at": "2026-02-06T12:00:00Z"
  }
}
```

---

### GET /api/community/issues

List all issues visible to the current user.

**Response:**

```json
{
  "issues": [
    {
      "id": "issue_123",
      "title": "Nginx not starting after reboot",
      "status": "open",
      "author_username": "johndoe",
      "fix_count": 2,
      "created_at": "2026-02-06T12:00:00Z"
    }
  ]
}
```

---

### GET /api/community/issues/:id

Get a specific issue with full details.

**Response:**

```json
{
  "issue": {
    "id": "issue_123",
    "title": "Nginx not starting after reboot",
    "description": "After last system update...",
    "machine_id": "abc123def456",
    "tags": ["nginx", "systemd"],
    "author_id": "user_456",
    "author_username": "johndoe",
    "status": "open",
    "created_at": "2026-02-06T12:00:00Z",
    "updated_at": "2026-02-06T14:00:00Z"
  }
}
```

---

### PUT /api/community/issues/:id

Update an existing issue (author or admin only).

**Request Body:** Any subset of issue fields to update:

```json
{
  "title": "Updated title",
  "description": "Updated description",
  "status": "resolved"
}
```

**Response:**

```json
{
  "issue": { ... }
}
```

---

### DELETE /api/community/issues/:id

Delete an issue (author or admin only).

**Response:**

```json
{
  "message": "Issue deleted"
}
```

---

## Fixes

### GET /api/community/issues/:id/fixes

List all proposed fixes for an issue.

**Response:**

```json
{
  "fixes": [
    {
      "fix_id": "fix_789",
      "issue_id": "issue_123",
      "content": "Run `sudo systemctl daemon-reload && sudo systemctl start nginx`",
      "author_username": "janedoe",
      "likes": 5,
      "liked_by_me": false,
      "accepted": false,
      "created_at": "2026-02-06T13:00:00Z"
    }
  ]
}
```

---

### POST /api/community/issues/:id/fixes

Post a fix for an issue.

**Request Body:**

```json
{
  "content": "Run `sudo systemctl daemon-reload && sudo systemctl start nginx`"
}
```

**Response `201 Created`:**

```json
{
  "fix": {
    "fix_id": "fix_789",
    "issue_id": "issue_123",
    "content": "Run `sudo systemctl daemon-reload...`",
    "author_username": "janedoe",
    "likes": 0,
    "accepted": false,
    "created_at": "2026-02-06T13:00:00Z"
  }
}
```

---

### POST /api/community/issues/:id/fixes/:fix_id/like

Like a fix (upvote it as helpful).

**Response:**

```json
{
  "message": "Fix liked"
}
```

---

### DELETE /api/community/issues/:id/fixes/:fix_id/like

Remove your like from a fix.

**Response:**

```json
{
  "message": "Like removed"
}
```

---

### POST /api/community/issues/:id/fixes/:fix_id/accept

Mark a fix as the accepted solution (issue author or admin only). This also updates the issue status to `resolved`.

**Response:**

```json
{
  "message": "Fix accepted"
}
```

---

## Image Upload

### POST /api/community/upload

Upload an image to attach to an issue or fix description.

**Request:** `multipart/form-data` with a `file` field.

**Response:**

```json
{
  "url": "https://your-webxterm-instance.com/uploads/image_abc123.png"
}
```

Use the returned URL in your issue/fix content with standard Markdown:

```markdown
![Error screenshot](https://your-webxterm-instance.com/uploads/image_abc123.png)
```
