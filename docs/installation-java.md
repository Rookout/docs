---
id: installation-java
title: Java Rook Setup
---

### Pre-requisites:
- *Java* ([download here](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html))

###Supported versions
| Implementation     | Versions       |
| ------------------ | -------------- |
| **Node**           | 4.3+, 6, 8, 10  |

### Setup guide

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
    $ export ROOKOUT_AGENT_HOST=cloud.agent.rookout.com 
    $ export ROOKOUT_AGENT_PORT=443
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
If you encounter any issues, check out our [Troubleshooting section](troubleshooting-rooks.md).

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