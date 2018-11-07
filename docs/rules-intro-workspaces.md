---
id: rules-intro-workspaces
title: Workspaces and Sources
sidebar_label: Workspaces and Sources
---

## Workspaces

A Rookout Rule is defined in the context of a Workspace.  
A Workspace lets you define the source code to which the Rule is applied to, and offers filtering capabilities (using tags).  
A Workspace allows multiple users to debug the same environment, setting Rules and viewing debug messages online.  
Alternatively, a Workspace can be used to segment environments so each user can debug his own application instances.  

### Workspace creation

- When creating a Workspace, you may define one or more source repositories that may be debugged in the context of the Workspace.

- You may also define a set of tags which correspond to tags applied to specific application instances when loading the Rookout SDK.  
For example, by setting a Dev/Staging/Production tag when loading the SDK, you can create separate Workspaces for debugging the Dev, Staging or Production version of the same application.  
Another common use for tags and worksapces is to debug multiple instances of the same app, where each instance is deployed in another customer's environment, or in another cloud location.

### Adding Rules

When a Rule is added, the selected Workspace is automatically added to the underlying Rule definition.
The Rule and Debug Messages related to it will only be visible in the Rookout IDE to users who have selected the same workspace.

## Source Repositories

In a simple, "vanilla" deployment, the source files and line numbers in development can easily be traced by Rookout to the corresponding files and line numbers in debugging, staging or production environments.  
In some cases, additional steps are required to make sure Rookout can succesfully debug your code.

For example, as described in the [Rook Setup](rooks-setup.md) page, some frameworks require specific handling of the source files.  

### Source Mapping

If you are trying to debug a file that has one path in your development environment and another path in your debugging environment, try the following:

Say the file (or a subtree of your code) in your development environment is at <source_prefix_path>\file.name  
And the the same file (or a subset of your code) in your debugging environment is at <target_prefix_path>\file.name  

Add a file named ".rookout" at the root of your source code.  
For each file or path where <source_prefix> is different from <target_prefix>, add a line to ".rookout" in the following format:
<source_prefix> <target_prefix>  
*If your path has spaces, be sure to use parenthesis:  
"<source_prefix>" "<target_prefix>"

### Include Externals

If you are trying to debug a file that is part of an external library, try one of the following:

Add the includeExternals setting to the rule location section.
Add a file named ".rookout" at the root of your source code, and add a line to it with the following text: #package