/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint no-unused-vars: 0 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js'); /* eslint import/no-unresolved: 0 */

const Container = CompLibrary.Container;
const MarkdownBlock = CompLibrary.MarkdownBlock;


const siteConfig = require(`${process.cwd()}/siteConfig.js`);


class CodeSnippet extends React.Component {
  render() {
    return (
        <Container className="mainContainer documentContainer postContainer">
          <div className="tab-container">
            <input id="tab1" type="radio" name="tabs" className="tab-button" checked="true" />
            <label htmlFor="tab1" className="tab-title">Python</label>

            <input id="tab2" type="radio" name="tabs" className="tab-button" />
            <label htmlFor="tab2" className="tab-title">NodeJS</label>

            <input id="tab3" type="radio" name="tabs" className="tab-button" />
            <label htmlFor="tab3" className="tab-title">JVM</label>

            <div id="content1" className="tab-content">
              <MarkdownBlock>
                {`
                # Python Tab
                `}
              </MarkdownBlock>
            </div>
            <div id="content2" className="tab-content">
              Test NodeJS
            </div>
            <div id="content3" className="tab-content">
              Test JVM
            </div>
          </div>
        </Container>
    );
  }
}

module.exports = CodeSnippet;
