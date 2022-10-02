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

| CI                  | Variable Names                                               | Ref Doc                                                                                                                                                                       |
| ------------------- |--------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| CircleCI            | CIRCLE_REPOSITORY_URL <br /> CIRCLE_SHA1                     | https://circleci.com/docs/2.0/env-vars/                                                                                                                                       |
| Jenkins             | GIT_URL  GIT_COMMIT                                          | Env variables available in git Plugin  https://plugins.jenkins.io/git/#plugin-content-environment-variables                                                                   |
| GitHub Actions      | github.repositoryUrl  GITHUB_SHA  github.sha                 | https://docs.github.com/en/actions/learn-github-actions/environment-variables#default-environment-variables  https://docs.github.com/en/actions/learn-github-actions/contexts |
| Azure DevOps        | Build.SourceVersion  Build.Repository.Uri                    | https://docs.microsoft.com/en-us/azure/devops/pipelines/build/variables?view=azure-devops&tabs=yaml                                                                                                                                                                              |
| BitBucket Pipelines | BITBUCKET_REPO_FULL_NAME  BITBUCKET_COMMIT                   |     https://support.atlassian.com/bitbucket-cloud/docs/variables-and-secrets/                                                                                                                                                            |
| GitLab CI           | CI_REPOSITORY_URL  CI_COMMIT_SHA                             |      https://docs.gitlab.com/ee/ci/variables/predefined_variables.html                                                                                                                                                                   |
| Travis CI           | $(git config --get remote.origin.url)  TRAVIS_COMMIT         |        https://docs.travis-ci.com/user/environment-variables/                                                                                                                                                                       |
| BuildBot            | repoUrl  revision                                            |              http://docs.buildbot.net/latest/manual/configuration/changesources.html                                                                                                                                                                 |
| AWS CodePipeline    | CODEBUILD_SOURCE_REPO_URL  CODEBUILD_RESOLVED_SOURCE_VERSION |              https://docs.aws.amazon.com/codebuild/latest/userguide/build-env-ref-env-vars.html                                                                                                                                                                 |
| Shell               | $(git rev-parse HEAD)  $(git config --get remote.origin.url) |                                                                                                                                                                               |

##### CircleCI

```

jobs:
  build:
    docker:
      - image: docker:17.05.0-ce-git
    steps:
      - run:
          name: Build application Docker image
          command: |
            docker build . -t user/app:latest \
                  --build-arg GIT_COMMIT=$CIRCLE_SHA1 \
                  --build-arg GIT_ORIGIN=$CIRCLE_REPOSITORY_URL

```

##### Jenkins

```

pipeline {
  stages {
    stage('Docker Build') {
      agent any
      steps {
        sh 'docker build . -t user/app:latest --build-arg GIT_COMMIT=$GIT_COMMIT --build-arg GIT_ORIGIN=$GIT_URL'
      }
    }
  }
}

```

##### GitHub Actions

```

jobs:
  docker:
    runs-on: ubuntu-latest
    steps:
      -
        name: Build and push
        uses: docker/build-push-action@v2
        with:
          context: .
          push: true
          build-args:|
            GIT_COMMIT=$github.sha
            GIT_ORIGIN=$github.repositoryUrl
          tags: user/app:latest

```

##### Azure DevOps

```

steps:
- task: Docker@2
  displayName: Build an image
  inputs:
    repository: user/app:latest
    command: build
    Dockerfile: Dockerfile
    arguments: --build-arg GIT_COMMIT=$Build.SourceVersion --build-arg GIT_ORIGIN=$Build.Repository.Uri

```

##### BitBucket Pipelines

```

pipelines:
  default:
    - step:
        script:
          - docker build . -t user/app:latest \
                 --build-arg GIT_COMMIT=$BITBUCKET_COMMIT \
                 --build-arg GIT_ORIGIN=$BITBUCKET_REPO_FULL_NAME
        services:
          - docker

```

##### GitLab CI

```

build:
  stage: build
  script:
    - docker build . -t user/app:latest \
           --build-arg GIT_COMMIT=$CI_COMMIT_SHA \
           --build-arg GIT_ORIGIN=$CI_REPOSITORY_URL


```

##### Travis CI

```

script:
  - docker build . -t user/app:latest \
           --build-arg GIT_COMMIT=$TRAVIS_COMMIT \
           --build-arg GIT_ORIGIN=$(git config --get remote.origin.url)


```

##### AWS CodePipeline

```

phases:
  build:
    commands:
      - docker build . -t user/app:latest \
           --build-arg GIT_COMMIT=$CODEBUILD_RESOLVED_SOURCE_VERSION \
           --build-arg GIT_ORIGIN=$CODEBUILD_SOURCE_REPO_URL

```

### Local FileSystem - Rookout Desktop App

If you are using a local git provider or any hosted git provider that is not listed, you can tell Rookout to fetch the source code files from your local filesystem.

To do that, please download and install Rookout Desktop App. See the following video to learn how:

<iframe width="600" height="300" src="https://www.youtube.com/embed/mkMpzQPNcsI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Packaging Sources

### Java

To make sure you are collecting data from the source line where you have set the breakpoint, please include your source files within your JAR/WAR/EAR library.

For more information, see [this page](jvm-setup.mdx#packaging-sources).

### JavaScript/TypeScript

If you are transpiling your JavaScript/TypeScript on the fly (using babel-node or a similar tool), Rookout will work out of the box.

If you are transpiling your JavaScript/TypeScript before execution (for instance in your CI/CD), you must include the source maps inline within the source files or as separate files (usually app.map.js) in your deployment.

For more information, see [this page](node-setup.mdx#source-maps).

### .Net

To make sure you are collecting data from the source line where you have set the breakpoint, include your source files within your library.

For more information, see [this page](dotnet-setup.mdx#packaging-sources).
