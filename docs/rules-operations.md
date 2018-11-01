---
id: rules-operations
title: Script Operations
---

This document specifies the list of supported script operations.

For more information on the namespaces check out [uses](rules-uses.md).

## Processing Operations

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

## Target Operations

These operations send data to a target destination.

### Service Targets

These operations send data to a target service.

#### send_rookout

This operation sends an object from the namespace to the Rookout Service.

Example:
```json
{
  "name": "send_rookout",
  "path": "store"
}
```

#### slack

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

#### sumologic

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

### Network Targets

These operations send data over the network.

#### web_hook

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

#### elastic

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

#### sentry

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

#### sumologic

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

### Local File System Targets

These operations send data to the local file system.

#### text_file

This operation writes a string from the namespace to a local file. In order to build a string [format](rules-operations.md#format) may be used.

**Note:** this operation is only supported when using a [local Agent](agent.md).

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

#### json_file

This operation writes a JSON formatted dump frame from the namespace to a local file.

**Note:** this operation is only supported when using a [local Agent](agent.md).

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
