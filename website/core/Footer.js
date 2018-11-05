/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

class Footer extends React.Component {
  docUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    return `${baseUrl}docs/${language ? `${language}/` : ''}${doc}`;
  }

  pageUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    return baseUrl + (language ? `${language}/` : '') + doc;
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
                  <h5 className="bold">Documentation</h5>
                  <div className="sitemapLinks">
                    <a href={this.docUrl('welcome.html')}>
                      Getting Started
                    </a>
                    <a href={this.docUrl('sandbox-getting-started.html')}>
                      Sandbox Tutorials
                    </a>
                    <a href={this.docUrl('rooks-config.html')}>
                      Advanced Setup
                    </a>
                    <a href={this.docUrl('troubleshooting-rules.html')}>
                      Troubleshooting
                    </a>
                    <a href={this.docUrl('reference.html')}>
                      Concepts
                    </a>
                    <a href={this.docUrl('rules.html')}>
                      Reference
                    </a>
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
