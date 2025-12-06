const { themes } = require("prism-react-renderer");
const lightCodeTheme = themes.dracula;
const darkCodeTheme = themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "AI & Humanoid Robotics",
  tagline:
    "A comprehensive guide to understanding and building intelligent humanoid robots. By Kiran Mushtaque.",
  favicon: "img/favicon.ico",

  // Add Google Fonts here
  stylesheets: [
    "https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap",
    "https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;700&display=swap",
  ],

  // Set the production url of your site here
  url: "https://your-docusaurus-test-site.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "KiranMushtaque", // Usually your GitHub org/user name.
  projectName: "ai-robotics-Book", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Remove the "edit this page" links
          editUrl: undefined,
          // Enable last updated author and time
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        blog: false, // Disable the blog plugin
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "img/docusaurus-social-card.jpg",
      navbar: {
        title: "AI & Humanoid Robotics",

        items: [
          {
            type: "docSidebar",
            sidebarId: "tutorialSidebar",
            position: "left",
            label: "Book",
          },
          {
            href: "https://github.com/your-repo/ai-robotics-Book",
            label: "GitHub",
            position: "right",
          },
          {
            href: '#',
            label: 'Signup',
            position: 'right',
            className: 'navbar-signup-button',
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Content",
            items: [
              {
                label: "Book Chapters",
                to: "/docs/intro", // Link to the main intro of the book
              },
              // Potentially add more chapter links here if desired, e.g.,
              // { label: 'Chapter 1', to: '/docs/chapter1' },
            ],
          },
          {
            title: "About the Author",
            items: [
              {
                label: "Kiran Mushtaque", // This could link to an author page if one existed
                href: "https://kiranmushtaque.com", // Placeholder, replace with actual author website/portfolio if available
              },
              {
                label: "Email",
                href: "mailto:your.email@example.com", // Replace with Kiran's actual email
              },
            ],
          },
          {
            title: "Connect",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/kiranMushtaque",
              },
              {
                label: "LinkedIn",
                href: "https://www.linkedin.com/in/kiran-m-9b238b2b6/",
              },
            ],
          },
        ],
        copyright: `Copyright © 2025 Kiran Mushtaque. AI & Humanoid Robotics Textbook.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
