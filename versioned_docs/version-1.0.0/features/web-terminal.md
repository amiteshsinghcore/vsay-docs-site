---
sidebar_position: 2
---

# Web Terminal

The VSAY Terminal Web Terminal lets you connect to your machines directly from your browser - no local SSH client required.

## Features

### Browser-Based Access

Access your servers from anywhere with just a web browser:
- **No installation required** - Works on any device with a modern browser
- **Cross-platform** - Windows, macOS, Linux, even tablets
- **Secure** - All traffic encrypted through VSAY Terminal gateway

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

VSAY Terminal supports session persistence:
- Sessions survive brief network interruptions
- Automatic reconnection when connectivity is restored
- Background processes continue running during disconnections

:::info
For long-running processes, we recommend using `tmux` or `screen` on your server for additional session management.
:::

### File Transfer

Transfer files directly through the Web Terminal interface:

**Upload to Server:**
1. Click the **"Upload"** button in the terminal toolbar
2. Select files from your local machine
3. Choose the destination directory on the server
4. Files are transferred securely

**Download from Server:**
1. Click the **"Download"** button
2. Enter the file path on the server
3. The file downloads to your browser

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
