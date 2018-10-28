---
id: installation-node
title: Node Rook Setup
---

## Introduction

The Node.js Rook provides the ability to fetch debug data from a running application in real time.
It is deployed by deploying the [Rook SDK](https://www.npmjs.com/package/rookout).
It can easily be installed by running the following command:
```bash
$ npm install --save rookout
```

## Basic setup

Setup the Rookout token in your environment:
```javascript
// Export your token as an environment variable
$ export ROOKOUT_TOKEN=[Your Rookout Token]
```

Tag your environment:
```javascript
// Use a set of semicolon separated values to identify specific deployments and configurations
$ export ROOKOUT_TAGS=[;;;]
```

Import the Rook within your application:
```javascript
const rook = require('rookout/auto_start');
```

## Supported Versions

| Implementation     | Versions       |
| ------------------ | -------------- |
| **Node**           | 4.3+, 6, 8, 10  |

**Note:** Rookout only supports LTS (Long Time Support) versions of Node.js.

## Source Code Detection
Source detection functionality is currently not supported for Node.js.

## Dependencies 

Rookout SDK contains third-party native extensions. For most common interpreter and OS configurations, pre-built binaries are provided. For other configurations, a build environment is needed to successfully install Rookout.

Please install the appropriate build tools for your environment:

1. Mac
    - $ xcode-select --install
2. Debian based
    - $ apt-get update -q && apt-get install -qy
3. Fedora based
    - $ yum install -qy
4. Alpine
    - $ apk update && apk add

## Serverless and PaaS
If you are running your application on a Serverless or PaaS (Platform as a Service), you must build your package in an environment similar to those used in production. 
If you are running on a Windows or Mac machine (or using an incompatible Linux distribution) you may encounter some issues here.

Many Serverless frameworks (such as AWS sam) has built-in support for it and will work out of the box.

If you need to set up your own build, we recommend using Docker, with a command line such as:

```bash
$ docker run -it -v `pwd`:`pwd` -w `pwd` node:8 pip install -t lib
```

For more information check out this blog post: https://www.rookout.com/3_min_hack_for_building_local_native_extensions/

## Examples

Check out the following deployment examples:

- [Google AppEngine](https://github.com/Rookout/deployment-examples/tree/master/node-app-engine-flex)
- [AWS Elastic Container Service](https://github.com/Rookout/deployment-examples/tree/master/node-aws-ecs)
- [AWS Elastic Beanstalk](https://github.com/Rookout/deployment-examples/tree/master/node-aws-elasticbeanstalk)
- [Using TypeScript](https://github.com/Rookout/deployment-examples/tree/master/node-typescript)
- [AWS Lambda](https://github.com/Rookout/deployment-examples/tree/master/node-aws-lambda)
- [IBM Cloud Functions](https://github.com/Rookout/deployment-examples/tree/master/node-ibm-cloud-functions)
- [Electron](https://github.com/Rookout/deployment-examples/tree/master/node-electron)

Or visit [our GitHub repository](https://github.com/Rookout/deployment-examples) for more deployment examples.