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

## Workspace creation

When creating a Workspace, use the Workspace creation wizard to define the following:
1. Define a Workspace name.
2. Import one or more source code repositories from GitHub, BitBucket or from your local file system (using the provided Explorook file server).
3. An optional set of [filters](workspaces-tagging.md), used to set the context of your debug configuration to specific instances of the application being debugged.

## Debugging

When you are debugging with Rookout, you are always within a certain workspace.  
This means that:

1. You will only set Breakpoints on the applications that fall inside your workspace.
1. You will only see data originating from the Breakpoints inside your workspace.
1. Other will only see your Breakpoints and data if they work inside the same workspace.
