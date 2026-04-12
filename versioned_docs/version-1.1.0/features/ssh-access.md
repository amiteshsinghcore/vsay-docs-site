---
sidebar_position: 1
---

# Secure SSH Access

WebXTerm provides secure remote terminal access to your machines through an **agent-based WebSocket tunneling** architecture — no open inbound ports, no SSH key management, no bastion hosts required.

## How It Works

WebXTerm uses a lightweight agent (`vsay-agent`) installed on each machine. The agent establishes an outbound gRPC connection to the WebXTerm backend. When you open a terminal session, the backend bridges your WebSocket connection to the agent's gRPC stream, which runs a PTY shell on the machine.

```
You (Browser / CLI / VSCode)
        │
        │  WebSocket (wss://)
        ▼
  WebXTerm Backend
  (HTTP :8080 / HTTPS :8443)
        │
        │  gRPC + mTLS (:8081)  ← outbound from agent, mutual certificate auth
        ▼
  vsay-agent (on your machine)
        │
        │  PTY (pseudo-terminal)
        ▼
  Shell process (bash / sh)
  running as configured system user
```

All connections are:
- **Mutually Authenticated** — agents connect via mTLS (both sides verify certificates); users authenticate with JWT tokens
- **Encrypted** — WebSocket traffic secured over TLS/WSS; agent gRPC tunnel uses mutual TLS
- **Authorized** — backend verifies the user has explicit access to the machine before opening a session
- **Logged** — all commands typed in a terminal session are recorded to the audit log

## Connection Flow

1. You click **"Connect"** on a machine (or run `vsay-shell-cli connect <name>`, or click the connect icon in VSCode)
2. The client opens a WebSocket to:
   ```
   wss://your-webxterm-instance.com/api/terminal/{agent_id}/ws?token=JWT_TOKEN
   ```
3. The backend validates your token, confirms you own the machine, and looks up the agent's live gRPC stream
4. The backend forwards your keystrokes to the agent over gRPC
5. The agent writes input to a PTY running a shell as the configured system user
6. Shell output flows back: agent → gRPC → backend → WebSocket → your terminal emulator

## Machine Registration

Machines are registered by installing `vsay-agent` on them and running:

```bash
sudo vsay-agent configure \
  --token YOUR_API_KEY \
  --host http://your-webxterm-instance.com:8080 \
  --linux-user ubuntu
```

The agent:
- Saves config to `/etc/vsay/agent.yaml`
- Installs itself as a **systemd service** (auto-starts on boot, restarts on failure)
- Connects outbound to the backend — **no inbound firewall rules needed**
- Sends periodic heartbeats (every 30 seconds) with CPU, memory, and disk stats
- Appears in your dashboard as **Online**

See [Getting Started](/docs/next/getting-started) for full installation steps.

## Authentication

### User Authentication (JWT)

Users authenticate with email/password at login and receive a **JWT token** (24-hour expiry). This token is used:
- As an `Authorization: Bearer` header for all REST API calls
- As a `?token=` query parameter for WebSocket terminal connections

### Agent Authentication (mTLS)

The `vsay-agent` authenticates to the backend using **mutual TLS (mTLS)**. During initial registration (`vsay-agent configure`), a one-time bootstrap token is used to obtain a signed client certificate from the backend's private CA. All subsequent connections use this certificate — the bootstrap token is never sent again.

The backend verifies the agent's certificate against the CA on every gRPC connection. Agents without a valid certificate cannot connect.

:::warning[Keep your bootstrap token secure]
The bootstrap token is used only once during `vsay-agent configure` to obtain a signed certificate. After configuration, the agent uses its certificate for authentication. If the backend CA is rotated, agents will need to re-register.
:::

## Security Features

### Transport Security

| Layer | Protocol |
|:------|:---------|
| Browser / CLI / VSCode → Backend | WebSocket over TLS (WSS / HTTPS) |
| Backend ↔ Agent | gRPC over mutual TLS (mTLS) — agent presents signed client cert |
| Agent process isolation | Runs as a specified system user (not root) |

### Session Security

- **JWT validation** on every WebSocket connection
- **Ownership check** — users can only access machines they registered
- **Command logging** — every command entered in a terminal session is recorded
- **Machine status** — machines that stop sending heartbeats are automatically marked offline

### Agent Hardening

The systemd unit for `vsay-agent` includes security hardening:
- `NoNewPrivileges=true` — prevents privilege escalation
- `PrivateTmp=true` — isolated `/tmp`
- `ProtectSystem=strict` — filesystem is read-only except `/etc/vsay` and `/var/log/vsay`

## Command Restrictions

When configuring the agent, you can control what commands are allowed in terminal sessions:

```bash
sudo vsay-agent configure \
  --token YOUR_API_KEY \
  --host http://your-webxterm-instance.com:8080 \
  --linux-user ubuntu \
  --allow-sudo          # Allow sudo in terminal sessions
```

The backend can also push `ConfigUpdate` messages to the agent to update allowed/blocked command lists without restarting the agent.

## Best Practices

1. **Run the agent as a least-privilege user** — use a dedicated system user with only necessary permissions
2. **Enable TLS on the backend** — use HTTPS/WSS in production
3. **Rotate agent certificates periodically** — re-register agents when certificates are near expiry
4. **Review audit logs** — monitor command history for unexpected activity
5. **Use `--allow-sudo` only when needed** — restrict sudo access by default
