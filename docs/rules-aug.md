---
id: rules-aug
title: Scripting Reference
---


Rookout uses a JSON object to define what data to extract from remote applications.

Here's the specification of the JSON format:

## Location

The location defines where to collect the data from.

Rookout supports two location type and the location type used is chosen by the "name" attribute.

### file_line

This location indicates collecting the information whenever execution reaches the specified code line.

This location has the following attributes:
1. **filename** - the file name of the source file to place the rule.
1. **lineno** - the line number in the source file to place the ruel.
1. **sha256** - the expected sha256 of the source file. If this attribute exists and is diffrenet from expected, 
the rule will be reject and an exception will be thrown.

Example:
```json
"location": {
  "name": "file_line",
  "filename": "solutions/src/main/scala/org/scalalabs/advanced/lab04/Movie.scala",
  "lineno": 35,
  "sha256": "bbec4a3545532de69156a609069d7960c775974da7bf206075eba2b4b954ea27"
}
```  

### log_handler

This location indicates collecting the information whenever a log message is written to specified logger.

This location has the following attributes:
1. **logger** - the logger name to monitor.

Example:
```json
"location": {
  "name": "log_handler",
  "logger": "django.server"
}
```  

Logging frameworks monitored:
- Python
    - logging
- JVM
    - JUL - Java.Util.Logging

### Include External Files

This **optional** configuration may be used to specify if debug information should be collected from packages included as external libraries.
Currently supported for Python and Node.js debugging.

Example:
```json
"location": {
  "name": "file_line",
  "filename": "src/services/todos.js",
  "lineno": 127,
  "sha256": "bbec4a3545532de69156a609069d7960c775974da7bf206075eba2b4b954ea27",
  "includeExternals": true
}
```  

## condition

## extractor

## action

Rookout currently only supports the script action:

Example:
```json
"action": {
  "name": "script",
  "operations": [
    {
      "name": "set",
      "paths": {
        "store.rookout.frame": "frame.dump()",
        "store.rookout.traceback": "stack.traceback()"
      }
    }
  ]
}
```

## Selector

A selector script allows the user to define for which Rooks the rule applies.

- **Available Paths:** Basic Path, Arithmetic Path
- **Available Operations:** set, format, return
- **Available Namespaces:**
    - "machine"- machine information
    - "agent"- agent information
    - "rook"- Rook information
    - "temp"- scratch space

Example:
```json
"selector": {
  "operations": [
    {
      "name": "return",
      "path": {
        "name": "calc",
        "path": "rook.platform = \"python\""
      }
    }
  ]
}
```

## Action

An action script allows the user to define what data to collect from a running app.
All items written into the "store" path will be forwarded to processing.

- **Available Paths:** Basic Path
- **Available Operations:** set
- **Available Namespaces:**
    - "frame"- current frame information
    - "stack"- current stack information
    - "extracted"- information extracted from the location
    - "store"- items to be forwarded to processed
    - "utils"- utils to access application state
    - "temp"- scratch space

Example:
```json
"action": {
  "name": "script",
  "operations": [
    {
      "name": "set",
      "paths": {
        "store.rookout.frame": "frame.dump()",
        "store.rookout.traceback": "stack.traceback()",
        "store.rookout.exception.type": "utils.exception()",
        "store.rookout.exception.value": "utils.exception_type()"
      }
    }
  ]
}
```

## Processing

A processing script allows the user to transfom the data and load it into various services

- **Available Paths:** Basic Path, Arithmetic Path
- **Available Operations:** set, format, return, all [Target Operations](rules-operations.md#Target%20Operations)
- **Available Namespaces:**
    - "store"- items extracted by the rook
    - "message_info"- message meta data
    - "machine"- machine information
    - "agent"- agent information
    - "rook"- Rook information
    - "temp"- scratch space

Example:
```json
"processing": {
  "operations": [
    {
      "name": "send_rookout",
      "path": "store"
    }
  ]
}
```
