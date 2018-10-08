---
id: introduction
title: Welcome to Rookout
sidebar_label: Welcome to Rookout
---

Rookout real-time instrumentation means you don’t need to restart, redeploy or write code to see inside your app.
Easily fetch data from any environment - cloud or local, dev or production;
And automatically send your data to your analytics, storage or alerting tools.

Getting started with Rookout is quite straight forward:

1. Sign up at our <a href="http://www.rookout.com/trial">sign up page</a> and get a Rookout Token

2. Install a Rook by importing our SDK:

<details>
<summary>_Python Quick Start_</summary>

Create and activate a new virtual environment :

```bash
$ virtualenv virtualenv
$ source virtualenv/bin/activate
```

Install the Rookout pypi package :  
```bash
$ pip install rook
```

Import the package in your app's entry-point file :  
```javascript
from rook import auto_start
```

Export your token as an environment variable:
```bash
$ export ROOKOUT_TOKEN=<Your Rookout Token>
```

</details>

<details>
<summary>_Node.js Quick Start_</summary> 

Install the npm package:
```bash
$ npm install --save rookout
```
Require the package in your app's entry-point file:
```javascript
const rook = require('rookout/auto_start');
```

Export your token as an environment variable:
```bash
$ export ROOKOUT_TOKEN=<Your Rookout Token>
```

</details>

<details>
<summary>_Java Quick Start_</summary>    

Download our java agent :
```bash
$ curl -L "https://repository.sonatype.org/service/local/artifact/maven/redirect?r=central-proxy&g=com.rookout&a=rook&v=LATEST" -o rook.jar
```

Set your JVM to use the rook as a java agent :  
```bash
$ export JAVA_OPTIONS="$JAVA_OPTIONS -javaagent:{DOWNLOAD_DIR}/rook.jar"
```

Export your token as an environment variable:
```bash
$ export ROOKOUT_TOKEN=<Your Rookout Token>
```

</details>

3. Run your app, add a Rookout Rule, and start getting debug messages.

You can also check out our sandbox examples: [Python](python-getting-started.md), [Node.js](node-getting-started.md), [Java](java-getting-started.md).

Or find your specific deployment in our <a href="https://github.com/Rookout/deployment-examples">Deployment Examples page</a>.

Or reach out to us if anything is unclear: support@rookout.com