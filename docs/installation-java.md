---
id: installation-java
title: Java
---

## Adding a Java Rook

__Pre-requisites:__  
- *Oracle Java 7/8 __or__ OpenJDK 1.7/1.8* ([download here](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html))

1. Download our java agent :  
    ```bash
    $ curl -L "https://repository.sonatype.org/service/local/artifact/maven/redirect?r=central-proxy&g=com.rookout&a=rook&v=LATEST" -o rook.jar
    ```

2. Set your JVM to use the rook as a java agent :  
    ```bash
    $ export JAVA_OPTIONS="$JAVA_OPTIONS -javaagent:{DOWNLOAD_DIR}/rook.jar"
    ```
    
3. Add your source files to the .jar/.war/.ear when building.  
this can be done manually or through the help of a build tool such as [Gradle](https://gradle.org/) or [Maven](https://maven.apache.org/).
    
*For explanation on how to do this using Gradle or Maven head to our [installation examples](installation-java.md)*

Once your application is deployed, navigate to the Rookout App Instances page to make sure it is available for debugging.
If you encounter any issues, check out our [Troubleshooting section](troubleshooting-rooks.md)

### Rook setup using a proxy
Unix:
```bash
export HTTPS_PROXY=https://mypro.xy:1234 && curl -L "https://repository.sonatype.org/service/local/artifact/maven/redirect?r=central-proxy&g=com.rookout&a=rook&v=LATEST" -o rook.jar
```
Windows:
```bash
set HTTPS_PROXY=https://mypro.xy:1234 && curl -L "https://repository.sonatype.org/service/local/artifact/maven/redirect?r=central-proxy&g=com.rookout&a=rook&v=LATEST" -o rook.jar
```

## Examples

Full examples for integrating Rookout into your application are [available on our GitHub](https://github.com/Rookout/deployment-examples)

You will be able to find detailed procedures for all the following :

- [Tomcat on AWS Elastic Beanstalk](https://github.com/Rookout/deployment-examples/tree/master/java-tomcat-aws-elasticbeanstalk)
- [On AWS Elastic Beanstalk](https://github.com/Rookout/deployment-examples/tree/master/java-aws-elasticbeanstalk)
- [Using Docker-Compose](https://github.com/Rookout/deployment-examples/tree/master/java-docker-compose)
- [Using Gradle](https://github.com/Rookout/deployment-examples/tree/master/java-gradle)
- [Using Maven](https://github.com/Rookout/deployment-examples/tree/master/java-maven)
- [Oracle WebLogic](https://github.com/Rookout/deployment-examples/tree/master/java-weblogic)
- [JBoss WildFly using Docker and remote agent](https://github.com/Rookout/deployment-examples/tree/master/java-wildfly-docker-agentless)
