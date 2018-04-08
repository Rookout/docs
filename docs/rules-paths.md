---
id: rules-paths
title: Paths
---

Rookout *paths* are objects pointing to an element inside the *namespaces* (the script's state).

Rookout supports multiple *path* types for various use cases. 
When even an *operation* expects a path, it can be specified in multiple ways:

##### Implicit Path

Implicit path is simply a string, and the default path type for that script will be used.

The default path types for all scripts is the *Basic Path* for now

Example:
```json
"value": "frame.a"
``` 

##### Explicit Path

Explicit path is a dictionary with the name of the path under "name" and all the relevant arguments within the dictionary.

Availability of different path types depends on the script [uses](rules-uses.md).

Example:
```json
"value": {
  "name": "basic",
  "path": "frame.a"
}
``` 

### Basic Path

The most commonly used path is the basic path.

This path supports the following access methods:
1. Attribute access - by specifing a value:
    ```json
    "frame"
    ```
2. Key access - by specifying value inside brackets. 

    Supports numer values:
    ```json
    "[1]"
    ```
    And String values
    ```json
    "[\"name\"]"
    ```
    
3. Function calls - by specifying function name followed by parenthesis and optional arguments:
    ```json
    "method(argument)"
    ```
    
Access methods can be chained, for example:
```json
"frame.value"
"frame.dump(10)"
"stack[10].value"
```

### Arithmethic Path

a more advanced path, available for most of the agent operations (check out [uses](rules-uses.md)).
To select this path type, specify "calc" as the path name.

This path represents an arithmetic exception involving namespace access, constants and arithmetic operators.

1. Namespace access - is based on the primitives shown in Basic Path. Function calls are not supported.
    ```json
    {
     "name": "calc",
     "path": "frame.value"
    }
    ```
    
2. Constants - the following data types are supported:

    2.1. Boolean
    
    ```json
    True
    False
    ```

    2.2. Integer
    
    ```json
    1
    -15
    +200
    ```
    
    2.3. Real
    
    ```json
    10.2
    -12.5
    5e2
    -10.2E4
    ```
    
    2.4 String
    
    ```json
    "value"
    ```
    
    2.5. Lists of primitives:
    ```json
    "[ 1, 2,\"3\", 4, 2.6,   \"3\"]"
    ```
    
3. Arithmetic operators - the following arithematic operators are supported:

    Plus, Minus, Multiplication, Division, Unary Plus, Unary Minus, or, and, equality operators (< <= > >= != = <> ), in (contains).
    
    Operator precedence is as expected.

In the future, an improved version of this path is expected to be default paths in many uses.
