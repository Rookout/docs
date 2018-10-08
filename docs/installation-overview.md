---
id: installation
title: Getting Started
---

For an overview of what Rookout does, visit our [Reference Section](reference-home.md).

## Setting up Rookout

Getting started with Rookout to debug your own code requires only three steps:

1. [Adding a Rook](#adding-a-rook) (an SDK dependancy) to your application code
2. [Configuring environment variables](#configuring-environment-variables)
2. [Loading your source code](#loading-your-source-code) into the Rookout app

### Adding a Rook

Rooks are SDK dependancies that let Rookout add and remove log lines in real time.

<details>
<summary>_Adding a Python Rook_</summary>
    
    Install the Rookout pypi package :  
    $ pip install rook

    Import the package in your app's entry-point file :  
    from rook import auto_start
</details>

<details>
<summary>_Adding a Node.js Rook_</summary>
    
    Install the npm package:
    $ npm install --save rookout

    Require the package in your app's entry-point file:
    const rook = require('rookout/auto_start');
</details>

<details>
<summary>_Adding a Java Rook_</summary>
    
    Download our java agent :  
    $ curl -L "https://repository.sonatype.org/service/local/artifact/maven/redirect?r=central-proxy&g=com.rookout&a=rook&v=LATEST" -o rook.jar

    Set your JVM to use the rook as a java agent :  
    $ export JAVA_OPTIONS="$JAVA_OPTIONS -javaagent:{DOWNLOAD_DIR}/rook.jar"
</details>

For more details, visit our language specific Rook Setup pages: [Node.js](installation-node.md), [Python](installation-python.md), [Java](installation-java.md).

To deploy a Rook on a specific platform or framework, check out our [Installation Examples](https://github.com/Rookout/deployment-examples) page.

### Configuring environment variables

Once the Rook is in place, apply the following environment variables to its host:

`ROOKOUT_TOKEN` - *Your unique identifier, pointing your Rooks to your own account at the Rookout Service.*  
`ROOKOUT_AGENT_HOST` - *Point the Rook at the Rookout service by setting this value to cloud.agent.rookout.com*  
`ROOKOUT_AGENT_PORT` - *Point the Rook to the right port by setting this value to 443.*

You may also use this opportunity to give the Rook one or more Tags, which will help you identify the Rook later on:

`ROOKOUT_ROOK_TAGS` - *A list of comma separated values. Common examples: Production,AppName,BackEnd*  

For additional configuration options visit our [Rook configuration reference](rooks-config.md)

### Loading your source code

Create a Workspace, and give it a meaningful name.
Add a new Source to the Workspace, and choose your Git Repository.
Choose a branch, and a commit if necessary.
Switch to the created Workspace to view your source code.

If you do not use GitHub, choose Local Filesystem and follow the instructions in the following dialog.

## What's next?

Now that you've got Rookout set up, you can add rules and trigger your code to get some real time data.
To take your next steps with Rookout, explore the following links:

**I want Rules to fetch specific data, and to write it in my favorite format. How do I do that?**  
Rookout provides a robust scripting capability which allows defining advanced Rule behavior.
For more information about Scripting check out [Script Uses](rules-uses.md).

**I want to be more efficient, what can I add to Rookout?**  
We have prepared integrations with several well-known tools you could use.  
Check out our [Output Integrations](integrations-home.md)

**My app is configured in a way that makes Rookout inaccessible to the Rooks. Do I have an alternative?**
We provide the option to install local Agents to orchestrate local data collection and provide ETL functionality.
Learn how to set them up in our [Agents overview](agent.md) page.

**I'm stuck. Can you guys help me out here?**  
Sure thing! Check the [Troubleshooting section](troubleshooting-home.md) or just [shoot us an email](emailto:support@rookout.com).
