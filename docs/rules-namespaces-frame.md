---
id: rules-namespaces-frame
title: Frame Namespace
---


The frame namespace allows access to the current scope of execution.

It supports the following access patterns:

### Attribute Access
Will provide the value of the given attribute within the current context (i.e. local or global variable).

Example:
```json
{
  "name": "set",
  "paths": {
    "store.a": "frame.a"
  }
}
``` 

### filename
Get the currently executing file name.

Example:
```json
{
  "name": "set",
  "paths": {
    "store.filename": "frame.filename()"
  }
}
``` 

### line
Get the currently executing line number.

Example:
```json
{
  "name": "set",
  "paths": {
    "store.line": "frame.line()"
  }
}
``` 

### function
Get the currently executing function/method name.

Example:
```json
{
  "name": "set",
  "paths": {
    "store.function": "frame.function()"
  }
}
``` 

### module
Get the currently executing module/class name.

Example:
```json
{
  "name": "set",
  "paths": {
    "store.module": "frame.module()"
  }
}
``` 

### locals
Get the all locals within the current scope.

Example:
```json
{
  "name": "set",
  "paths": {
    "store.locals": "frame.locals()"
  }
}
``` 

### dump
Builds a namespace with the following values: locals, module, filename, line, function.

Example:
```json
{
  "name": "set",
  "paths": {
    "store.dump": "frame.dump()"
  }
}
```
