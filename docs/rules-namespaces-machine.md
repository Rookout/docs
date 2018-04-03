---
id: rules-namespaces-machine
title: Machine Namespace
---


Machine namespaces represent the current machine.

**NOTE**: this currently means the machine the agent is running on. 
In a docker deployment it will provide information from within the agent's docker.

They have the following attributes:

| Name | Type | Description|
| ---- | ---- | ---------- |
|**id**|string|The machine's id|
|**hostname**|string|The machine's hostname|
|**ip**|string|The machine's main IP address|
|**machine_type**|string|The machine CPU architecture|
|**network**|string|The network this machine resides on|
|**os**|string|OS platform|
|**os_release**|string|OS major version|
|**os_version**|string|OS full version identifier|
|**os_string**|string|OS Full information|
