import type * as Preset from "@docusaurus/preset-classic";
import type { Config } from "@docusaurus/types";
import { themes as prismThemes } from "prism-react-renderer";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "The Eden Apis Staff Handbooks",
  tagline: "The Eden Apis Staff Handbooks Home",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://theedenapis.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  // For Vercel microfrontends, the baseUrl is needed so assets are correctly referenced
  // Vercel will route /staff-handbooks/* to this app, and the app serves with the baseUrl prefix
  baseUrl: "/staff-handbooks/",
  trailingSlash: false,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "lolmaxz", // Usually your GitHub org/user name.
  projectName: "staff-handbooks", // Usually your repo name.

  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },
  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/lolmaxz/staff-handbooks/tree/main/",
          showLastUpdateTime: true,
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/lolmaxz/staff-handbooks/tree/main/",
          // Useful options to enforce blogging best practices
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],
  plugins: [
    "docusaurus-plugin-zooming",
    // ...other plugins
  ],
  themeConfig: {
    zooming: {
      selector: ".markdown img",
      delay: 500,
      background: {
        light: "rgba(101,108,133,0.8)",
        dark: "rgba(9,10,17,0.8)",
      },
      options: {
        // See the docs of zooming for all available options: https://github.com/francoischalifour/medium-zoom#usage
      },
    },
    // Replace with your project's social card
    image: "img/docusaurus-social-card.jpg",
    colorMode: {
      defaultMode: "dark",
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    docs: {
      sidebar: {
        // hideable: true,
        autoCollapseCategories: true,
      },
    },
    navbar: {
      title: "Home",
      logo: {
        alt: "My Site Logo",
        src: "img/logo.svg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "handbookSidebar",
          position: "left",
          label: "Eden Staff Handbooks",
        },
        // { to: "/blog", label: "Blog", position: "left" },
        {
          href: "https://github.com/lolmaxz/staff-handbooks",
          label: "GitHub",
          position: "right",
        },
      ],
      style: "dark",
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Staff Handbooks",
              to: "/docs/intro",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Official Website",
              href: "https://theedenapis.com",
            },
            {
              label: "Discord",
              href: "https://discordapp.com/invite/TheEdenApis",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/TheEdenApis",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Blog",
              to: "/blog",
            },
            {
              label: "GitHub",
              href: "https://github.com/lolmaxz/staff-handbooks",
            },
          ],
        },
      ],
      copyright: `Copyright 2020-2025 © ${new Date().getFullYear()} The Eden Apis`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
  themes: [
    // ... Your other themes.
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      {
        // ... Your options.
        // `hashed` is recommended as long-term-cache of index file is possible.
        hashed: true,
        indexDocs: true,
        indexBlog: true,
        indexPages: true,
        docsRouteBasePath: "/",
        blogRouteBasePath: "/blog",
        language: ["en"],
        docsDir: "docs",
        blogDir: "blog",
        searchResultLimits: 10,

        // For Docs using Chinese, it is recomended to set:
        // language: ["en", "zh"],

        // If you're using `noIndex: true`, set `forceIgnoreNoIndex` to enable local index:
        // forceIgnoreNoIndex: true,
      },
    ],
  ],
};

export default config;
