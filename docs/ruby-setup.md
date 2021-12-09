---
id: ruby-setup
title: Ruby SDK
sidebar_label: Ruby
---

This page will dive into the nitty gritty details on installing Rookout under various configurations.  
If you are encountering any difficulties with deploying Rookout, this is the place to look.

## Ruby

The [Ruby SDK](https://rubygems.org/gems/rookout) provides the ability to fetch debug data from a running application in real time.  
It can easily be installed by running the following command:
```bash
gem install rookout
```

## Setup

Start the SDK within your application as early as possible:
```ruby
require 'rookout'
::Rookout.start token: '[Your Rookout Token]', labels: {env: "dev"}
```
<div class="rookout-org-info"></div>

The SDK should be imported as early as possible within your application code.
This is due to the fact you can only set non-breaking breakpoints on ruby files that have been loaded after the Rookout SDK has been started.

For [Pre-forking servers](#pre-forking-servers) please read the relevant section..  


## SDK API

### start

```ruby
start(**options)
```

The `start` method is used to initialize the SDK in the background and accepts the following options:

| Argument &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Environment Variable &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Default Value | Description |
| ------------ | ----------------------- | ------------- | ----------- |
| `token` | `ROOKOUT_TOKEN` | None | The Rookout token for your organization. Should be left empty if you are using a Rookout ETL Controller |
| `labels` | `ROOKOUT_LABELS` | {} | A dictionary of key:value labels for your application instances. Use `k:v,k:v` format for environment variables |
| `git_commit` | `ROOKOUT_COMMIT` | None | String that indicates your git commit or a branch name |
| `git_origin` | `ROOKOUT_REMOTE_ORIGIN` | None | String that indicates your git remote origin |
| `fork` | `ROOKOUT_ENABLE_FORK` | False | Set to `True` to enable support in forked processes |
| `host` | `ROOKOUT_CONTROLLER_HOST` | None | If you are using a Rookout ETL Controller, this is the hostname for it |
| `port` | `ROOKOUT_CONTROLLER_PORT` | None | If you are using a Rookout ETL Controller, this is the port for it |
| `proxy` | `ROOKOUT_PROXY` | None | URL to proxy server (WIP) |
| `debug` | `ROOKOUT_DEBUG` | False | Set to `True` to increase log level to debug |
| `throw_errors` | None | False | Set to `True` to throw an exception if `start` fails (error message will not be printed in console) |

### flush

```ruby
flush()
```

The `flush` method allows explicitly flushing the Rookout logs and messages.

## Test connectivity

To make sure the SDK was properly installed in your Ruby environment, and test your configuration (environment variables only), run the following command:
```bash
rookout
```
## Source Commit Detection

The Ruby SDK supports detecting the existing source code commit in the following methods, in descending order of priority:
1. If the environment variable “ROOKOUT_COMMIT” exists, use it.
2. If the main application is running from within a Git repository, use its head. 

## Supported Ruby versions

| Implementation     | Versions                |
| ------------------ | ----------------------- |
| **MRI**        | 2.6, 2.7 |

## Dependencies

The Ruby SDK dependencies contain native extensions. To ensure optimum compatibility, we highly recommend you build them in your local environment.
If you are using Bundler, please configure it by running:
```
bundle config force_ruby_platform true
```

## Pre-forking servers

Several popular application servers for Ruby load the application code during startup and then `fork()` the process multiple times to worker processes.

If you are using one of those servers, you can set the fork argument in the SDK api to true to automatically enable Rookout in forked processes, and no additional changes will be required.

## Serverless and PaaS deployments (WIP)

### Integrating with Serverless

When integrating Rookout into a Serverless application, you should explicitly flush the collected information.  
For most common Serverless runtimes, Rookout provides easy to use wrappers such as:

```ruby
TBD
```

**Note:** Adding the Rookout SDK will slow down your Serverless cold-start times. Please make sure your timeout is no less then 10 seconds.

For more information, please check out our [deployment-examples](deployment-examples.md).

### Building

If you are running your application on a Serverless or PaaS (Platform as a Service), you must build your package in an environment similar to those used in production. 
If you are running on a Windows or Mac machine (or using an incompatible Linux distribution) you may encounter some issues here.

Many Serverless frameworks (such as AWS SAM) have built-in support for it and will work out of the box.

If you need to set up your own build, we recommend using Docker, with a command line such as:
```bash
docker run -v `pwd`:`pwd` -w `pwd` -i -t lambci/lambda:build-ruby2.7 pip install -r requirements.txt
```

For more information check out this blog post: https://www.rookout.com/3_min_hack_for_building_local_native_extensions/
