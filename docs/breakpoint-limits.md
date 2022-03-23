---
id: breakpoint-limits
title: Breakpoint Limits
---

## Collection level

Collection level is set to minimize the performance impact of collecting variables in a frame that has complex objects, huge strings and infinite reference loops.
Setting Collection level will ensure that only variables at the top of the variable tree will be fetched.


To ensure that a specific variable is collected despite being deep in the variable tree, use the Collect Variable functionality.

Default limits for each variable:
| Variable type                | Python | Node.js | Java | DotNet |
| ---------------------------- | ------ | ------- | ---- | ------ |
| **String or Buffer size**    | 512B   | 512B    | 512B | 512B   |
| **Collection size**          | 20     | 10      | 20   | 20     |
| **Object level**             | 3      | 3       | 4    | 3      |
| **Collection level**         | 2      | 2       | 2    | 2      |


When you want to collect a variable that is out of the Collection limit, you can:
1. Right-click the variable and select "collect variable".
2. Go to breakpoint editor and add the variable in the Collection section.

When Collection level has reached the limit, you expect to see the following messages: 
`Collection level exceeded (right click to collect)`

## Rate limiting

Rookout measures the time it takes for each breakpoint to run, and disallows additional runs if the total time taken by breakpoints exceeds the quota for a certain time window. By default, breakpoints are alotted 150ms of runtime over the last twenty seconds (20000ms).

## Maximum execution time limit

Rookout sets a time limit on fetching data when a Breakpoint is hit to reduce the risk of performance degradation.

If a Breakpoint reaches the time limit for a specific app instance, the breakpoint will be disabled for the instance, and the Breakpoint status will change to "Error".

The default value for this configuration is 400ms.

## Auto-disable after global hit count limit

You can set a breakpoint to automatically disable after a global hit count is hit.

This is a soft limit - once it is hit, the breakpoint will be disabled but it may take a short while for it to be received and handled by your app instances, so you may see more hits than your limit. 

## Maximum running time

As a matter of safety to your application, when a single breakpoint run takes more than a reasonable time to run, it is disabled permanently. When this happens, the breakpoint will need to be manually re-enabled, perhaps also collecting less data to prevent the safety from re-triggering.
