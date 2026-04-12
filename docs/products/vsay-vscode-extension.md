---
sidebar_position: 3
---

# WebXTerm VSCode Extension

WebXTerm VSCode Extension brings WebXTerm directly into Visual Studio Code — browse your machines in the sidebar, open integrated terminal sessions, browse remote files, and forward ports without leaving your IDE.

## Overview

The VSCode extension provides:

- **Machine explorer** — sidebar tree view of all your registered machines with online/offline status
- **Integrated terminal** — full terminal sessions inside VS Code via WebSocket tunneling
- **Remote file browser** — browse and open files on remote machines
- **Port forwarding** — forward remote ports to your local machine
- **Two connection modes** — WebSocket tunnel (recommended) or SSH via Remote-SSH extension

## Installation

### From VSCode Marketplace

1. Open VSCode
2. Go to Extensions (`Ctrl+Shift+X`)
3. Search for **"WebXTerm"**
4. Click **Install**

### From Command Line

```bash
code --install-extension vsay.vsay-terminal
```

## Getting Started

### 1. Sign In

1. Open Command Palette (`Ctrl+Shift+P`)
2. Type **"WebXTerm: Login"**
3. Enter your WebXTerm backend API URL (e.g. `https://your-webxterm-instance.com`)
4. Enter your email and password

:::note[Token storage]
Your JWT token is kept **in memory only** for the current VS Code session. You will be asked to sign in again after reloading VS Code.
:::

### 2. View Your Machines

After signing in, click the **WebXTerm** icon in the Activity Bar. The sidebar shows all your machines with their current status (Online / Offline).

### 3. Connect to a Machine

Click the **📡 WebSocket** icon next to a machine name to open a terminal session.

## Connection Modes

### WebSocket Mode (Recommended)

The extension connects to the WebXTerm backend over WebSocket and tunnels your terminal through the backend to the `vsay-agent` running on the machine — identical to the Web Terminal.

**How it works:**
1. Extension opens a WebSocket to:
   ```
   ws://your-webxterm-instance.com/api/terminal/{agent_id}/ws?session_id=...&token=JWT&source=vscode
   ```
2. A VS Code integrated terminal opens, wired to the WebSocket stream
3. A remote filesystem provider is registered (`vsay-remote-{agentId}://`) for file browsing
4. Port forwarding is available for the session

**Advantages:**
- No SSH setup required on the remote machine
- Works through firewalls (outbound WebSocket only)
- No agent SSH port exposure needed

### SSH Mode

If you prefer traditional SSH, the extension can configure `~/.ssh/config` and launch the **Remote-SSH** extension.

**How it works:**
1. Click the **🔌 SSH** icon next to a machine
2. The extension adds a Host entry to `~/.ssh/config`:
   ```
   Host vsay-{agent_id}
       HostName <machine-ip>
       User <linux-user>
   ```
3. The Remote-SSH extension opens the connection

**Requirements:** Remote-SSH extension installed; SSH access to the machine.

## Features

### Machine Explorer

The sidebar tree shows all machines organized by status:
- **Online** — agent is connected and heartbeating
- **Offline** — agent has not sent a heartbeat recently

### Integrated Terminal

When connected via WebSocket mode, a VS Code terminal opens with full interactive shell access:
- Full color and Unicode support
- Copy/paste works natively
- Multiple terminal sessions in tabs
- All commands are logged to the WebXTerm audit log

### Remote File Explorer

Browse files on connected machines:

1. Right-click a machine → **"Browse Files"**
2. Navigate the remote filesystem in VS Code's Explorer panel
3. Open, edit, and save files directly

### Port Forwarding

Forward a port from the remote machine to your local machine within an active WebSocket session:

1. Right-click machine → **"Forward Port"**
2. Enter the remote port number
3. The port is accessible at `localhost:<port>` on your machine

## Configuration

Open VS Code Settings (`Ctrl+,`) and search for **"WebXTerm"**:

```json
{
  "vsay.apiUrl": "https://your-webxterm-instance.com"
}
```

## Commands

Open Command Palette (`Ctrl+Shift+P`) and type **"WebXTerm"**:

| Command | Description |
|:--------|:------------|
| WebXTerm: Login | Authenticate with your WebXTerm backend |
| WebXTerm: Logout | Clear credentials |
| WebXTerm: Refresh Machines | Reload machine list |
| WebXTerm: Connect (WebSocket) | Open WebSocket terminal session |
| WebXTerm: Connect (SSH) | Open via Remote-SSH extension |

## Troubleshooting

### Connection Issues

1. Check that the machine shows **Online** in the web dashboard
2. Verify your API URL is correct in settings
3. Try **WebXTerm: Refresh Machines** from the Command Palette
4. Check that the `vsay-agent` service is running on the remote machine:
   ```bash
   systemctl status vsay-agent
   ```

### Extension Not Loading

1. Check VS Code version (requires 1.70+)
2. Reload window: `Ctrl+Shift+P` → "Reload Window"

## Community vs Enterprise

| Feature | Community | Enterprise |
|:--------|:---------:|:----------:|
| Machine explorer | ✅ | ✅ |
| WebSocket terminal | ✅ | ✅ |
| Remote file browser | ✅ | ✅ |
| Port forwarding | ✅ | ✅ |
| SSH connection mode | ✅ | ✅ |
| OIDC/OAuth2 authentication | ❌ | ✅ |
| Multi-org support | ❌ | ✅ |
