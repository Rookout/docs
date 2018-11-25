---
id: workspaces
title: Workspaces
sidebar_label: Workspaces
---

A Rookout Workspace allows you to define the context for a debugging session or for a fixed debugging configuration.
You may think of Workspaces as an IDE Project or Workspace, as it defines the following:
1. The source code of the application to be debugged.
2. The application instance (or instances) being debugged, filtered using [Rookout Tags](workspaces-tagging.md).
3. A set of Breakpoints (in Rookout - Rule Points, or non-breaking breakpoints) identifying code areas you wish to debug.

In addition, Rookout provides additional capabilities in the context of a Workspace:
- Multiple users may open the same Workspace, allowing multiple users to effectively debug the same application instance(s).
- Debug messages fetched by instances of the Rookout SDK are presented in real time, allowing a friendly debugging experience.

## Workspace creation

When creating a Workspace, use the Workspace creation wizard to define the following:
1. Define a Workspace name.
2. Import one or more source code repositories from GitHub, BitBucket or from your local file system (using the provided Explorook file server).
3. An optional set of [filters](workspaces-tagging.md), used to set the context of your debug configuration to specific instances of the application being debugged.

You may define one or more source repositories that may be debugged in the context of the Workspace.

## Adding Rules

When a Rule is added, the selected Workspace is automatically added to the underlying Rule definition.
The Rule and Debug Messages related to it will only be visible in the Rookout IDE to users who have selected the same workspace.