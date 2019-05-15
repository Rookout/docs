/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');
const sidebars = require('../sidebars.json').introduction;

const ucFirstAllWords = (str) => {
  const pieces = str.split(" ");
  for (let i = 0; i < pieces.length; i += 1) {
    const j = pieces[i].charAt(0).toUpperCase();
    pieces[i] = j + pieces[i].substr(1).toLowerCase();
  }
  return pieces.join(" ");
};

const parseSitemapCategories = () => {
  const categories = [];
  for (const [key, value] of Object.entries(sidebars)) { // eslint-disable-line no-restricted-syntax
    categories.push(key);
  }
  return categories;
};

const parseSitemapCategory = (category) => {
  const sitemap = [];
  for (let page = 0; page < sidebars[category].length; page += 1) {
    sitemap.push(sidebars[category][page]);
  }
  return sitemap;
};


class Footer extends React.Component {
  docUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    return `${baseUrl}docs/${language ? `${language}/` : ''}${doc}`;
  }

  pageUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    return baseUrl + (language ? `${language}/` : '') + doc;
  }


  renderSitemap() {
    const categories = parseSitemapCategories();
    return categories.map((category) => {
      const pages = parseSitemapCategory(category);
      return (
          <div className="sitemapLinks" key={category}>
            <h5 className="bold">{category}</h5>
            <br></br>
            {
              pages.map((page) => {
                if (page.toLowerCase() === 'agent-setup') {
                    page = "Controller Setup";
                    return (
                      <a href={this.docUrl(`agent-setup.html`)} key={page}>
                        {ucFirstAllWords(page.replace(/-/g, ' '))}
                      </a>
                    );
                }
                return (
                  <a href={this.docUrl(`${page}.html`)} key={page}>
                    {ucFirstAllWords(page.replace(/-/g, ' '))}
                  </a>
               );
            })
            }
          </div>
      );
    });
  }

  render() {
    return (
        <footer className="nav-footer" id="footer">
          <section className="sitemap">
              <a href={this.props.config.baseUrl}>
                  {this.props.config.footerIcon && (
                      <img
                          className="rook-footer-logo"
                          src={this.props.config.baseUrl + this.props.config.footerIcon}
                          alt={this.props.config.title}
                      />
                  )}
              </a>
              <div className="sitemapLinksContainer">
                  <div className="sitemapCategoryContainer">
                    { this.renderSitemap() }
                    <div className="sitemapLinks" key="Other">
                      <h5 className="bold">Other</h5>
                      <br></br>
                      <a href="https://status.rookout.com/"
                         target="_blank">
                        Status
                      </a>
                    </div>
                  </div>
              </div>
              <div className="social">
                  <a href="https://github.com/Rookout"
                     target="_blank">
                      <img
                          src={`${this.props.config.baseUrl}img/social/github.svg`}
                          alt={"GitHub - Rookout"}
                      />
                  </a>
                  <a
                      href="https://www.facebook.com/rookoutlabs/"
                      target="_blank">
                      <img
                          src={`${this.props.config.baseUrl}img/social/facebook.svg`}
                          alt={"Facebook - Rookout"}
                      />
                  </a>
                  <a href="https://twitter.com/rookoutlabs"
                     target="_blank">
                    <img
                      src={`${this.props.config.baseUrl}img/social/twitter.svg`}
                      alt={"Twitter - Rookout"}
                    />
                  </a>
                  <a href="https://www.linkedin.com/company/rookout/"
                     target="_blank">
                      <img
                          src={`${this.props.config.baseUrl}img/social/linkedin.svg`}
                          alt={"LinkedIn - Rookout"}
                      />
                  </a>
              </div>
          </section>
      </footer>
    );
  }
}

module.exports = Footer;
