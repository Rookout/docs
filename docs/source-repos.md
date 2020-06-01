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

Rookout supports the following Git Providers:
1. Github
2. BitBucket
3. GitLab

##### Automatic Fetching
To configure automatic fetching sources please add the following environment variables while deploying Rookout:
1. ```ROOKOUT_COMMIT```  - String that indicates your git commit
2. ```ROOKOUT_REMOTE_ORIGIN``` - String that indicates your git remote origin


After adding those environment variables, the sources will be loaded automatically once the instance will be filtered.


##### Manual Fetching
You can load your sources manually in the web IDE as explained in the following video.
In that case, you need to make sure that you have load the sources that match the sources of the running instance.

<iframe width="600" height="300" src="https://www.youtube.com/embed/divAqo048eA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Local FileSystem - Rookout Desktop App 
If you are using a git provider that Rookout does not support, you can associate source code files from the local filesystem into a Rookout debug session.
To do that, please download and install Rookout Desktop App. See the following video to learn how to download Rookout Desktop App:
<iframe width="600" height="300" src="https://www.youtube.com/embed/mkMpzQPNcsI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

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
