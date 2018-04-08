/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* List of projects/orgs using your project for the users page */
const users = [
  // {
  //   caption: 'User1',
  //   image: '/test-site/img/docusaurus.svg',
  //   infoLink: 'https://www.rookout.com',
  //   pinned: true,
  // },
];

const siteConfig = {
  title: 'Rookout Open-Source Documentation' /* title for your website */,
  tagline: 'On the fly debugging and data extraction',
  url: 'https://rookout.github.io' /* your website url */,
  baseUrl: '/' /* base url for your project */,
  headerLinks: [
    {search: true},
    {doc: 'getting-started', label: 'Getting Started'},
    {doc: 'reference', label: 'Reference'},
    {doc: 'integrations', label: 'Integrations'},
    {doc: 'extensions', label: 'Extensions'},
    {page: 'faq', label: 'FAQ'},
  ],
  users,
  /* path to images for header/footer */
  headerIcon: 'img/bird_logo.png',
  footerIcon: 'img/bird_logo.png',
  favicon: 'img/bird_logo.png',
  /* colors for website */
  colors: {
    primaryColor: '#533C92',
    secondaryColor: '#9962FF',
  },
  /* custom fonts for website */
  fonts: {
    myFont: [
      "Roboto",
      "sans-serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  },
  // This copyright info is used in /core/Footer.js and blog rss/atom feeds.
  copyright:
    'Copyright © ' +
    new Date().getFullYear() +
    ' Rookout',
  organizationName: 'Rookout', // or set an env variable ORGANIZATION_NAME
  // change to rookout.github.io when moving to it
  projectName: 'documentation-new', // or set an env variable PROJECT_NAME
  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks
    theme: 'default',
  },
  scripts: ['https://buttons.github.io/buttons.js'],
  // You may provide arbitrary config keys to be used as needed by your template.
  repoUrl: 'https://github.com/rookout/rookout.github.io',
  /* On page navigation for the current documentation page */
  onPageNav: 'separate',
  algolia: {
    apiKey: '',
    indexName: '',
  },
};

module.exports = siteConfig;
