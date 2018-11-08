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
    {doc: 'welcome', label: ''}
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
    'https://cdn.logrocket.io/LogRocket.min.js',
    'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js',
    'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js',
    'https://buttons.github.io/buttons.js',
    'https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js',
    'https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.js',
    '/js/rookoutCustom.js',
    '/js/code-blocks-buttons.js'
  ],
  stylesheets: [
    'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'
  ],
  // You may provide arbitrary config keys to be used as needed by your template.
  repoUrl: 'https://github.com/Rookout/docs',
  /* On page navigation for the current documentation page */
  /*onPageNav: 'separate',*/
  //gaTrackingId: "UA-104510371-3",
  // algolia: {
  //   apiKey: '',
  //   indexName: ''
  // },
};

module.exports = siteConfig;
