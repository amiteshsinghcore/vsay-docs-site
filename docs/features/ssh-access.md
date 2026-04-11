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
        │  HTTPS / WSS
        ▼
  WebXTerm Backend
  (HTTP :8080)
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
- **Logged** — all commands typed in a terminal session are recorded to the audit log with user, timestamp, and exit code

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

The `vsay-agent` uses **mutual TLS (mTLS)** to authenticate with the backend — the gold standard for machine-to-machine security.

**How it works:**

1. During `vsay-agent configure`, the agent receives a **bootstrap token** (one-time registration token tied to the machine you created in the dashboard)
2. The agent fetches the backend's **CA certificate** and gets a **signed client certificate** from the backend
3. On every connection after that, the agent presents its **client certificate** — no token needed
4. The backend verifies the client cert was signed by its CA → connection established

This means:
- No long-lived secrets on disk after initial setup
- If a machine is compromised, you revoke its cert from the dashboard
- Backend upgrades automatically re-issue certs to all agents on reconnect

:::tip
The bootstrap token is only used once during `configure`. All subsequent reconnects use mTLS certificates — your 1500 machines come back online automatically after any backend restart or upgrade.
:::

## Security Features

### Transport Security

| Layer | Protocol | Details |
|:------|:---------|:--------|
| Browser / CLI / VSCode → Backend | HTTPS / WSS | TLS encrypted |
| Agent → Backend (gRPC) | mTLS on port 8081 | Both sides present certificates — mutual verification |
| Agent process isolation | Linux user | Runs as a specified non-root system user |

### mTLS Deep Dive

WebXTerm runs a **Private Certificate Authority (CA)** inside the backend. This CA:
- Issues signed client certificates to every agent during `configure`
- Verifies every inbound gRPC connection — only agents with valid certs can connect
- Auto-regenerates server cert on startup — stable across container restarts and upgrades

```
Backend CA
    ├── signs → server-cert.pem  (backend's identity)
    └── signs → client-cert.pem  (each agent's identity)

On every gRPC connection:
  Agent  → presents client-cert  → Backend verifies against CA ✅
  Backend → presents server-cert → Agent   verifies against CA ✅
```

### Session Security

- **JWT validation** on every WebSocket connection
- **RBAC check** — users can only access machines they have been explicitly granted access to
- **Command logging** — every command entered in a terminal session is recorded with user, timestamp, and exit code
- **Machine status** — machines that stop sending heartbeats are automatically marked offline by the reconciler

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
3. **Regenerate API keys periodically** — rotate agent credentials regularly
4. **Review audit logs** — monitor command history for unexpected activity
5. **Use `--allow-sudo` only when needed** — restrict sudo access by default
