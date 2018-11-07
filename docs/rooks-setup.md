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
import rook
rook.start(token='[Your Rookout Token]')

if __name__ == "__main__":
    # Your program starts here :)
```
<div class="rookout-org-info org-info-normal-snippet"></div>

The Rook should be imported as late as possible within the application.
This is due to the fact that in Python, there's no clean way to identify a module has finished defining it's classes.

## Rookout SDK API

The Rookout SDK API offers the following methods

```python
start(token=None,
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
flush()
```

The `flush` method allows explicitly flushing the Rookout logs and messages.

## Test connectivity

To make sure the SDK was properly installed in your Python (virtual) enviorment, and test your configuration (environment variables only), run the following command:
```bash
$ python -m rook
```

## Supported Python versions

| Implementation     | Versions           |
| ------------------ | ------------------ |
| **CPython**        | 2.7, 3.5, 3.6, 3.7 |
| **PyPy**           | 6.0.0              |

***Note:*** We recommend avoiding production deployments of Rookout on Windows OS.

## Source Commit Detection

The Python Rook supports detecting the existing source code commit in the following methods, in descending order of priority:
1. If the environment variable “ROOKOUT_COMMIT” exists, use it.
2. If the environment variable “ROOKOUT_GIT” exists, search for the configuration of the “.git” folder and use its head.
3. If the main application is running from within a Git repository, use its head. 

## Dependencies

The Rookout Python SDK contains native extensions. For most common interpreter and OS configurations, pre-built binaries are provided. For other configurations, a build environment is needed to successfully install Rookout.

If you encounter an error similar to the following example, be sure to install the environment specific build tools specified below:

```json
    Could not find <Python.h>. This could mean the following:
      * You're on Ubuntu and haven't run `apt-get install python-dev`.
      * You're on RHEL/Fedora and haven't run `yum install python-devel` or
        `dnf install python-devel` (make sure you also have redhat-rpm-config
        installed)
      * You're on Mac OS X and the usual Python framework was somehow corrupted
        (check your environment variables or try re-installing?)
      * You're on Windows and your Python installation was somehow corrupted
        (check your environment variables or try re-installing?)
```

Here are the commands for installing the build environments for some common OS:
<div class="tab-container">
<input id="tab1" data-tab="tab1" type="radio" name="tabs" class="tab-button" checked="true" />
<label for="tab1" class="tab-title snippet">OS X</label>
<input id="tab2" data-tab="tab2" type="radio" name="tabs" class="tab-button" />
<label for="tab2" class="tab-title snippet">Debian</label>
<input id="tab3" data-tab="tab3" type="radio" name="tabs" class="tab-button" />
<label for="tab3" class="tab-title snippet">Fedora</label>
<input id="tab4" data-tab="tab4" type="radio" name="tabs" class="tab-button" />
<label for="tab4" class="tab-title snippet">Alpine</label>
<div data-tab-content="content1" class="tab-content hljs">

```bash
$ xcode-select --install
```

</div>
<div data-tab-content="content2" class="tab-content hljs">

```bash
$ apt-get update -q && apt-get install -qy g++ python-dev
```

</div>
<div data-tab-content="content3" class="tab-content hljs">

```bash
$ yum install -qy gcc-c++ python-devel
```

</div>
<div data-tab-content="content4" class="tab-content hljs">

```bash
$ apk update && apk add g++ python-dev
```

</div>
</div>


## uWSGI deployment

If you are running your application in a [uWSGI server](https://uwsgi-docs.readthedocs.io/en/latest/), you will need to take a couple of extra steps when using Rookout.

1. When starting uWSGI, add the __--enable-threads__ option when starting the server. Alternatively, set __enable-threads = true__ in the uWSGI ini file.

2. When running the Rook SDK within your code, use the following snippet to make sure the Rook is loaded in all worker processes.

```python
try:
    from uwsgidecorators import postfork

    @postfork
    def run_rookout():
        from rook import auto_start
except ImportError:
    from rook import auto_start
```

## Serverless and PaaS deployments

If you are running your application on a Serverless or PaaS (Platform as a Service), you must build your package in an environment similar to those used in production. 
If you are running on a Windows or Mac machine (or using an incompatible Linux distribution) you may encounter some issues here.

Many Serverless frameworks (such as AWS sam) have built-in support for it and will work out of the box.

If you need to set up your own build, we recommend using Docker, with a command line such as:
```bash
docker run -v `pwd`:`pwd` -w `pwd` -i -t lambci/lambda:build-python2.7 pip install -r requirements.txt
```

For more information check out this blog post: https://www.rookout.com/3_min_hack_for_building_local_native_extensions/

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

rook.start({
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

## Supported Versions

| Implementation     | Versions       |
| ------------------ | -------------- |
| **Node**           | 4.3+, 6, 8, 10  |

**Note:** Rookout only supports LTS (Long Time Support) versions of Node.js.


## Transpiling and Source Maps

If you are transpiling your JavaScript/TypeScript on the fly (using [babel-node](https://babeljs.io/docs/en/babel-node) or a similar tool), Rookout debugging should work out of the box.

If you are transpiling your JavaScript/TypeScript before execution (for instance in your CI/CD), you must include the source map files (usually `app.map.js`) in your deployment in order to debug it with Rookout.
Rookout also supports inline source maps.

To make sure Rookout can validate the source file matches the file you are tryring to debug using hash comparison, we recommend building your source map with the full source code.

For [**Weback**](https://webpack.js.org/) we recommend the `source-map` and `inline-source-map` options for [devtool](https://webpack.js.org/configuration/devtool/).  
For [**babel-cli**](https://babeljs.io/docs/en/babel-cli) we recommend the `--source-maps` or `--source-maps inline` flags.  
For [**Typescript**](https://www.typescriptlang.org/) we recommend the `--inlineSources` flags.  

## Source Commit Detection

Source commit detection functionality is currently not supported for Node.js.

## Rook API

The following variables may be passed when creating the rookout object.
Alternatively, they may be passed as environment variables when using the auto_start option.

| Variable       | Environment Variable  | Default Value           | Description              |
| -------------- | --------------------- | ----------------------- | -----------              |
| token          | ROOKOUT_TOKEN         | N/A                     | Customer specific token. |
| host           | ROOKOUT_AGENT_HOST    | cloud.agent.rookout.com | Agent URL.               |
| port           | ROOKOUT_AGENT_PORT    | 443                     | Agent port.              |
| debug          | ROOKOUT_DEBUG         | FALSE                   | Set log level to DEBUG |
| silence_errors | N/A                   | TRUE                    | Do not pass errors to calling application |
| log_to_stderr  | ROOKOUT_LOG_TO_STDERR | FALSE                   | Print logs to STDERR |
| log_file       | ROOKOUT_LOG_FILE      | N/A                     | Absolute path to log file |
| log_level      | ROOKOUT_LOG_LEVEL     | INFO                    | Set log level |

## Serverless and PaaS
If you are running your application on a Serverless or PaaS (Platform as a Service), you must build your package in an environment similar to those used in production. 
If you are running on a Windows or Mac machine (or using an incompatible Linux distribution) you may encounter some issues here.

Many Serverless frameworks (such as AWS sam) has built-in support for it and will work out of the box.

If you need to set up your own build, we recommend using Docker, with a command line such as:

```bash
    docker run -v pwd:pwd -w pwd -i -t lambci/lambda:build-nodejs8.10 npm install
```

For more information check out this blog post: https://www.rookout.com/3_min_hack_for_building_local_native_extensions/

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

## Supported Versions

| Implementation     | Versions      |
| ------------------ | ------------- |
| **Oracle Java**    | 7u111, 8u91   |
| **OpenJDK**        | 1.7, 1.8      |

The following languages are officially jupported: Java, Scala, Kotlin, Groovy, ColdFusion.
**Note:** Alpine Linux is currently not supported.

If the environment you are trying to debug is not mentioned in the list above, be sure to let us know: support@rookout.com .

## Packaging Sources

Unlike Node and Python applications, most JVM applications do not include their source code within the library distribution. This prevents Rookout from verifying the source files have not changed between what the user sees and the production and will trigger a warning.

In order to shut off the warning and gain the value of source verification, you should include your source files within your JAR/WAR/EAR library.

For Gradle, use the following snippet:
```java
jar {
   from sourceSets.main.allSource
}
```

For Maven, use the following snippet:
```xml
    <resources>
        <resource>
            <directory>${basedir}/src/main/java</directory>
        </resource>
    </resources>
```

## Source Commit Detection

The Java Rook supports detecting the existing source code commit in the following methods, in descending order of priority:
1. If the environment variable “ROOKOUT_COMMIT” exists, use it.
2. If the Java main application is jar/war/ear and it’s manifest includes the value “ROOKOUT_MANIFEST_COMMIT”, use it.

## Dependencies

None.

## Serverkess and PaaS

For using Java under a Serverless/PaaS environment, the following must be taken into account:
- Include the Java Agent in your application package.
- In many cloud platforms, passing JVM command line arguments are not supported. If so, be sure to use the Rookout API described above.
- For Serverless applications, you must call the Rookout API on every endpoint and flush at your discretion.
- In some Serverless environments, the tools.jar library is missing and must be included within your package as well.

</div>

</section>
