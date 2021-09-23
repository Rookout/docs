---
id: node-setup
title: Node.js SDK Instrumentation
sidebar_label: Node.js
---

This page will dive into the nitty gritty details on installing Rookout under various configurations.  
If you are encountering any difficulties with deploying Rookout, this is the place to look.

## Node.js

The [NodeJS SDK](https://www.npmjs.com/package/rookout) provides the ability to fetch debug data from a running application in real time.  
It can easily be installed by running the following command:
```bash
npm install --save rookout
```

## Setup

Start the SDK within your application:
```javascript
const rookout = require('rookout');


rookout.start({
    token: '[Your Rookout Token]',
    labels:
        {
            "env":"dev" // Optional,see Labels page below Projects
        }
});
```
<div class="rookout-org-info"></div>

## SDK API

### start

```js
start(options={});
```

The `start` method is used to initialize the SDK. Receives configuration using an `options` object and returns a promise that will resolve when the initial connection attempt to the debug controller succeeds or fails. Either way, connection will be maintained and retried in the background. If you set `throw_errors` to true, the promise will be rejected on failure.

| Argument &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Environment Variable &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Default Value | Description |
| ------------ | ----------------------- | ------------- | ----------- |
| `token` | `ROOKOUT_TOKEN` | None | The Rookout token for your organization. Should be left empty if you are using a Rookout ETL Controller |
| `labels` | `ROOKOUT_LABELS` | {} | A dictionary of key:value labels for your application instances. Use `k:v,k:v` format for environment variables |
| `git_commit` | `ROOKOUT_COMMIT` | None | String that indicates your git commit or a branch name |
| `git_origin` | `ROOKOUT_REMOTE_ORIGIN` | None | String that indicates your git remote origin |
| `host` | `ROOKOUT_CONTROLLER_HOST` | None | If you are using a Rookout ETL Controller, this is the hostname for it |
| `port` | `ROOKOUT_CONTROLLER_PORT` | None | If you are using a Rookout ETL Controller, this is the port for it |
| `proxy` | `ROOKOUT_PROXY` | None | URL to proxy server
| `debug` | `ROOKOUT_DEBUG` | False | Set to `True` to increase log level to debug |
| `throw_errors` | None | False | Set to `True` to reject the promsise or throw an exception if `start` fails (error message will not be printed in console) |
| `sources` | `ROOKOUT_SOURCES` | None | Source information (see below) |
| `live_logger` | `ROOKOUT_LIVE_LOGGER` | False | Set to `True` to enable Rookout Live Logger |


### stop

```js
stop();
```

The `stop` method is used to shutdown the SDK.  

### flush

```js
flush(cb);
```

The `flush` method allows explicitly flushing the Rookout logs and messages.  
The callback is executed when the method finishes.

## Test connectivity

To make sure the SDK was properly installed and test your configuration (environment variables only), run the following command:
```bash
./node_modules/.bin/rookout-check
```
## Source information

Use the environment variable `ROOKOUT_SOURCES` to initialize the SDK with information about the sources used in your application.

ROOKOUT_SOURCES is a semicolon-separated list with a source control repository and revision information. 
This will allow Rookout to automatically fetch your application's source code from the right revision, and also additional dependencies' sources.
When using Git the repository is a URL (remote origin) and the revision is a full commit hash or a branch name.

For example let's say I use https://github.com/Rookout/tutorial-nodejs with the commit 2f79053d7bc7c9c9561a30dda202b3dcd2b72b90 and I use the Lodash package (https://github.com/lodash/lodash) from its master branch:
```
ROOKOUT_SOURCES=https://github.com/Rookout/tutorial-nodejs#cf85c4e0365d8082ca2e1af63ca8b5b436a13909;https://github.com/lodash/lodash#master
```

## Transpiling and Source Maps
Transpiling your JavaScript/TypeScript on the fly (using [babel-node](https://babeljs.io/docs/en/babel-node) or a similar tool), Rookout debugging will work out of the box.

When transpiling your JavaScript/TypeScript before execution (for instance in your CI/CD), include the source maps inline within the source files or as separate files (usually `app.map.js`) within your deployment.

To make sure you can validate the source file matches the file you are trying to debug, please include the original source files side-by-side with the transpiled ones or build your source map with the full source code.

To test if you are transpiling with source maps, search for this comment in the transpiled files:
```js
//# sourceMappingURL=/path/to/file.js.map
```

If you face cases where some variables are not collected, or where some breakpoints fail to be hit, try using a minimal transpile level, or set it to a recent version of Node.js.

### Configurations for Common Tools

- [**Webpack**](https://webpack.js.org/) - use the `inline-source-map` or `source-map` values for [devtool](https://webpack.js.org/configuration/devtool/).  
- [**Babel**](https://babeljs.io/) - use the `--source-maps inline` or `--source-maps` flags.  
- [**Typescript**](https://www.typescriptlang.org/) - use the `--inlineSources` flag. For [**ts-node**](https://github.com/TypeStrong/ts-node) add source maps using the `tsconfig.json` [file](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html).
- [**CoffeeScript**](https://coffeescript.org/) - use the `-M` or `-m` flags.

#### Advanced Webpack Transpiling Configurations

If multiple transpiling steps are used (for example - TypeScript followed by Webpack), you may need to add an additional step to your Webpack config. 

The additional step will make sure the source maps end up in the right place:

1. Install `source-map-loader`: `npm install -D source-map-loader`
2. Add the following rule to `webpack.config.json` (under `rules`):

```js
 {
    test: /\.js$/,
    use: ["source-map-loader"],
    enforce: "pre"
 }
```

## Source Commit Detection

The NodeJS SDK supports detecting the existing source code commit in the following methods, in descending order of priority:
1. If the environment variable “ROOKOUT_COMMIT” exists, use it.
2. If the environment variable “ROOKOUT_GIT” exists, search for the configuration of the “.git” folder and use its head.
3. If the main application is running from within a Git repository, use its head. 

## Supported Versions

Rookout supports the latest NodeJS and all releases that are under maintenance (LTS). Support for older versions is limited.

| Supprt             | Versions                       |
| ---                | ---                            |
| **Full**           | 12 (>= 12.9), 14               |
| **Limited**        | 8, 10, 11, 12 (< 12.9), 13, 15 |

**Note:** The Rookout NodeJS SDK does not support running side-by-side with debugger such as WebStorm or Stackdriver Debugger.

## Serverless and PaaS deployments

### Integrating with Serverless

When integrating Rookout into a Serverless application, you should explicitly flush the collected information.  
For most common Serverless runtimes, Rookout provides easy to use wrappers such as `rookout.wrap(handler, options={})`:

```js
const rookout = require('rookout/lambda');

function handler(event, context, callback) {
        callback(null, "Hello World");
}

exports.handler = rookout.wrap(handler, {token:'[Your Rookout Token]', labels:{"env":"dev"}});
```

**Note:** Adding the Rookout SDK will slow down your Serverless cold-start times. Please make sure your timeout is no less then 10 seconds.

For more information, please check out our [deployment-examples](deployment-examples.md).
