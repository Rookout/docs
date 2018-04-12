---
id: installation-node
title: Node
---

## Node Rook Installation

__Pre-requisites:__  
- *Node v4.x/v6.x/v8.x*

1. Add our npm package to your package.json :  
    ```bash 
    $ npm install --save rookout
    ```
    
2. Require the package in your app's entry-point file :  
    ```javascript
    const rook = require('rookout/auto_start');
    ```
    
    
### Next steps
You now need to [install the Rookout Agent.](#rookout-agent-installation)

## Examples

Full examples for integrating Rookout into your application are [available on our GitHub](https://github.com/Rookout/deployment-examples)

You will be able to find detailed procedures for all the following :

- [On Google AppEngine](https://github.com/Rookout/deployment-examples/tree/master/app-engine-flexible)
- [On AWS Elastic Container Service](https://github.com/Rookout/deployment-examples/tree/master/aws-ecs)
- [On AWS Elastic Beanstalk](https://github.com/Rookout/deployment-examples/tree/master/aws-beanstalk/node-elasticbeanstalk)
- [Using TypeScript](https://github.com/Rookout/deployment-examples/tree/master/node-typescript)
