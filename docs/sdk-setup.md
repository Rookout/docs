---
id: sdk-setup
title: SDK Setup
sidebar_label: SDK Setup
---

This page will dive into the nitty gritty details on installing Rookout under various configurations.  
If you are encountering any difficulties with deploying Rookout, this is the place to look.

<ul class="nav nav-tabs page-tabs" id="rooks-setup" role="tablist">
<li class="nav-item">
<a class="nav-link-page active" id="python-tab" data-toggle="tab" href="#python" role="tab" aria-controls="python" aria-selected="true">Python</a>
</li>
<li class="nav-item">
<a class="nav-link-page" id="node-tab" data-toggle="tab" href="#node" role="tab" aria-controls="node" aria-selected="false">Node.js</a>
</li>
<li class="nav-item">
<a class="nav-link-page" id="jvm-tab" data-toggle="tab" href="#jvm" role="tab" aria-controls="jvm" aria-selected="false">JVM</a>
</li>
</ul>

<div class="tab-content page-tabs-content" id="rooks-setup">
<div class="tab-pane fade show active" id="python" role="tabpanel">

## Python

The [Python SDK](https://pypi.org/project/rook/) provides the ability to fetch debug data from a running application in real time.  
It can easily be installed by running the following command:
```bash
pip install rook
```

## Setup

Import the SDK within your application:
```python
import rook

if __name__ == "__main__":
    rook.start(token='[Your Rookout Token]',
               labels={"env":"dev"}) # Optional,see Labels page below Projects
    # Your program starts here :)
```
<div class="rookout-org-info"></div>

The SDK should be imported just before the application begins executing.  
This is due to the fact that in Python, there's no clean way to identify a module has finished defining it's classes.

**Note: Loading Rookout into a forking application is an unsafe operation.**  
Check out the [Pre-forking servers](#pre-forking-servers) section for more details.  

### Alternative Import

If you prefer to configure the SDK purely using environment variables (see configuration options below) you may also use the following snippet:

```python
if __name__ == "__main__":
    from rook import auto_start
    # Your program starts here :)
```

## SDK API

### start

```python
start(token=None,
    labels=None,
    host=None,
    port=None,
    debug=None,
    throw_errors=None,
    log_file=None,
    log_level=None,
    log_to_stderr=None,
    git_commit=None,
    git_origin=None,
    **kwargs)
```

The `start` method is used to initialize the SDK in the background and accepts the following arguments:

| Argument &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Environment Variable &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Default Value | Description |
| ------------ | ----------------------- | ------------- | ----------- |
| `token` | `ROOKOUT_TOKEN` | None | The Rookout token for your organization. Should be left empty if you are using a Rookout ETL Controller |
| `labels` | `ROOKOUT_LABELS` | {} | A dictionary of key:value labels for your application instances. Use `k:v,k:v` format for environment variables |
| `host` | `ROOKOUT_CONTROLLER_HOST` | None | If you are using a Rookout ETL Controller, this is the hostname for it |
| `port` | `ROOKOUT_CONTROLLER_PORT` | None | If you are using a Rookout ETL Controller, this is the port for it |
| `proxy` | `ROOKOUT_PROXY` | None | URL to proxy server
| `debug` | `ROOKOUT_DEBUG` | False | Set to `True` to increase log level to debug |
| `throw_errors` | None | False | Set to `True` to throw an exception if `start` fails (error message will not be printed in console) |
| `log_file` | `ROOKOUT_LOG_FILE` | None | Path to file to use for the SDK logs (default is `/var/log/rookout/python-rook.log`) |
| `log_level` | `ROOKOUT_LOG_LEVEL` | None | Control the SDK logging verbosity |
| `log_to_stderr` | `ROOKOUT_LOG_TO_STDERR` | False | Set to `True` to have the SDK log to stderr |
| `git_commit` | `ROOKOUT_COMMIT` | None | String that indicates your git commit |
| `git_origin` | `ROOKOUT_REMOTE_ORIGIN` | None | String that indicates your git remote origin |

### flush

```python
flush()
```

The `flush` method allows explicitly flushing the Rookout logs and messages.

## Test connectivity

To make sure the SDK was properly installed in your Python (virtual) environment, and test your configuration (environment variables only), run the following command:
```bash
python -m rook
```

## Supported Python versions

| Implementation     | Versions           |
| ------------------ | ------------------ |
| **CPython**        | 2.7, 3.5, 3.6, 3.7 |
| **PyPy**           | 6.0.0              |

Rookout was tested on `pip` versions 9+.

***Note:*** We recommend avoiding production deployments of Rookout on Windows OS.

## Source Commit Detection

The Python SDK supports detecting the existing source code commit in the following methods, in descending order of priority:
1. If the environment variable “ROOKOUT_COMMIT” exists, use it.
2. If the environment variable “ROOKOUT_GIT” exists, search for the configuration of the “.git” folder and use its head.
3. If the main application is running from within a Git repository, use its head. 

## Dependencies

The Python SDK contains native extensions. For most common interpreter and OS configurations, pre-built binaries are provided. For other configurations, a build environment is needed to successfully install Rookout.

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

<!--DOCUSAURUS_CODE_TABS-->
<!--OS X-->
```bash
xcode-select --install
# If installing for PyPy on macOS, installing pkg-config is also required:
brew install pkg-config
```
<!--Debian-->
```bash
apt-get update -q && apt-get install -qy g++ python-dev
```
<!--Fedora-->
```bash
yum install -qy gcc-c++ python-devel
```
<!--Alpine-->
```bash
apk update && apk add g++ python-dev
```
<!--END_DOCUSAURUS_CODE_TABS-->

## Pre-forking servers

Several popular application servers for Python load the application code during startup and then `fork()` the process multiple times to worker processes.

If you are using one of those servers, Rookout must be initialized in each of the workers processes.  
We have included sample snippets for a few common options:

<!--DOCUSAURUS_CODE_TABS-->
<!--uWSGI-->
```python
try:
    from uwsgidecorators import postfork

    # Run Rookout after the fork
    @postfork
    def run_rookout():
        import rook
        rook.start(token='[Your Rookout Token]')
except ImportError:
    # If there's no uWSGI, run Rookout normally
    import rook
    rook.start(token='[Your Rookout Token]')
```
<div class="rookout-org-info"></div>

You must also enable threads by adding __--enable-threads__ to the command line or __enable-threads = true__ in the uWSGI ini file.  
Read more about it [here](https://uwsgi-docs.readthedocs.io/en/latest/WSGIquickstart.html#a-note-on-python-threads).

<!--Gunicorn-->
```python
# Gunicorn does not preload applications by default
# Under some configurations (such as --preload) you will need to create gunicorn_config.py file.

# Load the file using the -c flag: 'gunicorn -c python:gunicorn_config server:app'

def post_fork(server, worker):
    import rook
    rook.start(token='[Your Rookout Token]')
```
<div class="rookout-org-info"></div>
<!--Celery-->
```python
from celery.signals import worker_process_init

# Use the `worker_process_init` signal to load Rookout on worker start:
@worker_process_init.connect
def start_rook(*args, **kwargs):
    import rook
    rook.start(token='[Your Rookout Token]')
```
<div class="rookout-org-info"></div>
<!--END_DOCUSAURUS_CODE_TABS-->

## Serverless and PaaS deployments

### Integrating with Serverless

When integrating Rookout into a Serverless application, you should explicitly flush the collected information.  
For most common Serverless runtimes, Rookout provides easy to use wrappers such as:

```python
from rook.serverless import serverless_rook

@serverless_rook
def lambda_handler(event, context):
  return "Hello world"
```

For more information, please check out our [deployment-examples](deployment-examples.md).

### Building

If you are running your application on a Serverless or PaaS (Platform as a Service), you must build your package in an environment similar to those used in production. 
If you are running on a Windows or Mac machine (or using an incompatible Linux distribution) you may encounter some issues here.

Many Serverless frameworks (such as AWS SAM) have built-in support for it and will work out of the box.

If you need to set up your own build, we recommend using Docker, with a command line such as:
```bash
docker run -v `pwd`:`pwd` -w `pwd` -i -t lambci/lambda:build-python2.7 pip install -r requirements.txt
```

For more information check out this blog post: https://www.rookout.com/3_min_hack_for_building_local_native_extensions/

## Python Spark (PySpark) applications

1. Import the SDK as usual in the main function that runs on the Spark driver.
2. To import the SDK on Spark executors, run `spark-submit` with `--conf spark.python.daemon.module=rook.pyspark_daemon`.
3. If running under YARN, specify the `ROOKOUT_TOKEN` environment variable for your application master and executor nodes like so:
```bash
spark-submit --conf spark.python.daemon.module=rook.pyspark_daemon --conf spark.yarn.appMasterEnv.ROOKOUT_TOKEN=[Your Rookout Token] --conf spark.executorEnv.ROOKOUT_TOKEN=[Your Rookout Token]
```
<div class="rookout-org-info"></div>


For more information, please check out our [deployment-examples](deployment-examples.md).

</div>

<div class="tab-pane fade" id="node" role="tabpanel">

## Node.js

The [NodeJS SDK](https://www.npmjs.com/package/rookout) provides the ability to fetch debug data from a running application in real time.  
It can easily be installed by running the following command:
```bash
npm install --save rookout
```

## Setup

Import the SDK within your application:
```javascript
const rookout = require('rookout');


rookout.start({
    token: '[Your Rookout Token]',
    labels:
        {
            "env":"dev" // Optional,see Labels page below Projects
        }
});
```
<div class="rookout-org-info"></div>

### Alternative Import

If you prefer to configure the SDK purely using environment variables (see configuration options below) you may also use the following snippet:

```js
require('rookout/auto_start');
```

## SDK API

### start

```js
start(options={});
```

The `start` method is used to initialize the SDK. Receives configuration using an `options` object and returns a promise that will resolve when the initial connection attempt to the debug controller succeeds or fails. Either way, connection will be maintained and retried in the background. If you set `throw_errors` to true, the promise will be rejected on failure.

| Argument &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Environment Variable &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Default Value | Description |
| ------------ | ----------------------- | ------------- | ----------- |
| `token` | `ROOKOUT_TOKEN` | None | The Rookout token for your organization. Should be left empty if you are using a Rookout ETL Controller |
| `labels` | `ROOKOUT_LABELS` | {} | A dictionary of key:value labels for your application instances. Use `k:v,k:v` format for environment variables |
| `host` | `ROOKOUT_CONTROLLER_HOST` | None | If you are using a Rookout ETL Controller, this is the hostname for it |
| `port` | `ROOKOUT_CONTROLLER_PORT` | None | If you are using a Rookout ETL Controller, this is the port for it |
| `proxy` | `ROOKOUT_PROXY` | None | URL to proxy server
| `debug` | `ROOKOUT_DEBUG` | False | Set to `True` to increase log level to debug |
| `throw_errors` | None | False | Set to `True` to reject the promsise or throw an exception if `start` fails (error message will not be printed in console) |
| `log_file` | `ROOKOUT_LOG_FILE` | None | Path to file to use for the SDK logs (default is `/var/log/rookout/node-rook.log`) |
| `log_level` | `ROOKOUT_LOG_LEVEL` | None | Control the SDK logging verbosity |
| `log_to_stderr` | `ROOKOUT_LOG_TO_STDERR` | False | Set to `True` to have the SDK log to stderr |
| `git_commit` | `ROOKOUT_COMMIT` | None | String that indicates your git commit |
| `git_origin` | `ROOKOUT_REMOTE_ORIGIN` | None | String that indicates your git remote origin |

### startSync
```js
startSync(timeout=5000, options = {});
```

The `startSync` method is used to initialize the SDK in a synchronous manner using the `deasync` module and accepts the same `options` object as the `start` method. The method will return after the initial connection attempt to the debug controller succeeds or fails (either way, connection will be maintained and retried in the background) or when the timeout specified has been reached. If you choose the set `throw_errors` true, an exception will be thrown on failure.  

### stop

```js
stop();
```

The `stop` method is used to shutdown the SDK.  
As Rookout is listening to a network connection, the Node process will not terminate as long as Rookout is running in the background.

### flush

```js
flush(cb);
```

The `flush` method allows explicitly flushing the Rookout logs and messages.  
The callback is executed when the method finishes.

## Test connectivity

To make sure the SDK was properly installed and test your configuration (environment variables only), run the following command:
```bash
./node_modules/.bin/rookout_check
```

## Supported Versions

Rookout supports the latest NodeJS and all releases that are under maintenance (LTS). Support for older versions is limited.

| Implementation     | Versions       |
| ------------------ | -------------- |
| **Node**           | 8, 10, 11, 12 |

**Note:** The Rookout NodeJS SDK does not support running side-by-side with debugger such as WebStorm or Stackdriver Debugger.


## Transpiling and Source Maps

If you are transpiling your JavaScript/TypeScript on the fly (using [babel-node](https://babeljs.io/docs/en/babel-node) or a similar tool), Rookout debugging should work out of the box.

If you are transpiling your JavaScript/TypeScript before execution (for instance in your CI/CD), you must include the source maps inline within the source files or as separate files (usually `app.map.js`) in your deployment.

To make sure Rookout can validate the source file matches the file you are tryring to debug using hash comparison, we recommend deploying the original source files side-by-side with the transpiled ones or building your source map with the full source code.

### Configuration for Common Tools

- [**Weback**](https://webpack.js.org/) - use the `inline-source-map` or `source-map` options for [devtool](https://webpack.js.org/configuration/devtool/).  
- [**babel-cli**](https://babeljs.io/docs/en/babel-cli) - use the `--source-maps inline` or `--source-maps` flags.  
- [**Typescript**](https://www.typescriptlang.org/) - use the `--inlineSources` flag. For [**ts-node**](https://github.com/TypeStrong/ts-node) add source maps using the `tsconfig.json` [file](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html).
- [**CoffeeScript**](https://coffeescript.org/) - use the `-M` or `-m` flags.  

## Source Commit Detection

The NodeJS SDK supports detecting the existing source code commit in the following methods, in descending order of priority:
1. If the environment variable “ROOKOUT_COMMIT” exists, use it.
2. If the environment variable “ROOKOUT_GIT” exists, search for the configuration of the “.git” folder and use its head.
3. If the main application is running from within a Git repository, use its head. 

## Serverless and PaaS deployments

### Integrating with Serverless

When integrating Rookout into a Serverless application, you should explicitly flush the collected information.  
For most common Serverless runtimes, Rookout provides easy to use wrappers such as `rookout.wrap(handler, options={})`:

```js
const rookout = require('rookout/lambda');

function handler(event, context, callback) {
        callback(null, "Hello World");
}

exports.handler = rookout.wrap(handler, {labels={"env":"dev"})};
```

Refer to the [SDK API](#sdk-api-1) for the available optional options

For more information, please check out our [deployment-examples](deployment-examples.md).

</div>

<div class="tab-pane fade" id="jvm" role="tabpanel">

## JVM

The [JVM SDK](https://mvnrepository.com/artifact/com.rookout/rook/latest) provides the ability to fetch debug data from a running application in real time.  
It can be download directly to the target system by running the following command:
```bash
curl -L "https://repository.sonatype.org/service/local/artifact/maven/redirect?r=central-proxy&g=com.rookout&a=rook&v=LATEST" -o rook.jar
```


## Setup

### Java Agent

Simply add the Rookout SDK as a Java Agent to your environment:
<!--DOCUSAURUS_CODE_TABS-->
<!--Environment Variable-->
```bash
# Export your token as an environment variable
export ROOKOUT_TOKEN=[Your Rookout Token]

# Optional, see Labels section below Projects
export ROOKOUT_LABELS=env:dev

# Add the Java Agent to your application using an environment variable
export JAVA_TOOL_OPTIONS="-javaagent:(pwd)/rook.jar"

```
<!--Command Line-->
```bash
# Add the Java Agent, token and the labels to your application using command line
java -javaagent:(pwd)/rook.jar MyClass -DROOKOUT_TOKEN=[Your Rookout Token] -DROOKOUT_LABELS=env:dev
```
<!--END_DOCUSAURUS_CODE_TABS-->
<div class="rookout-org-info"></div>

### Alternative API

As an alternative, the Rookout SDK may be loaded using a simple API.

If you are using the JRE instead of the [JDK](https://stackoverflow.com/questions/1906445/what-is-the-difference-between-jdk-and-jre) runtime, support is limited for Java 7 and 8 and requires bundling [`tools.jar`](https://mvnrepository.com/artifact/com.sun/tools/1.7.0.13) along side the Rookout jar in your deployment. For more information check out the relevant [deployment examples](deployment-examples.md).

```java
import com.rookout.rook.API;
import com.rookout.rook.RookOptions;

public class Program {
    public static void main(String[] args) {
        RookOptions opts = new RookOptions();
        opts.token = "[Your Rookout Token]";
        API.start(opts);

        // ...
    }
}
```

**Note: Due to limitations introduced in Java 9, you must use the JDK runtime and add the following Java flag: `-Djdk.attach.allowAttachSelf=true`**

<div class="rookout-org-info"></div>

## SDK API

The Java SDK may either be loaded as a Java Agent (recommended) or using an API.  
Configuration may be passed through the API, using OS Environment Variables or Java System Properties.

### start

```java
public static void start(RookOptions opts)
public static void startWithExceptions(RookOptions opts) throws Exception
```

Both methods initialize the SDK in the background using on the configuration in the `opts` argument.  
The simpler `start` will never impact the application's flow, writing a failure to the console.  
The `startWithExceptions` will throw on error, so make sure to wrap the invocation with an appropriate `try`/`catch` block.

| Argument &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Environment Variable &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Default Value | Description |
| ------------ | ----------------------- | ------------- | ----------- |
| `token` | `ROOKOUT_TOKEN` | None | The Rookout token for your organization. Should be left empty if you are using a Rookout ETL Controller |
| `labels` | `ROOKOUT_LABELS` | {} | A dictionary of key:value labels for your application instances. Use `k:v,k:v` format for environment variables |
| `host` | `ROOKOUT_CONTROLLER_HOST` | None | If you are using a Rookout ETL Controller, this is the hostname for it |
| `port` | `ROOKOUT_CONTROLLER_PORT` | None | If you are using a Rookout ETL Controller, this is the port for it |
| `proxy` | `ROOKOUT_PROXY` | None | URL to proxy server
| `debug` | `ROOKOUT_DEBUG` | False | Set to `True` to increase log level to debug |
| `log_file` | `ROOKOUT_LOG_FILE` | None | Path to file to use for the SDK logs (default is `/var/log/rookout/java-rook.log`) |
| `log_level` | `ROOKOUT_LOG_LEVEL` | None | Control the SDK logging verbosity |
| `log_to_stderr` | `ROOKOUT_LOG_TO_STDERR` | False | Set to `True` to have the SDK log to stderr |
| `git_commit` | `ROOKOUT_COMMIT` | None | String that indicates your git commit |
| `git_origin` | `ROOKOUT_REMOTE_ORIGIN` | None | String that indicates your git remote origin |

### flush

```java
public static void flush();
```

The `flush` method allows explicitly flushing the Rookout logs and messages.  
The callback is executed when the method finishes.

## Test connectivity

To make sure the SDK was properly installed and test your configuration (environment variables only), run the following command:
```bash
java -jar rook.jar
```

## Debug Information

Rookout requires your application to be built with debug information. While most modern Java build tools such as `Gradle` and `Maven` do so by default, some such as [`Ant`](https://ant.apache.org/manual/Tasks/javac.html) and [`javac`](https://docs.oracle.com/javase/7/docs/technotes/tools/windows/javac.html) do not.  

Here a few examples on how to configure them:

<!--DOCUSAURUS_CODE_TABS-->
<!--Ant-->
```xml
<javac srcdir="${source-directory}"
        destdir="${classes-directory}"
        classpath="${lib-directory}"
        debug="true"
/>
```
<!--javac-->
```bash
javac -g MyClass.java
```
<!--END_DOCUSAURUS_CODE_TABS-->

## Packaging Sources

Unlike Node and Python applications, most JVM applications do not include their source code within the library distribution. This prevents Rookout from verifying the source files have not changed between what the user sees and the production and will trigger a warning.

To make sure you are collecting data from the source line where you have set the breakpoint, include your source files within your JAR/WAR/EAR library.

<!--DOCUSAURUS_CODE_TABS-->
<!--Gradle-->
```groovy
jar {
   from sourceSets.main.allSource
}
```
<!--Maven-->
```xml
<resources>
    <resource>
        <directory>${basedir}/src/main/java</directory>
    </resource>
</resources>
```
<!--Ant-->
```xml
<jar destfile="${target.dir}/my-app.jar">
    <fileset dir="${target.dir}/classes" />
    <fileset dir="${source-directory}" includes="**/*.java"/>
</jar>
```
<!--END_DOCUSAURUS_CODE_TABS-->

## Application Detection

Rookout uses the semi-documented `sun.java.command` system property to identify your application and display it for within the Web Application.  
Some Java based runtimes such as [Jsvc](https://commons.apache.org/proper/commons-daemon/jsvc.html) don't set it as expected. If missing, you may set it manually:
```bash
jsvc -Dsun.java.command=my.main.class
```

## Supported Versions

| Implementation      | Versions               |
| ------------------  | -------------          |
| **Oracle Java**     | 7u111+, 8u74+, 9, 10, 11, 12    |
| **OpenJDK**         | 7u111+, 8u74+, 9, 10, 11, 12, 13    |
| **AdoptOpenJDK**    | 8u74+, 9, 10, 11, 12       |
| **Amazon Corretto** | 8u74+, 11                  |

The following languages are officially supported: Java, Scala, Kotlin, Groovy, ColdFusion.

If the environment you are trying to debug is not mentioned in the list above, be sure to let us know: support@rookout.com .

## Source Commit Detection

The Java SDK supports detecting the existing source code commit in the following methods, in descending order of priority:
1. If the environment variable “ROOKOUT_COMMIT” exists, use it.
2. If the Java main application is jar/war/ear and it’s manifest includes the value “ROOKOUT_MANIFEST_COMMIT”, use it.

## Dependencies

None.

## Serverless and PaaS deployments

### Integrating with Serverless

When integrating Rookout into a Serverless application, you should explicitly flush the collected information.  
This requires using the including the Rookout SDK API as a dependency and packaging it with your applications. 

For more information, please check out our [deployment-examples](deployment-examples.md).

### Building

In some Serverless environments (such as AWS Lambda), the tools.jar library is missing and must be included within your package as well.

</div>
