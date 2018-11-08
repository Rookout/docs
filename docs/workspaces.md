---
id: workspaces
title: Workspaces
sidebar_label: Workspaces
---

A Rookout Rule is defined in the context of a Workspace.  
A Workspace lets you define the source code to which the Rule is applied to, and offers filtering capabilities (using tags).  
A Workspace allows multiple users to debug the same environment, setting Rules and viewing debug messages online.  
Alternatively, a Workspace can be used to segment environments so each user can debug his own application instances.  

## Workspace creation

- When creating a Workspace, you may define one or more source repositories that may be debugged in the context of the Workspace.

- You may also define a set of tags which correspond to tags applied to specific application instances when loading the Rookout SDK.  
For example, by setting a Dev/Staging/Production tag when loading the SDK, you can create separate Workspaces for debugging the Dev, Staging or Production version of the same application.  
Another common use for tags and worksapces is to debug multiple instances of the same app, where each instance is deployed in another customer's environment, or in another cloud location.

## Adding Rules

When a Rule is added, the selected Workspace is automatically added to the underlying Rule definition.
The Rule and Debug Messages related to it will only be visible in the Rookout IDE to users who have selected the same workspace.

