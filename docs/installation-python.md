---
id: installation-python
title: Python
---

## Python Rook Installation

__Pre-requisites:__  
- *Python 2.7 / 3.5* ([download here](https://www.python.org/downloads/))
- *pip* ([download here](https://pip.pypa.io/en/stable/installing/))
- *virtualenv* ([documentation](https://virtualenv.pypa.io/en/stable/installation/))

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
    
To check if the rook connects successfully to the agent, see how to in the [Troubleshooting section](troubleshooting-rooks.md)

### Next steps
You now need to [install the Rookout Agent.](installation-agent.md)

## Examples

Full examples for integrating Rookout into your application are [available on our GitHub](https://github.com/Rookout/deployment-examples)

You will be able to find detailed procedures for all the following :

- [Python - Rookout using Kubernetes](https://github.com/Rookout/deployment-examples/tree/master/kubernetes)
- [Django](https://github.com/Rookout/deployment-examples/tree/master/django)
- [With AWS Lambda](https://github.com/Rookout/deployment-examples/tree/master/aws-lambda-python)
