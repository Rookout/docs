---
id: rooks-python
title: Python Rook
---


The Python Rook is a python package that runs inside the user's application.  
This allows us to remotely inspect the state of the process.

## Installation

To install Python Rook into the currently active python environment simply run:
```bash
$ pip install rook
```

## Running

To activate Python Rook within your app, add the following line to your Python code as early as possible:
```python
from rook import auto_start
```

For more control over the Python Rook initialization, check out this [page](rooks-python_interface.md).

## Source Code Version

Python Rook will attempt to determine the current Git commit the application is based off, and will report it.
The resolution takes place in the following steps:
1. If there's an environment variable named 'ROOKOUT_COMMIT' use it.
1. If there's an environment variable named 'ROOKOUT_GIT' get the current Git head from that path.
1. If the application is running from a Git repo, get the current Git head for that repo.   

## Supported Versions

| Implementation     | Language   | Versions           |
| ------------------ | ---------- | ------------------ |
| **CPython**        | 2          | 2.7                |
| **CPython**        | 3          | 3.5, 3.5, 3.6, 3.7 |
| **PyPy**           | 2          | 5.6.0, 5.8.0       |

## Configuration

Python Rook is configured in the same manner as all other [rooks](rooks-config.md).
