---
sidebar_position: 2
---

# Web Terminal

The WebXTerm Web Terminal lets you connect to your machines directly from your browser - no local SSH client required.

## Features

### Browser-Based Access

Access your servers from anywhere with just a web browser:
- **No installation required** - Works on any device with a modern browser
- **Cross-platform** - Windows, macOS, Linux, even tablets
- **Secure** - All traffic encrypted through WebXTerm gateway

### Full Terminal Emulation

The Web Terminal provides a complete terminal experience:
- Full ANSI color support
- Unicode and special character support
- Copy/paste functionality
- Keyboard shortcuts
- Scrollback buffer
- Resizable terminal window

## Using the Web Terminal

### Starting a Session

1. Navigate to the **Machines** page
2. Find the machine you want to connect to
3. Click the **"Connect"** button
4. The Web Terminal opens in a new tab or panel

### Terminal Controls

| Shortcut | Action |
|----------|--------|
| `Ctrl + Shift + C` | Copy selected text |
| `Ctrl + Shift + V` | Paste from clipboard |
| `Ctrl + +` | Increase font size |
| `Ctrl + -` | Decrease font size |
| `Ctrl + 0` | Reset font size |

### Session Management

While in a session:
- **Disconnect**: Click the disconnect button or type `exit`
- **Reconnect**: If disconnected, click "Reconnect" to resume
- **New Tab**: Open additional terminal tabs to the same machine

## Advanced Features

### Multiple Sessions

You can have multiple terminal sessions open simultaneously:
- Open multiple tabs to different machines
- Open multiple tabs to the same machine
- Switch between sessions easily

### Session Persistence

Terminal sessions are maintained as long as the WebSocket connection and the agent's gRPC stream remain active. If your browser tab disconnects or network drops:

- The shell process on the machine **continues running** — your background processes are not interrupted
- Reconnecting opens a **new terminal session** (the previous shell state is not restored)

:::info
For long-running processes, use `tmux` or `screen` on your machine so you can reattach after reconnecting.
:::

## Command History

All commands executed in the Web Terminal are logged:
- View your command history in the terminal with `history`
- Organization admins can review command history in **Monitoring → Command Logs**
- Search through past commands to find specific operations

## Customization

### Appearance

Customize your terminal appearance:
- **Theme**: Choose from light, dark, or custom themes
- **Font**: Select your preferred monospace font
- **Font size**: Adjust for comfort

### Behavior

Configure terminal behavior:
- **Scrollback lines**: How much history to keep
- **Cursor style**: Block, underline, or bar
- **Cursor blink**: Enable or disable blinking

## Troubleshooting

### Connection Issues

If you're having trouble connecting:

1. **Check machine status** - Ensure the machine is online
2. **Verify permissions** - Confirm you have access to the machine
3. **Check network** - Ensure your network allows WebSocket connections
4. **Clear browser cache** - Sometimes a fresh start helps

### Performance Issues

For slow or laggy terminals:

1. **Check your internet connection**
2. **Reduce scrollback buffer** if very large
3. **Close unused tabs** to free resources
4. **Try a different browser**
