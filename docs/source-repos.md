---
id: source-repos
title: Source Repositories
sidebar_label: Source Repositories
---

## Introduction
Each Debug Session contains the source code you wish to debug.
Rookout allows you to easily load sources from your local file system or your git provider. 
When you integrate your source code into Rookout, it remains between your code repository and your local browser.
**Rookout never sees nor has access to your source code. In fact, your code never even reaches the Rookout servers.**
 

## Source Code Fetching 
### Git Providers

Rookout integrates directly to the cloud editions of the following Git Providers:
1. Github
2. BitBucket
3. GitLab
4. Azure DevOps

In addition, Rookout offers a desktop app for fetching source repositories from a local file system.
This allows fetching source code from local editions of Git providers, as well as from Perforce.

##### Automatic Fetching
Rookout has the ability to connect to a repository in order to automatically fetch your source code anytime a specific application instance is selected for debugging. To automatically fetch source code repositories from cloud based Github, Bitbucket or Gitlab, use the following environment variables while deploying rookout:
1. ```ROOKOUT_COMMIT```  - String that indicates your git commit
2. ```ROOKOUT_REMOTE_ORIGIN``` - String that indicates your git remote origin

After adding those environment variables, the sources will be loaded automatically once the instance will be filtered.  As an example, the environment variables could be set as follows:

```export ROOKOUT_REMOTE_ORIGIN=https://github.com/Rookout/tutorial-python```\
```export ROOKOUT_COMMIT=3793853884cae77cc082961aa64cdb0ab93a0e35```

Note, we are setting the commit to a specific revision or branch name which should match the revision of your code deployed in the environment you are debugging. Oftentimes organizations opt to integrate setting of these parameters into their CI/CD process so that they can be dynamically configured upon each new deployment. After these environment variables are set, when viewing the Application Instances screen, you should see the Source origin and Revision fields set with the values you set in your environment variables:

<img src="/img/screenshots/source_origin_revision.png" />

Now, when you select a Rookout Label to debug an application instance where these environments variables are set, Rookout will attempt to auto clone your repository on your local machine with the correct code revision so that you are immediately ready to start debugging.  You should see the text auto loaded in parenthesis next to your repository when this happens successfully.

<img src="/img/screenshots/debug_auto_loaded.png" width="50%"/>

When auto source loading happens the git files will be cloned on your local machine in the following locations:

**Windows**: %APPDATA%/Rookout/git_root\
**Mac**: $HOME/Library/Application Support/Rookout/git_root\
**Linux**: $HOME/.Rookout/git_root

For teams that have BitBucket self-hosted / on-prem repositories, it is required that the Rookout Desktop Application be installed first. You must also have git or perforce command line tools installed on your machine.  To install the Rookout Desktop App, click on the **+** button in the debugger view, choose **Local Filesystem**, and then follow the steps to download and install the Rookout Desktop App.

<img src="/img/screenshots/local_file_system.png" width="40%" />

Fo the on-prem git workflow, you can fine more details in this video:

<iframe width="600" height="300" src="https://www.youtube.com/embed/d4LwqNFeR7s" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


##### Manual Fetching
You can load your sources manually in the web IDE as explained in the following video.
When fetching source repositories manually, make sure to fetch the version of the code that is deployed in the app you are trying to debug.
<iframe width="600" height="300" src="https://www.youtube.com/embed/divAqo048eA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Local FileSystem - Rookout Desktop App 
If you are using any local git provider, or any hosted git provider besides Github, Gitlab or Bitbucket, you can associate source code files from the local filesystem into a Rookout debug session.

To do that, please download and install Rookout Desktop App. See the following video to learn how to download Rookout Desktop App:
<iframe width="600" height="300" src="https://www.youtube.com/embed/mkMpzQPNcsI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Packaging Sources

### Java
To make sure you are collecting data from the source line where you have set the breakpoint, please include your source files within your JAR/WAR/EAR library.

For more information, please click [here](jvm-setup#packaging-sources).

### JavaScript/TypeScript
If you are transpiling your JavaScript/TypeScript on the fly (using babel-node or a similar tool), Rookout will work out of the box.

If you are transpiling your JavaScript/TypeScript before execution (for instance in your CI/CD), you must include the source maps inline within the source files or as separate files (usually app.map.js) in your deployment.

For more information, please click [here](node-setup#transpiling-and-source-maps).

### .Net

To make sure you are collecting data from the source line where you have set the breakpoint, include your source files within your library.

For more information, please click [here](dotnet-setup#packaging-sources).


## Repository Settings

If you are deploying your software in some non-trival ways, Rookout offers the option of customizing the way breakpoints are set directly from your source repository.

Simply create a file named `.rookout` at the root of your repository and add to it any of the configurations below.  
Feel free to add comments to the file in the form of lines starting with '#'.

### Source Path Mapping

By default Rookout uses the repository relative path of the source file you are debugging to find it.

You may have to change it in a couple of cases:
- You are using serverless framework that deploys your app with different layout.
- You are removing a part of the path when deploying your code.
- The path is too short or generic, and you want to make it more specific to avoid path collisions.

This is done through simple path substition instructions (in the `.rookout` file):

#### Shortening a Path

To convert `microservice1/app.py` to `app.py` use:
```bash
/microservice1 /
```

#### Replacing a Path

To convert `microservice1/app.py` to `app/app.py` use:
```bash
/microservice1 /app
```

#### Lengthening a Path

To convert `app.py` to `microservice1/app.py` use:
```bash
/ /microservice1
```

#### Manipulating a Path with Spaces

To convert `my app/app.py` to `app.py` use:
```bash
"my app" /
```

### (Node) Debugging Packages

By default, under NodeJS, Rookout ignores your project's dependencies the `node_modules` folder.

If the project you are debugging is installed as a package on the server add the following snippet to your `.rookout` file:

```node
#package
```

**Note:** Rookout does not map the most common NPM packages for performance reasons and does not allow setting breakpoints inside them.
