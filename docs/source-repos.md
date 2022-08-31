---
id: source-repos
title: Source Code
sidebar_label: Source Code
---
## Introduction

Each Debug Session contains the source code you wish to debug.
Rookout allows you to easily load sources from your local file system or your git provider. 
When you integrate your source code into Rookout, it remains between your code repository and your local browser.

**Rookout never sees nor has access to your source code. In fact, your code never reaches the Rookout servers.**

## Source Code Fetching

### Git Providers

Rookout integrates directly to the cloud editions of the following Git Providers:

1.  Github
2.  BitBucket
3.  GitLab
4.  Azure DevOps

In addition, Rookout offers a desktop app for fetching source repositories from a local file system.
This allows fetching source code from local editions of Git providers, as well as from Perforce.

### Automatic Fetching

Rookout can connect to a repository and automatically fetch the source code for the selected instance.

To automatically fetch source code repositories from cloud-based Github, Bitbucket, or Gitlab, use the following environment variables while deploying rookout:

1.  `ROOKOUT_COMMIT`  - String that indicates your git commit
2.  `ROOKOUT_REMOTE_ORIGIN` - String that indicates your git remote origin

Adding these variables means that the sources are loaded automatically every time this instance is selected.

As an example, the environment variables could be set as follows:

`export ROOKOUT_REMOTE_ORIGIN=https://github.com/Rookout/tutorial-python`\\
`export ROOKOUT_COMMIT=3793853884cae77cc082961aa64cdb0ab93a0e35`

Note that we are setting the commit to a specific revision or branch name that should match the revision of your code deployed in the environment you are debugging. Organizations often automate setting these parameters using their CI/CD process upon each deployment.

When these environment variables are set, in the Application Instances screen, you should see the Source origin and Revision fields set with the values you set:

-   Not sure what's your repository's remote origin? Just run the following command locally where you've cloned your repository:
    `git config --get remote.origin.url`

<img src="/img/screenshots/source_origin_revision.png" />

Now, when you choose to debug an application instance where these environments variables are set, Rookout attempts to fetch the source code so that you are immediately ready to start debugging. You should see the text "auto loaded" in parenthesis next to your repository when this happens successfully:

<img src="/img/screenshots/debug_auto_loaded.png" width="50%" />

For teams that have BitBucket self-hosted / on-prem repositories, it is required to have the Rookout Desktop Application installed first. You must also have git or perforce command line tools installed on your machine.

To install the Rookout Desktop App, click on the **+** button in the debugger view, choose **Local Filesystem**, and then follow the steps to download and install the Rookout Desktop App.

<img src="/img/screenshots/local_file_system.png" width="40%" />

Fo the on-prem git workflow, you can fine more details in this video:

<iframe width={600} height={300} src="https://www.youtube.com/embed/d4LwqNFeR7s" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true} />

#### Automatic Fetching CI Examples

As an example of how to incorporate auto fetching into a Docker application pipeline, you should add environment variables with arguments to your `Dockerfile` as illustrated below, then pass those arguments using CI variables with the `docker build` command. See table with predefined variables in different CI systems and example pipeline steps.

[Docker Example Link](https://github.com/Rookout/tutorial-python/blob/master/Dockerfile)

```

...
ARG GIT_COMMIT=unspecified
ENV ROOKOUT_COMMIT=$GIT_COMMIT

ARG GIT_ORIGIN=unspecified
ENV ROOKOUT_REMOTE_ORIGIN=$GIT_ORIGIN
...

```

##### Table: GIT_COMMIT and GIT_COMMIT variables in different CIs

| CI                  | Variable Names                                                     | Ref Doc                                                                                                                                                                               |
| ------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CircleCI            | CIRCLE_REPOSITORY_URL <br /> CIRCLE_SHA1                             | https:                                                                                                                                             |
| Jenkins             | GIT_URL  GIT_COMMIT                                            | Env variables available in git Plugin                                                                       |
| GitHub Actions      | github.repositoryUrl  GITHUB_SHA  github.sha               |    |
| Azure DevOps        | Build.SourceVersion  Build.Repository.Uri                      |                                                                                  |
| BitBucket Pipelines | BITBUCKET_REPO_FULL_NAME  BITBUCKET_COMMIT                     |                                                                                                            |
| GitLab CI           | CI_REPOSITORY_URL  CI_COMMIT_SHA                               |                                                                                                                    |
| Travis CI           | $(git config --get remote.origin.url)  TRAVIS_COMMIT           |                                                                                                                               |
| BuildBot            | repoUrl  revision                                              |                                                                                                              |
| AWS CodePipeline    | CODEBUILD_SOURCE_REPO_URL  CODEBUILD_RESOLVED_SOURCE_VERSION   |                                                                                                   |
| Shell               | \\$(git rev-parse HEAD)  $(git config --get remote.origin.url) |                                                                                                                                                                                       |

##### CircleCI

```



```

##### Jenkins

```



```

##### GitHub Actions

```



```

##### Azure DevOps

```



```

##### BitBucket Pipelines

```



```

##### GitLab CI

```



```

##### Travis CI

```



```

##### AWS CodePipeline

```



```

### Local FileSystem - Rookout Desktop App

If you are using a local git provider or any hosted git provider that is not listed, you can tell Rookout to fetch the source code files from your local filesystem.

To do that, please download and install Rookout Desktop App. See the following video to learn how:



## Packaging Sources

### Java

To make sure you are collecting data from the source line where you have set the breakpoint, please include your source files within your JAR/WAR/EAR library.

For more information, see [this page](jvm-setup.mdx#packaging-sources).

### JavaScript/TypeScript

If you are transpiling your JavaScript/TypeScript on the fly (using babel-node or a similar tool), Rookout will work out of the box.

If you are transpiling your JavaScript/TypeScript before execution (for instance in your CI/CD), you must include the source maps inline within the source files or as separate files (usually app.map.js) in your deployment.

For more information, see [this page](node-setup.md#source-maps).

### .Net

To make sure you are collecting data from the source line where you have set the breakpoint, include your source files within your library.

For more information, see [this page](dotnet-setup.mdx#packaging-sources).
