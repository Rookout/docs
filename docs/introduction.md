---
id: introduction
title: First steps with Rookout
sidebar_label: Rookout Introduction
---

## What is Rookout

Rookout real-time instrumentation means you don’t need to restart, redeploy or write code to see inside your app.

Our solution supports Python, JVM, and NodeJS on AWS, Azure and Google Cloud or on your bare metal. We provide
end-to-end security, coupled with a small footprint and a negligible performance impact.

<details>
<summary>_What is a Rookout Agent?_</summary>
<p>
The Rookout agent provides local orchestration of data collection as well as basic ETL functionality.
It allows loading the data into local targets such as file system and elasticsearch.

The Agent can be either installed directly onto a systemd compatible OS, as a Docker container (recommended)
or as a service hosted by Rookout, connecting to the agent remotely.

For more information about the Agent see [Agent Overview](agent.md)
</p>
</details>

<details>
<summary>_What is a Rook?_</summary>
<p>
Rooks are the component that allows you to collect data directly from a running application.  
A Rook is a dependency that is loaded directly from your application as any other library.  

For more information about Rooks see [Rooks Overview](rooks-index.md)
</p>
</details>

#### Watch our demo

<iframe style="margin: 20px 0 0 0" width="560" height="315" src="https://www.youtube.com/embed/qTdpOC92DBI?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

## Tutorial

### Pre-requisites

- [docker-compose](https://docs.docker.com/compose/install/)

- [Rookout account](https://www.rookout.com/join-our-early-adopters-plan/)


### Tutorial

Choose your preferred language for the tutorial

[NodeJS Tutorial](node-getting-started.md)  
[Python Tutorial](python-getting-started.md)