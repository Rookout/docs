---
id: projects-labels
title: Labels
sidebar_label: Labels
---

The following are common use cases for using labels to define Project Filters.  
Let's assume these are some instances of your application:

<img src="/img/screenshots/tag_n1.png" />  

### Setting up your Rookout deployment

When installing the Rookout SDK, you may provide the service name and environment nam as labels.  
For example, Service #3 in Production may be configured using the following:

<!--DOCUSAURUS_CODE_TABS-->
<!--Python-->
```python
rook.start(token='[Your Rookout Token]',
           labels={"ServiceName":"Service#3","Enviroment":"Production"})
```
<!--Node-->
```javascript
rook.start({
    token: '[Your Rookout Token]', 
    labels:
        {
            "ServiceName":"Service#3",
            "Enviroment":"Production"
        }
    
});
```
<!--JVM-->
```bash
# Export your labels as an environment variable
export ROOKOUT_LABELS=ServiceName:ServiceA,Enviroment:Production

```
<!--END_DOCUSAURUS_CODE_TABS-->
<div class="rookout-org-info"></div>

## Examples
### Debug all instances of specific service

When creating your Rookout Project, use the following filter to debug all instances of Service #3 (in Production, Staging and Dev).

1. Add the following filter: `ServiceName:Service#3` 

2. Import the source code for Service #3.

<img src="/img/screenshots/tag_n2.png" />

### Debug all instances of specific service

When creating your Rookout Project, use the following filter to debug only instances running in Production.

1. Add the following filter: `Enviroment:Production` 

2. Import the source code of the relevant service.

<img src="/img/screenshots/tag_n3.png" />

### Debug specific instance in specific enviroment

To refine the filter, you may use the following filter to debug only the instance of Service #2 runing in Staging.

1. Add the following filters: `Enviroment:Staging` `ServiceName:Service#2`

2. Import the source code for Service #2.

<img src="/img/screenshots/tag_n4.png" />

### Built in labels

In addition to Labels, you may filter using system configuration identified by the Rookout SDK.  
You may find the values for your deployments in the Rookout App Instances page.

hostname -   the host name of an application instance.  
For example: `hostname:demo-deployment`  

ip - the ip address of an application instance.  
For example: `ip:25.218.30.111`  

platform - the platform used in an application instance.  
Supported platforms: `platform:python`, `platform:java`, `platform:node`  

processname - the process name (executable) of an application instance.  
For example: `processname:demo/app.py`  


