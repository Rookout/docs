---
id: rooks-java
title: Java Rook
---


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

## Configuration

Java Rook is configured in the same manner as all other [rooks](rooks-config.md).