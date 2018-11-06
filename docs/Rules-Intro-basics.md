---
id: rules-intro-basics
title: Rule Basics
sidebar_label: Rule Basics
---

## Intro

Rules are “non-breaking breakpoints” that let the Rookout SDK deployed in your app know what data it needs to fetch, where to fetch it from, and what to do with it.  
Rules are initially set from an existing template, and may be modified by editing a JSON file.

## Rule structure

A Rule determines the following:
1. What to fetch - defined in the Set section.  
This usually defines fetching the entire local frame, or a specific subset of variables.
2. Where to fetch it from - defined in the Location value of the Aug section.  
3. What to do with it - defined in the Processing section.  
This usually defines data manipulation actions (such as data redaction), as well as destinations for the data to be sent to (the Rookout IDE, a local log file, a third party logging service, etc.).

## Setting Rules

Before setting a rule, you may want to make sure the following is in place:
1. You have imported the Rookout SDK into your code, and the application instance you wish to debug has been identified by the Rookout Service.
2. You have loaded your source code into the Rookout IDE.

After setting a Rule just as if you were adding a breakpoint in your own IDE, expect the Rule Status to become Active (Green).
Upon hitting the expected code line in your application, expect to see a debug message in the Rookout IDE Message Pane.
If you fail to see a debug message, or if the rule you set failed to become Active, check out the [Rule Troubleshooting Section](rules-intro-troubleshooting.md).

## Rule Templates

Rule templates let you define default behavior when adding a new rule.
Two commonly used templates are the **Log Rule** template, which prints a simple log line, and the **Frame Dump** template, which prints the entire local variable stack.
You may want to to create your own rule templates, defining the following:
1. A commonly used log line format
2. Custom destination integrations
3. Organization specific data redaction capabilities.

## What next?

To learn more about Rule capabilities, try the following pages:
- [Rule Capabilities](rules-intro-capabilities.md)
- [Rule Status](rules-intro-status.md)
- [Related Concepts](rules-intro-related.md)

To review the full Rule API check out the [Reference Section](rules-index.md).