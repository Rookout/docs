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

Import the SDK within your application:
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
| `host` | `ROOKOUT_CONTROLLER_HOST` | None | If you are using a Rookout ETL Controller, this is the hostname for it |
| `port` | `ROOKOUT_CONTROLLER_PORT` | None | If you are using a Rookout ETL Controller, this is the port for it |
| `proxy` | `ROOKOUT_PROXY` | None | URL to proxy server
| `debug` | `ROOKOUT_DEBUG` | False | Set to `True` to increase log level to debug |
| `throw_errors` | None | False | Set to `True` to reject the promsise or throw an exception if `start` fails (error message will not be printed in console) |
| `log_to_stderr` | `ROOKOUT_LOG_TO_STDERR` | False | Set to `True` to have the SDK log to stderr |
| `git_commit` | `ROOKOUT_COMMIT` | None | String that indicates your git commit |
| `git_origin` | `ROOKOUT_REMOTE_ORIGIN` | None | String that indicates your git remote origin |

### startSync
```js
startSync(timeout=5000, options = {});
```

The `startSync` method is used to initialize the SDK in a synchronous manner using the `deasync` module and accepts the same `options` object as the `start` method. The method will return after the initial connection attempt to the debug controller succeeds or fails (either way, connection will be maintained and retried in the background) or when the timeout specified has been reached. If you choose the set `throw_errors` true, an exception will be thrown on failure.  

### stop

```js
stop();
```

The `stop` method is used to shutdown the SDK.  
As Rookout is listening to a network connection, the Node process will not terminate as long as Rookout is running in the background.

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

## Supported Versions

Rookout supports the latest NodeJS and all releases that are under maintenance (LTS). Support for older versions is limited.

| Implementation     | Versions       |
| ------------------ | -------------- |
| **Node**           | 8, 10, 11, 12 |

**Note:** The Rookout NodeJS SDK does not support running side-by-side with debugger such as WebStorm or Stackdriver Debugger.


## Transpiling and Source Maps

If you are transpiling your JavaScript/TypeScript on the fly (using [babel-node](https://babeljs.io/docs/en/babel-node) or a similar tool), Rookout debugging should work out of the box.

If you are transpiling your JavaScript/TypeScript before execution (for instance in your CI/CD), you must include the source maps inline within the source files or as separate files (usually `app.map.js`) in your deployment.

To make sure Rookout can validate the source file matches the file you are tryring to debug using hash comparison, we recommend deploying the original source files side-by-side with the transpiled ones or building your source map with the full source code.

### Configuration for Common Tools

- [**Weback**](https://webpack.js.org/) - use the `inline-source-map` or `source-map` options for [devtool](https://webpack.js.org/configuration/devtool/).  
- [**babel-cli**](https://babeljs.io/docs/en/babel-cli) - use the `--source-maps inline` or `--source-maps` flags.  
- [**Typescript**](https://www.typescriptlang.org/) - use the `--inlineSources` flag. For [**ts-node**](https://github.com/TypeStrong/ts-node) add source maps using the `tsconfig.json` [file](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html).
- [**CoffeeScript**](https://coffeescript.org/) - use the `-M` or `-m` flags.  

## Source Commit Detection

The NodeJS SDK supports detecting the existing source code commit in the following methods, in descending order of priority:
1. If the environment variable “ROOKOUT_COMMIT” exists, use it.
2. If the environment variable “ROOKOUT_GIT” exists, search for the configuration of the “.git” folder and use its head.
3. If the main application is running from within a Git repository, use its head. 

## Serverless and PaaS deployments

### Integrating with Serverless

When integrating Rookout into a Serverless application, you should explicitly flush the collected information.  
For most common Serverless runtimes, Rookout provides easy to use wrappers such as `rookout.wrap(handler, options={})`:

```js
const rookout = require('rookout/lambda');

function handler(event, context, callback) {
        callback(null, "Hello World");
}

exports.handler = rookout.wrap(handler, {labels={"env":"dev"})};
```

Refer to the [SDK API](#sdk-api-1) for the available optional options

For more information, please check out our [deployment-examples](deployment-examples.md).

