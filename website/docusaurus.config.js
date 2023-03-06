const sidebar = require('./sidebars.json');

const deployTarget = process.env.DEPLOY_TARGET || 'docs';
const projectTargets = {
  'docs': {
    organizationName: 'Rookout',
    algoliaJs: '/js/algoliaSearchRookout.js',
    primaryColor: '#533C92',
    websiteUrl: 'https://docs.rookout.com',
    headerIcon: 'img/logos/rookout-logo-v2.png',
    supportEmail: `support@rookout.com`,
    supportType: "mailto",
  },
  'dci-docs': {
    organizationName: 'AppDynamics',
    algoliaJs: '/js/algoliaSearchAppd.js',
    primaryColor: '#4E3EB1',
    websiteUrl: 'https://dci.docs.rookout.com',
    headerIcon: 'img/logos/appd_rookout_logo_combined.svg',
    supportEmail: `https://www.appdynamics.com/support/`,
    supportType: 'href',
  },
};


markdownVariables = {
  supportEmail: projectTargets[deployTarget].supportEmail,
  supportType: projectTargets[deployTarget].supportType,
  fonts: {
    rookoutFont: [
      "Roboto",
      "sans-serif",
    ],
  },
  markdownPlugins: [
    null,
  ],
  repoUrl: "https://github.com/Rookout/docs",
};

const introduction = "introduction";
const titles = Object.keys(sidebar[introduction]);


const buildFooterUrl = suffix => `/docs/${suffix}`;
const footerLinks = titles.map(key => ({
  title: key,
  items: sidebar[introduction][key].map(item => ({
    label: item.replace('-', " "),
    to: buildFooterUrl(item),
  })),
}));
const otherFooterLinks = [
  {
    title: "Other",
    items: [
      {
        label: "Status",
        href: "https://status.rookout.com/",
      },
    ],

  },
  {
    title: "Social",
    items: [
      {
        html: `<div class="social-wrapper"> 

         <a class="social-icon" href="https://github.com/Rookout" target="_blank"><img src="/img/social/github.svg" alt="GitHub - Rookout"></a>
         <a class="social-icon" href="https://www.facebook.com/rookoutlabs/" target="_blank"><img src="/img/social/facebook.svg" alt="Facebook - Rookout"></a>
         <a class="social-icon" href="https://twitter.com/rookoutlabs" target="_blank"><img src="/img/social/twitter.svg" alt="Twitter - Rookout"></a>
         <a class="social-icon" href="https://www.linkedin.com/company/rookout/" target="_blank"><img src="/img/social/linkedin.svg" alt="LinkedIn - Rookout"></a>
        </div>`,
      },
    ],
  },
];

module.exports={
  title: "Documentation",
  tagline: "Rookout - Get data on-demand from your live code just when you need it.",
  url: projectTargets[deployTarget].websiteUrl,
  baseUrl: "/",
  organizationName: projectTargets[deployTarget].organizationName,
  projectName: "docs",
  scripts: [
    "https://cdn.logrocket.io/LogRocket.min.js",
    "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js",
    "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js",
    "https://buttons.github.io/buttons.js",
    "https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js",
    "https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.js",
    { src: "/js/rookoutCustom.js", defer: true },
    /* Global site tag (gtag.js) - Google Analytics */
    { src: 'https://www.googletagmanager.com/gtag/js?id=UA-104510371-3', async: true }, // Docs
    { src: 'https://www.googletagmanager.com/gtag/js?id=UA-104510371-4', async: true }, // Unified
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/components/prism-csharp.min.js', defer: true }, // Unified
  ],
  stylesheets: [
    "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css",
  ],
  favicon: "https://cdn.rookout.com/static/rookout/rookout_favicon.svg",

  onBrokenLinks: "log",
  onBrokenMarkdownLinks: "log",
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          editUrl: "https://github.com/Rookout/docs/edit/master/docs/",
          path: "../docs",
          sidebarPath: "../website/sidebars.json",
        },
        blog: {},
        theme: { customCss: [require.resolve('./src/css/custom.css')] },
      },
    ],
  ],
  plugins: [
    [require.resolve("@cmfcmf/docusaurus-search-local"), { maxSearchResults: 12 }],
  ],

  themeConfig: {
    prism: {
      additionalLanguages: ['docker'],
    },
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: "Documentation",
      logo: {
        target: "_self",
        href: "/docs/welcome",
        src: projectTargets[deployTarget].headerIcon,
      },
      items: [],
    },
    footer: {
      links: [...footerLinks, ...otherFooterLinks],
      copyright: `Copyright © ${new Date().getFullYear()}  Rookout`,
    },
  },
  // eslint-disable-next-line no-undef
  customFields: markdownVariables,
  onBrokenMarkdownLinks: 'throw',
};
