---
sidebar_position: 1
---

# VSAY Shell CLI

VSAY Shell CLI is a powerful command-line interface tool that allows you to manage your SSH connections and interact with VSAY Terminal directly from your terminal.

## Overview

VSAY Shell CLI provides:

- **Command-line SSH management** - Connect to machines without leaving your terminal
- **Script automation** - Automate repetitive tasks with shell scripts
- **Lightweight** - Minimal footprint, fast execution
- **Cross-platform** - Works on Linux, macOS, and Windows

## Installation

### Using npm

```bash
npm install -g @vsay/shell-cli
```

### Using Homebrew (macOS)

```bash
brew install vsay-shell-cli
```

### Using apt (Debian/Ubuntu)

```bash
curl -fsSL https://packages.vsayterminal.com/gpg | sudo apt-key add -
echo "deb https://packages.vsayterminal.com/apt stable main" | sudo tee /etc/apt/sources.list.d/vsay.list
sudo apt update && sudo apt install vsay-shell-cli
```

## Quick Start

### Login

```bash
vsay login
```

### List Machines

```bash
vsay machines list
```

### Connect to a Machine

```bash
vsay connect <machine-name>
```

### Execute Command on Remote Machine

```bash
vsay exec <machine-name> "ls -la"
```

## Commands Reference

| Command | Description |
|---------|-------------|
| `vsay login` | Authenticate with VSAY Terminal |
| `vsay logout` | Log out from VSAY Terminal |
| `vsay machines list` | List all available machines |
| `vsay machines add` | Add a new machine |
| `vsay connect <name>` | Connect to a machine |
| `vsay exec <name> <cmd>` | Execute command on machine |
| `vsay config` | View/edit configuration |
| `vsay version` | Show CLI version |

## Configuration

Configuration file location: `~/.vsay/config.json`

```json
{
  "apiUrl": "https://api.vsayterminal.com",
  "defaultOrg": "my-organization",
  "theme": "dark",
  "timeout": 30000
}
```

## Features

### Session Management

```bash
# List active sessions
vsay sessions list

# Kill a session
vsay sessions kill <session-id>
```

### File Transfer

```bash
# Upload file
vsay upload <machine-name> ./local-file.txt /remote/path/

# Download file
vsay download <machine-name> /remote/file.txt ./local-path/
```

### Batch Operations

```bash
# Execute on multiple machines
vsay exec --tag production "sudo apt update"
```

## Community vs Enterprise

| Feature | Community | Enterprise |
|---------|-----------|------------|
| Basic SSH connections | Yes | Yes |
| Machine management | Yes | Yes |
| File transfer | Yes | Yes |
| Multi-org support | No | Yes |
| OIDC authentication | No | Yes |
| Audit logging | Basic | Advanced |
| Priority support | No | Yes |
