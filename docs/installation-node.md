---
id: installation-node
title: Node
---

## Adding a Node.js Rook

__Pre-requisites:__  
- *Node v4.3+/v6.x/v8.x/v10.x* ([download here](https://nodejs.org/))
1. Add our npm package to your package.json :  
    ```bash 
    $ npm install --save rookout
    ```
    
1. Require the package in your app's entry-point file :  
    ```javascript
    const rook = require('rookout/auto_start');
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
If you encounter any issues, check out our [Troubleshooting section](troubleshooting-rooks.md)

## Examples

Full examples for integrating Rookout into your application are [available on our GitHub](https://github.com/Rookout/deployment-examples)

You will be able to find detailed procedures for all the following :

- [On Google AppEngine](https://github.com/Rookout/deployment-examples/tree/master/node-app-engine-flex)
- [On AWS Elastic Container Service](https://github.com/Rookout/deployment-examples/tree/master/node-aws-ecs)
- [On AWS Elastic Beanstalk](https://github.com/Rookout/deployment-examples/tree/master/node-aws-elasticbeanstalk)
- [Using TypeScript](https://github.com/Rookout/deployment-examples/tree/master/node-typescript)
- [With AWS Lambda](https://github.com/Rookout/deployment-examples/tree/master/node-aws-lambda)
- [With IBM Cloud Functions](https://github.com/Rookout/deployment-examples/tree/master/node-ibm-cloud-functions)
- [Electron](https://github.com/Rookout/deployment-examples/tree/master/node-electron)
