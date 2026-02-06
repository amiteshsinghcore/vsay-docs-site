import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

// Site URL from environment variable (for Docker builds)
const siteUrl = process.env.SITE_URL || 'https://docs.vsayterminal.com';

const config: Config = {
  title: 'VSAY Terminal',
  tagline: 'Secure SSH Access Management Portal',
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
          // Versioning - 1.0.0 Community, 1.1.0+ Enterprise
          lastVersion: '1.0.0',
          includeCurrentVersion: true,
          versions: {
            current: {
              label: '1.1.0',
              banner: 'none',
            },
            '1.0.0': {
              label: '1.0.0',
              banner: 'none',
            },
          },
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
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
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'VSAY Terminal',
      logo: {
        alt: 'VSAY Terminal Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          type: 'dropdown',
          label: 'Products',
          position: 'left',
          items: [
            {
              label: 'VSAY Shell CLI',
              href: '/docs/products/vsay-shell-cli',
            },
            {
              label: 'VSAY VSCode Extension',
              href: '/docs/products/vsay-vscode-extension',
            },
          ],
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          type: 'docsVersionDropdown',
          position: 'right',
          dropdownActiveClassDisabled: true,
        },
        {
          type: 'dropdown',
          label: 'Edition',
          position: 'right',
          items: [
            {
              label: 'Community',
              href: '/docs/intro',
              description: 'Free - Agents, UI Login, Basic Features',
            },
            {
              label: 'Enterprise',
              href: '/docs/next/intro',
              description: 'Organization, Multi-tenancy, OIDC',
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
              label: 'VSAY Shell CLI',
              to: '/docs/products/vsay-shell-cli',
            },
            {
              label: 'VSAY VSCode Extension',
              to: '/docs/products/vsay-vscode-extension',
            },
          ],
        },
        {
          title: 'Editions',
          items: [
            {
              label: 'Community (Free)',
              to: '/docs/intro',
            },
            {
              label: 'Enterprise',
              to: '/docs/next/intro',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} VSAY Terminal. All rights reserved.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
