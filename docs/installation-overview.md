---
id: installation
title: Setting up
---

## The Basics

### The Rookout App

Rookout is available at [app.rookout.com](https://app.rookout.com/) and provides a web based IDE for real time debugging.
Once you have access to the Rookout App, you'll be able to setup Rooks and Rules in order to debug your application.
The Rookout App also functions as an ETL component for fetching your logs and sending them to your favorite log and data tools.

### Rooks and Rules

Rooks are the component that allows you to collect data directly from a running application.  
A Rook is imported into your app as an SDK, and deployed with each instance of your app.

Once a Rook is deployed with your application, a Rule can be set to watch a specific line of code.
A Rule defines what data will be collected, how it should be formatted, and where it should be sent.

For more information about Rooks and Rules see [Rooks Overview](rooks-index.md) and [Rules Overview](rules-index.md)

## Setting up Rookout

If you have already walked through one of our hands-on tutorials, you should have access to the Rookout app.
Setting up Rookout to debug your own code requires the following steps:

1. Add a Rook dependency to your application code
2. Load the source code into the Rookout app
3. Place a rule and trigger your application to get some data.

### Adding a Rook

To add a basic Node.js, Python or Java Rook, follow the instructions in the matching page:

- [Adding a Node.js Rook](installation-node.md)
- [Adding a Python Rook](installation-python.md)
- [Adding a Java Rook](installation-java.md)

To deploy a Rook on a specific platform or framework, check out our [Installation Examples](https://github.com/Rookout/deployment-examples) page.

Once the Rook is in place, apply the following environment variables to its host:

`ROOKOUT_TOKEN` - *Your unique identifier, pointing your Rooks to your own account at the Rookout Service.*  
`ROOKOUT_ROOK_TAGS` - *A list of comma separated values (tags) that will be added to the Rook's identity, default: EMPTY*  
`ROOKOUT_AGENT_PORT` - *A port that will allow the Rook to access the Rookout app. Set it to 443*

In addition, make sure the host has internet access, and that it can access http://cloud.agent.rookout.com/.

For additional configuration options visit our [Rook configuration reference](rooks-config.md)

### Loading the source code

Create a Workspace, and give it a meaningful name.
Add a new Source to the Workspace, and choose your Git Repository.
Choose a branch, and a commit if necessary.
Switch to the created Workspace to view your source code.

If you do not use GitHub, choose Local Filesystem and follow the instructions in the following dialog.

### Placing a Rule

Choose either a Dump Frame or a Log Rule from the Rule Type drop down list in the right-hand side panel.
Choose a line of code from the source view in the left-hand side panel, and click next to it as if you were adding a breakpoint in an IDE.
Trigger your application in a way that would hit the selected line of code, and watch the data arriving in the Message Pane.

## What's next?

**I want to be more efficient, what can I add to Rookout?**  
We have prepared integrations with several well-known tools you could use.  
Check out our [Output Integrations](integrations-home.md)

**Everything is installed, how do I know it works?**  
Head to [app.rookout.com](https://app.rookout.com) and start debugging !

**My app is configured in a way that makes Rookout inaccessible to the Rooks. Do I have an alternative?**
We provide the option to install local Agents to orchestrate local data collection and provide ETL functionality.
Learn how to set them up in our [Agents overview](agent.md) page.


If you encounter any issue, you can check the [Troubleshooting section](troubleshooting-home.md) or [contact us](emailto:support@rookout.com)
