import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

// Site URL from environment variable (for Docker builds)
const siteUrl = process.env.SITE_URL || 'https://docs.webxterm.me';

const config: Config = {
  title: 'WebXTerm',
  tagline: 'Secure Remote Access & PAM Solution',
  favicon: 'img/icon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: siteUrl,
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'vsay', // Usually your GitHub org/user name.
  projectName: 'vsay-terminal', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Versioning strategy:
          // - docs/                          → current (1.2.0 Enterprise) — served at /docs/next/
          // - versioned_docs/version-1.1.0/  → archived Enterprise v1.1.0 — served at /docs/1.1.0/
          // - versioned_docs/version-1.0.0/  → Community Edition (free) — served at /docs/ (default)
          //
          // To release a new version:
          //   npm run docusaurus docs:version X.Y.Z
          //   Then update the `current` label below to the next version.
          lastVersion: '1.0.0',
          includeCurrentVersion: true,
          versions: {
            current: {
              label: 'Enterprise (1.2.0)',
              banner: 'none',
            },
            '1.1.0': {
              label: 'Enterprise (1.1.0)',
              banner: 'none',
            },
            '1.0.0': {
              label: 'Community (1.0.0)',
              banner: 'none',
            },
          },
        },
        blog: false, // blog disabled
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/social-card.png',
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: false, // handled by custom 3-state toggle
    },
    navbar: {
      title: 'WebXTerm',
      logo: {
        alt: 'WebXTerm Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'doc',
          docId: 'intro',
          position: 'left',
          label: 'Documentation',
        },
        {
          type: 'dropdown',
          label: 'Products',
          position: 'left',
          items: [
            {
              label: 'WebXTerm (Web)',
              href: '/docs/products/vsay-terminal',
            },
            {
              label: 'WebXTerm Shell CLI',
              href: '/docs/products/vsay-shell-cli',
            },
            {
              label: 'WebXTerm VSCode Extension',
              href: '/docs/products/vsay-vscode-extension',
            },
          ],
        },
        // {to: '/blog', label: 'Blog', position: 'left'},
        {
          type: 'dropdown',
          label: 'Edition',
          position: 'right',
          className: 'navbar-version-dropdown',
          items: [
            {
              label: 'Enterprise (1.2.0)',
              to: '/docs/next/intro',
              activeBaseRegex: '/docs/next/',
            },
            {
              label: 'Enterprise (1.1.0)',
              to: '/docs/1.1.0/intro',
              activeBaseRegex: '/docs/1.1.0/',
            },
            {
              label: 'Community (1.0.0)',
              to: '/docs/intro',
              activeBaseRegex: '^/docs/(?!next|1\\.1\\.0|1\\.2\\.0)',
            },
          ],
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/getting-started',
            },
            {
              label: 'Features',
              to: '/docs/features/ssh-access',
            },
          ],
        },
        {
          title: 'Products',
          items: [
            {
              label: 'WebXTerm (Web)',
              to: '/docs/products/vsay-terminal',
            },
            {
              label: 'WebXTerm Shell CLI',
              to: '/docs/products/vsay-shell-cli',
            },
            {
              label: 'WebXTerm VSCode Extension',
              to: '/docs/products/vsay-vscode-extension',
            },
          ],
        },
        {
          title: 'Editions',
          items: [
            {
              label: 'Community (1.0.0) — Free',
              to: '/docs/intro',
            },
            {
              label: 'Enterprise (1.2.0)',
              to: '/docs/next/intro',
            },
            {
              label: 'Enterprise (1.1.0)',
              to: '/docs/1.1.0/intro',
            },
          ],
        },
        // {
        //   title: 'More',
        //   items: [
        //     {
        //       label: 'Blog',
        //       to: '/blog',
        //     },
        //   ],
        // },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} WebXTerm. All rights reserved.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
