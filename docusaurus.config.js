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
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css",
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

  plugins: [
    [
      "@easyops-cn/docusaurus-search-local",
      {
        hashed: true,
      },
    ],
  ],

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
            type: 'search',
            position: 'right',
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Connect",
            items: [
              {
                html: `
                  <a href="https://github.com/kiranMushtaque" target="_blank" rel="noopener noreferrer" class="footer__link-item">
                    <i class="fa-brands fa-github"></i> GitHub
                  </a>
                `,
              },
              {
                html: `
                  <a href="https://www.linkedin.com/in/kiran-m-9b238b2b6/" target="_blank" rel="noopener noreferrer" class="footer__link-item">
                    <i class="fa-brands fa-linkedin"></i> LinkedIn
                  </a>
                `,
              },
              {
                html: `
                  <a href="https://twitter.com/KiranMushtaque" target="_blank" rel="noopener noreferrer" class="footer__link-item">
                    <i class="fa-brands fa-twitter"></i> Twitter
                  </a>
                `,
              },
            ],
          },
        ],
        copyright: `Created by Kiran Mushtaque. Copyright © 2025.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
