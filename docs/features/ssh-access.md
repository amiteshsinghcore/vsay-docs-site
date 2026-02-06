---
sidebar_position: 1
---

# Secure SSH Access

VSAY Terminal provides enterprise-grade secure SSH access to your machines through encrypted tunnels, ensuring your connections are protected at all times.

## How It Works

VSAY Terminal acts as a secure gateway between you and your servers:

```
User Browser → VSAY Terminal Gateway → Your Server
     |              |                      |
   Encrypted     Verified              SSH Protocol
   Connection    & Logged              (Encrypted)
```

All connections are:
- **End-to-end encrypted** using industry-standard protocols
- **Authenticated** against your organization's identity provider
- **Authorized** based on your role and permissions
- **Logged** for audit and compliance purposes

## Connection Methods

### Direct Connection

Connect directly to machines that are accessible from the VSAY Terminal gateway:

1. Register the machine with its public IP or hostname
2. Configure SSH authentication (key-based recommended)
3. Connect through the Web Terminal

### Jump Host / Bastion

For machines in private networks, configure a jump host:

1. Register your bastion/jump host first
2. When adding a private machine, specify the jump host
3. VSAY Terminal will route the connection through the bastion

## Authentication Options

### SSH Key Authentication (Recommended)

SSH keys provide the most secure authentication method:

1. Navigate to **Settings → SSH Keys**
2. Click **"Add SSH Key"**
3. Either:
   - **Generate a new key pair** - VSAY Terminal will generate and store the private key securely
   - **Upload an existing public key** - If you manage your own private keys

4. Add the public key to your server's `~/.ssh/authorized_keys`

### Password Authentication

If SSH keys aren't an option:

1. When adding a machine, select **"Password Authentication"**
2. Enter the username and password
3. Credentials are encrypted and stored securely

:::warning
Password authentication is less secure than SSH keys. We recommend using SSH key authentication whenever possible.
:::

## Security Features

### Connection Encryption

All connections use:
- TLS 1.3 for browser-to-gateway communication
- SSH protocol for gateway-to-server communication
- AES-256 encryption for data at rest

### Session Management

- **Session timeout**: Configurable inactivity timeout
- **Concurrent session limits**: Limit how many sessions a user can have
- **Session recording**: Optional recording of all terminal sessions

### IP Whitelisting

Restrict access to specific IP addresses or ranges:

1. Go to **Organization Settings → Security**
2. Enable **IP Whitelisting**
3. Add allowed IP addresses or CIDR ranges

## Best Practices

1. **Use SSH keys** instead of passwords
2. **Rotate keys regularly** - Update SSH keys periodically
3. **Use jump hosts** for private networks
4. **Enable IP whitelisting** for sensitive machines
5. **Review audit logs** regularly to detect anomalies
6. **Set appropriate roles** - Give users only the access they need
