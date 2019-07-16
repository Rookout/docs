---
id: projects-labels
title: Labels
sidebar_label: Labels
---

Let's assume that you have three environments in your organization - Dev, Staging, and Production. On each environment, you have four different services - service #1, #2, #3 and #4.

Labels are becoming useful when you want to collect data from a specific service, in a specific environment - you can easily choose what instances you want to work with and collect data from.
 

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

Rookout also provides built-in labels as described in the following table. 

You may find those labels in the Rookout App Instances page, or in the Project configuration pane.
 

| Filter by &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Example 
| ------------ | ----------------------- | 
| `hostname` | `$hostname:demo-deployment` |
| `ip` | `$ip:25.218.30.111`  | 
| `platform` | `$platform:python`, `$platform:java` `$platform:node`| 
| `processname` | `$processname:demo/app.py`| 
| `internal ip` | `$internalIp:10.14.1.101`| 
| `external ip` | `$externalIp:35.222.91.58`|





