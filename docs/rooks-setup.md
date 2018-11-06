---
id: rooks-setup
title: Rook Setup
sidebar_label: Rook Setup
---


<section class="page-tab-container">
<input id="page-tab1" data-lang="python" type="radio" name="page-tabs" class="tab-button" checked="true" />
<label for="page-tab1" class="page-tab-title">Python</label>
<input id="page-tab2" data-lang="node" type="radio" name="page-tabs" class="tab-button" />
<label for="page-tab2" class="page-tab-title">Node.JS</label>
<input id="page-tab3" data-lang="jvm" type="radio" name="page-tabs" class="tab-button" />
<label for="page-tab3" class="page-tab-title">JVM</label>

<div id="page-content1" class="page-tab-content">

## Python

The Python Rook provides the ability to fetch debug data from a running application in real time.
It is deployed by deploying the [Rook SDK](https://pypi.org/project/rook/).
It can easily be installed by running the following command:
```bash
$ pip install rook
```

## Setup

Import the Rook within your application:
```python
from rook.interface import Rook
r = Rook()
r.start(token='[Your Rookout Token]')

if __name__ == "__main__":
    # Your program starts here :)
```
<div class="rookout-org-info org-info-normal-snippet"></div>

The Rook should be imported as late as possible within the application.
This is due to the fact that in Python, there's no clean way to identify a module has finished defining it's classes.

## Rookout SDK API

The Rookout SDK API offers the following methods

```python
start(self,
    token=None,
    host=None,
    port=None,
    debug=None,
    silence_errors=None,
    log_file=None,
    log_level=None,
    log_to_stderr=None,
    **kwargs)
```

The `start` method is used to initialize the Rookout SDK in the background and accepts the following arguments:

1. `token` - The Rookout Token for your organization. May also be set using the environment variable `ROOKOUT_TOKEN`. *Note*: this should left as None if you are using the Rookout Agent.
1. `host` - If you are using a Rookout agent, this is the hostname for it. May also be set using the environment variable `ROOKOUT_AGENT_HOST`.
1. `port` - If you are using a Rookout agent, this is the port for it. May also be set using the environment variable `ROOKOUT_AGENT_PORT`.
1. `debug` - Set to `True` to increase log level to debug. May also be set using the environment variable `ROOKOUT_DEBUG`.
1. `silence_errors` - Set to `True` to have start throw on errors.
1. `log_file` - Path to file to use for the SDK logs (default is `/var/log/rookout/python-rook.log`). May also be set using the environment variable `ROOKOUT_LOG_FILE`.
1. `log_level` - Control the SDK logging verbosity. May also be set using the environment variable `ROOKOUT_LOG_LEVEL`.
1. `log_to_stderr` - Set to `True` to have the SDK log to stderr. May also be set using the environment variable `ROOKOUT_LOG_TO_STDERR`.

```python
flush(self)
```

The `flush` method allows explicitly flushing the Rookout logs and messages.

## Test connectivity

To make sure the SDK was properly installed in your Python (virtual) enviorment, and test your configuration (environment variables only), run the following command:
```bash
$ python -m rook
```

</div>

<div id="page-content2" class="page-tab-content">

## Node.js

The Node.js Rook provides the ability to fetch debug data from a running application in real time.
It is deployed by deploying the [Rook SDK](https://www.npmjs.com/package/rookout).
It can easily be installed by running the following command:
```bash
$ npm install --save rookout
```

## Basic setup

Tag your environment:
```bash
// Use a set of semicolon separated values to identify specific deployments and configurations
$ export ROOKOUT_TAGS=[;;;]
```

Import the Rookout SDK within your application:
```javascript
const rook = require('rookout');

rookout.start({
    token: '[Your Rookout Token]'
})
```
<div class="rookout-org-info org-info-normal-snippet"></div>

**Optional:** You may also set your token as an environment variable:

1. Setup the Rookout token in your environment:
```bash
// Export your token as an environment variable
$ export ROOKOUT_TOKEN=[Your Rookout Token]
```
<div class="rookout-org-info org-info-normal-snippet"></div>

2. Import the Rook within your application using auto_start:
```javascript
const rook = require('rookout/auto_start');
```

## Test connectivity

To make sure the Rook was correctly installed and can reach the Rookout Service, run the following command:
```bash
$ ./node_modules/.bin/rookout_check
```

</div>

<div id="page-content3" class="page-tab-content">

## JVM

The JVM Rook provides the ability to fetch debug data from a running application in real time.
It is deployed by deploying the [Rook SDK](https://mvnrepository.com/artifact/com.rookout/rook).

It can be download directly to the target system by running the following command:
```bash
$ curl -L "https://repository.sonatype.org/service/local/artifact/maven/redirect?r=central-proxy&g=com.rookout&a=rook&v=LATEST" -o rook.jar
```
It can also be installed by adding the dependency in Rookout in JVM build systems such as Maven or Gradle.

For Gradle:

```javascript
dependencies {
   runtime group: 'com.rookout', name: 'rook', version:'0.1.31'
}
```

## Basic Setup

Setup the Rookout token in your environment:
```bash
// Export your token as an environment variable
$ export ROOKOUT_TOKEN=[Your Rookout Token]
```

Tag your environment:
```bash
// Use a set of semicolon separated values to identify specific deployments and configurations
$ export ROOKOUT_TAGS=[;;;]
```

Add the Java agent to your application:
```bash
$ export JAVA_OPTIONS="$JAVA_OPTIONS -javaagent:(pwd)/rook.jar"
```

## Test connectivity

To make sure the Rook was correctly installed and can reach the Rookout Service, run the following command:
```bash
$ java -jar rook.jar
```

</div>

</section>