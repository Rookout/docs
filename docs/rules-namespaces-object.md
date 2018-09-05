---
id: rules-namespaces-object
title: Object Namespace
---

The object namespace offer access to a native object within the application. 

## Accessing Objects

The object namespace supports the following access patterns:

1. **Attribute Access** - to underlying object
1. **Key Access**
    1. As String  
    1. As Int
1. **Method Calls**
    1. Object Information
        1. *type* - get object type as string
        1. *size* - get object size/length 
    1. Control Object Dump
        1. *depth* - change dump depth
        1. *width* - change dump width
        1. *collection_dump* - change the max depth at which collections will be dumped
        1. *string* - change the max size of the string prefix that will be dumped

## Understanding Object Access Limitations

Your code may generate quite resource heavy debug messages. For example, you may be debugging a snippet with a huge string, or a snippet with an infinite reference loop. To make sure performance isn’t impacted when debugging such snippets, we set some limits on how we fetch data.
You may have encountered these limitations when seeing a truncated variable in the message pane or in the downloaded JSON file.

To better explain how these limits are defined, let’s say we are debugging the following snippet, written in pseudo code:

```javascript
Class Person{
	Int age;
    String name;
	Person[] friendList;
}

//basic ctor
Person newPerson(int newAge, String newName, Person[] newFriendList){
	Person p = new Person();
    p.age = newAge;
    p.name = newName;
    p.friendList = newFriendList;
    Return p; // << Rule is set here.
}
```
Let’s assume we set a Rule at the last line of newPerson(), in which we return the value of p.

### A) Fetching the entire frame dump

If we don’t know exactly what variable(s) we want to fetch, we can just fetch the entire frame dump at the location of the rule point.
If this is the case, the set action may look something like this:

```json
{
    "name": "set",
    "paths": {
        "store.s": "frame.dump()"
    }
}
```

The dump will include the following:
1. The location from which we dumped (file and line number)
1. All local variables.

 In the example above, this means dumping the variables sent to the function (newAge, newName and newFriendList), as well as the newly created object p. Note that when sending the object p we are also sending its variables - an integer, a string, and a collection of objects (an array of additional Person objects).

Since each person in the array also has its own friend list, this means we may expand the data message size even further as we dive deeper into the stack.
And if friendship is a symmetric quality, then we may end up with an infinite loop.
Therefore, to control the amount of data for each variable type, the default size limitations below will apply:

1. When we return a **string** or a **buffer**, we limit its **size** to 512 bytes.
1. When we return an **object that contains other objects**, we denote each level of containment as **depth** and limit it to 3 by default (5 for Java).
1. When we return a **collection** we denote its size as **width** and limit it to 20 by default (50 for Java).
1. When we return a **collection of objects** that may contain other objects, we denote each level of containment as **collection depth** and limit it to 2 by default (3 for Java).

The default limits for each variable in a frame dump are summarized in the following table:

| Variable type                | Python | Node.JS | Java |
| ---------------------------- | ------ | ------- | ---- |
| **String or Buffer size**    | 512B   | 512B    | 512B  |
| **Collection size**          | 20     | 20      | 20   |
| **Object depth**             | 3      | 3       | 5    |
| **Collection object depth**  | 2      | 2       | 2    |

### B) Fetching a specific variable

If we want to fetch a specific variable, we can simply define it by adding it as the rule action.
The set action may look like something like this:

```json
{
    "name": "set",
    "paths": {
        "store.p": "frame.p"
    }
}
```

As in the general case, we need to set some limits on fetching a string/buffer, a container or an object to make sure we don’t impact performance in a negative way.
However, these limits can be more lenient, as we’re only dumping one variable and not the entire frame.

The default limits for dumping a specific variable are summarized in the following table

| Variable type                | Python | Node.JS | Java |
| ---------------------------- | ------ | ------- | ---- |
| **String or Buffer size**    | 64K    | 64K     | 64K  |
| **Collection size**          | 20     | 20      | 50   |
| **Object depth**             | 5      | 3       | 5    |
| **Collection object depth**  | 2      | 2       | 3    |

### C) Fetching a specific variable

If we fetch a specific variable of a known type, we can also manually overrule the limits mentioned above.
We can use **frame.p.type()** to get the type of p, and **frame.p.size()** to get its size.
```javascript
"store.p.type": "frame.p.type()"
"store.p.size": "frame.p.size()"
```

You may choose to increase those limits in some cases to fetch a truncated debug message; or decrease them if you suspect that fetching large debug messages impacts your application’s performance.
**WARNING: If you choose to increase limits, note that you may be impacting your own application’s performance.**

If we return a **string** or a **buffer** such as **frame.newName**, we can define the **size** limit by calling the **string()** function:
```javascript
"store.p.name": "frame.newName.string(1000000)"
```

If we return an **object** such as **frame.p**, we can define the **depth** limit by calling the **depth()** function:
```javascript
"store.p": "frame.p.depth(10)"
```

If we return a **collection** such as **frame.newFriendList**, we can define the **width** limit by calling the **width()** function:
```javascript
"store.p.friends": "frame.newFriendList.width(100)"
```

If we return a **collection of objects** such as **frame.newFriendList**, we can also define the **collection depth** by calling the **collection_dump()** function:
```javascript
"store.p.friends": "frame.newFriendList.collection_dump(10)"
```
