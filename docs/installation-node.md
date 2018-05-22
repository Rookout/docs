---
id: installation-node
title: Node
---

## Node Rook Installation

__Pre-requisites:__  
- *Node v4.x/v6.x/v8.x* ([download here](https://nodejs.org/))
1. Add our npm package to your package.json :  
    ```bash 
    $ npm install --save rookout
    ```
    
1. Require the package in your app's entry-point file :  
    ```javascript
    const rook = require('rookout/auto_start');
    ```
    
To check if the rook connects successfully to the agent, see how to in the [Troubleshooting section](troubleshooting-rooks.md)

    
### Next steps
You now need to [install the Rookout Agent.](installation-agent.md)

## Examples

Full examples for integrating Rookout into your application are [available on our GitHub](https://github.com/Rookout/deployment-examples)

You will be able to find detailed procedures for all the following :

- [On Google AppEngine](https://github.com/Rookout/deployment-examples/tree/master/node-app-engine-flex)
- [On AWS Elastic Container Service](https://github.com/Rookout/deployment-examples/tree/master/node-aws-ecs)
- [On AWS Elastic Beanstalk](https://github.com/Rookout/deployment-examples/tree/master/node-aws-elasticbeanstalk)
- [Using TypeScript](https://github.com/Rookout/deployment-examples/tree/master/node-typescript)
- [With AWS Lambda](https://github.com/Rookout/deployment-examples/tree/master/node-aws-lambda)
