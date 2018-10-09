---
id: troubleshooting-rooks
title: Rooks
---

## Python Rook

- Supported Python versions:
    - CPython 2.7, 3.5, 3.6, 3.7
    - PYPY 6.0.0

- In case of connectivity issues, run this command to test connectivity:
  ```bash
  $ python -m rook
  ```

## Java Rook

- Supported Java versions:
  - Java 7, Java 8
  - Oracle and Open have been tested

- In case of connectivity issues, run this command to test connectivity:
  ```bash
  $ java -jar rook.jar
  ```

  
- When using enterprise web servers such as *Oracle WebLogic* the JVM Rook will not be able to find the source files and report the rule with a warning. The rule is still  working as intended but it will not be able to make sure the source file used is matching the live one running.

## Node Rook

- Supported Node versions:
  - 4.3+, 6, 8, 10

- In case of connectivity issues, run this command to test connectivity:
  ```bash
  $ node ./node_modules/rookout/check.js
  ```