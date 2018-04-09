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
    return baseUrl + 'docs/' + (language ? language + '/' : '') + doc;
  }

  pageUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    return baseUrl + (language ? language + '/' : '') + doc;
  }

  render() {
    const currentYear = new Date().getFullYear();
      return <footer className="nav-footer" id="footer">
          <section className="sitemap">
              <a href={this.props.config.baseUrl} className="nav-home rook-footer-logo">
                  {this.props.config.footerIcon && (
                      <img
                          src={this.props.config.baseUrl + this.props.config.footerIcon}
                          alt={this.props.config.title}
                          width="170"
                          height="45"
                      />
                  )}
              </a>
              <div>
                  <h5>Documentation</h5>
                  <a href={this.docUrl('getting-started.html', this.props.language)}>
                      Getting Started
                  </a>
                  <a href={this.docUrl('installation.html', this.props.language)}>
                      Installation
                  </a>
                  <a href={this.docUrl('output-integration.html', this.props.language)}>
                      Output Integrations
                  </a>
                  <a href={this.docUrl('reference.html', this.props.language)}>
                      Reference
                  </a>
                  <a href={this.docUrl('troubleshooting.html', this.props.language)}>
                      Troubleshooting
                  </a>
              </div>
              <div>
                  <h5>Community</h5>
                  <a href="https://github.com/Rookout"
                     target="_blank">
                      <img
                          src={this.props.config.baseUrl + "img/social/github.svg"}
                          alt={"GitHub - Rookout"}
                          width="50"
                          height="50"
                      />
                  </a>
                  <a
                      href="https://www.facebook.com/rookoutlabs/"
                      target="_blank">
                      <img
                          src={this.props.config.baseUrl + "img/social/facebook.svg"}
                          alt={"Facebook - Rookout"}
                          width="50"
                          height="50"
                      />
                  </a>
                  <a href="https://www.linkedin.com/company/rookout/"
                     target="_blank">
                      <img
                          src={this.props.config.baseUrl + "img/social/linkedin.svg"}
                          alt={"LinkedIn - Rookout"}
                          width="50"
                          height="50"
                      />
                  </a>
              </div>
          </section>
          <section className="copyright">
              Copyright &copy; {currentYear} Rookout
          </section>
      </footer>;
  }
}

module.exports = Footer;
