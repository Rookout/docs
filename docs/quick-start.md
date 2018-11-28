---
id: quick-start
title: Quick Start
---

To install the Rookout SDK and start debugging your project, follow this quick start guide.  
You can also check out our pre-configured example projects over [here](sample-applications.md).

### 1. Sign Up

Sign up to [Rookout](https://app.rookout.com).


### 2. Install the SDK

Install the Rookout SDK (aka 'Rook') by following these steps:


<ul class="nav nav-tabs" id="quick-start" role="tablist">
<li class="nav-item">
<a class="nav-link active" id="python-tab" data-toggle="tab" href="#python" role="tab" aria-controls="home" aria-selected="true">Python</a>
</li>
<li class="nav-item">
<a class="nav-link" id="node-tab" data-toggle="tab" href="#node" role="tab" aria-controls="profile" aria-selected="false">Node.JS</a>
</li>
<li class="nav-item">
<a class="nav-link" id="jvm-tab" data-toggle="tab" href="#jvm" role="tab" aria-controls="contact" aria-selected="false">JVM</a>
</li>
</ul>

<div class="tab-content" id="quick-start">
<div class="tab-pane fade show active" id="python" role="tabpanel">

```python
# Install the Rookout pypi package
$ pip install rook

# Import the package in your app's entry-point file, just before it starts
import rook

if __name__ == "__main__":
    rook.start(token='[Your Rookout Token]')  
    # Your program starts here :)
```

</div>
<div class="tab-pane fade" id="node" role="tabpanel">

```javascript
// Install the npm package
$ npm install --save rookout

// Require the package in your app's entry-point file
const rook = require('rookout');

rook.start({
    token: '[Your Rookout Token]'
})
```

</div>
<div class="tab-pane fade" id="jvm" role="tabpanel">

```bash
# Download our java agent
$ curl -L "https://repository.sonatype.org/service/local/artifact/maven/redirect?r=central-proxy&g=com.rookout&a=rook&v=LATEST" -o rook.jar

# Export your token as an environment variable:
$ export ROOKOUT_TOKEN=[Your Rookout Token]

# Set your JVM to use the rook as a java agent :  
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

- Learn more about installing customizing Rookout using our detailed [Setup Guides](rooks-setup.md).

- Dig deeper into [Rookout Rules](rules.md).

- Hook Rookout into your data pipeline using one of our [Data Integrations](rules-integrations.md).
