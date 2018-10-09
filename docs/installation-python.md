---
id: installation-python
title: Python Rook Setup
---

The Python Rook is a python package that runs inside the user's application.  
This allows Rookout to remotely inspect the state of the process.

### Pre-requisites
- *Python* ([download here](https://www.python.org/downloads/))
- *pip* ([download here](https://pip.pypa.io/en/stable/installing/))
- *virtualenv* ([documentation](https://virtualenv.pypa.io/en/stable/installation/))

### Supported Python versions

| Implementation     | Language   | Versions           |
| ------------------ | ---------- | ------------------ |
| **CPython**        | 2          | 2.7                |
| **CPython**        | 3          | 3.5, 3.5, 3.6, 3.7 |
| **PyPy**           | 2          | 6.0.0       |

### Setup guide

1. Create and activate a new virtual environment :
    ```bash
    $ virtualenv virtualenv
    $ source virtualenv/bin/activate
    ```

1. Install the Rookout pypi package :  
    ```bash
    $ pip install rook
    ```

1. Import the package in your app's entry-point file :  
    ```python
    from rook import auto_start
    ```

1. Configure the required environment variables:

    ```bash
    $ export ROOKOUT_TOKEN=<Your Rookout Token>
    $ export ROOKOUT_AGENT_HOST=cloud.agent.rookout.com 
    $ export ROOKOUT_AGENT_PORT=443
    $ export ROOKOUT_ROOK_TAGS=<List of semicolon ; separated values to identify this app instance>
    ```

    <details>
    <summary>_Installing the Rookout pypi package using a proxy_</summary>
    Unix:
    ```bash
    export HTTPS_PROXY=https://mypro.xy:1234 && pip install rook
    ```
    Windows:
    ```bash
    set HTTPS_PROXY=https://mypro.xy:1234 && pip install rook
    ```
    </details>

    Once your application is deployed, navigate to the Rookout App Instances page to make sure it is available for debugging.
    For advanced Rook configuration, check out the [Rook Configuration page](rooks-config.md).<br/>
    If you encounter any issues, check out our [Troubleshooting section](troubleshooting-rooks.md).

### Additional info

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

### Source Code Version

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