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
    return (
      <footer className="nav-footer" id="footer">
        <section className="sitemap">
          <a href={this.props.config.baseUrl} className="nav-home">
            {this.props.config.footerIcon && (
              <img
                src={this.props.config.baseUrl + this.props.config.footerIcon}
                alt={this.props.config.title}
                width="66"
                height="58"
              />
            )}
          </a>
          <div>
            <h5>Docs</h5>
            <a href={this.docUrl('getting-started.html', this.props.language)}>
              Getting Started
            </a>
            <a href={this.docUrl('deployment-examples.html', this.props.language)}>
              Deployment Examples
            </a>
            <a href={this.docUrl('rules-scripting-ref.html', this.props.language)}>
              Rules Scripting Reference
            </a>
          </div>
          <div>
            <h5>Community</h5>
            <a href="https://github.com/Rookout"
               target="_blank">
              Github
            </a>
            <a
              href="https://www.facebook.com/rookoutlabs/"
              target="_blank">
              Facebook Page
            </a>
            <a href="https://www.linkedin.com/company/rookout/"
               target="_blank">
               LinkedIn Company Page
            </a>
          </div>
        </section>

        <a
          href="https://www.rookout.com/"
          target="_blank"
          className="fbOpenSource">
          <img
            src={this.props.config.baseUrl + 'img/oss_logo.png'}
            alt="Rookout"
            width="170"
            height="45"
          />
        </a>
        <section className="copyright">
          Copyright &copy; {currentYear} Rookout
        </section>
      </footer>
    );
  }
}

module.exports = Footer;
