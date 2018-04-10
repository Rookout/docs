/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* List of projects/orgs using your project for the users page */
const users = []; // DO NOT DELETE - NEEDED FOR DOCUSAURUS

const siteConfig = {
  title: 'Open-Source Documentation' /* title for your website */,
  tagline: 'Get data on-demand from your live code just when you need it.',
  url: 'https://rookout.github.io' /* your website url */,
  baseUrl: '/' /* base url for your project */,
  editUrl: 'https://github.com/Rookout/documentation-new/edit/master/docs/',
  headerLinks: [
    {doc: 'getting-started', label: 'Getting Started'},
    {doc: 'installation', label: 'Installation'},
    {doc: 'integration', label: 'Integration'},
    {doc: 'reference', label: 'Reference'},
    {page: 'troubleshooting', label: 'Troubleshooting'},
  ],
  users,
  /* path to images for header/footer */
  headerIcon: 'img/logos/bird_logo_white.svg',
  footerIcon: 'img/logos/bird_logo.png',
  favicon: 'img/bird_logo.png',
  /* colors for website */
  colors: {
    primaryColor: '#533C92',
    secondaryColor: '#9962FF',
  },
  /* custom fonts for website */
  fonts: {
    rookoutFont: [
      "Roboto",
      "sans-serif"
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
  scripts: [
    'https://buttons.github.io/buttons.js',
    '/js/customSearch.js'
  ],
  // You may provide arbitrary config keys to be used as needed by your template.
  repoUrl: 'https://github.com/rookout/rookout.github.io',
  /* On page navigation for the current documentation page */
  onPageNav: 'separate',
  // algolia: {
  //   apiKey: '73999324f895c6302845be7877278478',
  //   indexName: 'rookout-opendocs',
  // },
};

module.exports = siteConfig;
