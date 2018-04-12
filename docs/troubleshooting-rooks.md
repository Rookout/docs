---
id: troubleshooting-rooks
title: Rooks
---

## Python Rook

- Test connectivity
  `python -m rook`
- Python versions:
    - CPython 2.7 on Linux
    - PYPY (any version) on Linux
- Installation
  - Python rook needs to be installed within the application's virtualenv
  - Old installation tools can cause issues. Attempt to upgrade pip and remove distribute (deprecated, only if exists):
    - `pip install -U pip`
    - `pip uninstall distribute`
- Installation requires compiling some Python extensions on the fly, this requires the following packages:
  - apt
    - `$ apt-get update -q`
    - `$ apt-get install -qy g++ python-dev`
  - yum
    - `$ yum install -qy gcc-c++ python-devel`
  - apk


## Java Rook

- Test connectivity
  `java -jar rook.jar`
- Supported Java versions:
  - Java 7, Java 8
  - Oracle and Open have been tested

## Node Rook

- Test connectivity

- Supported Node versions:
  - 4, 6, 8
