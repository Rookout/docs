---
id: python-setup
title: Python SDK
sidebar_label: Python
---
This page will dive into the nitty gritty details on installing Rookout under various configurations.  
If you are encountering any difficulties with deploying Rookout, this is the place to look.

## Python

The [Python SDK](https://pypi.org/project/rook/) provides the ability to fetch debug data from a running application in real time.  
It can easily be installed by running the following command:

```bash

pip install rook

```

## Setup

Start the SDK within your application:

```python

import rook

if __name__ == "__main__":
    rook.start(token='[Your Rookout Token]',
               labels={"env": "dev"}) # Optional,see Labels page below Projects
    # Your program starts here :)

```

<div className="rookout-org-info" />

The SDK should be imported just before the application begins executing.  
This is due to the fact that in Python, there's no clean way to identify a module has finished defining it's classes.

For [Pre-forking servers](#pre-forking-servers) please read the relevant section..  

## SDK API

### start

```python

start(token=None,
    host=None,
    port=None,
    debug=None,
    throw_errors=None,    
    log_to_stderr=None,
    labels=None,
    git_commit=None,
    git_origin=None,
    fork=None,
    **kwargs)

```

The `start` method is used to initialize the SDK in the background and accepts the following arguments:

| Argument                           | Environment Variable                               | Default Value | Description                                                                                                            |
| ---------------------------------- | -------------------------------------------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `token`                     | `ROOKOUT_TOKEN`                             | None          | The Rookout token for your organization. Should be left empty if you are using a Rookout ETL Controller                |
| `host`                      | `ROOKOUT_CONTROLLER_HOST`                   | None          | If you are using a Rookout ETL Controller, this is the hostname for it                                                 |
| `port`                      | `ROOKOUT_CONTROLLER_PORT`                   | None          | If you are using a Rookout ETL Controller, this is the port for it                                                     |
| `debug`                     | `ROOKOUT_DEBUG`                             | False         | Set to `True` to increase log level to debug                                                                    |
| `throw_errors`              | None                                               | False         | Set to `True` to throw an exception if `start` fails (error message will not be printed in console)      |
| `labels`                    | `ROOKOUT_LABELS`                            | {"{"}{"}"}            | A dictionary of key:value labels for your application instances. Use `k:v,k:v` format for environment variables |
| `git_commit`                | `ROOKOUT_COMMIT`                            | None          | String that indicates your git commit or a branch name                                                                 |
| `git_origin`                | `ROOKOUT_REMOTE_ORIGIN`                     | None          | String that indicates your git remote origin                                                                           |
| `proxy`                     | `ROOKOUT_PROXY`                             | None          | URL to proxy server                                                                                                    |
| `fork`                      | `ROOKOUT_ENABLE_FORK`                       | False         | Set to `True` to enable support in forked processes                                                             |

### restart

```python

restart(labels=None)

```

The `restart` method is used to change the SDK labels:

| Argument                           | Environment Variable                               | Default Value | Description                                                                                                            |
| ---------------------------------- | -------------------------------------------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `labels`                    | `ROOKOUT_LABELS`                            | {"{"}{"}"}            | A dictionary of key:value labels for your application instances. Use `k:v,k:v` format for environment variables |

### flush

```python

flush()

```

The `flush` method allows explicitly flushing the Rookout logs and messages.

## Test connectivity

To make sure the SDK was properly installed in your Python (virtual) environment, and test your configuration (environment variables only), run the following command:

```bash

python -m rook

```

## Source information

To enable automatic source fetching, information about the source control must be specified.

### Environment Variables or Start Parameters

Use the environment variables or start parameters as described above in the API section. 

### Git Folder

Rookout gets the source information from the .git folder if both of the following apply:

1.  The .git folder is present at any of the parent directories of where the application is running (searching up the tree).
2.  No environment variables or start parameters are set for source information.

## Supported Python versions

| Implementation | Versions                           |
| -------------- | ---------------------------------- |
| **CPython**    | 2.7, 3.5, 3.6, 3.7, 3.8, 3.9, 3.10 |
| **PyPy**       | 6.0.0                              |

Rookout was tested on `pip` versions 9+.

**_Note:_** We recommend avoiding production deployments of Rookout on Windows OS.

## Dependencies

The Python SDK contains native extensions. For most common interpreter and OS configurations, pre-built binaries are provided. For other configurations, a build environment is needed to successfully install Rookout.

If you encounter an error similar to the following example, be sure to install the environment specific build tools specified below:

```json

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

Here are the commands for installing the build environments for some common OS:

DOCUSAURUS_CODE_TABS

OS X

```bash

xcode-select --install
# If installing for PyPy on macOS, installing pkg-config is also required:
brew install pkg-config

```

Debian

```bash

apt-get update -q && apt-get install -qy g++ python-dev

```

Fedora

```bash

yum install -qy gcc-c++ python-devel

```

Alpine

```bash

apk update && apk add g++ python-dev linux-headers

```

END_DOCUSAURUS_CODE_TABS

## Serverless and PaaS deployments

### Integrating Rookout to a serverless application

Rookout provides an easy to use wrapper that works for most common serverless runtimes:

```python

from rook.serverless import serverless_rook

@serverless_rook
def lambda_handler(event, context):
  return "Hello world"

```

**Note:** Adding the Rookout SDK will slow down your Serverless cold-start times. Please make sure your timeout is no less than 10 seconds.

### Building

If you are running your application on a Serverless or PaaS (Platform as a Service), you must build your package in an environment similar to those used in production. 
If you are running on a Windows or Mac machine (or using an incompatible Linux distribution) you may encounter some issues here.

Many Serverless frameworks (such as AWS SAM) have built-in support for it and will work out of the box.

If you need to set up your own build, we recommend using Docker, with a command line such as:

```bash

docker run -v `pwd`:`pwd` -w `pwd` -i -t lambci/lambda:build-python2.7 pip install -r requirements.txt

```

For more information check out this blog post: https:

## Configuration for special use cases

### Python Spark (PySpark) applications

1.  Import the SDK as usual in the main function that runs on the Spark driver.
2.  To import the SDK on Spark executors, run `` with ``.
3.  If running under YARN, specify the `` environment variable for your application master and executor nodes like so:

```bash



```



### Pre-forking (Celery, Gunicorn, etc.)

Several popular application servers and frameworks for Python load the application code during startup and then `` the process multiple times to worker processes.

If you are using one of those application servers or frameworks, you should set the `` argument in the SDK API or the ROOKOUT_ENABLE_FORK environment variable to true to automatically enable Rookout in forked processes.

### uWSGI applications

For uWSGI applications, you must enable threads by adding **--enable-threads** to the command line or **enable-threads = true** to the uWSGI ini file.  
You can read more about it [here](https://uwsgi-docs.readthedocs.io/en/latest/WSGIquickstart.html#a-note-on-python-threads).

In addition, you must start Rookout at each worker separately using the `` decorator. See the sample snippet below.
You can read more about it [here](https://uwsgi-docs.readthedocs.io/en/latest/PythonDecorators.html#module-uwsgidecorators).

```python



```
