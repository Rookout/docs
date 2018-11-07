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

## Condition

## Extractor

## Action

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

## Script types

### Selector script

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

### Action script

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

## Processing script

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

## Paths

Rookout *paths* are objects pointing to an element inside the *namespaces* (the script's state).

Rookout supports multiple *path* types for various use cases. 
When even an *operation* expects a path, it can be specified in multiple ways:

#### Implicit Path

Implicit path is simply a string, and the default path type for that script will be used.

The default path types for all scripts is the *Basic Path* for now

Example:
```json
"value": "frame.a"
``` 

#### Explicit Path

Explicit path is a dictionary with the name of the path under "name" and all the relevant arguments within the dictionary.

Availability of different path types depends on the script [uses](rules-uses.md).

Example:
```json
"value": {
  "name": "basic",
  "path": "frame.a"
}
``` 

### Basic Path

The most commonly used path is the basic path.

This path supports the following access methods:
1. Attribute access - by specifing a value:
    ```json
    "frame"
    ```
2. Key access - by specifying value inside brackets. 

    Supports numer values:
    ```json
    "[1]"
    ```
    And String values
    ```json
    "[\"name\"]"
    ```
    
3. Function calls - by specifying function name followed by parenthesis and optional arguments:
    ```json
    "method(argument)"
    ```
    
Access methods can be chained, for example:
```json
"frame.value"
"frame.dump(10)"
"stack[10].value"
```

### Arithmethic Path

a more advanced path, available for most of the agent operations (check out [uses](rules-uses.md)).
To select this path type, specify "calc" as the path name.

This path represents an arithmetic exception involving namespace access, constants and arithmetic operators.

1. Namespace access - is based on the primitives shown in Basic Path. Function calls are not supported.
    ```json
    {
     "name": "calc",
     "path": "frame.value"
    }
    ```
    
2. Constants - the following data types are supported:

    2.1. Boolean
    
    ```json
    True
    False
    ```

    2.2. Integer
    
    ```json
    1
    -15
    +200
    ```
    
    2.3. Real
    
    ```json
    10.2
    -12.5
    5e2
    -10.2E4
    ```
    
    2.4 String
    
    ```json
    "value"
    ```
    
    2.5. Lists of primitives:
    ```json
    "[ 1, 2,\"3\", 4, 2.6,   \"3\"]"
    ```
    
3. Arithmetic operators - the following arithematic operators are supported:

    Plus, Minus, Multiplication, Division, Unary Plus, Unary Minus, or, and, equality operators (< <= > >= != = <> ), in (contains).
    
    Operator precedence is as expected.

In the future, an improved version of this path is expected to be default paths in many uses.

## Script Operations

### Processing Operations

These operations allow transforming the data and controlling the script flow.

#### set

This operation copies items from source paths to destinations paths.

It is the **only** operation available for the action script.

Example:
```json
{
  "name": "set",
  "paths": {
    "store.rookout.frame": "frame.dump()",
    "store.rookout.traceback": "stack.traceback()"
  }
}
```

#### format

This operation formats data into a string.

Example:
```json
{
  "name": "format",
  "path": "temp.message",
  "format": "LOG: {machine.ip}: {store.rookout.frame.filename}@{store.rookout.frame.line}-{store.rookout.frame.function}"
}
```

#### return

This operation return a value from the script to underlying mechanism and terminates the script's execution.

Example:
```json
{
  "name": "return",
  "path": {
    "name": "calc",
    "path": "True"
  }
}
```

#### filter

This operation performs data redaction on the destination paths, before they are sent to their Targets.

**Note** - redaction is done by the Rookout Agent, before being sent to the defined target.

Exmaple: 

```json
{
  "name": "filter",
  "filters": [
    {
      "filter_type": "name",
      "pattern": "secretKey"
    },
    {
      "filter_type": "value",
      "pattern": "[0-9]+"
    }
  ]
}
```

The operation **pattern** may be a string or a regular expression.  
If type **Name** is used, the entire value will be removed.  
For example, "secretKey":"12345" will be replaced with "secretKey":"[REDACTED]".  
If type **Value** is used, a part of the value that matches the regular expression will be removed.  
For example, "nameAndPassword":"LordHelmet-12345" will be replaced with "nameAndPassword":"LordHelmet-****".  

### Target Operations

These operations send data to a target destination.

#### Service Targets

These operations send data to a target service.

1. send_rookout

This operation sends an object from the namespace to the Rookout Service.

Example:
```json
{
  "name": "send_rookout",
  "path": "store"
}
```

2. slack

This operation writes a string from the namespace to slack. In order to build a string [format](rules-operations.md#format) may be used.

Example:
```json
{
  "name": "slack",
  "target": {
    "token": "<slack-token>"
  },
  "channel": "monitoring",
  "message": "temp.message"
}
```

3. sumologic

This operation posts a JSON object built from objects in the namespace to sumologic

Example:
```json
{
"name": "sumologic",
  "target": {
     "url": "https://[SumoEndpoint]/receiver/v1/http/[UniqueHTTPCollectorCode]"
  },
  "items": {
    "function": "store.rookout.frame.function",
    "filename": "store.rookout.frame.filename",
    "line": "store.rookout.frame.line"
  }
}
```

#### Network Targets

These operations send data over the network.

1. web_hook

This operation posts a JSON object built from objects in the namespace to an HTTP(S) server.

Example:
```json
{
  "name": "web_hook",
  "target": {
    "url": "https://httpbin.org/post"
  },
  "items": {
    "value1": "store.frame",
    "value2": "rook.id"
  }
}
```

2. elastic

This operation posts a JSON object built from objects in the namespace to elasticsearch.

Example:
```json
{
  "name": "elastic",
  "target": {
    "hosts": [
      "elastic"
    ]
  },
  "index": "rookout",
  "type": "frame",
  "items": {
    "value1": "store.frame",
    "value2": "rook.id"
  }
}
```

3. sentry

This operation sends exception information a sentry server.

Example:
```json
{
  "name": "sentry",
  "target": {
    "url": "<full sentry url>"
  }
}
```

This operation relies on the fact exception information exists (that is, rule was run inside an except block) and that 
data is stored in the namespace according to the Rookout convention.
```json
{
  "name": "set",
  "paths": {
    "store.rookout.frame": "frame.dump()",
    "store.rookout.traceback": "stack.traceback()",
    "store.rookout.exception.type": "python.exception_type()",
    "store.rookout.exception.value": "python.exception()",
    "store.rookout.exception.string": "python.exception_string()"
  }
}
```

4. sumologic

This operation posts a JSON object built from objects in the namespace to sumologic

Example:
```json
{
"name": "sumologic",
  "target": {
     "url": "https://[SumoEndpoint]/receiver/v1/http/[UniqueHTTPCollectorCode]"
  },
  "items": {
    "function": "store.rookout.frame.function",
    "filename": "store.rookout.frame.filename",
    "line": "store.rookout.frame.line"
  }
}
```

#### Local File System Targets

These operations send data to the local file system.

1. text_file

This operation writes a string from the namespace to a local file. In order to build a string [format](rules-operations.md#format) may be used.

**Note:** this operation is only supported when using a local Agent.

Example:
```json
{
  "name": "text_file",
  "target": {
    "path": "log.txt",
    "buffering": 0
  },
  "message": "temp.message"
}
```

2. json_file

This operation writes a JSON formatted dump frame from the namespace to a local file.

**Note:** this operation is only supported when using a local Agent.

Example:
```json
{
  "name": "json_file",
  "target": {
    "path": "dump.json",
  },
  "items": {
    "item1": "store.variable1",
    "item2": "store.variable2"
  }
}
```

## Namespaces

### Container Namespace

### Object Namespace

### Frame Namespace

### Stack Namespace

### Utils Namespace

### Rook Namespace

### Agent Namespace

### Machine Namespace

 
