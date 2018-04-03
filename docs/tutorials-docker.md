---
id: tutorials-docker
title: Rookout Docker Tutorial
---

In this short tutorial we are going to show you how to setup Rookout a Docker deployment. 
We'll use the Python app from the [Python Tutorial](/tutorials/python).

For more information about Docker go [here](https://www.docker.com/).

## Server Authentication

### Sign Up
Before starting this tutorial, please make sure you have authentication information for [Rookout](https://app.rookout.com).

You will need both a username/password combination for the UI and a token for the [agent](/agent).

## Agent Setup

1. Download and run the Rookout agent in a container (we are creating a separate [network](https://docs.docker.com/engine/userguide/networking/#bridge-networks) for this tutorial):  
    ```bash
    $ docker network create --driver bridge rookout
    $ docker pull rookout/agent
    $ docker run --network rookout --name agent -e "ROOKOUT_TOKEN=<Your-Token>" rookout/agent
    ```

**Note**: If you have a problem with the container and need to run it again, you can delete the old one using:

    ```bash
    $ docker container stop agent
    $ docker container rm agent
    ```

## Run a Python script with Rook

### Requirements:
1. [Docker](https://www.docker.com/).
1. [Node.js](https://nodejs.org/) (for the local web server)

### Step by Step
1. Prepare a work directory:
    ```bash
    $ mkdir rookout_tutorial
    $ cd rookout_tutorial
    ```
    
1. Download the tutorial Python [file](/tutorials/tutorial.py):
    ```bash
    $ wget {{ site.baseurl}}/tutorials/tutorial.py
    ```

1. Prepare the Dockerfile for building the image:
    ```dockerfile
    # Use the Python official base image
    FROM python:2.7
 
    # Install the Python Rook into the Docker image
    RUN curl -fs https://get.rookout.com | bash -s python-rook
 
    # Point the Rook to the agent container
    ENV ROOKOUT_AGENT_HOST="agent" 
 
    # Copy our app in
    COPY tutorial.py .

    # Set it to run on startup 
    CMD ["python", "tutorial.py"] 
    ```
    
1. Build and run the Dockerfile:
    ```bash
    $ docker build . -t rookout_tutorial
    $ docker run -t --network rookout rookout_tutorial
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
    1. The file has now opened in the middle pane. Left click on line number 78.
    1. **That's it!** You have placed the default *Rookpoint* (Frame Dump) on line 78.
        Every time Python will reach that line the frame will be dumped and shown on the lower pane.

***

For in-depth view check out the following pages:
- [Agent](/agent)
- [Server](/server)
- [Python Rook](/rooks/python)
- [Rook Points](/scripts)
