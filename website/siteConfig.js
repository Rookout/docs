/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* List of projects/orgs using your project for the users page */
const users = []; // DO NOT DELETE - NEEDED FOR DOCUSAURUS

const siteConfig = {
  title: 'Documentation' /* title for your website */,
  tagline: 'Rookout - Get data on-demand from your live code just when you need it.',
  url: 'http://docs.rookout.com' /* your website url */,
  baseUrl: '/' /* base url for your project */,
  editUrl: 'https://github.com/Rookout/docs/edit/master/docs/',
  headerLinks: [
    {doc: 'getting-started', label: 'Getting Started'},
    {doc: 'installation', label: 'Installation'},
    {doc: 'integrations', label: 'Integrations'},
    {doc: 'reference', label: 'Reference'},
    {doc: 'troubleshooting', label: 'Troubleshooting'}
  ],
  /* path to images for header/footer */
  headerIcon: 'img/logos/bird_logo_white.svg',
  footerIcon: 'img/logos/bird_logo.png',
  favicon: 'img/logos/bird_logo.png',
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
  projectName: 'docs', // or set an env variable PROJECT_NAME
  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks
    theme: 'default',
  },
  scripts: [
    'https://buttons.github.io/buttons.js',
    'https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.js',
    '/js/customSearch.js',
    '/js/googleAnalytics.js'
  ],
  // You may provide arbitrary config keys to be used as needed by your template.
  repoUrl: 'https://github.com/Rookout/docs',
  /* On page navigation for the current documentation page */
  onPageNav: 'separate',
  //gaTrackingId: "UA-104510371-3",
  // algolia: {
  //   apiKey: '',
  //   indexName: ''
  // },
};

module.exports = siteConfig;
