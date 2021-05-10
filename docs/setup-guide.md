---
id: setup-guide
title: Rookout Setup Guide
sidebar_label: Setup Guide
---

This guide was created to help you get started in using Rookout within your environment. It contains a detailed procedural setup that you can follow when beginning with Rookout from the setup of your SDK through usage of the Rookout application.

## Exploring the Rookout Architecture
Before using Rookout to debug your application, it’s helpful to understand the architecture and examine how Rookout works. Rookout consists of the following components:

1. Rookout SDK
1. Rookout Client (Web UI)
1. Rookout Service
1. Rookout Data On-Prem Components (Optional)

The below diagram shows the pure SaaS deployment model. The Rookout SDK connects back to the Rookout Service via a secure Websocket connection. Data collected by Rookout can optionally be sent to a 3rd party data sink for long term persistence.

<img src="/img/screenshots/setup_guide_arch.jpg" />

### Rookout SDK
The Rookout SDK is a set of libraries that are configured as a dependency to your application. It communicates with the Rookout Service and allows Rookout to collect live debug data on demand from your application

### Rookout Client
The Rookout Client is a web-based UI where you have the ability to dynamically debug your application through the setting of non-breaking breakpoints (also known as data collection points). All user interactions with Rookout are done from this UI.

### Rookout Service
This is a SaaS hosted by Rookout which hosts the control plane for managing your Rookout debug sessions as well as the data plane for processing debug data.

