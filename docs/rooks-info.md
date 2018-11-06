---
id: rooks-info
title: Rook Info
sidebar_label: Rook Info
---


<section class="page-tab-container">
<input id="page-tab1" data-lang="python" type="radio" name="page-tabs" class="tab-button" checked="true" />
<label for="page-tab1" class="page-tab-title">Python</label>
<input id="page-tab2" data-lang="node" type="radio" name="page-tabs" class="tab-button" />
<label for="page-tab2" class="page-tab-title">Node.JS</label>
<input id="page-tab3" data-lang="jvm" type="radio" name="page-tabs" class="tab-button" />
<label for="page-tab3" class="page-tab-title">JVM</label>

<div id="page-content1" class="page-tab-content">

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

Here are the commands for installing the build enviorments for some common OS:
### OS X
```bash
$ xcode-select --install
```
### Debian
```bash
$ apt-get update -q && apt-get install -qy g++ python-dev
```
### Fedora
```bash
$ yum install -qy gcc-c++ python-devel
```
### Alpine
```bash
$ apk update && apk add g++ python-dev
```

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

For additional environments, check out our [deployment examples page](https://github.com/Rookout/deployment-examples).

</div>

<div id="page-content2" class="page-tab-content">

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

For [Weback](https://webpack.js.org/) we recommend the `source-map` and `inline-source-map` options for [devtool](https://webpack.js.org/configuration/devtool/).  
For [babel-cli](https://babeljs.io/docs/en/babel-cli) we recommend the `--source-maps` or `--source-maps inline` flags.

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

For additional environments, check out our [deployment examples page](https://github.com/Rookout/deployment-examples).

</div>

<div id="page-content3" class="page-tab-content">

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

For additional environments, check out our [deployment examples page](https://github.com/Rookout/deployment-examples).

</div>

</section>