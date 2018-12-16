---
id: projects-tagging
title: Tagging
sidebar_label: Tagging
---

The following are common use cases for using Tags to define Project Filters.  
Let's assume these are some instances of your application:

<img src="/img/screenshots/tagging_1.png" />  

### Setting up your Rookout deployment

When installing the Rookout SDK, you may provide the service name, environment name and customer as tags.  
For example, the Customer 1 instance of Service A in Production may be configured using the following:
```python
rook.start(token='[Your Rookout Token]',
           tags=["Customer1","ServiceA","Production"])
```
<div class="rookout-org-info"></div>

### Debug all instances of Service A

When creating your Rookout Project, use tag:ServiceA to debug all instances of Service A (both Production and Staging).

1. Add the following filter: `tag:ServiceA`

2. Import the source code for Service A.

<img src="/img/screenshots/tagging_2.png" />

### Debug all Production instances

When creating your Rookout Project, use tag:Production to debug all production instances (both Service A and Service B).

1. Add the following filter: `tag:Production`

2. Import the source code for both Service A and Service B.

<img src="/img/screenshots/tagging_4.png" />

### Debug only Production instances of Service A

To refine the filter, you may use tag:ProductionServiceA to debug only customer instances of Service A.

1. Add the following filters: `tag:ProductionServiceA`

2. Import the source code for Service A.

<img src="/img/screenshots/tagging_3.png" />

### Debug all instances deployed for Customer 1

Use tag:Customer1 to debug all Customer 1 instances (both Service A and Service B).

1. Add the following filter: `tag:Customer1`

2. Import the source code for both Service A and Service B.

<img src="/img/screenshots/tagging_5.png" />

### Debug a specific instance

In addition to Tags, you may filter using system configuration identified by the Rookout SDK.  
You may find the values for your deployments in the Rookout App Instances page.

hostname -   the host name of an application instance.  
For example: `hostname:demo-deployment`  

ip - the ip address of an application instance.  
For example: `ip:25.218.30.111`  

platform - the platform used in an application instance.  
Supported platforms: `platform:python`, `platform:java`, `platform:node`  

processname - the process name (executable) of an application instance.  
For example: `processname:demo/app.py`  