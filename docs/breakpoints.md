---
id: breakpoints
title: Breakpoints Introduction
sidebar_label: Introduction
---

Rookout Breakpoints are “non-breaking breakpoints” that let the Rookout SDK deployed in your app know what data it needs to fetch, where to fetch it from, and what to do with it.  

## Setting Breakpoints

Before setting a breakpoint, you must install the [Rookout SDK](setup-intro.md) and [select your instances](debug-session-setup.md).

You set the breakpoints within the [Rookout IDE](https://app.rookout.com) by left-clicking on the gutter, just like your own IDE.  

## Breakpoint Status

Once you have set a breakpoint, it should have a status associated with it (`Active`, `Error`, `Pending` or `Disabled`. You can view more information about the status by right-clicking the breakpoint and selecting `Status`.
For more information, you can click on the Breakpoint status indicator or read more about it on [this page](breakpoints-status.md).  

## Data Collection

The next time the code you have set the breakpoint on is invoked, Rookout collects parts of the application state and sends it to the IDE or any other targets of your choosing.

You can read more about the [Breakpoint structure](breakpoints-structure.md) and how to perform [common changes](breakpoints-tasks.md) to it.

## Breakpoint Limits:

You can set limits on individual breakpoints to limit the amount of data to be collected. When limits are reached, the breakpoint should be disabled automatically. Once disabled, it should not collect additional data. You can re-enable the breakpoint by right-clicking on it and selecting Enable.

The limits can be set based on:
- Time (e.g., 1 Hour, 24 hours, a week)
- Hit count (the number of times the breakpoint gets triggered)

<iframe width="560" height="315" src="https://youtube.com/embed/nQGP8GUpWXY" frameborder="0" allow="autoplay; encrypted-media;" allowfullscreen></iframe>
