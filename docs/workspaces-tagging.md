---
id: workspaces-tagging
title: Tagging
sidebar_label: Tagging
---

The following are common use cases for using Tags to define Workspace Filters:

### Dev / Test / Staging / Prod

The same source code is used to debug the application in your local development environment, in a remote Test or Staging environment, and in a Production environment.
Without applying filters to your Workspace, Rookout will fetch debug message from all instances of your application in these environments.
To filter and focus on a specific environment, try the following:
1. When installing the Rookout SDK into your code, provide the environment name as a tag to the Rookout SDK.  
For example, when using the Rookout SDK start() API, pass the following variable:
```python
rook.start(token=[Your Rookout Token], tags=["Staging"])
```
2. When creating your Rookout Workspace, use the following tag:
```python
tag:Staging
```

### Multiple Instances

The same source code is used multiple instances of the same application.  
For example, each instance is deployed with another customer site; or each instance is deployed in another geographical location.  
To filter and focus on a specific instance, try the following:
1. When installing the Rookout SDK into your code, provide the instance name as a tag to the Rookout SDK.  
For example, when using the Rookout SDK start() API, pass the following variable:
```python
rook.start(token=[Your Rookout Token], tags=["CustomerA","LocationB"])
```
2. When creating your Rookout Workspace, use the following tag:
```python
tag:CustomerA, tag:LocationB
```

### Multiple Configuration Versions

Multiple instances of your application are deployed, each with a unique configuration.  
To filter and focus on a specific configuration, try the following:
1. When installing the Rookout SDK into your code, provide the configuration name as a tag to the Rookout SDK.  
For example, when using the Rookout SDK start() API, pass the following variable:
```python
rook.start(token=[Your Rookout Token], tags=["ConfigurationA"])
```
2. When creating your Rookout Workspace, use the following tag:
```python
tag:ConfigurationA
```

