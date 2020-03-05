---
id: breakpoints-tasks
title: Breakpoint Tasks
---

## Data Redaction

An admin can define data redaction rules to limit the information collected by Rookout Breakpoints.

In **Breakpoint Settings** -> **Data Redaction** the admin can define Regular Experession patterns to be blacklisted.

For example, adding a rule for the variable name “secretKey” will replace the output `“secretKey”:“12345”` with `“secretKey”:“[REDACTED]“`.
Adding a rule regarding the variable value “[0-9]+” will replace `“nameAndPassword”:“LordHelmet-12345”` with `“nameAndPassword”:“LordHelmet-****“`.

Replacing the data redaction method to “whitelist” will redact all variables, except the specified variable names and values that were whitelisted.
Please notice that the data redaction settings will apply only to breakpoints that were set following the configuration change.

<img src="/img/screenshots/data_redaction_example_1.png" />

## Rate limiting

Rookout measures the time it takes for each breakpoint to run, and disallows additional runs if the total time taken by breakpoints exceeds the quota for a certain time window. By default, breakpoints are alotted 500ms of runtime over the last five seconds (5000ms).

You can change either the quota or the window size by setting:

```json
"aug": {
  "rateLimit": "300/4000"
}
```

In this case, 300ms are allowed over the last four seconds. Time is always measured in milliseconds. Setting a value like `5000/5000` will disable effectively rate-limiting.

## Maximum execution time limit

Rookout sets a time limit on fetching data when a Breakpoint is hit to reduce the risk of performance degragation.

If a Breakpoint reaches the time limit for a specific app instance, the Breakpoint will be disabled for the instance and the Breakpoint status will become "Error".

Default value for this configuration is 400ms.

To change this configuration for a specific Breakpoint, change the value of `maxAugTime` to the desired number in milliseconds:
```json
"maxAugTime" : 600
```

## Auto-disable after global hit count limit

You can set a breakpoint to automatically disable after a global hit count is hit. By default, this feature is disabled.

This is a soft limit - once it is hit, the breakpoint will be disabled but it may take a short while for it to be received and handled by your app instances, so you may see more hits than your limit. 

To change this configuration for a specific Breakpoint, in the `aug` section, change the value of `globalHitLimit` to the desired maximum hit count:
```json
"globalHitLimit": 10
```

## Auto-disable after date passes

You can set a breakpoint to automatically disable after a certain date passes. By default, this feature is disabled.

This is a soft limit - once it is hit, the breakpoint will be disabled but it may take a short while for it to be received and handled by your app instances, so you may see more hits after the date passes. 

To change this configuration for a specific Breakpoint, in the `aug` section, change the value of `globalDisableAfterTime` to the desired date in UTC, in RFC 3339 format:
```json
"globalDisableAfterTime": "2019-08-18T08:42:58.770788Z"
```

## Including Packages

By default, Rookout doesn't set breakpoints inside the application's dependencies (`node_modules` for Node, `site-packages` for Python, inapplicable for JVM).

This setting may be changed at the repository level by following the instructions [here](source-repos.md#debugging-packages).  
Alternatively, you may change the value of `includeExternals` (under the `location` object) to `true` inside a specific breakpoint:
```json
"includeExternals" : true
```

## Maximum running time

As a matter of safety to your application, when a single breakpoint run takes more than a reasonable time to run, it is disabled permanently. When this happens, the breakpoint will need to be manually re-enabled using the IDE, perhaps also collecting less data to prevent the safety from re-triggering.

You can change the maximum amount of time allowed for a single run by setting:

```json
"aug": {
  "maxAugTime": "700"
}
```

Time is in milliseconds.

## What's next?

To review the full Breakpoint API check out the [Reference Section](breakpoints-reference.md).
