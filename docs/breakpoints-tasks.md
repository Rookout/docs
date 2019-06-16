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

To change this configuration for a specific Breakpoint, change the value of `minTimeBetweenHits` to the desired number in miliseconds:
```json
"minTimeBetweenHits" : 10
```

## Maximum execution time limit

Rookout set a limit on the extraction time that the breakpoint causes to ensure there's no perfomance degradation when setting breakpoint on on hot code path.   

If a Breakpoint reaches to the time limit (set by default to 400ms) the Breakpoint will be disabled for that application instance and it's status will be set to Error.

To change this configuration for a specific Breakpoint, change the value of `maxAugTime` to the desired number in miliseconds:
```json
"maxAugTime" : 600
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
