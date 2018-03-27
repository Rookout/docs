---
permalink: /tutorials/node
title: Rookout Node Tutorial
---

# {{ page.title}}

In this short tutorial we are going to show you how to setup Rookout for an example Node app.   

## Server Authentication

### Sign Up
Before starting this tutorial, please make sure you have authentication information for [Rookout](https://app.rookout.com).

You will need both a username/password combination for the UI and a token for the [agent](/agent).

## Agent Setup

### Using Docker

1. Download and run the Rookout agent in a container:  
    
    ```bash
    $ docker pull rookout/agent
    $ docker run -p 7486:7486 -e "ROOKOUT_TOKEN=<Your-Token>" rookout/agent
    ```

For more information about Docker go [here](https://www.docker.com/).

### Using Bash

1. Download and install the agent as a systemd or init.d service on a __linux__ machine:
    ```bash
    $ curl -fs https://get.rookout.com | sudo -H bash -s agent
    ```

## Run a Node script with a Rook

### Requirements:
1. [Node.js](https://nodejs.org/) 

### Step by Step
1. Prepare a work directory:
    ```bash
    $ mkdir rookout_tutorial
    $ cd rookout_tutorial
    ```

1. Install Node Rook into the directory:
    ```bash
    $ npm install --save rookout
    ```

1. Download and execute the tutorial Node [file](/tutorials/tutorial.js):
    ```bash
    $ wget https://rookout.github.io/tutorials/tutorial.js
    $ node tutorial.js
    ```

    **Now comes the fun part!**
    *We are going to connect to the running Node script and extract data!*

1. Setup a local web server (instructions are also available on [Rookout](https://app.rookout.com))
    ```bash
    $ npm install simple-https -g
    $ simple-https -p 8000
    ```
    
1. Login to [Rookout](https://app.rookout.com) and preform the following steps:
    1. Connect to the local web server.
    1. The rookout_tutorial folder contents showed up on the left pane. Left click tutorial.py.
    1. The file has now opened in the middle pane. Left click on line number 31.
    1. **That's it!** You have placed the default *Rookpoint* (Frame Dump) on line 31.
        Every time Node will reach that line the frame will be dumped and shown on the lower pane.

***

For in-depth view check out the following pages:
- [Agent](/agent)
- [Server](/server)
- [Node Rook](/rooks/node)
- [Rook Points](/scripts)
