---
id: rules-namespaces-stack
title: Stack Namespace
---

The stack namespace allows traversal up to stack to process current context and get variables higher up the stack (Python only).

It supports the following access patterns:

### Key Access
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

### traceback
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

### frames
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
