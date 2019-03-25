---
id: breakpoints-reference
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
1. **filename** - the file name of the source file to place the breakpoint.
1. **lineno** - the line number in the source file to place the breakpoint.
1. **sha256** - the expected sha256 of the source file. If this attribute exists and is diffrenet from expected, 
the breakpoint will be rejected and an exception will be thrown.

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

*(Java/JVM only) Unsupported since Rook 0.1.65*

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

A selector script allows the user to define to which SDK instances (aka "Rooks") the breakpoint applies.

- **Available Paths:** Basic Path, Arithmetic Path
- **Available Operations:** set, format, return
- **Available Namespaces:**
    - "agent"- ETL Agent information
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
    - "store"- items extracted by the SDK instance (aka "Rook")
    - "message_info"- message meta data
    - "agent"- ETL Agent information
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

A more advanced path, available for most of the ETL Agent operations (check out [uses](rules-uses.md)).
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
Multiple operations can be used and will be executed in order.

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
  "format": "LOG: {agent.ip}: {store.rookout.frame.filename}@{store.rookout.frame.line}-{store.rookout.frame.function}"
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

**Note** - redaction is done by the Rookout ETL Agent, before being sent to the defined target.

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

This operation relies on the fact exception information exists (that is, the breakpoint was set in an exception block) and that 
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

**Note:** this operation is only supported when using a local ETL Agent.

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

**Note:** this operation is only supported when using a local ETL Agent.

Example:
```json
{
  "name": "json_file",
  "target": {
    "path": "dump.json"
  },
  "items": {
    "item1": "store.variable1",
    "item2": "store.variable2"
  }
}
```

## Namespaces

### Container Namespace

Container namespace is simply a dictionary of named values accessed as attributes.  
It's contents are defined by the context of the script execution.  
Container namespaces are the only namespaces writable by script **operations**.

### Object Namespace

The object namespace offer access to a native object within the application. 

#### Accessing Objects

The object namespace supports the following access patterns:

1. **Attribute Access** - to underlying object
1. **Key Access**
    1. As String  
    1. As Int
1. **Method Calls**
    1. Object Information
        1. *type* - get object type as string
        1. *size* - get object size/length 
    1. Control Object Dump
        1. *depth* - change dump depth
        1. *width* - change dump width
        1. *collection_dump* - change the max depth at which collections will be dumped
        1. *string* - change the max size of the string prefix that will be dumped

#### Understanding Object Access Limitations

Your code may generate quite resource heavy debug messages. For example, you may be debugging a snippet with a huge string, or a snippet with an infinite reference loop. To make sure performance isn’t impacted when debugging such snippets, we set some limits on how we fetch data.
You may have encountered these limitations when seeing a truncated variable in the message pane or in the downloaded JSON file.

To better explain how these limits are defined, let’s say we are debugging the following snippet, written in pseudo code:

```javascript
Class Person{
	Int age;
    String name;
	Person[] friendList;
}

//basic ctor
Person newPerson(int newAge, String newName, Person[] newFriendList){
	Person p = new Person();
    p.age = newAge;
    p.name = newName;
    p.friendList = newFriendList;
    Return p; // << Breakpoint is set here.
}
```
Let’s assume we set a Breakpoint at the last line of newPerson(), in which we return the value of p.

A) Fetching the entire frame dump

If we don’t know exactly what variable(s) we want to fetch, we can just fetch the entire frame dump at the location of the Breakpoint.
If this is the case, the set action may look something like this:

```json
{
    "name": "set",
    "paths": {
        "store.s": "frame.dump()"
    }
}
```

The dump will include the following:
1. The location from which we dumped (file and line number)
1. All local variables.

 In the example above, this means dumping the variables sent to the function (newAge, newName and newFriendList), as well as the newly created object p. Note that when sending the object p we are also sending its variables - an integer, a string, and a collection of objects (an array of additional Person objects).

Since each person in the array also has its own friend list, this means we may expand the data message size even further as we dive deeper into the stack.
And if friendship is a symmetric quality, then we may end up with an infinite loop.
Therefore, to control the amount of data for each variable type, the default size limitations below will apply:

1. When we return a **string** or a **buffer**, we limit its **size** to 512 bytes.
1. When we return an **object that contains other objects**, we denote each level of containment as **depth** and limit it to 3 by default (5 for Java).
1. When we return a **collection** we denote its size as **width** and limit it to 20 by default (50 for Java).
1. When we return a **collection of objects** that may contain other objects, we denote each level of containment as **collection depth** and limit it to 2 by default (3 for Java).

The default limits for each variable in a frame dump are summarized in the following table:

| Variable type                | Python | Node.js | Java |
| ---------------------------- | ------ | ------- | ---- |
| **String or Buffer size**    | 512B   | 512B    | 512B  |
| **Collection size**          | 20     | 20      | 20   |
| **Object depth**             | 3      | 3       | 5    |
| **Collection object depth**  | 2      | 2       | 2    |

If you have reached the object **depth** limit you should expect to see the following message in the message pane:  
`Max depth has been reached`

![Max Depth](/img/screenshots/max_depth.png)

If you have reached the object **collection depth** limit you should expect to see the following message in the message pane:  
`Max collection depth has been reached`

![Max Collection Depth](/img/screenshots/max_collection_depth.png)

B) Fetching a specific variable

If we want to fetch a specific variable, we can simply define it by adding it as the Breakpoint action.
The set action may look like something like this:

```json
{
    "name": "set",
    "paths": {
        "store.p": "frame.p"
    }
}
```

As in the general case, we need to set some limits on fetching a string/buffer, a container or an object to make sure we don’t impact performance in a negative way.
However, these limits can be more lenient, as we’re only dumping one variable and not the entire frame.

