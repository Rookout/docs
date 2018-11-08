---
id: source-repos
title: Source Repositories
sidebar_label: Source Repositories
---

A Rookout Rule is set to debug your source code.
The source code must first be fetched from a remote repository (usually GitHub) or from the local filesystem (using the Explorook local file server).

## GitHub

## File system

Rookout provides a local file server that allows your browser (using the Rookout client) to load your source files into the Rookout IDE.
To download and install it, add a Source to your Workspace and choose the Local Filesyste option, and follow the instructions in the setup wizard.

## Repository manipulation

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