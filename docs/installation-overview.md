---
id: installation
title: Quick Start
---

To set up Rookout in your environment, follow the following steps:

### 1. Sign Up

Sign up to Rookout at our <a href="http://www.rookout.com/trial">sign up page</a> and get your Rookout Token.

### 2. Install the SDK

Rooks are instrumentation components that dynamically add and remove log lines for you in real time.

Install a Rook by importing our SDK:

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

### 3. Create a Workspace

Log in to the Rookout IDE and create a new Workspace. Give it a meaningful name.

Load your Source Code into the Rookout IDE from either Github or from your local file system.

![Add Source](/img/screenshots/quick_start_3.png)

### 4. Add a Rule Point

Add a Rule Point at the line of code you wish to debug, just as if you were adding a Breakpoint in your own IDE.

Run your app and trigger the code you are trying to debug.

![Add Rule](/img/screenshots/quick_start_4.png)

### 5. Watch the Debug Message

Watch the Debug Message in the Rookout IDE.

And that's it, you're done :)

![Debug Message](/img/screenshots/quick_start_5.png)

## What's next?

- Get a taste of real time debugging with our [Basic Debugging](rules-index.md) guide.

- Hook Rookout into your data pipeline using one of our [Data Integrations](integrations-home.md).

- Troubleshoot your Rookout deployment using our [Troubleshooting guide](troubleshooting-rules.md).

- Dig deeper into [Rule scripting](rules-index.md).
