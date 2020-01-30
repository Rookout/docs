/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const {Plugin: Embed} = require('remarkable-embed');

// Our custom remarkable plugin factory.
const createVariableInjectionPlugin = variables => {
  // `let` binding used to initialize the `Embed` plugin only once for efficiency.
  // See `if` statement below.
  let initializedPlugin;

  const embed = new Embed();
  embed.register({
    // Call the render method to process the corresponding variable with
    // the passed Remarkable instance.
    // -> the Markdown markup in the variable will be plain text.
    inject: key => variables[key]
  });

  return (md, options) => {
    if (!initializedPlugin) {
      initializedPlugin = {
        render: md.render.bind(md),
        hook: embed.hook(md, options)
      };
    }

    return initializedPlugin.hook;
  };
};

const deployTarget = process.env.DEPLOY_TARGET || 'docs';
const projectTargets = {
  'docs': {
    organizationName: 'Rookout',
    algoliaJs: '/js/algoliaSearchRookout.js',
    primaryColor: '#533C92',
    websiteUrl: 'https://docs.rookout.com',
    headerIcon: 'img/logos/bird_logo_white.svg',
    supportEmail: `<a href="mailto:support@rookout.com">support@rookout.com</a>`,
  },
  'dci-docs': {
    organizationName: 'AppDynamics',
    algoliaJs: '/js/algoliaSearchAppd.js',
    primaryColor: '#4E3EB1',
    websiteUrl: 'https://dci.docs.rookout.com',
    headerIcon: 'img/logos/appd_rookout_logo_combined.svg',
    supportEmail: `<a href="https://www.appdynamics.com/support/" target="_blank">https://www.appdynamics.com/support/</a>`,
  },
};

markdownVariables = {
  supportEmail: projectTargets[deployTarget].supportEmail,
};

/* List of projects/orgs using your project for the users page */
const users = []; // DO NOT DELETE - NEEDED FOR DOCUSAURUS

const siteConfig = {
  title: 'Documentation' /* title for your website */,
  tagline: 'Rookout - Get data on-demand from your live code just when you need it.',
  url: projectTargets[deployTarget].websiteUrl, /* your website url */
  baseUrl: '/' /* base url for your project */,
  editUrl: 'https://github.com/Rookout/docs/edit/master/docs/',
  cleanUrl: true, // allow URLs with no .HTML extension to work the same
  headerLinks: [],
  /* path to images for header/footer */
  headerIcon: projectTargets[deployTarget].headerIcon,
  footerIcon: 'img/logos/bird_logo.png',
  favicon: 'img/logos/bird_logo.png',
  /* colors for website */
  colors: {
    primaryColor: projectTargets[deployTarget].primaryColor,
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
  organizationName: projectTargets[deployTarget].organizationName, // or set an env variable ORGANIZATION_NAME
  // change to rookout.github.io when moving to it
  projectName: 'docs', // or set an env variable PROJECT_NAME
  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks
    theme: 'default',
  },
  markdownPlugins: [
    createVariableInjectionPlugin(markdownVariables)
  ],
  scripts: [
    'https://cdn.logrocket.io/LogRocket.min.js',
    'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js',
    'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js',
    'https://buttons.github.io/buttons.js',
    'https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js',
    'https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.js',
    '/js/rookoutCustom.js',
    projectTargets[deployTarget].algoliaJs, // Needs to be after rookoutCustom as it uses its function
    '/js/code-blocks-buttons.js'
  ],
  stylesheets: [
    'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'
  ],
  // You may provide arbitrary config keys to be used as needed by your template.
  repoUrl: 'https://github.com/Rookout/docs',
  /* On page navigation for the current documentation page */
  onPageNav: 'separate',
  // Algolia is set up in custom javascript
  //gaTrackingId: "UA-104510371-3",
  // algolia: {
  //   apiKey: '',
  //   indexName: ''
  // },
};

module.exports = siteConfig;
