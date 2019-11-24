---
id: projects-labels
title: Labels
sidebar_label: Labels
---

Labels are key/value pairs that are attached to running application instances.

Labels can be used to organize and select groups of application instances.
In this example organization, there are three environments - development, staging, and production with 4 different services in each environment.

<img src="/img/screenshots/tag_n1.png" />  

## Setting up your Rookout deployment

When installing the Rookout SDK, you may provide the service name and environment name as labels.  
For example, service #3 in Production may be configured using the following:

### With environment variables (recommanded)
```bash
export ROOKOUT_TOKEN='[Your Rookout Token]'
```
<div class="rookout-org-info"></div><br />
<!--DOCUSAURUS_CODE_TABS-->
<!--Python-->
```python
import os
rook.start(token=os.environ['ROOKOUT_TOKEN'],
           labels={"service":"service#3","env":"production"})
```
<!--Node-->
```javascript
rook.start({
    token: process.env.ROOKOUT_TOKEN, 
    labels:
        {
            "service":"service#3",
            "env":"production"
        }
    
});
```
<!--JVM-->
```bash
# Export your labels as an environment variable
export ROOKOUT_LABELS=service:service3,env:production
```
<!--END_DOCUSAURUS_CODE_TABS-->

### As an argument
<!--DOCUSAURUS_CODE_TABS-->
<!--Python-->
```python
import os
rook.start(token='[Your Rookout Token]',
           labels={"service":"service#3","env":"production"})
```
<!--Node-->
```javascript
rook.start({
    token: '[Your Rookout Token]', 
    labels:
        {
            "service":"service#3",
            "env":"production"
        }
    
});
```
<!--END_DOCUSAURUS_CODE_TABS-->

## Examples
### Debug all instances of specific service

When creating your Rookout Project, use the following filter to debug all instances of service #3 (in Production, Staging and Dev).

1. Add the following filter: `service:service#3` 

2. Import the source code for service #3.

<img src="/img/screenshots/tag_n2.png" />

### Debug all instances in specific environment

When creating your Rookout Project, use the following filter to debug only instances running in Production.

1. Add the following filter: `env:production` 

2. Import the source code of the relevant service.

<img src="/img/screenshots/tag_n3.png" />

### Debug specific instance in specific enviroment

To refine the filter, you may use the following filter to debug only the instance of service #3 running in Staging.

1. Add the following filters: `env:staging` `service:service#3`

2. Import the source code for service #3.

<img src="/img/screenshots/tag_n4.png" />

### Built in labels

Rookout also provides built-in labels as described in the following table. 

You may find those labels in the Rookout App Instances page, or in the Project configuration pane.
 

| Filter by &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Example 
| ------------ | ----------------------- | 
| `hostname` | `$hostname:demo-deployment` |
| `platform` | `$platform:python`, `$platform:java` `$platform:node`| 
| `processname` | `$processname:demo/app.py`| 
| `internal ip` | `$internalIp:10.14.1.101`| 
| `external ip` | `$externalIp:35.222.91.58`|





