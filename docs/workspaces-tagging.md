---
id: workspaces-tagging
title: Tagging
sidebar_label: Tagging
---

The following are common use cases for using Tags to define Workspace Filters.  
Let's assume these are some instances of your application:

<img src="/img/screenshots/tagging_1.png" />  

When installing the Rookout SDK, you may provide the service name, environment name and customer as tags.  
For example, the Customer 1 instance of Service A in Production may be configured using the following:
```python
rook.start(token=[Your Rookout Token], tags=["Customer1","ServiceA","Production"])
```

### Debug all instances of Service A

You may use tag:ServiceA to debug all instances of Service A (both production and staging).

1. When creating your Rookout Workspace, use the following tag:
```python
tag:ServiceA
```

2. When creating your Rookout Workspace, import the source code for Service A.

<img src="/img/screenshots/tagging_2.png" />

### Debug all Production instances

You may use tag:Production to debug all production instances (both Service A and Service B).

1. When creating your Rookout Workspace, use the following tags:
```python
tag:Production
```

2. When creating your Rookout Workspace, import the source code for both Service A and Service B.

<img src="/img/screenshots/tagging_4.png" />

### Debug only Production instances of Service A

To refine the filter, you may use both tag:ServiceA and tag:Production to debug only customer instances of Service A.

1. When creating your Rookout Workspace, use the following tags:
```python
tag:ServiceA,tag:Production
```

2. When creating your Rookout Workspace, import the source code for Service A.

<img src="/img/screenshots/tagging_3.png" />

### Debug all instances deployed for Customer 1

You may use tag:Customer1 to debug all Customer 1 instances (both Service A and Service B).

1. When creating your Rookout Workspace, use the following tags:
```python
tag:Customer1
```

2. When creating your Rookout Workspace, import the source code for both Service A and Service B.

<img src="/img/screenshots/tagging_5.png" />

### Debug a specific instance

To further refine the filter, you may use ip:[instance ip], processName:[instance process name] or host:[instance host name].

When creating your Rookout Workspace, use one or more of the following filters:
```python
ip:[instance ip],processName:[instance process name],host:[instance host name]
```

<img src="/img/screenshots/tagging_6.png" />