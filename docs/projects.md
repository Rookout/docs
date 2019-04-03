---
id: projects
title: Projects
sidebar_label: Projects
---

A Rookout Project allows you to define the context for a debugging session or for a fixed debugging configuration.  
It defines the following:
1. The source code of the application to be debugged.
2. The application instance (or instances) being debugged, filtered using [Rookout Tags](projetcs-tagging.md).
3. A set of Breakpoints (in Rookout - Rule Points, or non-breaking breakpoints) identifying code areas you wish to debug.

## Project creation

When creating a Project, use the Projetc creation dialog to define the following:
1. Define a Project name.
2. Import one or more source code repositories from GitHub, BitBucket or from your local file system (using the provided Explorook file server).
3. An optional set of [filters](project-tagging.md), used to set the context of your debug configuration to specific instances of the application being debugged.

## Debugging

When you are debugging with Rookout, you are always within a certain project.  
This means that:

1. You will only set Breakpoints on the applications that fall inside your project.
1. You will only see data originating from the Breakpoints inside your project.
1. Others will only see your Breakpoints and data if they work inside the same project.
