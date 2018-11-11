---
id: source-repos
title: Source Repositories
sidebar_label: Source Repositories
---

A Rookout Rule is set to debug your source code.  
The source code must first be fetched from GitHub, or from your local file system.  
Addingtional sources will be added in the future, be sure to reach out and let us know which ones youre missing: support@rookout.com .  

## GitHub

Rookout provides an integration with GitHub.  
To load your source files from GitHub add a Source to your Workspace and choose the GitHub option.  
Log in to GitHub and enter your repository owner name, then choose a repository from the repository list.
You may also choose a specific branch or commit.

## File system

Rookout provides a local file server that allows your browser (using the Rookout client) to load your source files into the Rookout IDE.
To download and install it add a Source to your Workspace and choose the Local Filesystem option, and follow the instructions in the setup wizard.

## Source Path Matching

If you are trying to debug a file that has one path in your development environment and another path in your debugging environment, try the following:

Say the file (or a subtree of your code) in your development environment is at <source_prefix_path>\file.name  
And the the same file (or a subset of your code) in your debugging environment is at <target_prefix_path>\file.name  

Add a file named ".rookout" at the root of your source code.  
For each file or path where <source_prefix> is different from <target_prefix>, add a line to ".rookout" in the following format:
<source_prefix> <target_prefix>  
*If your path has spaces, be sure to use parenthesis:  
"<source_prefix>" "<target_prefix>"

## Include Externals

If you are trying to debug a file that is part of an external library, try one of the following:

Add the includeExternals setting to the rule location section.
Add a file named ".rookout" at the root of your source code, and add a line to it with the following text: #package