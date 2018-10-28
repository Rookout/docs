---
id: installation-java
title: Java Rook Setup
---

## Introduction

The Node.js Rook provides the ability to fetch debug data from a running application in real time.
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
```javascript
// Export your token as an environment variable
$ export ROOKOUT_TOKEN=[Your Rookout Token]
```

Tag your environment:
```javascript
// Use a set of semicolon separated values to identify specific deployments and configurations
$ export ROOKOUT_TAGS=[;;;]
```

Add the Java agent to your application:
```javascript
$ export JAVA_OPTIONS="$JAVA_OPTIONS -javaagent:(pwd)/rook.jar"
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
```javascript
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

## Examples

Check out the following deployment examples:

- [Using Docker-Compose](https://github.com/Rookout/deployment-examples/tree/master/java-docker-compose)
- [Using Gradle](https://github.com/Rookout/deployment-examples/tree/master/java-gradle)
- [Using Maven](https://github.com/Rookout/deployment-examples/tree/master/java-maven)
- [AWS Elastic Beanstalk](https://github.com/Rookout/deployment-examples/tree/master/java-aws-elasticbeanstalk)
- [Tomcat on AWS Elastic Beanstalk](https://github.com/Rookout/deployment-examples/tree/master/java-tomcat-aws-elasticbeanstalk)
- [Oracle WebLogic](https://github.com/Rookout/deployment-examples/tree/master/java-weblogic)
- [JBoss WildFly](https://github.com/Rookout/deployment-examples/tree/master/java-wildfly-docker-agentless)

Or visit [our GitHub repository](https://github.com/Rookout/deployment-examples) for more deployment examples.