### Rookout Data On-Prem (Optional)
For enterprise customers with data privacy requirements, the data processing components of Rookout can optionally be installed within your network or VPC so that all data processed by Rookout stays locally within your control. If interested in finding out how to get started with the enterprise version of Rookout reach out to us by [clicking here](https://www.rookout.com/company/contact).

## Start a Rookout Trial

If you don’t yet have a Rookout account and are interested in starting a trial, reach out to our team by filling out [this form](https://www.rookout.com/try-free).

## Deploying the Rookout SDK

To start, you should deploy Rookout within your application. Note that deploying Rookout requires a one-time change to each application or microservice after which point Rookout runs along with your application and allows you to debug anytime you need. Rookout deployment steps vary slightly depending on the programming language that you are using. For Java and other JVM based languages the deployment involves adding a Java agent to your application and for other languages there is an SDK approach where a few lines of code are added to the entry point of your application.

Click on one of the links below to see setup instructions for the language you are using:

1. [JVM](jvm-setup.md)
1. [.Net](dotnet-setup.md)
1. [Python](python-setup.md)
1. [Node.js](node-setup.md)
1. [Ruby](ruby-setup.md)

If you need specific examples for the framework you are using, you can check out more deployment examples here: [Deployment Examples](deployment-examples.md)

For deployments in all languages, there are a few key environment variables that should be configured as part of every Rookout deployment:

**ROOKOUT_TOKEN**: This is a token that is specific to your Rookout organization. Any applications deployed with this token will be connected to the Rookout organization that this token is tied to. Each organization has a unique token. (You can access your token through by clicking on the settings icon in the Rookout app).

**ROOKOUT_LABELS**: Labels are a way for you to tag your application instances or microservices where Rookout is deployed. They are customizable name:value pairs which you will use later to tell Rookout which applications, environments, or services you would like to debug. For more details on labels, see this page: [Project Labels](projects-labels.md)

It is recommended that you configure Rookout to automatically fetch your source code repository based on the commit or branch of code you have deployed by setting a few environment variables as part of your build or CI/CD process. To do that, the following environment variables are also recommended:

**ROOKOUT_REMOTE_ORIGIN**: This is a string that represents your git repo URL\
**ROOKOUT_COMMIT**: This is a string that represents a specific commit or branch name that Rookout should fetch

For example:\
```export ROOKOUT_REMOTE_ORIGIN=https://github.com/Rookout/tutorial-python```\
```export ROOKOUT_COMMIT=defbaa76e22751366dab483f67856a00bb626031```

Rookout also has the ability to automatically fetch your source code repository by including the .git folder within your deployed application. For more details on this approach, see [this blog post](https://www.rookout.com/blog/embedding-source-code-version-information-in-docker-images).

## Debugging With Rookout

Once you have Rookout deployed within your application, you are ready to start debugging. Let’s take a look at how to debug your application.

### Filtering Application Instances

Once you’re logged into Rookout and would like to debug, the first step is setting up your debug session configuration. This is done by selecting the specific application instances or services where Rookout is running that you would like to debug. 

In the debug session configuration, you are presented with a list of application instances where Rookout is running.

<img src="/img/screenshots/setup_guide_filters.jpg" />

From this list you can filter by the following methods:

* Labels you have defined (ROOKOUT_LABELS environment variables)
* Processes
* Source code repositories
* Host names
* Source code commit revisions

You can choose one or more filters either from the drop down list or directly from the table by clicking on a row and selecting the filter. Once you have your filters selected, you’re ready to jump to the Rookout debugger and can click on the Let’s Go button.

For more details refer to this page: [Debug Session Setup](debug-session-setup.md)


## Connecting Source Code Repositories
This is relevant if you have not already set automatic fetching of your source code.

The steps to connect your source code repository differ slightly based on whether you are using an On-prem server for your repository or are using the cloud/hosted versions of your source code system. Note that Rookout is never able to see or access your source code. The connection to your source code repository happens from your local system directly to your repository.

### Cloud/Hosted Repositories

If you previously configured the environment variables discussed above (or included the .git folder in your deployed application) Rookout will automatically fetch your source code on your local machine. If not, you can manually connect your source code repository. In the debugging view, simply click the + button and select your source code repository from the list.

<img src="/img/screenshots/setup_guide_source_repos.jpg" />

From here simply follow the steps to authenticate to your source code provider and select the repository and commit you would like to use for debugging.

If your source code repository is not in the list, you can choose the Local Filesystem option. This will prompt you to download a lightweight desktop application which runs on your local system and will allow you to choose a locally cloned repository.

<img src="/img/screenshots/setup_guide_local_filesystem.jpg" />

For more information on source fetching, refer to the following link: [Source Repos](source-repos.md)

### On-Prem Repositories

If you are attempting to connect into an on-prem or self-hosted source code server, you will need to configure the ROOKOUT_REMOTE_ORIGIN and ROOKOUT_COMMIT environment variables or include your .git folder with your deployed application as described in the Deploying the Rookout SDK section.

You will also need to configure your Git on-prem server in the Source Control page of Rookout which can be found by clicking on Settings -> Source Control.

<img src="/img/screenshots/setup_guide_source_control.jpg" />

From the Source Control page, select your Git server type and input the URL of your Git server. Do not include the specific repository link in this URL. Next you will need to navigate back to the filter selection screen, choose your filters and click Let’s Go. This time you should be prompted for a Personal Access Token. Rookout requires a personal access token for your repository in order to connect and fetch your repository.

If you are using Bitbucket, you will also need to install the Rookout Desktop App and ensure that it’s running. You can download the latest release here: https://github.com/Rookout/explorook/releases


## Setting Non-Breaking Breakpoints

Once your source code repository is connected you are ready to start debugging. To set a non-breaking breakpoint within your application open one your source code files from the file system view on the left. Next, click in the gutter area directly to the left of the line number to set a breakpoint. Once the breakpoint is set, you simply need to interact with your application to trigger the line of code where your breakpoint is set.

You should see messages start to appear in the Rookout message pane. Click on an individual message to review the data collected by Rookout.

For more details on Non-Breaking Breakpoints refer to this page: [Debug Session Setup](debug-session-setup.md)

If you encounter an issue while setting a breakpoint, refer to this page for additional information on breakpoint statuses: [Breakpoint Status](breakpoints-status.md)


## Frequently asked questions

For more information on frequently asked questions see the [Rookout FAQ page](https://www.rookout.com/faq).
