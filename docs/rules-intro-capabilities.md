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

For Python and Node, Rookout uses relative file paths for searching files based on the repository’s root folder. (For Explorook, the root folder is the one you share).

If file layout for production is different, paths will not match.

As a simple test, you can go into the JSON and edit the filePath under location.

To handle this use-case, add a “.rookout” file at the root of your repository and map your paths:

TODO - add an explanation of the feature

### Include Externals

If you are installing your application in Python using pip install (to the site-packages directory) or your Node application using npm install (to the node_modules directory) you need to let Rookout know to the breakpoint in those files as well.

As a simple test, you can go into the JSON and add the includeExternals under location.

TODO - in the future we’ll add this feature to .rookout file

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

To change this configuration for a specific rule, add the following variable to the Aug section (time is in ms?)
```json
"minTimeBetweenHits":500
```

## What's next?

To learn more about Rule capabilities, try the following pages:
- [Rule Troubleshooting](rules-intro-troubleshooting.md)
- [Related Concepts](rules-intro-related.md)

To review the full Rule API check out the [Reference Section](rules-index.md).