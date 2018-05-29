---
id: rooks-java
title: Java Rook
---

The Java Rook is a java agent that instruments the user's application.  
This allows us to remotely inspect the state of the process.

## Installation

To install Java Rook simply download the Java agent:
```bash
$ curl -L "https://repository.sonatype.org/service/local/artifact/maven/redirect?r=central-proxy&g=com.rookout&a=rook&v=LATEST" -o rook.jar
```

## Running

To activate Java Rook within your app, add the following java option to the application command line:
```bash
-javaagent:rook.jar
```

## Source Code Version

Java Rook will attempt to determine the current Git commit the application is based off, and will report it.
The resolution takes place in the following steps:
1. If there's an environment variable named 'ROOKOUT_COMMIT' use it.
1. If there's an environment variable named 'ROOKOUT_MANIFEST_COMMIT', the application is running from a .jar file, and
the jar file has that attribute in it's manifest, use the attribute value.

## Supported Versions

| Implementation     | Versions      |
| ------------------ | ------------- |
| **Oracle Java**    | 7, > 8u60     |
| **OpenJDK**        | 1.7, 1.8      |

## Source Code Version

## Configuration

Java Rook is configured in the same manner as all other [rooks](rooks-config.md).

## Known Issues

- When using enterprise web servers such as *Oracle WebLogic* the JVM Rook will not be able to find the source files
and report the rule with a warning. The rule is still working as intended but it will not be able to make sure the
source file used is matching the live one running.
