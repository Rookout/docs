---
id: installation-python
title: Python Rook Setup
---

## Introduction

The Python Rook provides the ability to fetch debug data from a running application in real time.
It is deployed by deploying the [Rook SDK](https://pypi.org/project/rook/).
It can easily be installed by running the following command:
```bash
    $ pip install rook
```

## Basic setup

Setup the Rookout token in your environment:
```bash
# Export your token as an environment variable
$ export ROOKOUT_TOKEN=[Your Rookout Token]
```

Tag your environment:
```bash
# Use a set of semicolon separated values to identify specific deployments and configurations
$ export ROOKOUT_TAGS=[;;;]
```

Import the Rook within your application:
```python
# Import the package in your app's entry-point file, just before it starts
from rook import auto_start
if __name__ == "__main__":
    # Your program starts here :)
```

The Rook should be imported as late as possible within the application.
The reason for this is that it’s impossible to know in Python if a module is fully loaded and if all classes within it have been defined. Unlike JS and it’s hoisting concept, classes in Python are created when the interpreter first executes them. If we’ll see a partially loaded module and failed to set a breakpoint in it (because the class has not been defined yet) setting the breakpoint will fail and the user will receive an error.

## Supported Python versions

| Implementation     | Versions           |
| ------------------ | ------------------ |
| **CPython**        | 2.7, 3.5, 3.6, 3.7 |
| **PyPy**           | 6.0.0              |

***Note:*** We recommend avoiding production deployment for Windows based apps.

## Source Commit Detection

The Python Rook supports detecting the existing source code commit in the following methods, in descending order of priority:
1. If the environment variable “ROOKOUT_COMMIT” exists, use it.
2. If the environment variable “ROOKOUT_GIT” exists, search for the configuration of the “.git” folder and use its head.
3. If the main application is running from within a Git repository, use its head. 

## Dependancies

The Rookout Python SDK contains native extensions. For most common interpreter and OS configurations, pre-built binaries are provided. For other configurations, a build environment is needed to successfully install Rookout.

If you encounter an error similar to the following example, be sure to install the environment specific build tools specified below:

```bash
    Could not find <Python.h>. This could mean the following:
      * You're on Ubuntu and haven't run `apt-get install python-dev`.
      * You're on RHEL/Fedora and haven't run `yum install python-devel` or
        `dnf install python-devel` (make sure you also have redhat-rpm-config
        installed)
      * You're on Mac OS X and the usual Python framework was somehow corrupted
        (check your environment variables or try re-installing?)
      * You're on Windows and your Python installation was somehow corrupted
        (check your environment variables or try re-installing?)
```
1. Mac
    - $ xcode-select --install
2. Debian based
    - $ apt-get update -q && apt-get install -qy g++ python-dev
3. Fedora based
    - $ yum install -qy gcc-c++ python-devel
4. Alpine
    - $ apk update && apk add g++ python-dev

## Serverless and PaaS deployments

If you are running your application on a Serverless or PaaS (Platform as a Service), you must build your package in an environment similar to those used in production. 
If you are running on a Windows or Mac machine (or using an incompatible Linux distribution) you may encounter some issues here.

Many Serverless frameworks (such as AWS sam) have built-in support for it and will work out of the box.

If you need to set up your own build, we recommend using Docker, with a command line such as:
```bash
    $ docker run -it -v `pwd`:`pwd` -w `pwd` python:2.7 pip install -t lib
```

For more information check out this blog post: https://www.rookout.com/3_min_hack_for_building_local_native_extensions/

For additional environments, check out our [deployment examples page](https://github.com/Rookout/deployment-examples).