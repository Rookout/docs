---
permalink: /scripts/namespaces/utils
title: Utils Namespace
---

# {{ page.title}}

The utils namespace allows access to various globals in the application state.

It contains the following methods:

### exception
Get current exception.
Supported on Python only.

Example:
```json
{
  "name": "set",
  "paths": {
    "store.exception": "utils.exception()"  
  }
}
```

### exception_string
Get current exception as string.
Supported on Python only.

Example:
```json
{
  "name": "set",
  "paths": {
    "store.exception": "utils.exception_string()"
  }
}
```

### exception_type
Get current exception type.
Supported on Python only.

Example:
```json
{
  "name": "set",
  "paths": {
    "store.exception": "utils.exception_type()"
  }
}
```

### module
Get a reference to *Python module*/*Java class* by name.

Example:
```json
{
  "name": "set",
  "paths": {
    "store.os": "utils.module(os)"
  }
}
```

### thread_id
Get current thread id.

Example:
```json
{
  "name": "set",
  "paths": {
    "store.thread_id": "utils.thread_id()"
  }
}
```

### thread_name
Get current thread name.

Example:
```json
{
  "name": "set",
  "paths": {
    "store.thread_name": "utils.thread_name()"
  }
}
```

### threads
Get a list of all running threads.

Example:
```json
{
  "name": "set",
  "paths": {
    "store.threads": "utils.threads()"
  }
}
```

### threads_tracebacks
Get a list of all running threads with their tracebacks.

Example:
```json
{
  "name": "set",
  "paths": {
    "store.thread_tracebacks": "utils.thread_tracebacks()"
  }
}
```

### env
Get the value of an environment variable

Example
```json
{
  "name": "set",
  "paths": {
    "store.path": "utils.env(PATH)"
  }
}
```
