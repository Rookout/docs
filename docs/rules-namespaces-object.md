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
    