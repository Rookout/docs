---
id: jvm-setup
title: JVM SDK Instrumentation
sidebar_label: JVM
---

This page will dive into the nitty gritty details on installing Rookout under various configurations.  
If you are encountering any difficulties with deploying Rookout, this is the place to look.



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
# Add the Rookout Java Agent to your application using an environment variable
export JAVA_TOOL_OPTIONS="-javaagent:(pwd)/rook.jar -DROOKOUT_TOKEN=[Your Rookout Token]"

# Optional, see Labels section below Projects
export ROOKOUT_LABELS=env:dev
```
<!--Command Line-->
```bash
# Add the Java Agent, token and the labels to your application using command line
java -javaagent:(pwd)/rook.jar MyClass -DROOKOUT_TOKEN=[Your Rookout Token] -DROOKOUT_LABELS=env:dev
```
<!--END_DOCUSAURUS_CODE_TABS-->
<div class="rookout-org-info"></div>

#### Using in OSGi apps
To use Rookout in an OSGi application, the Rookout package must be whitelisted (delegated) to the OSGi container.

This is done by setting the following JVM options

```
org.osgi.framework.bootdelegation=com.rookout.*
```

This is done where all other JVM options are set (via -D flags, JVM_OPTS, etc.).

**Note: Due to limitations introduced in Java 9, you must use the JDK runtime and add the following Java flag: `-Djdk.attach.allowAttachSelf=true`**

<div class="rookout-org-info"></div>

## SDK Configuration

Configuration is performed using OS Environment Variables or Java System Properties.

| Environment Variable &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Default Value | Description |
| ----------------------- | ------------- | ----------- |
| `ROOKOUT_TOKEN` | None | The Rookout token for your organization. Should be left empty if you are using a Rookout ETL Controller |
| `ROOKOUT_LABELS` | {} | A dictionary of key:value labels for your application instances. Use `k:v,k:v` format for environment variables |
| `ROOKOUT_COMMIT` | None | String that indicates your git commit |
| `ROOKOUT_REMOTE_ORIGIN` | None | String that indicates your git remote origin |
| `ROOKOUT_CONTROLLER_HOST` | None | If you are using a Rookout ETL Controller, this is the hostname for it |
| `ROOKOUT_CONTROLLER_PORT` | None | If you are using a Rookout ETL Controller, this is the port for it |
| `ROOKOUT_PROXY` | None | URL to proxy server
| `ROOKOUT_DEBUG` | False | Set to `True` to increase log level to debug |
| `ROOKOUT_SOURCES` | None | Source information (see below) |


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

## Dynamic loading in running JVM process

The Rookout SDK can be loaded to a running JVM process by following these steps:
1. Export the destination process ID as `ROOKOUT_TARGET_PID` as environment variable.
2. Export all of your configuration as environment variables (`ROOKOUT_TOKEN` for example)
3. Run the following command line. 
```bash
ROOKOUT_TARGET_PID=1234 java -jar rook.jar
```

## Supported Versions

| Implementation      | Versions               |
| ------------------  | -------------          |
| **Oracle Java**     | 7u111+, 8u74+, 9, 10, 11, 12    |
| **OpenJDK**         | 7u111+, 8u74+, 9, 10, 11, 12, 13    |
| **AdoptOpenJDK**    | 8u74+, 9, 10, 11, 12       |
| **Amazon Corretto** | 8u74+, 11                  |

The following languages are officially supported: Java, Scala, Kotlin, Groovy, ColdFusion.

If the environment you are trying to debug is not mentioned in the list above, be sure to let us know: {@inject: supportEmail}

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

