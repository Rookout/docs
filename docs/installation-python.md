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
```javascript
# Export your token as an environment variable
$ export ROOKOUT_TOKEN=[Your Rookout Token]
```

Tag your environment:
```javascript
# Export your token as an environment variable
$ export ROOKOUT_TAGS=[;;;]
```

Import the Rook within your application:
```javascript
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

## Additional info

- The Python Rook needs to be installed within the application's virtualenv.
- Old installation tools may cause issues. Attempt to upgrade pip and remove distribute (deprecated, only if exists):
    - `pip install -U pip`
    - `pip uninstall distribute`
- Installation requires compiling some Python extensions on the fly. The following packages are required:
  - apt
    - `$ apt-get update -q`
    - `$ apt-get install -qy g++ python-dev`
  - yum
    - `$ yum install -qy gcc-c++ python-devel`
  - apk

For more control over the Python Rook initialization, check out this [page](rooks-python_interface.md).

## Source Code Version

The Python Rook will attempt to determine the current Git commit the application is based off, and will report it.
The resolution takes place in the following steps:
1. If there's an environment variable named 'ROOKOUT_COMMIT' use it.
1. If there's an environment variable named 'ROOKOUT_GIT' get the current Git head from that path.
1. If the application is running from a Git repo, get the current Git head for that repo.   

## Examples

Check out the following deployment examples:

- [Django](https://github.com/Rookout/deployment-examples/tree/master/python-django)
- [Kubernetes](https://github.com/Rookout/deployment-examples/tree/master/python-kubernetes)
- [AWS Lambda](https://github.com/Rookout/deployment-examples/tree/master/python-aws-lambda)
- [AWS Lambda + Chalice](https://github.com/Rookout/deployment-examples/tree/master/python-aws-chalice)
- [AWS Lambda + serverless framework ](https://github.com/Rookout/deployment-examples/tree/master/python-aws-serverlessframework)

Or visit [our GitHub repository](https://github.com/Rookout/deployment-examples) for more.