---
id: breakpoints
title: Breakpoints
---

Rookout Breakpoints are “non-breaking breakpoints” that let the Rookout SDK deployed in your app know what data it needs to fetch, where to fetch it from, and what to do with it.  

## Setting Breakpoints

Before setting a Breakpoint you must create a [project](projects.md) and install the [Rookout SDK](sdk-setup.md) in your application.

You set the Breakpoints within the [Rookout IDE](https://app.rookout.com) by left-clicking on the gutter, just like your own IDE.  

## Breakpoint Status
Once you have set the Breakpoint, it will appear on the right pane with it's status - `Pending`, `Active`, or `Error` and an optional `Warning`.  
For more information you can click on the Breakpoint status indicator in the IDE or read more about it on this [page](breakpoints-status.md).  

## Data Collection

The next time the code you have set the breakpoint on will be invoked, Rookout will collect parts of the application state and send it to Rookout or other data sinks of your choosing.  
You can read more about the [Breakpoint structure](breakpoints-structure.md) and how to preform [common changes](breakpoints-tasks.md) to it.
