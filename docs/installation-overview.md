---
id: installation
title: Quick Start
---

Getting started with Rookout is quite straightforward:

1. Sign up at our <a href="http://www.rookout.com/trial">sign up page</a> and get a Rookout Token

2. Install a Rook by importing our SDK:

    - [Python](#python)
    - [Node](#node)
    - [Java](#java)

3. Run your app, add a [Rookout Rule](rules-index.md), and start getting debug messages.

## Python

```javascript
//Install the Rookout pypi package :  
$ pip install rook

//Import the package in your app's entry-point file :  
from rook import auto_start

//Export your token as an environment variable:
$ export ROOKOUT_TOKEN=[Your Rookout Token]
```

## Node

```javascript
//Install the npm package:
$ npm install --save rookout

//Require the package in your app's entry-point file:
const rook = require('rookout/auto_start');

//Export your token as an environment variable:
$ export ROOKOUT_TOKEN=[Your Rookout Token]
```

## Java

```javascript
//Download our java agent :
$ curl -L "https://repository.sonatype.org/service/local/artifact/maven/redirect?r=central-proxy&g=com.rookout&a=rook&v=LATEST" -o rook.jar

//Set your JVM to use the rook as a java agent :  
$ export JAVA_OPTIONS="$JAVA_OPTIONS -javaagent:{DOWNLOAD_DIR}/rook.jar"

//Export your token as an environment variable:
$ export ROOKOUT_TOKEN=[Your Rookout Token]
```

## What's next?

- Lean more about [Rookout Rules](rules-index.md).

- Hook Rookout into your data pipeline using one of our [Data Integrations](integrations-home.md).

- Troubleshoot your Rookout deployment using our [Troubleshooting guide](troubleshooting-rules.md).