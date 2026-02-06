# VSAY Terminal Documentation

Official documentation for **VSAY Terminal** — A full-fledged **Privileged Access Management (PAM)** and **Role-Based Access Control (RBAC)** solution.

## Overview

VSAY Terminal is a modern PAM solution that brings privileged access management directly into your workflow. Unlike traditional solutions, we offer **multi-channel accessibility** — access your servers from Web, CLI, VSCode, or Agents.

| Edition | Version | Description |
|:--------|:--------|:------------|
| **Community** | 1.0.0 | Free edition with core PAM & RBAC features |
| **Enterprise** | 1.1.0 | Full-featured with OIDC/SSO (Keycloak), MTLS, and Multi-tenancy |

## Quick Start

### Prerequisites

- Node.js 18+
- npm
- Docker (optional)

### Installation

```bash
git clone https://github.com/vsay/vsay-terminal-docs.git
cd docs-terminal
npm install
```

## Commands

### NPM Commands

| Command | Description |
|:--------|:------------|
| `npm install` | Install dependencies |
| `npm run start` | Start development server at http://localhost:3000 |
| `npm run build` | Build for production |
| `npm run serve` | Serve production build locally |

### Make Commands

| Command | Description |
|:--------|:------------|
| `make install` | Install dependencies |
| `make start` | Start development server |
| `make build` | Build for production |
| `make serve` | Serve production build |
| `make docker-build` | Build Docker image |
| `make docker-up` | Start Docker container |
| `make docker-down` | Stop Docker container |
| `make clean` | Remove build and node_modules |
| `make rebuild` | Clean and rebuild everything |

### Docker Commands

```bash
# Build and start
docker-compose up -d

# Stop
docker-compose down

# Rebuild with custom site URL
SITE_URL=https://your-domain.com docker-compose build
docker-compose up -d
```

## Configuration

### Environment Variables

Edit `.env` file to configure:

```env
SITE_URL=https://docs.vsayterminal.com
```

### Version Management

Versions are configured in `docusaurus.config.ts`:

- **1.1.0** — Enterprise Edition (current)
- **1.0.0** — Community Edition

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
| Organization API | ❌ | ✅ |
| Priority Support | ❌ | ✅ |

## Project Structure

```
docs-terminal/
├── docs/                          # Enterprise Edition (v1.1.0)
├── versioned_docs/version-1.0.0/  # Community Edition (v1.0.0)
├── blog/                          # Blog posts
├── src/                           # Custom components & CSS
├── static/img/                    # Images and assets
├── docusaurus.config.ts           # Main configuration
├── Dockerfile                     # Docker build
├── docker-compose.yml             # Docker Compose
├── Makefile                       # Make commands
└── .env                           # Environment variables
```

## Team

Dreamed, designed, and developed by:

- **Amitesh Singh** — Software Engineer
- **Yesveer Singh** — Software Engineer
- **Rishabh Aggarwal** — Software Engineer

## Links

- **Documentation**: https://docs.vsayterminal.com
- **Main Product**: https://vsayterminal.com

---

Built with [Docusaurus](https://docusaurus.io/)
