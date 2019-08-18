---
id: breakpoints-tasks
title: Breakpoint Tasks
---

## Data Redaction

The [filter operation](breakpoints-reference.md#filter) may be used to perform data redaction on the data fetched by a Breakpoint before sending it to its destination.  

The pattern support only regex strings.

For example, adding the following snippet to the Breakpoint *Processing Operations* section (before the `send_rookout` operation):
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
},
{
	"path": "store",
	"name": "send_rookout"
}
```

Will replace an instance of "secretKey":"12345" with "secretKey":"[REDACTED]", and an instance of "nameAndPassword":"LordHelmet-12345" with "nameAndPassword":"LordHelmet-****".

### Whitelisting

Specify which variable you want to extract using a regular expression that will be applied on the variable name only.

```java
class Dog {
	String name;
	int age;

	public Dog(String dogName) {
		this.name = dogName;
		this.age = 0;
	}
}

class Zoo {
	Dog dog;
	Cat cat;
	int numberOfAnimals;

	public Zoo() {
		this.dog = new Dog("Shtubi");
		this.numberOfAnimals = 1;
	}
}
```

For example, to collect only the dog member, add the following snippet to the Breakpoint Operations section:
```json
{
  "name": "filter",
  "whitelist": true,
  "filters": [
    {
      "filter_type": "name", 
      "pattern": "dog"
    }
  ]
}
```

The `dog` member will be returned entirely, while the other members will be redacted.

![Whitelist basic](/img/screenshots/filter_whitelist_1.png)

## Rate Limiting

Rookout set a threshold on the rate Breakpoints are invoked within a single application instance to ensure there's no perfomance degradation when accidentally setting breakpoints on hot code path.

If a Breakpoint is invoked twice within the limit (set by default to *100ms*) the Breakpoint will be disabled for that application instance and it's status will be set to `Error`.

To change this configuration for a specific Breakpoint, change the value of `minTimeBetweenHits` to the desired number in milliseconds:
```json
"minTimeBetweenHits" : 10
```

## Maximum execution time limit

Rookout sets a time limit on fetching data when a Breakpoint is hit to reduce the risk of performance degragation.

If a Breakpoint reaches the time limit for a specific app instance, the Breakpoint will be disabled for the instance and the Breakpoint status will become "Error".

Default value for this configuration is 400ms.

To change this configuration for a specific Breakpoint, change the value of `maxAugTime` to the desired number in milliseconds:
```json
"maxAugTime" : 600
```

## Auto-disable after global hit count limit

You can set a breakpoint to automatically disable after a global hit count is hit.

This is a soft limit - once it is hit, the breakpoint will be disabled but it may take a short while for it to be received and handled by your app instances, so you may see more hits than your limit. 

To change this configuration for a specific Breakpoint, change the value of `globalHitLimit` to the desired maximum hit count:
```json
"globalHitLimit": 10
```

## Auto-disable after date passes

You can set a breakpoint to automatically disable after a certain date passes. 

This is a soft limit - once it is hit, the breakpoint will be disabled but it may take a short while for it to be received and handled by your app instances, so you may see more hits after the date passes. 

To change this configuration for a specific Breakpoint, change the value of `globalDisableAfterTime` to the desired date in UTC, in RFC 3339 format:
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

## What's next?

To review the full Breakpoint API check out the [Reference Section](breakpoints-reference.md).
