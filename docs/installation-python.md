---
id: installation-python
title: Python Rook Setup
---

### Pre-requisites
- *Python 2.7 / 3.5 / 3.6 / 3.7* ([download here](https://www.python.org/downloads/))
- *pip* ([download here](https://pip.pypa.io/en/stable/installing/))
- *virtualenv* ([documentation](https://virtualenv.pypa.io/en/stable/installation/))

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


Once your application is deployed, navigate to the Rookout App Instances page to make sure it is available for debugging.
If you encounter any issues, check out our [Troubleshooting section](troubleshooting-rooks.md)

## Examples

Full examples for integrating Rookout into your application are available on [our GitHub repository](https://github.com/Rookout/deployment-examples).

Checkout the following deployment examples:

- [Django](https://github.com/Rookout/deployment-examples/tree/master/python-django)
- [Kubernetes](https://github.com/Rookout/deployment-examples/tree/master/python-kubernetes)
- [AWS Lambda](https://github.com/Rookout/deployment-examples/tree/master/python-aws-lambda)
- [AWS Lambda + Chalice](https://github.com/Rookout/deployment-examples/tree/master/python-aws-chalice)
- [AWS Lambda + serverless framework ](https://github.com/Rookout/deployment-examples/tree/master/python-aws-serverlessframework)