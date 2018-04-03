---
id: rules-namespaces-rook
title: Rook Namespace
---

Rook namespaces represent the Rook being evaluated.

They have the following attributes:

| Name | Type | Description|
| ---- | ---- | ---------- |
|**id**|string|The rook's id|
|**version**|string|The rook's version number|
|**commit**|string|The rook's commit identifier|
|**platform**|string|The platform running the application|
|**platform_type**|string|The sub-platform running the application|
|**platform_version**|string|The platform version|
|**executable**|string|The application being run|
|**command_arguments**|list|The full command line|
|**tags**|list|The rook's tags|
|**user_commit**|string|The application's git commit identifier|
|**pid**|int|The application process id|
