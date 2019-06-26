---
id: quick-start
title: Quick Start
---

To install the Rookout SDK and start debugging your project, follow this quick start guide.  
You can also check out our pre-configured example projects over [here](sample-applications.md).


<details>
    <summary><span style="font-size:1.3em;￿">1. Sign Up</span></summary></summary>
        <br>
Sign up to [Rookout](https://app.rookout.com).

</details>

<details>
    <summary><span style="font-size:1.3em;￿">2. Install the SDK</span></summary></summary>
        <br>
Install the Rookout SDK (aka 'Rook') by following these steps:

<!--DOCUSAURUS_CODE_TABS-->
<!--Python-->
```python
# Install the Rookout pypi package
pip install rook

# Import the package in your app's entry-point file, just before it starts
# Note! if you are using a pre-forking server such as uWSGI, Gunicorn or Celery, be sure to check out
# the Pre-forking servers section in our SDK Setup page
import rook

if __name__ == "__main__":
    rook.start(token='[Your Rookout Token]',
               labels={'Your labels'}) # Labels parameter is optional,see Tagging page below Projects 
    # Your program starts here :)
```
<!--Node-->
```javascript
// Install the npm package
npm install --save rookout

// Require the package in your app's entry-point file
const rook = require('rookout');

rook.start({
    token: '[Your Rookout Token]',
    labels: {'Your labels'} // Optional,see Tagging page below Projects
            
});
```
<!--JVM-->
```bash
# Download our java agent
curl -L "https://repository.sonatype.org/service/local/artifact/maven/redirect?r=central-proxy&g=com.rookout&a=rook&v=LATEST" -o rook.jar

# Export your token as an environment variable
export ROOKOUT_TOKEN=[Your Rookout Token]

# Optional, see Tagging section below Projects
export ROOKOUT_LABELS=[Your labels]

# Set your JVM to use the rook as a java agent
export JAVA_TOOL_OPTIONS="-javaagent:(pwd)/rook.jar"
```
<!--END_DOCUSAURUS_CODE_TABS-->
<div class="rookout-org-info"></div>

</details>

<details>
    <summary><span style="font-size:1.3em;￿">3. Create a Project</span></summary></summary>
        <br>
        
Log in to the [Rookout IDE](https://app.rookout.com) and create a new Project. Give it a meaningful name.<br/>
Load your Source Code into the Rookout IDE from either Github or from your local file system.

![Add Source](/img/screenshots/quick_start_3.png)

</details>

<details>
    <summary><span style="font-size:1.3em;￿">4. Add a Breakpoint</span></summary></summary>
        <br>
        
Add a Breakpoint at the line of code you wish to debug, just as if you were adding a Breakpoint in your own IDE.<br/>
Run your app and trigger the code you are trying to debug.

![Add Breakpoint](/img/screenshots/quick_start_4.png)

</details>

<details>
    <summary><span style="font-size:1.3em;￿">5. Watch the Debug Message</span></summary></summary>
        <br>
        
Watch the Debug Message in the [Rookout IDE](https://app.rookout.com).

And that's it, you're done :)

![Debug Message](/img/screenshots/quick_start_5.png)

## Next steps

- If you faced any issues, please let us know: support@rookout.com

- Learn more about installing customizing Rookout using our detailed [Setup Guides](sdk-setup.md).

- Dig deeper into [Rookout Breakpoints](breakpoints.md).

- Hook Rookout into your data pipeline using one of our [Data Integrations](integrations.md).

</details>




