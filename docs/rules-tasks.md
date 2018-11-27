---
id: rules-tasks
title: Rule Tasks
---

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
