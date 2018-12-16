---
id: breakpoints-tasks
title: Breakpoint Tasks
---

## Data Redaction

The [filter operation](breakpoints-reference.md#filter) may be used to perform data redaction on the data fetched by a Breakpoint before sending it to its destination.  

For example, adding the following snippet to the Breakpoint Operations section:
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

Rookout set a threshold on the rate Breakpoints are invoked within a single application instance to ensure there's no perfomance degradation when accidentally setting breakpoints on hot code path.

If a Breakpoint is invoked twice within the limit (set by default to *100ms*) the Breakpoint will be disabled for that application instance and it's status will be set to `Error`.

To change this configuration for a specific Breakpoint, change the value of `minTimeBetweenHits` to the desired number in miliseconds:
```json
"minTimeBetweenHits":10
```

## What's next?

To review the full Breakpoint API check out the [Reference Section](breakpoints-reference.md).
