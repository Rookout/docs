---
id: installation
title: Quick Start
---

To set up Rookout in your environment, follow these steps:

### 1. Sign Up

Sign up to Rookout at our <a href="http://www.rookout.com/trial">sign up page</a> and get your Rookout Token.<br/>
Your Rookout Token may be copied from the walkthrough tutorial, or from the Organization Settings page.


### 2. Install the SDK

Install the Rookout SDK (aka 'Rook') by following these steps:

<div class="tab-container">
<input id="tab1" data-tab="tab1" type="radio" name="tabs" class="tab-button" checked="true" />
<label for="tab1" class="tab-title">Python</label>
<input id="tab2" data-tab="tab2" type="radio" name="tabs" class="tab-button" />
<label for="tab2" class="tab-title">Node.JS</label>
<input id="tab3" data-tab="tab3" type="radio" name="tabs" class="tab-button" />
<label for="tab3" class="tab-title">JVM</label>
<div data-tab-content="content1" class="tab-content hljs">
<button onclick="copyToClipboard(this)" class="tab-copy button">Copy</button>

```bash
# Install the Rookout pypi package
$ pip install rook

# Export your token as an environment variable
$ export ROOKOUT_TOKEN=[Your Rookout Token]
```
```python
# Import the package in your app's entry-point file, just before it starts
from rook import auto_start
if __name__ == "__main__":
    # Your program starts here :)
```

</div>
<div data-tab-content="content2" class="tab-content hljs">
<button onclick="copyToClipboard(this)" class="tab-copy button">Copy</button>

```bash
// Install the npm package
$ npm install --save rookout

// Export your token as an environment variable
$ export ROOKOUT_TOKEN=[Your Rookout Token]
```
```node
// Require the package in your app's entry-point file
const rook = require('rookout/auto_start');
```

</div>
<div data-tab-content="content3" class="tab-content hljs">
<button onclick="copyToClipboard(this)" class="tab-copy button">Copy</button>

```bash
// Download our java agent
$ curl -L "https://repository.sonatype.org/service/local/artifact/maven/redirect?r=central-proxy&g=com.rookout&a=rook&v=LATEST" -o rook.jar

// Export your token as an environment variable:
$ export ROOKOUT_TOKEN=[Your Rookout Token]

// Set your JVM to use the rook as a java agent :  
$ export JAVA_OPTIONS="$JAVA_OPTIONS -javaagent:(pwd)/rook.jar"
```

</div>
</div>
<div class="rookout-org-info"></div>

### 3. Create a Workspace

Log in to the [Rookout IDE](https://app.rookout.com) and create a new Workspace. Give it a meaningful name.<br/>
Load your Source Code into the Rookout IDE from either Github or from your local file system.

![Add Source](/img/screenshots/quick_start_3.png)

### 4. Add a Rule Point

Add a Rule Point at the line of code you wish to debug, just as if you were adding a Breakpoint in your own IDE.<br/>
Run your app and trigger the code you are trying to debug.

![Add Rule](/img/screenshots/quick_start_4.png)

### 5. Watch the Debug Message

Watch the Debug Message in the [Rookout IDE](https://app.rookout.com).

And that's it, you're done :)

![Debug Message](/img/screenshots/quick_start_5.png)

## Next step

- __Get a taste of real time debugging with our [Basic Debugging](rules-index.md) guide.__

## Additional information

- If you faced any issues, please let us know: support@rookout.com

- Hook Rookout into your data pipeline using one of our [Data Integrations](integrations-home.md).

- Troubleshoot your Rookout deployment using our [Troubleshooting guide](troubleshooting-rules.md).

- Dig deeper into [Rule scripting](rules-index.md).
