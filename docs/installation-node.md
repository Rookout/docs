---
id: installation-node
title: Node Rook Setup
---

### Pre-requisites:
- *Node v4.3+/v6.x/v8.x/v10.x* ([download here](https://nodejs.org/))

### Setup guide

1. Add our npm package to your package.json :  
    ```bash 
    $ npm install --save rookout
    ```
    
1. Require the package in your app's entry-point file :  
    ```javascript
    const rook = require('rookout/auto_start');
    ```

1. Configure the required environment variables:

    ```bash
    $ export ROOKOUT_TOKEN=<Your Rookout Token>
    $ export ROOKOUT_AGENT_HOST=cloud.agent.rookout.com 
    $ export ROOKOUT_AGENT_PORT=443
    $ export ROOKOUT_ROOK_TAGS=<List of semicolon ; separated values to identify this app instance>
    ```

    <details>
    <summary>_Installing the npm package using a proxy_</summary>

    Unix:
    ```bash
    export HTTPS_PROXY=https://mypro.xy:1234 && npm install --save rookout
    ```
    Windows:
    ```bash
    set HTTPS_PROXY=https://mypro.xy:1234 && npm install --save rookout
    ```

    </details>
    
Once your application is deployed, navigate to the Rookout App Instances page to make sure it is available for debugging.
If you encounter any issues, check out our [Troubleshooting section](troubleshooting-rooks.md).

## Examples

Check out the following deployment examples:

- [Google AppEngine](https://github.com/Rookout/deployment-examples/tree/master/node-app-engine-flex)
- [AWS Elastic Container Service](https://github.com/Rookout/deployment-examples/tree/master/node-aws-ecs)
- [AWS Elastic Beanstalk](https://github.com/Rookout/deployment-examples/tree/master/node-aws-elasticbeanstalk)
- [Using TypeScript](https://github.com/Rookout/deployment-examples/tree/master/node-typescript)
- [AWS Lambda](https://github.com/Rookout/deployment-examples/tree/master/node-aws-lambda)
- [IBM Cloud Functions](https://github.com/Rookout/deployment-examples/tree/master/node-ibm-cloud-functions)
- [Electron](https://github.com/Rookout/deployment-examples/tree/master/node-electron)

Or visit [our GitHub repository](https://github.com/Rookout/deployment-examples) for more.