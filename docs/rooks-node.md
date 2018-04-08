---
id: rooks-node
title: Node Rook
---


The Node Rook is an npm package that runs inside the user's application.  
This allows us to remotely inspect the state of the process.

## Installation

To install Node Rook into the currently active node package simply run:
```bash
$ npm install --save rookout
```

## Running

To activate Node Rook within your app, add the following line to your Node code as early as possible:
```javascript
const rook = require('rookout/auto_start');
```

## Supported Versions

| Implementation     | Versions |
| ------------------ | -------- |
| **Node**           | 4, 6, 8  |

## Configuration

Node Rook is configured in the same manner as all other [rooks](rooks-config.md).
