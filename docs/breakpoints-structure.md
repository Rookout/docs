---
id: breakpoints-structure
title: Breakpoint Structure
---

Breakpoint are “non-breaking breakpoints” that let the Rookout SDK deployed in your app know what data it needs to fetch, where to fetch it from, and what to do with it.  

The Rookout IDE offers an ever expanding set of features to customize the Breakpoints' behaviours to meet your needs.  
In this section, we'll beyond the UI into the Breakpoint object itself to better understand what can be achieved by customizing it by code.

## Breakpoint Function

Each Breakpoint object determines the following:
- Breakpoint location (file name and line)
- The type of data to be fetched when the breakpoint is reached (e.g. stack frame, log line)
- The formatting to be applied to the fetched data
- The target to which the fetched data will be sent (e.g. the Rookout IDE, Slack, DataDog and others)

## Breakpoint Deep Dive

Breakpoints are self-contained JSON objects that include all the information Rookout needs to Extract, Transform and Load the data.  
Here's quick overview of the structure:

```js
{
  "id": "5ef428c70daf4bbf91d4f0c18c311ffb", // Sets the breakpoint id
  "template_id": "DUMP_FRAME",
  "appearance": { // Sets the breakpoint's apperance in the IDE
    "color": "#6CE3C9",
    "icon": "fa fa-upload  fa-flip-vertical",
    "title": "Dump Frame" // Sets the breakpoint name in the IDE
  },
  "selector": { // Defines on which application instances to apply the breakpoint - derived from the Project
    "operations": [
      {
        "name": "return",
        "path": {
          "name": "calc",
          "path": "((\"django\" in rook.tags))" // This is the actual boolean expression
        }
      }
    ]
  },
  "workspace": "6f341506a6cb45bc872e4374c5d21011", // Sets the project 
  "aug": { // Defines how to collect data from the application
    "id": "5ef428c70daf4bbf91d4f0c18c311ffb",
    "location": { // Defines where to set the Rookout breakpoint
      "name": "file_line", // Define a local breakpoint, targeting a specific code line
      "filename": "machina/apps/forum/views.py", // Source file to set the breakpoint at
      "sourcePath": "machina/apps/forum/views.py",
      "sourceRepo": "github-ellmetha-django-machina",
      "lineno": 29, // Line number to set the breakpoint at
      "sha256": "695157c8bfac07c71337b0e66cda37647cc5cbe75a73c3c4869988cf9d6af269", // Sha256 of the source file with line endings normalized
      "includeExternals": false // Wether or not to place the breakpoints on the application dependencies (Python/Node)
    },
    "action": { // Defines how to collect data once the breakpoint is triggered
      "name": "script",
      "operations": [
        {
          "name": "set",
          "paths": { // Defines what objects to collect
            "store.rookout.frame": "frame.dump()", // Dump all the local frame
            "store.rookout.traceback": "stack.traceback()" // Get the stack trace
          }
        }
      ]
    }
  },
  "processing": { // Defines the ETL process collected data will go through
    "operations": [
      {
        "name": "send_rookout", // Simply sends the data to Rookout
        "path": "store"
      }
    ]
  }
}
```

## Script Language

Rookout uses a simple scripting language to allow complicated actions to be defined at certain integration points.

The scripting language is made of three main constructs:
- Namespaces - objects encapsulating the script state. They can be thought of as trees of variables.
- Paths - objects pointing to specific objects within the namespace.
- Operations - the tasks the script is executing. Those tasks use paths to refer to the script state.

Take a look at the following "Hello World" example script:

```json
{
    "operations": [
      {
        "name": "format",
        "path": "temp.message",
        "format": "Hello World"
      },
      {
        "name": "send_rookout",
        "path": "temp.message"
      }
    ]
}
```

This script is simply a sequence of two operations:
1. The format operation used to construct the "Hello World" string and store it in the "temp" namespace.
1. The send_rookout operation used to read the message from the namespace and send it to the Rookout service.

## What's next?

- Check out [common tasks](breakpoints-tasks.md) with Breakpoints.
- Check out [examples](breakpoints-integrations.md) for custom ETL pipelines.
- Check out the detailed the [Breakpoint Scripting Reference](breakpoints-reference.md).
