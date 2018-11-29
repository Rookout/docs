---
id: workspaces-tagging
title: Tagging
sidebar_label: Tagging
---

## Introduction

Rookout Workspaces allow you to debug specific application instances, or a subset of instances matching a defined filter.
The following tags may be passed as parameters when loading the Rookout SDK into your code:

`hostname` -   the host name of a specific application instance.  
`ip` - the ip address of a specific application instance.  
`platform` - the operating system and version on which one or more application instances are deployed.  
`processname` - the process name of one ore more application instances.  
`tag` - a logical name for an application, an environment, a deployment, or anything that would help you identify a subest of instances (see examples below).  

## Commonly used examples

The following are common use cases for using Tags to define Workspace Filters.  
Let's assume these are some instances of your application:

<img src="/img/screenshots/tagging_1.png" />  

### Setting up your Rookout deployment

When installing the Rookout SDK, you may provide the service name, environment name and customer as tags.  
For example, the Customer 1 instance of Service A in Production may be configured using the following:
```python
rook.start(token=[Your Rookout Token], tags=["Customer1","ServiceA","Production"])
```
<div class="rookout-org-info"></div>

### Debug all instances of Service A

You may use tag:ServiceA to debug all instances of Service A (both Production and Staging).

1. When creating your Rookout Workspace, add the following filter: `tag:ServiceA`

2. When creating your Rookout Workspace, import the source code for Service A.

<img src="/img/screenshots/tagging_2.png" />

### Debug all Production instances

You may use tag:Production to debug all production instances (both Service A and Service B).

1. When creating your Rookout Workspace, add the following filter: `tag:Production`

2. When creating your Rookout Workspace, import the source code for both Service A and Service B.

<img src="/img/screenshots/tagging_4.png" />

### Debug only Production instances of Service A

To refine the filter, you may use both tag:ServiceA and tag:Production to debug only customer instances of Service A.

1. When creating your Rookout Workspace, add the following filters: `tag:ServiceA,tag:Production`

2. When creating your Rookout Workspace, import the source code for Service A.

<img src="/img/screenshots/tagging_3.png" />

### Debug all instances deployed for Customer 1

You may use tag:Customer1 to debug all Customer 1 instances (both Service A and Service B).

1. When creating your Rookout Workspace, add the following filter: `tag:Customer1`

2. When creating your Rookout Workspace, import the source code for both Service A and Service B.

<img src="/img/screenshots/tagging_5.png" />

### Debug a specific instance

To further refine the filter, you may use hostname:[instance host name], ip:[instance ip], processname:[instance process name] or platform:[instance platform].

When creating your Rookout Workspace, use one or more of the following filters:

`hostname:[instance host name], ip:[instance ip], processname:[instance process name], platform:[instance platform].`


<img src="/img/screenshots/tagging_6.png" />