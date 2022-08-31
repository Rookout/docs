import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', 'ee5'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', 'f1d'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', '43b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'be0'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '431'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '676'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '41a'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', '530'),
    routes: [
      {
        path: '/docs/breakpoint-limits',
        component: ComponentCreator('/docs/breakpoint-limits', 'cba'),
        exact: true,
        sidebar: "introduction"
      },
      {
        path: '/docs/breakpoints',
        component: ComponentCreator('/docs/breakpoints', '96a'),
        exact: true,
        sidebar: "introduction"
      },
      {
        path: '/docs/breakpoints-conditional',
        component: ComponentCreator('/docs/breakpoints-conditional', 'dbc'),
        exact: true,
        sidebar: "introduction"
      },
      {
        path: '/docs/breakpoints-status',
        component: ComponentCreator('/docs/breakpoints-status', '55d'),
        exact: true,
        sidebar: "introduction"
      },
      {
        path: '/docs/built-in-variables',
        component: ComponentCreator('/docs/built-in-variables', '203'),
        exact: true,
        sidebar: "introduction"
      },
      {
        path: '/docs/collaborations',
        component: ComponentCreator('/docs/collaborations', '6c0'),
        exact: true,
        sidebar: "introduction"
      },
      {
        path: '/docs/data-redaction',
        component: ComponentCreator('/docs/data-redaction', '697'),
        exact: true,
        sidebar: "introduction"
      },
      {
        path: '/docs/debug-session-setup',
        component: ComponentCreator('/docs/debug-session-setup', '9c7'),
        exact: true,
        sidebar: "introduction"
      },
      {
        path: '/docs/deployment-examples',
        component: ComponentCreator('/docs/deployment-examples', 'd6c'),
        exact: true,
        sidebar: "introduction"
      },
      {
        path: '/docs/dop-config',
        component: ComponentCreator('/docs/dop-config', '5a4'),
        exact: true,
        sidebar: "introduction"
      },
      {
        path: '/docs/dop-install',
        component: ComponentCreator('/docs/dop-install', 'e44'),
        exact: true,
        sidebar: "introduction"
      },
      {
        path: '/docs/dop-intro',
        component: ComponentCreator('/docs/dop-intro', 'fee'),
        exact: true,
        sidebar: "introduction"
      },
      {
        path: '/docs/dotnet-container-tutorial',
        component: ComponentCreator('/docs/dotnet-container-tutorial', 'fd2'),
        exact: true,
        sidebar: "introduction"
      },
      {
        path: '/docs/dotnet-setup',
        component: ComponentCreator('/docs/dotnet-setup', 'f9e'),
        exact: true,
        sidebar: "introduction"
      },
      {
        path: '/docs/etl-controller-config',
        component: ComponentCreator('/docs/etl-controller-config', 'b38'),
        exact: true,
        sidebar: "introduction"
      },
      {
        path: '/docs/etl-controller-install',
        component: ComponentCreator('/docs/etl-controller-install', '50c'),
        exact: true,
        sidebar: "introduction"
      },
      {
        path: '/docs/etl-controller-intro',
        component: ComponentCreator('/docs/etl-controller-intro', '11f'),
        exact: true,
        sidebar: "introduction"
      },
      {
        path: '/docs/etl-controller-linux',
        component: ComponentCreator('/docs/etl-controller-linux', 'f9a'),
        exact: true
      },
      {
        path: '/docs/go-setup',
        component: ComponentCreator('/docs/go-setup', '4f1'),
        exact: true,
        sidebar: "introduction"
      },
      {
        path: '/docs/java-container-tutorial',
        component: ComponentCreator('/docs/java-container-tutorial', '574'),
        exact: true,
        sidebar: "introduction"
      },
      {
        path: '/docs/jvm-setup',
        component: ComponentCreator('/docs/jvm-setup', 'bb3'),
        exact: true,
        sidebar: "introduction"
      },
      {
        path: '/docs/keyboard-shortcuts',
        component: ComponentCreator('/docs/keyboard-shortcuts', '2c1'),
        exact: true,
        sidebar: "introduction"
      },
      {
        path: '/docs/license',
        component: ComponentCreator('/docs/license', 'f27'),
        exact: true,
        sidebar: "introduction"
      },
      {
        path: '/docs/live-logger',
        component: ComponentCreator('/docs/live-logger', 'cd4'),
        exact: true,
        sidebar: "introduction"
      },
      {
        path: '/docs/node-container-tutorial',
        component: ComponentCreator('/docs/node-container-tutorial', 'd5c'),
        exact: true,
        sidebar: "introduction"
      },
      {
        path: '/docs/node-setup',
        component: ComponentCreator('/docs/node-setup', '5ae'),
        exact: true,
        sidebar: "introduction"
      },
      {
        path: '/docs/organizations',
        component: ComponentCreator('/docs/organizations', 'ed5'),
        exact: true,
        sidebar: "introduction"
      },
      {
        path: '/docs/projects-labels',
        component: ComponentCreator('/docs/projects-labels', '1aa'),
        exact: true,
        sidebar: "introduction"
      },
      {
        path: '/docs/python-container-tutorial',
        component: ComponentCreator('/docs/python-container-tutorial', '13b'),
        exact: true,
        sidebar: "introduction"
      },
      {
        path: '/docs/python-setup',
        component: ComponentCreator('/docs/python-setup', '5f9'),
        exact: true,
        sidebar: "introduction"
      },
      {
        path: '/docs/ruby-container-tutorial',
        component: ComponentCreator('/docs/ruby-container-tutorial', '8c3'),
        exact: true,
        sidebar: "introduction"
      },
      {
        path: '/docs/ruby-setup',
        component: ComponentCreator('/docs/ruby-setup', 'd3b'),
        exact: true,
        sidebar: "introduction"
      },
      {
        path: '/docs/sdk-digests',
        component: ComponentCreator('/docs/sdk-digests', '86b'),
        exact: true,
        sidebar: "introduction"
      },
      {
        path: '/docs/setup-guide',
        component: ComponentCreator('/docs/setup-guide', 'a1e'),
        exact: true,
        sidebar: "introduction"
      },
      {
        path: '/docs/setup-intro',
        component: ComponentCreator('/docs/setup-intro', '0c9'),
        exact: true,
        sidebar: "introduction"
      },
      {
        path: '/docs/source-repos',
        component: ComponentCreator('/docs/source-repos', 'e5c'),
        exact: true,
        sidebar: "introduction"
      },
      {
        path: '/docs/tracing-timeline',
        component: ComponentCreator('/docs/tracing-timeline', 'fdd'),
        exact: true,
        sidebar: "introduction"
      },
      {
        path: '/docs/use-cases',
        component: ComponentCreator('/docs/use-cases', '58c'),
        exact: true,
        sidebar: "introduction"
      },
      {
        path: '/docs/welcome',
        component: ComponentCreator('/docs/welcome', '95b'),
        exact: true,
        sidebar: "introduction"
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
