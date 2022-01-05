---
id: jvm-setup
title: JVM SDK
sidebar_label: JVM
---

This page dives into the nitty-gritty details on installing Rookout under various configurations.  
If you encounter difficulties with deploying Rookout, this is the place to look.

## JVM

The [JVM SDK](https://mvnrepository.com/artifact/com.rookout/rook/latest) provides the ability to fetch debug data from a running application in real time.  
It can be download directly to the target system by running the following command:
```bash
curl -L "https://repository.sonatype.org/service/local/artifact/maven/redirect?r=central-proxy&g=com.rookout&a=rook&v=LATEST" -o rook.jar
```

## Supported Languages

The following languages are currently supported by the JVM SDK: Java, Scala, Kotlin, Groovy, ColdFusion, and Clojure.

If you use a language that is not mentioned above, please let us know at {@inject: supportEmail}.

## Setup

### Java Agent

Simply add the Rookout SDK as a Java Agent to your environment:
<!--DOCUSAURUS_CODE_TABS-->
<!--Environment Variable-->
```bash
# Add the Rookout Java Agent to your application using an environment variable
export JAVA_TOOL_OPTIONS="-javaagent:$(pwd)/rook.jar -DROOKOUT_TOKEN=[Your Rookout Token]"

# Optional, see Labels section below Projects
export ROOKOUT_LABELS=env:dev
```
<!--Command Line-->
```bash
# Add the Java Agent, token and the labels to your application using command line
java -javaagent:$(pwd)/rook.jar MyClass -DROOKOUT_TOKEN=[Your Rookout Token] -DROOKOUT_LABELS=env:dev
```
<!--END_DOCUSAURUS_CODE_TABS-->
<div class="rookout-org-info"></div>

#### Debugging OSGi apps
To use Rookout in an OSGi application, the Rookout package must be whitelisted (delegated) to the OSGi container.

This is done by setting the following JVM options

```
org.osgi.framework.bootdelegation=com.rookout.*
```

This is done where all other JVM options are set (via -D flags, JVM_OPTS, etc.).

<div class="rookout-org-info"></div>

## SDK Configuration

Configuration is performed using OS Environment Variables or Java System Properties.

| Environment Variable &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Default Value | Description |
| ----------------------- | ------------- | ----------- |
| `ROOKOUT_TOKEN` | None | The Rookout token for your organization. Should be left empty if you are using a Rookout ETL Controller |
| `ROOKOUT_LABELS` | {} | A dictionary of key:value labels for your application instances. Use `k:v,k:v` format for environment variables |
| `ROOKOUT_COMMIT` | None | String that indicates your git commit or a branch name |
| `ROOKOUT_REMOTE_ORIGIN` | None | String that indicates your git remote origin |
| `ROOKOUT_CONTROLLER_HOST` | None | If you are using a Rookout ETL Controller, this is the hostname for it |
| `ROOKOUT_CONTROLLER_PORT` | None | If you are using a Rookout ETL Controller, this is the port for it |
| `ROOKOUT_PROXY` | None | URL to proxy server
| `ROOKOUT_DEBUG` | False | Set to `True` to increase log level to debug |
| `ROOKOUT_SOURCES` | None | Source information (see below) |
| `ROOKOUT_LIVE_LOGGER` | False | Set to `True` to enable Rookout Live Logger |


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

## Source information

Use the environment variable `ROOKOUT_SOURCES` to initialize the SDK with information about the sources used in your application.

ROOKOUT_SOURCES is a semicolon-separated list with either a source control repository and revision information, or a path on the local filesystem to a JAR file.

Example
```
ROOKOUT_SOURCES=https://github.com/Rookout/Rookout#afe123;/path/to/lib.jar
```

To load source information from a jar file, you need to add the following attributes to the JAR manifest:

`Rookout-Repository`: Repository URL
`Rookout-Revision`: Revision identifier

## Application Detection

Rookout uses the semi-documented `sun.java.command` system property to identify your application and display it for within the Web Application.  
Some Java based runtimes such as [Jsvc](https://commons.apache.org/proper/commons-daemon/jsvc.html) don't set it as expected. If missing, you may set it manually:
```bash
jsvc -Dsun.java.command=my.main.class
```

## Dynamic loading to a running JVM process

The Rookout SDK can be also loaded to an already running JVM process.

To do so, run the SDK jar using `java [additional parameters] -jar rook.jar`, configure it using the following steps:

1. Set SDK configuration parameters either as environment variables, or as `-D` parameters to the java command in `[additional parameters]` (e.g., `-DROOKOUT_TOKEN=12345678`).
2. Add another parameter: `ROOKOUT_TARGET_PID`, and set its value to the PID of the running process.

## Supported Versions

The following Java versions are supported: 7 (7u111+), 8 (8u74+), 11 (11u4+), 13, 17.

If your version is not mentioned above, please let us know at {@inject: supportEmail}.

## Dependencies

None.

## Serverless and PaaS deployments

### Integrating with Serverless

When integrating Rookout into a Serverless application, you should explicitly flush the collected information.  
This requires using the including the Rookout SDK API as a dependency and packaging it with your applications. 

For more information, please check out our [deployment-examples](deployment-examples.md).

**Note:** Adding the Rookout SDK will slow down your Serverless cold-start times. Please make sure your timeout is no less then 30 seconds.

### Building

In some Serverless environments (such as AWS Lambda), the tools.jar library is missing and must be included within your package as well.

## Illegal reflective access warning

When using JVM versions 9 and above, you may see the following harmless warning:
```bash
WARNING: An illegal reflective access operation has occurred
WARNING: Illegal reflective access by com.rookout.rook.Processor.NamespaceSerializer
WARNING: Please consider reporting this to the maintainers of com.rookout.rook.Processor.NamespaceSerializer
WARNING: Use --illegal-access=warn to enable warnings of further illegal reflective access operations
WARNING: All illegal access operations will be denied in a future release
```
This warning is generated by the latest protobuf implementation for Java.

**You can safely ignore this warning.**
