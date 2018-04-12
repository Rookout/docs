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

const dehumanizeTitle = value => value.replace(' ', '-');

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

const ProxyContent = () => (
  <MarkdownBlock>
{`
### If you are required to use a proxy please read carefully!

## Setting up the proxy for the current environment
If you are setting your proxy using an environment variable, be sure to do it this way before any command you
execute that may need it:
- **UNIX:** \`export HTTPS_PROXY=<[protocol://][user:password@]proxyhost[:port]>\`
  Example: \`export HTTPS_PROXY=https://myuser:password@proxy.rookout.com:1234\`
- **WINDOWS:** \`set HTTPS_PROXY=<[protocol://][user:password@]proxyhost[:port]>\`
  Example: \`set HTTPS_PROXY=https://myuser:password@proxy.rookout.com:1234\`

## Installing a Rook
To make sure the proxy is used when downloading the rook dependency, execute the command like this:
\`export HTTPS_PROXY=https://myuser:password@proxy.rookout.com:1234 && packagemanager rookout\`

__IF USING WINDOWS: REPLACE \`export\` by \`set\`__

### Python:
\`\`\`bash
export HTTPS_PROXY=https://myuser:password@proxy.rookout.com:1234 && pip install rook
\`\`\`

### Node:
\`\`\`bash
export HTTPS_PROXY=https://myuser:password@proxy.rookout.com:1234 && npm install --save rookout
\`\`\`

### Java:
\`\`\`bash
export HTTPS_PROXY=https://myuser:password@proxy.rookout.com:1234 && curl -L "https://repository.sonatype.org/service/local/artifact/maven/redirect?r=central-proxy&g=com.rookout&a=rook&v=LATEST" -o rook.jar
\`\`\`

## Installing and running the Agent
If you are installing the Rookout Agent, use this argument when running the setup script: --https-proxy
\`bash setup.sh --token=<Your-Token> --https-proxy=<Your-Proxy>\`

If the agent is already installed, you can edit the configuration file \`/etc/default/rookout-agent\`
and set the environment variable as explained beforehand: \`export HTTPS_PROXY=...\`. Save the file and restart the agent
by running: \`systemctl restart rookout-agent\`

More details are [available here](/docs/installation-agent-proxy.html)

## Using simple-https server
Using a proxy will not work as the https certificate created is for \`localhost\`
You can use the \`--no-ssl\` flag for local file serving.
`}
  </MarkdownBlock>
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
    - In Python there is no “Hoisting” and code objects are only created as their definitions are executed.
    Today, we are unable to know if this has happened and will assume any loaded module has been fully loaded.
    - In order to avoid this problem, import rook only after modules has been properly initialized. A common use-case
    is loaded just before if __name__ == “__main__”
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
              For anything else that you cannot find here you are welcome to contact us at
              <a href="mailto:support@rookout.com">support@rookout.com</a></p>
          </div>
          <CollapsibleContainer>
            <Collapsible title="Using a Proxy">
              <ProxyContent/>
            </Collapsible>
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
