# VSAY Terminal Documentation

Official documentation for **VSAY Terminal** — A full-fledged **Privileged Access Management (PAM)** and **Role-Based Access Control (RBAC)** solution.

[![Built with Docusaurus](https://img.shields.io/badge/Built%20with-Docusaurus-green.svg)](https://docusaurus.io/)
[![License](https://img.shields.io/badge/License-Proprietary-blue.svg)](LICENSE)

## Overview

VSAY Terminal is a modern PAM solution that brings privileged access management directly into your workflow. Unlike traditional solutions, we offer **multi-channel accessibility** — access your servers from Web, CLI, VSCode, or Agents.

| Edition | Version | Description |
|:--------|:--------|:------------|
| **Community** | 1.0.0 | Free edition with core PAM & RBAC features |
| **Enterprise** | 1.1.0 | Full-featured with OIDC/SSO (Keycloak), MTLS, and Multi-tenancy |

## What Makes Us Different?

| Access Method | Description |
|:--------------|:------------|
| **Web Terminal** | Browser-based SSH access with full terminal capabilities |
| **VSAY VSCode Extension** | Manage and connect to servers directly from your IDE |
| **VSAY Shell CLI** | Command-line tool for automation and scripting |
| **Agent-Based Access** | Deploy agents for seamless, secure connections |

## Feature Comparison

| Feature | Community | Enterprise |
|:--------|:---------:|:----------:|
| Secure SSH Access | ✅ | ✅ |
| Web Terminal | ✅ | ✅ |
| Team Collaboration (RBAC) | ✅ | ✅ |
| Real-time Monitoring | ✅ | ✅ |
| Audit Logs | ✅ | ✅ |
| TLS Encryption | ✅ | ✅ |
| VSAY Shell CLI | ✅ | ✅ |
| VSAY VSCode Extension | ✅ | ✅ |
| API Access | ✅ | ✅ |
| MTLS (Mutual TLS) | ❌ | ✅ |
| OIDC/SSO (Keycloak) | ❌ | ✅ |
| Multi-tenancy (Organizations) | ❌ | ✅ |
| Session Recording | ❌ | ✅ |
| Organization API | ❌ | ✅ |
| Priority Support | ❌ | ✅ |

## PAM & RBAC Capabilities

### Privileged Access Management (PAM)
- Centralized control over all SSH connections
- Session recording and playback (Enterprise)
- Just-in-time access provisioning
- Credential vaulting and rotation

### Role-Based Access Control (RBAC)
- Granular permission management
- Custom role definitions
- Team and organization hierarchy
- Machine-level access policies

### Security
- **TLS Encryption** — All connections secured with TLS
- **MTLS (Enterprise)** — Mutual TLS for certificate-based authentication
- **OIDC/SSO (Enterprise)** — External authentication via Keycloak
- **Audit Trail** — Complete logging of all activities

## Documentation Structure

```
docs-terminal/
├── docs/                              # Enterprise Edition (v1.1.0)
│   ├── intro.md                       # Introduction
│   ├── getting-started.md             # Quick start guide
│   ├── api/                           # API Reference
│   │   ├── overview.md
│   │   ├── authentication.md          # With OIDC endpoints
│   │   ├── machines.md
│   │   ├── users.md
│   │   ├── organizations.md           # Enterprise only
│   │   └── sessions.md
│   ├── authentication/                # Enterprise only
│   │   ├── oidc-integration.md
│   │   └── multi-tenancy.md
│   ├── features/
│   │   ├── ssh-access.md
│   │   ├── web-terminal.md
│   │   ├── team-collaboration.md
│   │   ├── monitoring.md
│   │   └── audit-logs.md
│   └── products/
│       ├── vsay-shell-cli.md
│       └── vsay-vscode-extension.md
│
├── versioned_docs/version-1.0.0/      # Community Edition (v1.0.0)
│   ├── intro.md
│   ├── getting-started.md
│   ├── api/                           # API (without Organizations)
│   ├── features/
│   └── products/
│
├── blog/                              # Blog posts
│   ├── authors.yml                    # Author profiles
│   └── tags.yml                       # Blog tags
│
├── src/
│   ├── css/custom.css                 # Custom styling (blue theme)
│   └── pages/index.tsx                # Landing page
│
├── static/img/                        # Images and assets
├── docusaurus.config.ts               # Main configuration
├── sidebars.ts                        # Sidebar configuration
├── Dockerfile                         # Docker deployment
├── docker-compose.yml                 # Docker Compose setup
└── nginx.conf                         # Nginx configuration
```

## Local Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/vsay/vsay-terminal-docs.git
cd docs-terminal

# Install dependencies
npm install
```

### Running Locally

```bash
# Start development server
npm run start

# Build for production
npm run build

# Serve production build locally
npm run serve
```

The documentation will be available at `http://localhost:3000`.

## Docker Deployment

### Using Docker Compose

```bash
# Build and run
docker-compose up -d

# Stop
docker-compose down
```

### Using Docker directly

```bash
# Build image
docker build -t vsay-terminal-docs .

# Run container
docker run -d -p 80:80 vsay-terminal-docs
```

## Products

### VSAY Shell CLI

Command-line interface for PAM.

```bash
npm install -g @vsay/shell-cli
vsay login
vsay machines list
vsay connect <machine-name>
```

### VSAY VSCode Extension

Integrated PAM in Visual Studio Code.

```bash
code --install-extension vsay.vsay-terminal
```

## Configuration

### Version Management

Versions are managed in `docusaurus.config.ts`:

```typescript
versions: {
  current: {
    label: '1.1.0',      // Enterprise
    banner: 'none',
  },
  '1.0.0': {
    label: '1.0.0',      // Community
    banner: 'none',
  },
},
```

### Creating a New Version

```bash
npm run docusaurus docs:version 1.2.0
```

## Team

VSAY Terminal is dreamed, designed, and developed by:

- **Amitesh Singh** — Software Engineer
- **Yesveer Singh** — Software Engineer
- **Rishabh Aggarwal** — Software Engineer

## Links

- **Documentation**: [https://docs.vsayterminal.com](https://docs.vsayterminal.com)
- **Main Product**: [https://vsayterminal.com](https://vsayterminal.com)
- **API Reference**: [https://docs.vsayterminal.com/docs/api/overview](https://docs.vsayterminal.com/docs/api/overview)

## License

Copyright © 2024 VSAY Terminal. All rights reserved.

---

Built with [Docusaurus](https://docusaurus.io/)
