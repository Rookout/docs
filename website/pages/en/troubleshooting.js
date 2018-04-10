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

const dehumanizeTitle = value => {
  return value.replace(' ', '-');
};

const Collapsible = props => (
  <div className="wrap-collapsible">
    <input id={"collapsible-".concat(dehumanizeTitle(props.title))} className="toggle" type="checkbox" />
    <label htmlFor={"collapsible-".concat(dehumanizeTitle(props.title))} className="lbl-toggle">{props.title}</label>
    <div className="collapsible-content">
      <div className="content-inner">
        {props.children}
      </div>
    </div>
  </div>
);

const CollapsibleContainer = props => (
  <div className="rook-collapsibleContainer">
    {props.children}
  </div>
);

const RulesContent = () => (
  <MarkdownBlock>
{`
## Gray - Rule is pending
- Rule is not being applied because of selectors
- Rule is not being applied because there are no agents
- Rule is not being applied because there are no Rooks
- Rule is not being applied because the appropriate Rooks are not connected
- Rule is not being applied because paths differ (Python/Node)
- Rule is not being applied because source maps are missing (Node)

## Orange - Rule is Warning
- Error in script
- Source missing (Java)


## Red - Rule is Error
- JSON is invalid
  - JSON has failed loading/processing
  - Check your JSON against documentation and templates
- Hash mismatch
  - Source file differs between configuration and production
  - **Future features:** smaller hashes, identify production file based on hash and display
- Python Bdb failed to find code
  - Two “features”:
    - In Python there is no “Hoisting” and code objects are only created as their definitions are executed. Today, we are unable to know if this has happened and will assume any loaded module has been fully loaded.
    - In order to avoid this problem, import rook only after modules has been properly initialized. A common use-case is loaded just before if __name__ == “__main__”
  - Module scope instrumentation is not supported under CPython
`}
  </MarkdownBlock>
);

const AgentDockerContent = () => (
  <MarkdownBlock>
{`
- Detect if running by using
  \`$ docker ps | grep rookout\`
- Detect if has been run in the past by using
  \`$ docker ps -a | grep rookout\`
- Configuration should only be done by using environment variables
  \`From docker command line -e “KEY=VALUE”\`
`}
  </MarkdownBlock>
);

const AgentSystemdContent = () => (
  <MarkdownBlock>
  {`
- Detect if running by executing
  \`service rookout-agent status\`
- Detect if has been installed by looking at init.d directory at:
  \`/etc/init.d/rookout-agent\`
`}
  </MarkdownBlock>
);

const PythonRookContent = () => (
  <MarkdownBlock>
  {`
- Test connectivity
  \`python -m rook\`
- Python versions:
    - CPython 2.7 on Linux
    - PYPY (any version) on Linux
- Installation
  - Python rook needs to be installed within the application's virtualenv
  - Old installation tools can cause issues. Attempt to upgrade pip and remove distribute (deprecated, only if exists):
    - \`pip install -U pip\`
    - \`pip uninstall distribute\`
- Installation requires compiling some Python extensions on the fly, this requires the following packages:
  - apt
    - \`$ apt-get update -q\`
    - \`$ apt-get install -qy g++ python-dev\`
  - yum
    - \`$ yum install -qy gcc-c++ python-devel\`
  - apk
`}
  </MarkdownBlock>
);

const JavaRookContent = () => (
  <MarkdownBlock>
  {`
- Test connectivity
  \`java -jar rook.jar\`
- Supported Java versions:
  - Java 7, Java 8
  - Oracle and Open have been tested
`}
  </MarkdownBlock>
);

const NodeRookContent = () => (
  <MarkdownBlock>
  {`
- Test connectivity

- Supported Node versions:
  - 4, 6, 8
`}
  </MarkdownBlock>
);

class Troubleshooting extends React.Component {
  render() {
    return (
        <Container className="rook-troubleshootingContainer mainContainer documentContainer postContainer">
          <div className="post rook-paddingBottomHalf">
            <header className="postHeader">
              <h2>Need help?</h2>
            </header>
            <p>This project is developed and maintained by Rookout Ltd.</p>
            <p>This page contains all the most frequent issues you may encounter.
              For anything else that you cannot find here you are welcome to contact us at <a href="mailto:support@rookout.com">support@rookout.com</a></p>
          </div>
          <CollapsibleContainer>
            <Collapsible title="Issues with Rules">
              <RulesContent/>
            </Collapsible>
            <Collapsible title="Issues with Docker Agent">
              <AgentDockerContent/>
            </Collapsible>
            <Collapsible title="Issues with Systemd Agent">
              <AgentSystemdContent/>
            </Collapsible>
            <Collapsible title="Issues with Python Rook">
              <PythonRookContent/>
            </Collapsible>
            <Collapsible title="Issues with Java Rook">
              <JavaRookContent/>
            </Collapsible>
            <Collapsible title="Issues with Node Rook">
              <NodeRookContent/>
            </Collapsible>
          </CollapsibleContainer>
        </Container>
    );
  }
}

module.exports = Troubleshooting;
