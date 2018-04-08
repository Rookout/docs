---
id: tutorials-python
title: Rookout Python Tutorial
---

In this short tutorial we are going to show you how to setup Rookout for an example Python app.   

## Server Authentication

### Sign Up
Before starting this tutorial, please make sure you have authentication information for [Rookout](https://app.rookout.com).

You will need both a username/password combination for the UI and a token for the [agent](agent.md).

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

## Run a Python script with a Rook

### Requirements:
1. [Python](https:///www.python.org) version 2.7 (or other [supported versions](/rooks/python))
1. [pip](https://pip.pypa.io/en/stable/) and [virtualenv](https://virtualenv.pypa.io/en/stable/)
1. [Node.js](https://nodejs.org/) (for the local web server)

### Step by Step
1. Prepare a Python virtual environment:
    ```bash
    $ virtualenv rookout_tutorial
    $ cd rookout_tutorial
    ```

1. Activate virtualenv:  
    **Windows**
    ```bash
    $ scripts\activate
    ```
    **Linux**
    ```bash
    $ source bin/activate
    ```
    
1. Install Python Rook into the virtual environment:
    ```bash
    $ pip install rook
    ```

1. Download and execute the tutorial Python [file](/tutorials/tutorial.py):
    ```bash
    $ wget https://rookout.github.io/tutorials/tutorial.py
    $ python tutorial.py
    ```

    **Now comes the fun part!**
    *We are going to connect to the running Python script and extract data!*

1. Setup a local web server (instructions are also available on [Rookout](https://app.rookout.com))
    ```bash
    $ npm install simple-https -g
    $ simple-https -p 8000
    ```
    
1. Login to [Rookout](https://app.rookout.com) and preform the following steps:
    1. Connect to the local web server.
    1. The rookout_tutorial folder contents showed up on the left pane. Left click tutorial.py.
    1. The file has now opened in the middle pane. Left click on line number 80.
    1. **That's it!** You have placed the default *Rookpoint* (Frame Dump) on line 80.
        Every time Python will reach that line the frame will be dumped and shown on the lower pane.

***

For in-depth view check out the following pages:
- [Agent](agent.md)
- [Python Rook](rooks-python.md)
- [Rook Points](rules-index.md)
