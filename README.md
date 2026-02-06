# VSAY Terminal Documentation

Official documentation for VSAY Terminal - A powerful SSH access management portal.

[![Built with Docusaurus](https://img.shields.io/badge/Built%20with-Docusaurus-green.svg)](https://docusaurus.io/)
[![License](https://img.shields.io/badge/License-Proprietary-blue.svg)](LICENSE)

## Overview

This repository contains the documentation for VSAY Terminal, available in two editions:

| Edition | Version | Description |
|:--------|:--------|:------------|
| **Community** | 1.0.0 | Free edition with core SSH management features |
| **Enterprise** | 1.1.0 | Full-featured edition with OIDC/SSO and Multi-tenancy |

## Feature Comparison

| Feature | Community | Enterprise |
|:--------|:---------:|:----------:|
| Secure SSH Access | ✅ | ✅ |
| Web Terminal | ✅ | ✅ |
| Team Collaboration | ✅ | ✅ |
| Real-time Monitoring | ✅ | ✅ |
| Audit Logs | ✅ | ✅ |
| TLS Encryption | ✅ | ✅ |
| VSAY Shell CLI | ✅ | ✅ |
| VSAY VSCode Extension | ✅ | ✅ |
| API Access | ✅ | ✅ |
| MTLS (Mutual TLS) | ❌ | ✅ |
| OIDC/SSO Integration | ❌ | ✅ |
| Multi-tenancy (Organizations) | ❌ | ✅ |
| Organization API | ❌ | ✅ |
| Priority Support | ❌ | ✅ |

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
├── src/
│   ├── components/
│   ├── css/
│   │   └── custom.css                 # Custom styling (blue theme)
│   └── pages/
│       └── index.tsx                  # Landing page
│
├── static/
│   └── img/                           # Images and assets
│
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
# Create a new version snapshot
npm run docusaurus docs:version 1.2.0
```

### Customization

- **Theme colors**: Edit `src/css/custom.css`
- **Navbar/Footer**: Edit `docusaurus.config.ts`
- **Sidebar**: Edit `sidebars.ts`

## Products

### VSAY Shell CLI

Command-line interface for SSH management.

```bash
npm install -g @vsay/shell-cli
vsay login
vsay machines list
vsay connect <machine-name>
```

### VSAY VSCode Extension

Integrated SSH management in Visual Studio Code.

```bash
code --install-extension vsay.vsay-terminal
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Links

- **Documentation**: [https://docs.vsayterminal.com](https://docs.vsayterminal.com)
- **Main Product**: [https://vsayterminal.com](https://vsayterminal.com)
- **API Reference**: [https://docs.vsayterminal.com/docs/api/overview](https://docs.vsayterminal.com/docs/api/overview)

## License

Copyright © 2024 VSAY Terminal. All rights reserved.

---

Built with [Docusaurus](https://docusaurus.io/)
