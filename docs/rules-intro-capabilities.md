---
id: rules-intro-capabilities
title: Rule Capabilities
sidebar_label: Rule Capabilities
---

## Repository configuration

Rookout Rules try to apply to your code as it is run in debug or production modes.
In some cases, the repository in debug or production has a different structure.
to make sure your code can succesfully be debugged, Rookout offers the following capabilities:

### Path Mapping

For Python and Node.js, Rookout uses relative file paths for searching files based on the repository’s root folder. (For Explorook, the root folder is the one you share).  
If file layout for production is different, paths will not match.  

For a single Rule, you may edit the filePath variable in the rule Location section.

To handle the genral case, add a “.rookout” file at the root of your repository and map your paths:  

  For each file or path where <source_prefix> is different from <target_prefix>, add a line to ".rookout" in the following format:  
  <source_prefix> <target_prefix>  
  *If your path has spaces, be sure to use parenthesis:  
  "<source_prefix>" "<target_prefix>" 


### Include Externals

If you are installing your application in Python using pip install (to the site-packages directory) or your Node application using npm install (to the node_modules directory) you need to let Rookout know to set the rule in those files as well.

For a single Rule, you may edit the includeExternals variable in the rule Location section.

To handle the genral case, add a “.rookout” file at the root of your repository and add a line to it with the following text:
```python 
#package
```

## Data Redaction

The [filter operation](rules-operations.md) may be used to perform data redaction on the data fetched by a Rule before sending it to its destination.  

For example, adding the following snippet to the Rule Operations section:
```json
{
  "name": "filter",
  "filters": [
    {
      "filter_type": "name",
      "pattern": "secretKey"
    },
    {
      "filter_type": "value",
      "pattern": "[0-9]+"
    }
  ]
}
```

Will replace an instance of "secretKey":"12345" with "secretKey":"[REDACTED]", and an instance of "nameAndPassword":"LordHelmet-12345" with "nameAndPassword":"LordHelmet-****".

## Rate Limiting

Rookout sets a default threshold on the rate of rule hits in order to prevent performance impact on the application being debugged.
By default, the threshold is set to 500ms, which means if the application code is hit more than once in 0.5s, the threshold will be invoked and the Rule will change its [Status to Error](rules-intro-troubleshooting.md).

To change this configuration for a specific rule, add the following variable to the Aug section (time is in ms)
```json
"minTimeBetweenHits":500
```

## What's next?

To review the full Rule API check out the [Reference Section](rules-index.md).
