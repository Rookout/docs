module.exports={
  "title": "Documentation",
  "tagline": "Rookout - Get data on-demand from your live code just when you need it.",
  "url": "https://docs.rookout.com",
  "baseUrl": "/",
  "organizationName": "Rookout",
  "projectName": "docs",
  "scripts": [
    "https://cdn.logrocket.io/LogRocket.min.js",
    "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js",
    "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js",
    "https://buttons.github.io/buttons.js",
    "https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js",
    "https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.js",
    "/js/rookoutCustom.js",
    "/js/algoliaSearchRookout.js",
    "/js/code-blocks-buttons.js"
  ],
  "stylesheets": [
    "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
  ],
  "favicon": "img/logos/bird_logo.png",
  "customFields": {
    "fonts": {
      "rookoutFont": [
        "Roboto",
        "sans-serif"
      ]
    },
    "markdownPlugins": [
      null
    ],
    "repoUrl": "https://github.com/Rookout/docs"
  },
  "onBrokenLinks": "log",
  "onBrokenMarkdownLinks": "log",
  "presets": [
    [
      "@docusaurus/preset-classic",
      {
        "docs": {
          "showLastUpdateAuthor": true,
          "showLastUpdateTime": true,
          "editUrl": "https://github.com/Rookout/docs/edit/master/docs/",
          "path": "../docs",
          "sidebarPath": "../website/sidebars.json"
        },
        "blog": {},
        "theme": {
          "customCss": "../website/src/css/customTheme.css"
        }
      }
    ]
  ],
  "plugins": [],
  "themeConfig": {
    "navbar": {
      "title": "Documentation",
      "logo": {
        "src": "img/logos/bird_logo_white.svg"
      },
      "items": []
    },
    "footer": {
      "links": [],
      "copyright": "Copyright © 2022 Rookout",
      "logo": {
        "src": "img/logos/bird_logo.png"
      }
    }
  }
}