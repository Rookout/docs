---
id: node-setup
title: Node.js SDK Instrumentation
sidebar_label: Node.js
---

## Installation

Install the Rookout Node SDK using one of the following methods:

**NPM**

```bash
npm install --save rookout
```

**Yarn**
```bash
yarn add rookout
```

## Setup

To add the SDK to your application, add:

```javascript
const rookout = require('rookout');
```

Then, in your app’s entry point, add:

```javascript
rookout.start({
    token: '[Your Rookout Token]',
    labels:
        {
            "env": "dev" // Optional, see the Labels page for more info.
        }
});
```
<div class="rookout-org-info"></div>

Note that the `rookout.start` method returns a promise that resolves when the connection attempt succeeds or fails. You can choose to utilize that Promise or to ignore it.

## Configuration

The following table includes all configuration options. Pass them to the `rookout.start` method or using environment variables.

| Parameter | Environment Variable | Default Value | Description |
| --- | --- | --- | --- |
| `token` | `ROOKOUT_TOKEN` | None | The Rookout token for your organization. Should be left empty if you are using a Rookout ETL Controller |
| `labels` | `ROOKOUT_LABELS` | {} | A dictionary of key:value labels for your application instances. Use `k:v,k:v` format for environment variables |
| `git_commit` | `ROOKOUT_COMMIT` | None | String that indicates your git commit or a branch name |
| `git_origin` | `ROOKOUT_REMOTE_ORIGIN` | None | String that indicates your git remote origin |
| `host` | `ROOKOUT_CONTROLLER_HOST` | None | If you are using a Rookout ETL Controller, this is the hostname for it |
| `port` | `ROOKOUT_CONTROLLER_PORT` | None | If you are using a Rookout ETL Controller, this is the port for it |
| `proxy` | `ROOKOUT_PROXY` | None | URL to proxy server
| `debug` | `ROOKOUT_DEBUG` | False | Set to `True` to increase log level to debug |
| `throw_errors` | --- | False | Set to `True` to reject the promsise or throw an exception if `start` fails (error messages are not printed to the console when this is set) |
| `sources` | `ROOKOUT_SOURCES` | None | Source information (see below) |
| NONE | `ROOKOUT_LIVE_LOGGER` | False | Set to `True` to enable Rookout [Live Logger](live-logger.md) |

## Transpiling and Source Maps

If your application's code is being transpiled or bundled, you must include the source maps, either "in-line" or as separate files.

### Configurations for Common Tools

- [**Webpack**](https://webpack.js.org/) - use the `inline-source-map` or `source-map` values for the `devtool` option ([reference](https://webpack.js.org/configuration/devtool)).
- [**Babel**](https://babeljs.io/) - use either `inline` or `true` values for the `sourceMaps` option ([reference](https://babeljs.io/docs/en/options#sourcemaps)).
- [**Typescript**](https://www.typescriptlang.org/) - use the `--inlineSources` and `--inlineSourceMap` flags. For [**ts-node**](https://github.com/TypeStrong/ts-node) add source maps using the `tsconfig.json` [file](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html).
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
