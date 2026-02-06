---
sidebar_position: 2
---

# VSAY VSCode Extension

VSAY VSCode Extension brings the power of VSAY Terminal directly into your Visual Studio Code editor, providing seamless SSH access management without leaving your IDE.

## Overview

The VSCode extension provides:

- **Integrated terminal** - SSH sessions directly in VSCode terminal
- **Machine explorer** - Browse and manage machines in the sidebar
- **Quick connect** - Connect to machines with a single click
- **File sync** - Sync files between local and remote machines

## Installation

### From VSCode Marketplace

1. Open VSCode
2. Go to Extensions (Ctrl+Shift+X)
3. Search for "VSAY Terminal"
4. Click Install

### From Command Line

```bash
code --install-extension vsay.vsay-terminal
```

## Getting Started

### 1. Sign In

1. Open Command Palette (Ctrl+Shift+P)
2. Type "VSAY: Sign In"
3. Follow the authentication flow

### 2. View Machines

After signing in, you'll see the VSAY Terminal icon in the Activity Bar. Click it to open the machine explorer.

### 3. Connect to a Machine

- Right-click on a machine → "Connect"
- Or click the connect icon next to the machine name

## Features

### Machine Explorer

The sidebar shows all your machines organized by:

- **Organization** - Group machines by org
- **Tags** - Filter by custom tags
- **Status** - Online/Offline indicators

### Integrated Terminal

When you connect to a machine, a new terminal opens in VSCode with full SSH access:

- Full color support
- Copy/paste works seamlessly
- Multiple sessions in tabs

### Remote File Explorer

Browse files on remote machines:

1. Right-click machine → "Browse Files"
2. Navigate the remote filesystem
3. Open, edit, and save files directly

### Quick Actions

| Shortcut | Action |
|----------|--------|
| `Ctrl+Shift+V T` | Open VSAY Terminal panel |
| `Ctrl+Shift+V C` | Quick connect to machine |
| `Ctrl+Shift+V L` | List all machines |
| `Ctrl+Shift+V S` | Search machines |

## Configuration

Open settings (Ctrl+,) and search for "VSAY" to configure:

```json
{
  "vsay.apiUrl": "https://api.vsayterminal.com",
  "vsay.defaultOrg": "my-organization",
  "vsay.terminal.fontSize": 14,
  "vsay.terminal.theme": "dark",
  "vsay.autoConnect": false,
  "vsay.showStatusBar": true
}
```

## Commands

Open Command Palette (Ctrl+Shift+P) and type "VSAY" to see all commands:

| Command | Description |
|---------|-------------|
| VSAY: Sign In | Authenticate with VSAY Terminal |
| VSAY: Sign Out | Log out |
| VSAY: Connect to Machine | Open connection dialog |
| VSAY: Refresh Machines | Reload machine list |
| VSAY: Open Web Terminal | Open in browser |
| VSAY: Upload File | Upload to remote machine |
| VSAY: Download File | Download from remote machine |

## Status Bar

The status bar shows:

- Connection status (Connected/Disconnected)
- Current organization
- Active sessions count

Click the status bar item to access quick actions.

## Workspace Integration

### Remote Workspace

Open an entire remote folder as a VSCode workspace:

1. Right-click machine → "Open Remote Folder"
2. Select the folder path
3. VSCode reloads with remote files

### Tasks Integration

Run tasks on remote machines:

```json
// .vscode/tasks.json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Deploy to Production",
      "type": "vsay",
      "machine": "prod-server-01",
      "command": "./deploy.sh"
    }
  ]
}
```

## Troubleshooting

### Connection Issues

1. Check if machine is online in VSAY Terminal web
2. Verify your permissions
3. Try "VSAY: Refresh Machines"

### Extension Not Loading

1. Check VSCode version (requires 1.70+)
2. Disable other SSH extensions temporarily
3. Reload window (Ctrl+Shift+P → "Reload Window")

## Community vs Enterprise

| Feature | Community | Enterprise |
|---------|-----------|------------|
| Basic SSH connections | Yes | Yes |
| Machine explorer | Yes | Yes |
| Integrated terminal | Yes | Yes |
| Remote file browser | Yes | Yes |
| Multi-org support | No | Yes |
| OIDC authentication | No | Yes |
| Team collaboration | Limited | Full |
| Priority support | No | Yes |
