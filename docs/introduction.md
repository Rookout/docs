---
id: introduction
title: First steps with Rookout
sidebar_label: Rookout Introduction
---

## What is Rookout

Rookout real-time instrumentation means you don’t need to restart, redeploy or write code to see inside your app.
It also means you can debug your staging or production environments just easily as debugging on your local machine.

Rookout lets you debug apps written in Python, Java, or NodeJS, whether they are deployed on AWS, Azure, Google Cloud or on your bare metal.
All this is done while providing end-to-end security, coupled with a small footprint and a negligible performance impact.

### The Rookout App

Rookout is available at [app.rookout.com](https://app.rookout.com/) and provides a web based IDE for real time debugging.
Once you have access to the Rookout Service, you'll be able to setup Rooks and Rules in order to debug your application.
The Rookout service also functions as an ETL component for TBD.

### Rooks and Rules

Rooks are the component that allows you to collect data directly from a running application.  
A Rook is a dependency that is loaded directly from your application as any other library.

Once a Rook is deployed with your application, a Rule can be set to watch a specific line of code.
A Rule defines what data will be collected, how it should be formatted, and where it should be sent.

For more information about Rooks and Rules see [Rooks Overview](rooks-index.md) and [Rules Overview](rules-index.md)


### Watch our demo

<iframe style="margin: 20px 0 0 0" width="560" height="315" src="https://www.youtube.com/embed/qTdpOC92DBI?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

## Rookout hands-on Tutorial

In this tutorial you will be able to debug a simple sandbox application we wrote for you.
The sandbox application in Node.JS and Python flavors, and can easily be deployed using a provided Docker image.
Before moving forward, make sure you have a [Rookout account](https://www.rookout.com/trial/)

### Prerequisites

- [Docker Compose](https://docs.docker.com/compose/install/) will allow you to setup the sandbox application with a single command line

- If you own a Mac, you need to install `xcode` command line tools: `sudo xcode-select --install`

- We assume you have either [Node.js](https://nodejs.org/) , [Python](https://www.python.org/) or [Java](http://www.oracle.com/) ready and available


### Language selection

Choose your preferred language for the tutorial:
    
      
   
<a class="tutorial-button" href="node-getting-started.html">
<img src="/img/logos/nodejs.png" width="120px" height="50px"/>
</a>
<a class="tutorial-button" href="python-getting-started.html">
<img src="/img/logos/python.png" width="120px" height="50px" />
</a>
<a class="tutorial-button" href="java-getting-started.html">
<img src="/img/logos/python.png" width="120px" height="50px" />
</a>