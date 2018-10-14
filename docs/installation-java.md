---
id: installation-java
title: Java Rook Setup
---

The Java Rook is a java agent that instruments the user's application.  
This allows Rookout to remotely inspect the state of the process.

## Pre-requisites:
- *Java* ([download here](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html))

## Supported Versions

| Implementation     | Versions      |
| ------------------ | ------------- |
| **Oracle Java**    | 7, > 8u60     |
| **OpenJDK**        | 1.7, 1.8      |

## Setup guide

1. Download our java agent :  
    ```bash
    $ curl -L "https://repository.sonatype.org/service/local/artifact/maven/redirect?r=central-proxy&g=com.rookout&a=rook&v=LATEST" -o rook.jar
    ```

2. Set your JVM to use the rook as a java agent:  
    ```bash
    $ export JAVA_OPTIONS="$JAVA_OPTIONS -javaagent:{DOWNLOAD_DIR}/rook.jar"
    ```
    
3. Add your source files to the .jar/.war/.ear when building.  
this can be done manually or through the help of a build tool such as [Gradle](https://gradle.org/) or [Maven](https://maven.apache.org/).
    
    *For explanation on how to do this using Gradle or Maven head to our [installation examples](installation-java.md)*.

4. Configure the required environment variables:

    ```bash
    $ export ROOKOUT_TOKEN=<Your Rookout Token>
    $ export ROOKOUT_ROOK_TAGS=<List of semicolon ; separated values to identify this app instance>
    ```

    <details>
    <summary>_Rook setup using a proxy_</summary>
    Unix:
    ```bash
    export HTTPS_PROXY=https://mypro.xy:1234 && curl -L "https://repository.sonatype.org/service/local/artifact/maven/redirect?r=central-proxy&g=com.rookout&a=rook&v=LATEST" -o rook.jar
    ```
    Windows:
    ```bash
    set HTTPS_PROXY=https://mypro.xy:1234 && curl -L "https://repository.sonatype.org/service/local/artifact/maven/redirect?r=central-proxy&g=com.rookout&a=rook&v=LATEST" -o rook.jar
    ```
    </details>

    Once your application is deployed, navigate to the Rookout App Instances page to make sure it is available for debugging.
    For advanced Rook configuration, check out the [Rook Configuration page](rooks-config.md).<br/>
    If you encounter any issues, check out our [Troubleshooting section](troubleshooting-rooks.md).

## Source Code Version

The Java Rook will attempt to determine the current Git commit the application is based off, and will report it.
The resolution takes place in the following steps:
1. If there's an environment variable named 'ROOKOUT_COMMIT' use it.
1. If there's an environment variable named 'ROOKOUT_MANIFEST_COMMIT', the application is running from a .jar file, and
the jar file has that attribute in it's manifest, use the attribute value.

## Examples

Check out the following deployment examples:

- [Using Docker-Compose](https://github.com/Rookout/deployment-examples/tree/master/java-docker-compose)
- [Using Gradle](https://github.com/Rookout/deployment-examples/tree/master/java-gradle)
- [Using Maven](https://github.com/Rookout/deployment-examples/tree/master/java-maven)
- [AWS Elastic Beanstalk](https://github.com/Rookout/deployment-examples/tree/master/java-aws-elasticbeanstalk)
- [Tomcat on AWS Elastic Beanstalk](https://github.com/Rookout/deployment-examples/tree/master/java-tomcat-aws-elasticbeanstalk)
- [Oracle WebLogic](https://github.com/Rookout/deployment-examples/tree/master/java-weblogic)
- [JBoss WildFly](https://github.com/Rookout/deployment-examples/tree/master/java-wildfly-docker-agentless)

Or visit [our GitHub repository](https://github.com/Rookout/deployment-examples) for more.