---
sidebar_position: 2
---

# WebXTerm Shell CLI

WebXTerm Shell CLI is a Go-based command-line tool that lets you list your machines and connect to them with a full interactive terminal — directly from your terminal, without opening a browser.

## Overview

WebXTerm Shell CLI provides:

- **Interactive terminal sessions** — full PTY terminal via WebSocket, just like the web terminal
- **Machine listing** — see all your registered machines and their online/offline status
- **Lightweight** — single static binary, no runtime dependencies
- **Cross-platform** — Linux, macOS, and Windows

## Installation

WebXTerm Shell CLI is distributed as a pre-compiled binary.

### Download Binary (Linux / macOS)

```bash
# Download the latest release (replace with your platform)
curl -LO https://releases.vsayterminal.com/vsay-shell-cli/latest/vsay-shell-cli-linux-amd64.tar.gz
tar -xzf vsay-shell-cli-linux-amd64.tar.gz
sudo mv vsay-shell-cli /usr/local/bin/
```

### Install via DEB Package (Debian/Ubuntu)

```bash
sudo dpkg -i vsay-shell-cli_amd64.deb
```

### Install via RPM Package (RHEL/CentOS/Fedora)

```bash
sudo rpm -i vsay-shell-cli_amd64.rpm
```

## Quick Start

### 1. Login

Authenticate with your WebXTerm backend URL:

```bash
vsay-shell-cli login https://your-webxterm-instance.com
```

You'll be prompted for your email and password. Credentials are saved to `~/.vsay-shell-cli/config.json`.

### 2. List Machines

```bash
vsay-shell-cli list
```

or

```bash
vsay-shell-cli ls
```

### 3. Connect to a Machine

```bash
vsay-shell-cli connect <machine-name>
```

This opens a full interactive terminal session to the machine via WebSocket — the same connection used by the web terminal.

### 4. Delete a Machine

```bash
vsay-shell-cli delete <machine-name>
```

## Commands Reference

| Command | Description |
|:--------|:------------|
| `vsay-shell-cli login <URL>` | Authenticate with your WebXTerm backend |
| `vsay-shell-cli logout` | Clear saved credentials |
| `vsay-shell-cli list` / `ls` | List all registered machines |
| `vsay-shell-cli connect <name>` | Open an interactive terminal session |
| `vsay-shell-cli delete <name>` | Remove a machine from your account |
| `vsay-shell-cli status` | Show current login status |
| `vsay-shell-cli version` | Print CLI version |

## Configuration

Credentials and API URL are stored in:

```
~/.vsay-shell-cli/config.json
```

```json
{
  "api_url": "https://your-webxterm-instance.com",
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

## How the Terminal Connection Works

When you run `vsay-shell-cli connect <name>`, the CLI:

1. Fetches your machine list from `/api/machines` to find the `agent_id`
2. Generates a unique session ID: `cli-{timestamp}`
3. Opens a WebSocket to:
   ```
   ws://your-webxterm-instance.com/api/terminal/{agent_id}/ws?session_id=...&token=JWT&source=cli
   ```
4. Connects your local terminal (TTY) to the WebSocket stream
5. Keystrokes are forwarded to the agent on the remote machine, output streams back in real time

## Community vs Enterprise

| Feature | Community | Enterprise |
|:--------|:---------:|:----------:|
| Login and authentication | ✅ | ✅ |
| List machines | ✅ | ✅ |
| Interactive terminal sessions | ✅ | ✅ |
| Delete machines | ✅ | ✅ |
| OIDC/OAuth2 authentication | ❌ | ✅ |
| Multi-org support | ❌ | ✅ |
