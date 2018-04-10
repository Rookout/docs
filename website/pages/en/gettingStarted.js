/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');
const CompLibrary = require('../../core/CompLibrary.js');
const Container = CompLibrary.Container;
const MarkdownBlock = CompLibrary.MarkdownBlock;

const siteConfig = require(process.cwd() + '/siteConfig.js');

function imgUrl(img) {
  return siteConfig.baseUrl + 'img/' + img;
}

function docUrl(doc, language) {
  return siteConfig.baseUrl + 'docs/' + (language ? language + '/' : '') + doc;
}

function pageUrl(page, language) {
  return siteConfig.baseUrl + (language ? language + '/' : '') + page;
}

class Button extends React.Component {
  render() {
    return (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={this.props.href} target={this.props.target}>
          {this.props.children}
        </a>
      </div>
    );
  }
}

Button.defaultProps = {
  target: '_self',
};

const DemoVideo = () => (
  <iframe width="420" height="315"
          src="https://www.youtube.com/embed/qTdpOC92DBI">
  </iframe>
);

const Introduction = () => (
  <div>
    <MarkdownBlock>
{`
## What is Rookout

Rookout allows you to get data from your live code, as it runs. Extract any piece of data from your code and pipeline
it anywhere, in realtime,
even if you’d never thought about it beforehand or created any instrumentation to collect it.

Real-time instrumentation means you don’t need to restart, redeploy or write code to see inside your app.

When you change or add a new vendor to your stack, we can take care of data shipment to that vendor.

Our solution supports Python, JVM, and NodeJS on AWS, Azure and Google Cloud or on your bare metal. We provide
end-to-end security, coupled with a small footprint and a negligible performance impact.


#### Watch our demo
`}
    </MarkdownBlock>
    <DemoVideo/>
    <MarkdownBlock>
{`
## Tutorial
### Pre-requisites

- Docker
- Rookout account

If you're missing one of the two, [Docker is available here](https://www.docker.com/community-edition#/download)
and you can open an account [on our website](https://www.rookout.com/join-our-early-adopters-plan/).


### What to do?

First, you will need to clone or download our [tutorial github repository](https://github.com/Rookout/tutorial-nodejs).
`}
    </MarkdownBlock>
  </div>
);


class GettingStarted extends React.Component {
  render() {
    return (
      <div>
        <Container padding="all">
          <Introduction/>

        </Container>
      </div>
    );
  }
}

module.exports = GettingStarted;
