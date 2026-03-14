# VSAY Terminal Documentation

Official documentation site for **VSAY Terminal** — a full-fledged **Privileged Access Management (PAM)** and **Role-Based Access Control (RBAC)** solution built on agent-based WebSocket tunneling.

Built with [Docusaurus 3.9.2](https://docusaurus.io/)

---

## Versions

| Version | Edition | URL | Description |
|:--------|:--------|:----|:------------|
| **1.2.0** | Enterprise | `/docs/next/` | Current — includes OIDC/SSO (Okta, GitHub, Microsoft, Azure AD) |
| **1.1.0** | Enterprise | `/docs/1.1.0/` | MTLS + Multi-tenancy, no external SSO |
| **1.0.0** | Community | `/docs/` (default) | Free edition — core PAM & RBAC features |

---

## Requirements

- **Node.js** >= 20.0
- **npm**

---

## Run Locally

```bash
# Install dependencies
npm install

# Start dev server at http://localhost:3000
npm run start
```

---

## Production Build

```bash
# Build static site into build/
npm run build

# Preview the production build locally
npm run serve
```

---

## Docker

### Build Docker Image

```bash
docker build -t vsay-docs .
```

### Build with Custom Site URL

```bash
docker build --build-arg SITE_URL=https://docs.vsayterminal.com -t vsay-docs .
```

### Run with Docker Compose

```bash
# Start
docker-compose up -d

# Stop
docker-compose down

# Rebuild with custom site URL
SITE_URL=https://docs.vsayterminal.com docker-compose up -d --build
```

---

## Release a New Version

When releasing a new version (e.g. `1.3.0`):

```bash
# 1. Snapshot current docs/ as a new archived version
npm run docusaurus docs:version 1.3.0

# 2. Update docusaurus.config.ts:
#    - Add the new version to the versions object
#    - Update the current version label

# 3. Build and deploy
npm run build
```

---

## Project Structure

```
docs-terminal/
├── docs/                           # Current version source (v1.2.0 Enterprise)
├── versioned_docs/
│   ├── version-1.1.0/             # Enterprise v1.1.0 archive
│   └── version-1.0.0/             # Community v1.0.0 archive
├── versioned_sidebars/             # Sidebar configs per version
├── blog/                           # Blog posts
├── src/                            # Custom React components & CSS
├── static/img/                     # Images and static assets
├── versions.json                   # List of archived versions
├── docusaurus.config.ts            # Main Docusaurus configuration
├── Dockerfile                      # Docker build
└── docker-compose.yml              # Docker Compose
```

---

## Useful Commands

| Command | Description |
|:--------|:------------|
| `npm run start` | Start dev server at localhost:3000 |
| `npm run build` | Production build into `build/` |
| `npm run serve` | Serve production build locally |
| `npm run clear` | Clear Docusaurus cache and build output |
| `npm run typecheck` | Run TypeScript type check |

---

## Links

- **Live Docs**: https://docs.vsayterminal.com
- **Main Product**: https://vsayterminal.com

---

## Team

- **Amitesh Singh** — Software Engineer
- **Yesveer Singh** — Software Engineer
