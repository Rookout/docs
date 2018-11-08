---
id: source-mapping
title: Source Capabilities
sidebar_label: Source Capabilities
---

In a simple, "vanilla" deployment, the source files and line numbers in development can easily be traced by Rookout to the corresponding files and line numbers in debugging, staging or production environments.  
In some cases, additional steps are required to make sure Rookout can succesfully debug your code.

For example, as described in the [Rook Setup](rooks-setup.md) page, some frameworks require specific handling of the source files.  
Additional source tracing capabilities are described below.

## Source Commit Detection

As described in the [Rook Setup](rooks-setup.md) page, the Rookout SDK supports detecting the existing source code commit in the following cases:

<div class="tab-container">
<input id="tab1" data-tab="tab1" type="radio" name="tabs" class="tab-button" checked="true" />
<label for="tab1" class="tab-title snippet">Python</label>
<input id="tab2" data-tab="tab2" type="radio" name="tabs" class="tab-button" />
<label for="tab2" class="tab-title snippet">Node.JS</label>
<input id="tab3" data-tab="tab3" type="radio" name="tabs" class="tab-button" />
<label for="tab3" class="tab-title snippet">JVM</label>
<div data-tab-content="content1" class="tab-content">

    1. If the environment variable “ROOKOUT_COMMIT” exists, use it.
    2. If the environment variable “ROOKOUT_GIT” exists, search for the configuration of the “.git” folder and use its head.
    3. If the main application is running from within a Git repository, use its head.

</div>
<div data-tab-content="content2" class="tab-content">

    Source commit detection functionality is currently not supported for Node.js.

</div>
<div data-tab-content="content3" class="tab-content">

    1. If the environment variable “ROOKOUT_COMMIT” exists, use it.
    2. If the Java main application is jar/war/ear and it’s manifest includes the value “ROOKOUT_MANIFEST_COMMIT”, use it.

</div>
</div>

## Source Mapping

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