The default limits for dumping a specific variable are summarized in the following table

| Variable type                | Python | Node.js | Java |
| ---------------------------- | ------ | ------- | ---- |
| **String or Buffer size**    | 64K    | 64K     | 64K  |
| **Collection size**          | 20     | 20      | 50   |
| **Object depth**             | 5      | 3       | 5    |
| **Collection object depth**  | 2      | 2       | 3    |

C) Fetching a specific variable

If we fetch a specific variable of a known type, we can also manually overrule the limits mentioned above.
We can use **frame.p.type()** to get the type of p, and **frame.p.size()** to get its size.
```javascript
"store.p.type": "frame.p.type()"
"store.p.size": "frame.p.size()"
```

You may choose to increase those limits in some cases to fetch a truncated debug message; or decrease them if you suspect that fetching large debug messages impacts your application’s performance.
**WARNING: If you choose to increase limits, note that you may be impacting your own application’s performance.**

If we return a **string** or a **buffer** such as **frame.newName**, we can define the **size** limit by calling the **string()** function:
```javascript
"store.p.name": "frame.newName.string(1000000)"
```

If we return an **object** such as **frame.p**, we can define the **depth** limit by calling the **depth()** function:
```javascript
"store.p": "frame.p.depth(10)"
```

If we return a **collection** such as **frame.newFriendList**, we can define the **width** limit by calling the **width()** function:
```javascript
"store.p.friends": "frame.newFriendList.width(100)"
```

If we return a **collection of objects** such as **frame.newFriendList**, we can also define the **collection depth** by calling the **collection_dump()** function:
```javascript
"store.p.friends": "frame.newFriendList.collection_dump(10)"
```

### Frame Namespace

The frame namespace allows access to the current scope of execution.

It supports the following access patterns:

#### Attribute Access
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

#### filename
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

#### line
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

#### function
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

#### module
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

#### locals
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

#### dump
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

### Stack Namespace

The stack namespace allows traversal up to stack to process current context and get variables higher up the stack (Python only).

It supports the following access patterns:

#### Key Access
Using a numeric key access, a specific frame up the stack can be accessed (the returned object is a [Frame Namspace](/scripts/namespaces/frame)).

Example:
```json
{
  "name": "set",
  "paths": {
    "store.frame5_a": "stack[5].a"
  }
}
```

#### traceback
This method call extracts the full traceback to the given depth (by default 1000).

Example:
```json
{
  "name": "set",
  "paths": {
    "store.traceback": "stack.traceback(50)"
  }
}
``` 

#### frames
This method preforms a full frame dump to all frames in the stack up to the given depth (by default 100).

Example:
```json
{
  "name": "set",
  "paths": {
    "store.framse": "stack.frames(50)"
  }
}
```

### Utils Namespace

The utils namespace allows access to various globals in the application state.

It contains the following methods:

#### exception
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

#### exception_string
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

#### exception_type
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

#### module
Get a reference to *Python module*/*Java class* by name.

Example:
```json
{
  "name": "set",
  "paths": {
    "store.os": "utils.module(\"os\")"
  }
}
```

#### thread_id
Get current thread id.
Supported on Python and JVM only.

Example:
```json
{
  "name": "set",
  "paths": {
    "store.thread_id": "utils.thread_id()"
  }
}
```

#### thread_name
Get current thread name.
Supported on Python and JVM only.

Example:
```json
{
  "name": "set",
  "paths": {
    "store.thread_name": "utils.thread_name()"
  }
}
```

#### threads
Get a list of all running threads.
Supported on Python and JVM only.

Example:
```json
{
  "name": "set",
  "paths": {
    "store.threads": "utils.threads()"
  }
}
```

#### threads_tracebacks
Get a list of all running threads with their tracebacks.
Supported on Python and JVM only.

Example:
```json
{
  "name": "set",
  "paths": {
    "store.thread_tracebacks": "utils.thread_tracebacks()"
  }
}
```

#### env
Get the value of an environment variable

Example
```json
{
  "name": "set",
  "paths": {
    "store.path": "utils.env(\"PATH\")"
  }
}
```

### Rook Namespace

Rook namespaces represents the SDK instance (aka "Rook") being evaluated.

They have the following attributes:

| Name | Type | Description|
| ---- | ---- | ---------- |
|**id**|string|The rook's id|
|**executable**|string|The application being run|
|**command_arguments**|list|The full command line|
|**tags**|list|The rook's tags|
|**platform**|string|The platform running the application|
|**platform_type**|string|The sub-platform running the application|
|**platform_version**|string|The platform version|
|**os**|string|OS platform|
|**os_release**|string|OS major version|
|**os_version**|string|OS full version identifier|
|**os_string**|string|OS Full information|
|**ip**|string|The rook's ip as seen within the machine|
|**external_ip**|string|The rook's ip as seen from outside the machine|
|**user_commit**|string|The application's git commit identifier|
|**process_id**|int|The application process id|
|**version**|string|The rook's version number|
|**commit**|string|The rook's commit identifier|
|**hostname**|string|The rook's host's name|
|**labels**|string|The rook's labels|

### Agent Namespace

Agent namespaces represent the ETL Agent information.

They have the following attributes:

| Name | Type | Description|
| ---- | ---- | ---------- |
|**id**|string|The agent's id|
|**tags**|list|The agent's tags|
|**hostname**|string|The agent's host's name|
|**ip**|string|The agent's ip|
|**machine_type**|string|The machine CPU architecture|
|**platform**|string|The agent's platform|
|**version**|string|The agent's version|
|**commit**|string|The agent's commit identifier|
