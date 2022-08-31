---
id: node-setup
title: Node.js SDK
sidebar_label: Node.js
---

This page will dive into the nitty gritty details on installing Rookout under various configurations.  

## Installation

Install the Rookout [Node SDK](https://www.npmjs.com/package/rookout) using one of the following methods:

<!--DOCUSAURUS_CODE_TABS-->

<!--NPM-->

```bash
npm install --save rookout
```

<!--Yarn-->

```bash
yarn add rookout
```

<!--END_DOCUSAURUS_CODE_TABS-->

## Setup

To add the SDK to your application, add:

```javascript
const rookout = require('rookout');
```

### Start

To start the SDK, add the following to your app’s entry point:

```javascript
rookout.start({
    token: '[Your Rookout Token]',
    labels:
        {
            env: "dev" // Optional, see the Labels page for more info.
        }
});
```
<div class="rookout-org-info"></div>

Note that the `rookout.start` method returns a promise that resolves (fulfills) when the connection attempt either succeeds or fails. You can change this behavior by setting the `throw_errors` parameter to `true` (to reject on fail). Either way, you can choose to utilize this Promise or ignore it.

### Flush

The `flush` method allows explicitly flushing the Rookout logs and messages.  
The callback is executed when the method finishes.

```js
rookout.flush(cb);
```

### Connectivity test

To make sure the SDK is properly configured and test your connection (using environment variables only), run the following command:
```bash
./node_modules/.bin/rookout-check
```

## Configuration

The following table includes all configuration options. Pass them to the `rookout.start` method or using environment variables.

| Parameter | Environment Variable | Default Value | Description |
| --- | --- | --- | --- |
| `token` | `ROOKOUT_TOKEN` | None | The Rookout token for your organization. May be left empty if you are using a Rookout ETL Controller |
| `labels` | `ROOKOUT_LABELS` | {} | A dictionary of key:value labels for your application instances. Use `k:v,k:v` format for environment variables |
| `git_commit` | `ROOKOUT_COMMIT` | None | String that indicates your git commit or a branch name |
| `git_origin` | `ROOKOUT_REMOTE_ORIGIN` | None | String that indicates your git remote origin |
| `host` | `ROOKOUT_CONTROLLER_HOST` | None | If you are using a Rookout ETL Controller, this is the hostname for it |
| `port` | `ROOKOUT_CONTROLLER_PORT` | None | If you are using a Rookout ETL Controller, this is the port for it |
| `proxy` | `ROOKOUT_PROXY` | None | URL to proxy server
| `debug` | `ROOKOUT_DEBUG` | False | Set to `True` to increase log level to debug |
| `throw_errors` | --- | False | Set to `True` to reject the promsie when `start` fails |
| `sources` | `ROOKOUT_SOURCES` | None | Sources information (see [info below](#multiple-sources)). Replaces `ROOKOUT_COMMIT` and `ROOKOUT_REMOTE_ORIGIN` |
| `live_logger` | `ROOKOUT_LIVE_LOGGER` | False | Set to `True` to enable Rookout [Live Logger](live-logger.md) |

## Code manipulation

### Source maps

If your application's code is being transpiled or bundled, you must include the source maps, either in-line or as separate files.

- [**Webpack**](https://webpack.js.org/) - use either the `inline-source-map` or `source-map` values for the `devtool` option in the webpack config file ([reference](https://webpack.js.org/configuration/devtool)).
- [**Babel**](https://babeljs.io/) - use either the `"inline"`, `"both"` or `true` values for the `sourceMaps` option in the Babel config file ([reference](https://babeljs.io/docs/en/options#sourcemaps)).
- [**TypeScript**](https://www.typescriptlang.org/) - add either `"inlineSourceMap": true` or `"sourceMap": true` as well as `"inlineSources": true` in the TypeScript config file ([reference](https://www.typescriptlang.org/tsconfig#inlineSourceMap)).
- [**CoffeeScript**](https://coffeescript.org/) - pass either the `-M` (inline) or `-m` flags to the `coffee` CLI tool ([reference](https://coffeescript.org/#usage)).

### Bundling tools

By default, Webpack packs Rookout with all other modules, which can get tricky and may not work. We recommend excluding it from the bundle by following these instructions:

- **Webpack** - There are two options, both require editing the `webpack.config.js` file:
    1. **Exclude all modules** - Import `webpack-node-externals` like so: `const nodeExternals = require('webpack-node-externals');`, then add `externals: [nodeExternals()]` to `module.exports`.
    1. **Exclude Rookout only** - Add `externals: {'rookout': 'commonjs rookout'}` to `module.exports`, or `externals: {'rookout/lambda': 'commonjs rookout/lambda'}` if running on AWS Lambda with [our wrapper](#integrating-with-serverless).

- **Angular Universal** - Add `"externalDependencies": ["rookout"],` under `"options"` inside `angular.json`.

**Note:** In this case, the `node_modules` directory must be available where your application is running, as the modules will no longer get packed into the bundle. If you only excluded the Rookout module, only it needs to be available.

### Uglification/minification

Rookout works with uglified/minified code if it's provided with source maps, however, mangling (changing of variable names) should not be applied.

Webpack may automatically mangle variable names when used in production. To disable mangling in webpack, add the following to `webpack.config.js`:

```js
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
 
 // ...

 optimization: {
   minimizer: [new TerserPlugin({
      terserOptions: {
         mangle: false,
       },
   })],
 },
};
```

## Source information

To enable automatic source fetching, information about the source control must be specified.

### Environment Variables or Start Parameters

Use the environment variables or start parameters as described above in the API section. 

### Git Folder

Rookout gets the source information from the .git folder if both of the following apply:

1. The .git folder is present at any of the parent directories of where the application is running (searching up the tree).
2. No environment variables or start parameters are set for source information.

### Multiple Sources

Use the environment variable `ROOKOUT_SOURCES` to initialize the SDK with information about the sources used in your application.

ROOKOUT_SOURCES is a semicolon-separated list with a source control repository and revision information. 
This will allow Rookout to automatically fetch your application's source code from the right revision, and also additional dependencies' sources.
When using Git the repository is a URL (remote origin) and the revision is a full commit hash or a branch name.

For example let's say I use https://github.com/Rookout/tutorial-nodejs with the commit 2f79053d7bc7c9c9561a30dda202b3dcd2b72b90 and I use the Lodash package (https://github.com/lodash/lodash) from its master branch:
```
ROOKOUT_SOURCES=https://github.com/Rookout/tutorial-nodejs#cf85c4e0365d8082ca2e1af63ca8b5b436a13909;https://github.com/lodash/lodash#master
```

## Supported Versions

Rookout supports the following NodeJS versions:

| Release  | Versions            |
| ---      | ---                 |
| **12**   | 12.5.0 --> 12.22.12 |
| **14**   | 14.0.0 --> 14.20.0  |
| **16**   | 16.0.0 --> 16.17.0  |
| **18**   | 18.0.0 --> 18.8.0   |

We strongly recommend using one of the supported NodeJS (LTS) versions, however there is limited support for the following versions:

| Release  | Versions            |
| ---      | ---                 |
| **9**    | 9.0.0  --> 9.11.2   |
| **10**   | 10.0.0 --> 10.24.1  |
| **11**   | 11.0.0 --> 11.15.0  |
| **12**   | 12.0.0 --> 12.4.0   |

For other NodeJS versions, please [contact us](https://www.rookout.com/company/contact).

**Note:** The Rookout NodeJS SDK does not support running side-by-side with another debugger.

## Serverless and PaaS Deployments

### Integrating with serverless

For most serverless types, you can install Rookout normally, as described [above](#setup).

For AWS Lambda, it is recommended to use the provided wrapper like so:

```js
const rookout = require('rookout/lambda');

function handler(event, context, callback) {
        callback(null, "Hello World");
}

exports.handler = rookout.wrap(handler, {token: '[Your Rookout Token]', labels: {env: "dev"}});
```

<div class="rookout-org-info"></div>

### Serverless cold-start times

Cold start time may increase by up to 500ms when using Rookout. If cold-start times are critical, the initialization time can be further reduced by adding `quick: true` to the options object of the Lambda wrapper, or setting "ROOKOUT_LAMBDA_QUICK_START=True" as an environment variable.

<div class="rookout-org-info"></div>

## Debugging Node Modules

By default, Rookout ignores your project's dependencies in the `node_modules` folder.

If the project you wish to debug is installed as a node module, create a file in the project's repository root folder, called `.rookout`, with the following content:

```
#package
```

**Note:** Rookout does not map the most common NPM packages for performance reasons and does not allow setting breakpoints inside such packages.
