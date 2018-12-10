---
id: rooks-setup
title: Rookout SDK Setup
sidebar_label: Rookout SDK Setup
---

This page will dive into the nitty gritty details on installing Rookout under various configurations.  
If you are encountering any difficulties with deploying Rookout, this is the place to look.

<ul class="nav nav-tabs page-tabs" id="rooks-setup" role="tablist">
<li class="nav-item">
<a class="nav-link active" id="python-tab" data-toggle="tab" href="#python" role="tab" aria-controls="python" aria-selected="true">Python</a>
</li>
<li class="nav-item">
<a class="nav-link" id="node-tab" data-toggle="tab" href="#node" role="tab" aria-controls="node" aria-selected="false">Node.JS</a>
</li>
<li class="nav-item">
<a class="nav-link" id="jvm-tab" data-toggle="tab" href="#jvm" role="tab" aria-controls="jvm" aria-selected="false">JVM</a>
</li>
</ul>

<div class="tab-content page-tabs-content" id="rooks-setup">
<div class="tab-pane fade show active" id="python" role="tabpanel">

## Python

The [Rookout Python SDK](https://pypi.org/project/rook/) provides the ability to fetch debug data from a running application in real time.  
It can easily be installed by running the following command:
```bash
pip install rook
```

## Setup

Import the Rookout SDK within your application:
```python
import rook

if __name__ == "__main__":
    rook.start(token='[Your Rookout Token]')
    # Your program starts here :)
```
<div class="rookout-org-info"></div>

The Rookout SDK should be imported just before the application begins executing.  
This is due to the fact that in Python, there's no clean way to identify a module has finished defining it's classes.

**Note: Loading Rookout into a forking application is an unsafe operation.**  
Check out the [Pre-forking servers](#pre-forking-servers) section for more details.  

### Alternative Import

If you prefer to configure the Rookout SDK purely using enviorment variables (see configuration options below) you may also use the following snippet:

```python
if __name__ == "__main__":
    from rook import auto_start
    # Your program starts here :)
```
<div class="rookout-org-info"></div>

## Rookout SDK API

The Rookout SDK API offers the following methods

```python
start(token=None,
    tags=None,
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

| Argument &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Enviorment Variable &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Default Value | Description |
| ------------ | ----------------------- | ------------- | ----------- |
| `token` | `ROOKOUT_TOKEN` | None | The Rookout token for your organization. Should be left empty if you are using a Rookout ETL Agent |
| `tags` | `ROOKOUT_ROOK_TAGS` | [] | The list of tags you want for your application instances. Use *;* as a seperator for enviroment variables |
| `host` | `ROOKOUT_AGENT_HOST` | None | If you are using a Rookout ETL Agent, this is the hostname for it |
| `port` | `ROOKOUT_AGENT_PORT` | None | If you are using a Rookout ETL Agent, this is the port for it |
| `debug` | `ROOKOUT_DEBUG` | False | Set to `True` to increase log level to debug |
| `silence_errors` | None | False | Set to `True` to throw if `start` fails |
| `log_file` | `ROOKOUT_LOG_FILE` | None | Path to file to use for the SDK logs (default is `/var/log/rookout/python-rook.log`) |
| `log_level` | `ROOKOUT_LOG_LEVEL` | None | Control the SDK logging verbosity |
| `log_to_stderr` | `ROOKOUT_LOG_TO_STDERR` | False | Set to `True` to have the SDK log to stderr |

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

The Rookout Python SDK supports detecting the existing source code commit in the following methods, in descending order of priority:
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

<ul class="nav nav-tabs" id="build-envs" role="tablist">
<li class="nav-item">
<a class="nav-link active" id="osx-tab" data-toggle="tab" href="#osx" role="tab" aria-controls="osx" aria-selected="true">OS X</a>
</li>
<li class="nav-item">
<a class="nav-link" id="debian-tab" data-toggle="tab" href="#debian" role="tab" aria-controls="debian" aria-selected="false">Debian</a>
</li>
<li class="nav-item">
<a class="nav-link" id="fedora-tab" data-toggle="tab" href="#fedora" role="tab" aria-controls="fedora" aria-selected="false">Fedora</a>
</li>
<li class="nav-item">
<a class="nav-link" id="alpine-tab" data-toggle="tab" href="#alpine" role="tab" aria-controls="alpine" aria-selected="false">Alpine</a>
</li>
</ul>

<div class="tab-content" id="build-envs">
<div class="tab-pane fade show active" id="osx" role="tabpanel">

```bash
xcode-select --install
# If installing for PyPy on macOS, installing pkg-config is also required:
brew install pkg-config
```

</div>
<div class="tab-pane fade" id="debian" role="tabpanel">

```bash
apt-get update -q && apt-get install -qy g++ python-dev
```

</div>
<div class="tab-pane fade" id="fedora" role="tabpanel">

```bash
yum install -qy gcc-c++ python-devel
```

</div>
<div class="tab-pane fade" id="alpine" role="tabpanel">

```bash
apk update && apk add g++ python-dev
```

</div>
</div>

## Pre-forking servers

Several popular application servers for Python load the application code during startup and then `fork()` the process multiple times to worker processes.

If you are using one of those servers, Rookout must be initialized in each of the workers processes.  
We have included sample snippets for a few common options:

<ul class="nav nav-tabs" id="preforking" role="tablist">
<li class="nav-item">
<a class="nav-link active" id="uwsgi-tab" data-toggle="tab" href="#uwsgi" role="tab" aria-controls="uWSGI" aria-selected="true">uWSGI</a>
</li>
<li class="nav-item">
<a class="nav-link" id="gunicorn-tab" data-toggle="tab" href="#gunicorn" role="tab" aria-controls="Gunicorn" aria-selected="false">Gunicorn</a>
</li>
<li class="nav-item">
<a class="nav-link" id="celery-tab" data-toggle="tab" href="#celery" role="tab" aria-controls="Celery" aria-selected="false">Celery</a>
</li>
</ul>


<div class="tab-content" id="preforking-content">
<div class="tab-pane fade show active" id="uwsgi" role="tabpanel">

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
You must also enable theads by adding __--enable-threads__ to the command line or __enable-threads = true__ in the uWSGI ini file. Read more about it
[here](https://uwsgi-docs.readthedocs.io/en/latest/WSGIquickstart.html#a-note-on-python-threads).

</div>
<div class="tab-pane fade" id="gunicorn" role="tabpanel">

```python
# Gunicorn does not preload applications by default
# Under some configurations (such as --preload) you will need to create gunicorn_config.py file.

# Load the file using the -c flag: 'gunicorn -c python:gunicorn_config server:app'

def post_fork(server, worker):
    import rook
    rook.start(token='[Your Rookout Token]')
```
<div class="rookout-org-info"></div>

</div>
<div class="tab-pane fade" id="celery" role="tabpanel">

```python
from celery.signals import worker_process_init

# Use the `worker_process_init` signal to load Rookout on worker start:
@worker_process_init.connect
def start_rook(*args, **kwargs):
    import rook
    rook.start(token='[Your Rookout Token]')
```
<div class="rookout-org-info"></div>

</div>
</div>

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

<div class="tab-pane fade" id="node" role="tabpanel">

## Node.js

The [Rookout NodeJS SDK](https://www.npmjs.com/package/rookout) provides the ability to fetch debug data from a running application in real time.  
It can easily be installed by running the following command:
```bash
npm install --save rookout
```

## Setup

Import the Rookout SDK within your application:
```javascript
const rook = require('rookout');

rook.start({
    token: '[Your Rookout Token]'
})
```
<div class="rookout-org-info"></div>

### Alternative Import

If you prefer to configure the Rookout SDK purely using enviorment variables (see configuration options below) you may also use the following snippet:

```js
require('rookout/auto_start');
```
<div class="rookout-org-info"></div>

## Rookout SDK API

The Rookout SDK API offers the following methods

```js
start(opts)
```

The `start` method is used to initialize the Rookout SDK in the background and recieves configuration using an `opts` object:

| Argument &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Enviorment Variable &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Default Value | Description |
| ------------ | ----------------------- | ------------- | ----------- |
| `token` | `ROOKOUT_TOKEN` | None | The Rookout token for your organization. Should be left empty if you are using a Rookout ETL Agent |
| `tags` | `ROOKOUT_ROOK_TAGS` | [] | The list of tags you want for your application instances. Use *;* as a seperator for enviroment variables |
| `host` | `ROOKOUT_AGENT_HOST` | None | If you are using a Rookout ETL Agent, this is the hostname for it |
| `port` | `ROOKOUT_AGENT_PORT` | None | If you are using a Rookout ETL Agent, this is the port for it |
| `debug` | `ROOKOUT_DEBUG` | False | Set to `True` to increase log level to debug |
| `silence_errors` | None | False | Set to `True` to throw if `start` fails |
| `log_file` | `ROOKOUT_LOG_FILE` | None | Path to file to use for the SDK logs (default is `/var/log/rookout/node-rook.log`) |
| `log_level` | `ROOKOUT_LOG_LEVEL` | None | Control the SDK logging verbosity |
| `log_to_stderr` | `ROOKOUT_LOG_TO_STDERR` | False | Set to `True` to have the SDK log to stderr |

```js
stop()
```

The `stop` method is used to shutdown the Rookout SDK.  
As Rookout is listening to a network connection, the Node process will not terminate as long as Rookout is running in the background.

```js
flush(cb)
```

The `flush` method allows explicitly flushing the Rookout logs and messages.  
The callback is executed when the method finishes.

## Test connectivity

To make sure the SDK was properly installed and test your configuration (environment variables only), run the following command:
```bash
./node_modules/.bin/rookout_check
```

## Supported Versions

| Implementation     | Versions       |
| ------------------ | -------------- |
| **Node**           | 4.3+, 6, 8, 10 |

**Note:** Rookout only supports LTS (Long Time Support) versions of Node.js.


## Transpiling and Source Maps

If you are transpiling your JavaScript/TypeScript on the fly (using [babel-node](https://babeljs.io/docs/en/babel-node) or a similar tool), Rookout debugging should work out of the box.

If you are transpiling your JavaScript/TypeScript before execution (for instance in your CI/CD), you must include the source maps inline within the source files or as seperate files (usually `app.map.js`) in your deployment.

To make sure Rookout can validate the source file matches the file you are tryring to debug using hash comparison, we recommend building your source map with the full source code.

### Configuration for Common Tools

- [**Weback**](https://webpack.js.org/) - use the `inline-source-map` or `source-map` options for [devtool](https://webpack.js.org/configuration/devtool/).  
- [**babel-cli**](https://babeljs.io/docs/en/babel-cli) - use the `--source-maps inline` or `--source-maps` flags.  
- [**Typescript**](https://www.typescriptlang.org/) - use the `--inlineSources` flag.  
- [**CoffeeScript**](https://coffeescript.org/) - use the `-M` or `-m` flags.  

## Source Commit Detection

The Rookout NodeJS SDK supports detecting the existing source code commit in the following methods, in descending order of priority:
1. If the environment variable “ROOKOUT_COMMIT” exists, use it.
2. If the environment variable “ROOKOUT_GIT” exists, search for the configuration of the “.git” folder and use its head.
3. If the main application is running from within a Git repository, use its head. 

## Serverless and PaaS
If you are running your application on a Serverless or PaaS (Platform as a Service), you must build your package in an environment similar to those used in production. 
If you are running on a Windows or Mac machine (or using an incompatible Linux distribution) you may encounter some issues here.

Many Serverless frameworks (such as AWS sam) has built-in support for it and will work out of the box.

If you need to set up your own build, we recommend using Docker, with a command line such as:

```bash
docker run -v `pwd`:`pwd` -w `pwd` -i -t lambci/lambda:build-nodejs8.10 npm install
```

For more information check out this blog post: https://www.rookout.com/3_min_hack_for_building_local_native_extensions/

</div>

<div class="tab-pane fade" id="jvm" role="tabpanel">

## JVM

The [Rookout JVM SDK](https://mvnrepository.com/artifact/com.rookout/rook/latest) provides the ability to fetch debug data from a running application in real time.  
It can be download directly to the target system by running the following command:
```bash
curl -L "https://repository.sonatype.org/service/local/artifact/maven/redirect?r=central-proxy&g=com.rookout&a=rook&v=LATEST" -o rook.jar
```
It can also easily be installed by adding the dependency in JVM build systems such as Maven or Gradle:

<ul class="nav nav-tabs" id="jvm-deps" role="tablist">
<li class="nav-item">
<a class="nav-link active" id="gradle-tab" data-toggle="tab" href="#gradle" role="tab" aria-controls="gradle" aria-selected="true">Gradle</a>
</li>
<li class="nav-item">
<a class="nav-link" id="maven-tab" data-toggle="tab" href="#maven" role="tab" aria-controls="maven" aria-selected="false">Maven</a>
</li>
</li>
</ul>

<div class="tab-content" id="jvm-deps">
<div class="tab-pane fade show active" id="gradle" role="tabpanel">

```groovy
dependencies {
   runtime group: 'com.rookout', name: 'rook', version:'0.1.36'
}
```

</div>
<div class="tab-pane fade" id="maven" role="tabpanel">

```xml
<dependency>
    <groupId>com.rookout</groupId>
    <artifactId>rook</artifactId>
    <version>0.1.36</version>
</dependency>
```

</div>
</div>

## Setup

### Command Line

Setup the Rookout token in your environment:
```bash
# Export your token as an environment variable
export ROOKOUT_TOKEN=[Your Rookout Token]

# Add the Java Agent to your application
export JAVA_OPTIONS="$JAVA_OPTIONS -javaagent:(pwd)/rook.jar"
```

### API

You may also use the following API:

```java
import com.rookout.rook.API;

public class Program {
    public static void main(String[] args) {
        RookOptions opts = new RookOptions();
        opts.token = "[Your Rookout Token]";
        API.start(opts);

        // ...
    }
}
```
<div class="rookout-org-info"></div>

## Rookout SDK API

The Rookout SDK API offers the following methods

```java
public static void start(RookOptions opts);
```

The `start` method is used to initialize the Rookout SDK in the background and recieves configuration using an `opts` object:

| Argument &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Enviorment Variable &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Default Value | Description |
| ------------ | ----------------------- | ------------- | ----------- |
| `token` | `ROOKOUT_TOKEN` | None | The Rookout token for your organization. Should be left empty if you are using a Rookout ETL Agent |
| `tags` | `ROOKOUT_ROOK_TAGS` | [] | The list of tags you want for your application instances. Use *;* as a seperator for enviroment variables |
| `host` | `ROOKOUT_AGENT_HOST` | None | If you are using a Rookout ETL Agent, this is the hostname for it |
| `port` | `ROOKOUT_AGENT_PORT` | None | If you are using a Rookout ETL Agent, this is the port for it |
| `debug` | `ROOKOUT_DEBUG` | False | Set to `True` to increase log level to debug |
| `silence_errors` | None | False | Set to `True` to throw if `start` fails |
| `log_file` | `ROOKOUT_LOG_FILE` | None | Path to file to use for the SDK logs (default is `/var/log/rookout/java-rook.log`) |
| `log_level` | `ROOKOUT_LOG_LEVEL` | None | Control the SDK logging verbosity |
| `log_to_stderr` | `ROOKOUT_LOG_TO_STDERR` | False | Set to `True` to have the SDK log to stderr |

```js
public static void flush();
```

The `flush` method allows explicitly flushing the Rookout logs and messages.  
The callback is executed when the method finishes.

## Test connectivity

To make sure the SDK was properly installed and test your configuration (environment variables only), run the following command:
```bash
java -jar rook.jar
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

## Application Detection

Rookout uses the semi-documented `sun.java.command` system property to identify your application and display it for within the Web Application.  
Some Java based runtimes such as [Jsvc](https://commons.apache.org/proper/commons-daemon/jsvc.html) don't set it as expected. If missing, you may set it manually:
```bash
jsvc -Dsun.java.command=my.main.class
```


## Source Commit Detection

The Rookout Java SDK supports detecting the existing source code commit in the following methods, in descending order of priority:
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
