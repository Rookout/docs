---
id: breakpoints-tasks
title: Breakpoint Tasks
---

## Data Redaction

The [filter operation](breakpoints-reference.md#filter) may be used to perform data redaction on the data fetched by a Breakpoint before sending it to its destination.  

The pattern support only regex strings.

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

### Whitelisting

Whitelisting is the opposite operation of the example above; all the data is redacted except the matched patterns.
Whitelisting support only variable names.

For example, The following snippet shows how to get local variables that match the filter:
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

```java
class Dog{
	String name;
	int age;

	public Dog(String dogName){
		this.name = dogName;
		this.age = 0;
	}
}

class Animal{
	Dog dog;
	int numberOfAnimals;

	public Animal(String animalName){
		this.dog = new Dog(animalName);
		this.numberOfAnimals = 0;
	}
}

```

The `dog` member of any animal instance will be return entirely, while the `numberOfAnimals` will be redacted.
Changing the `dog` pattern to `name` - will redact the `age` member of dog but not his name.

## Rate Limiting

Rookout set a threshold on the rate Breakpoints are invoked within a single application instance to ensure there's no perfomance degradation when accidentally setting breakpoints on hot code path.

If a Breakpoint is invoked twice within the limit (set by default to *100ms*) the Breakpoint will be disabled for that application instance and it's status will be set to `Error`.

To change this configuration for a specific Breakpoint, change the value of `minTimeBetweenHits` to the desired number in miliseconds:
```json
"minTimeBetweenHits" : 10
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
