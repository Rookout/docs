---
id: rules-uses
title: Script Uses
---

Rookout *scripts* are used in various ways to allow the user maximum control over the system.

Below are list the various uses cases for scripting in Rookout.

## Selector

a selector script allows the user to define for which Rooks the rule applies.

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

an action script allows the user to define what data to collect from a running app.
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

a processing script allows the user to transfom the data and load it into various services

- **Available Paths:** Basic Path, Arithmetic Path
- **Available Operations:** set, format, return, all [Target Operations](/scripts/operations#Target%20Operations)
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
