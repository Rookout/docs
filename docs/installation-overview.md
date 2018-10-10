---
id: installation
title: Quick Start
---

Getting started with Rookout is quite straightforward:

1. Sign up at our <a href="http://www.rookout.com/trial">sign up page</a> and get a Rookout Token

2. Install a Rook by importing our SDK:

<div class="tab-container">
<input id="tab1" type="radio" name="tabs" class="tab-button" checked="true" />
<label for="tab1" class="tab-title">Python</label>
<input id="tab2" type="radio" name="tabs" class="tab-button" />
<label for="tab2" class="tab-title">Node.JS</label>
<input id="tab3" type="radio" name="tabs" class="tab-button" />
<label for="tab3" class="tab-title">JVM</label>
<div id="content1" class="tab-content hljs">
<button onclick="copyToClipboard(this)" class="tab-copy button">Copy</button>

    # Install the Rookout pypi package
    $ pip install rook

    # Export your token as an environment variable
    $ export ROOKOUT_TOKEN=[Your Rookout Token]

    # Import the package in your app's entry-point file, just before it starts
    from rook import auto_start
    if __name__ == "__main__":
        # Your program starts here :)

</div>
<div id="content2" class="tab-content hljs">
<button onclick="copyToClipboard(this)" class="tab-copy button">Copy</button>

    // Install the npm package
    $ npm install --save rookout

    // Export your token as an environment variable
    $ export ROOKOUT_TOKEN=[Your Rookout Token]

    // Require the package in your app's entry-point file
    const rook = require('rookout/auto_start');

</div>
<div id="content3" class="tab-content hljs">
<button onclick="copyToClipboard(this)" class="tab-copy button">Copy</button>

    // Download our java agent
    $ curl -L "https://repository.sonatype.org/service/local/artifact/maven/redirect?r=central-proxy&g=com.rookout&a=rook&v=LATEST" -o rook.jar

    // Export your token as an environment variable:
    $ export ROOKOUT_TOKEN=[Your Rookout Token]

    // Set your JVM to use the rook as a java agent :  
    $ export JAVA_OPTIONS="$JAVA_OPTIONS -javaagent:(pwd)/rook.jar"

</div>
</div>

3. Run your app, add a [Rookout Rule](rules-index.md), and start getting debug messages.

## What's next?

- Lean more about [Rookout Rules](rules-index.md).

- Hook Rookout into your data pipeline using one of our [Data Integrations](integrations-home.md).

- Troubleshoot your Rookout deployment using our [Troubleshooting guide](troubleshooting-rules.md).
