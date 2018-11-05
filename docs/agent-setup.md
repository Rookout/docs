---
id: agent-setup
title: Agent Setup
sidebar_label: Agent Setup
---

## Introduction

The Rookout Agent is an ETL component that can be installed within your network. It collects debugging data from the from your application instances, performs aggregation and data redaction, and sends the results to your target data collection application. 

Using the Rookout agent you may perform all related data processing inside your own netowrk.ions.

## Installation

### 1. Using Docker

The easiest way to deploy the agent is a Docker container available [here](https://hub.docker.com/r/rookout/agent/).  
To use it, run the following command:

```bash
$ docker run -p 7486:7486 -e "ROOKOUT_TOKEN=[Your Rookout Token]" rookout/agent
```
<div class="rookout-org-info org-info-normal-snippet"></div>

### 2. Using Kubernetes and Helm

If you are running on Kubernetes, we recommend using our provided helm chart available [here](https://github.com/helm/charts/tree/master/stable/rookout).

To use it, run the following command:

```bash
$ helm install --name rookout stable/rookout --set token=[Your Rookout Token]
```
<div class="rookout-org-info org-info-normal-snippet"></div>

### 3. Linux Daemon

The Rookout Agent is available as a Linux Daemon.
To install it using a setup script, run the following commands:

```bash
$ export ROOKOUT_TOKEN=[Your Rookout Token]
$ curl -fs https://get.rookout.com | bash
```
<div class="rookout-org-info org-info-normal-snippet"></div>

Alternatively, you can download the script to disk and execute it with command line arguments:
```bash
$ curl -fs https://get.rookout.com > setup.sh
$ bash setup.sh --token=[Your Rookout Token]
```
<div class="rookout-org-info org-info-normal-snippet"></div>

#### Linux Daemon Configuration

- The enviorments variables for the Linux daemon are accessible by editing the `/etc/default/rookout-agent` file.

- By default, the Agent listens only on localhost when running in daemon mode. This can easily be changed by adding the following line to the configuration file:
```bash
export LISTEN_ALL=TRUE
```

#### Linux Daemon OS Support

The Linux daemon is supported in the following operating systems:

| Operating System   | Version    |
| ------------------ | ---------- |
| Debian             | GNU/Linux 9 (strech)       |
| Ubuntu             | 14.04 LTS, 16.04 LTS         |
| CentOS             | 6,7          |
| Red Hat Enterprise | Linux 6, 7|


## Data Processing

### Disable Sending Data

The agent connects to the Rookout Service to receive commands and report telemetry information.
Data collected from within the application may be sent to Rookout for interactive debugging sessions.

You may configure a local policy preventing the Agent from sending application data to Rookout using the following environment variable:
```bash
export ROOKOUT_SEND_DATA=FALSE
```

### Local Rule Targets

As the Agent runs within your network, it allows you to direct the collected data into data sinks.
For example, debug messages can be sent to Elasticsearch or Splunk clusters.

### Data Redaction

All data received by the agent undergoes a data redaction process based on the configuration set by the user.

## Proxy Support 

The Rookout agent has HTTPS proxy support for advanced network configurations.  
As most production systems do have automated means for proxy detection, you should configure it statically.  

This can be done in the Agent’s installation:
```bash
$ setup.sh --token=[Your Rookout Token] --https-proxy=[Your Proxy Server]
```
<div class="rookout-org-info org-info-normal-snippet"></div>

Or by setting the environment variable HTTPS_PROXY:
```bash
$ export HTTPS_PROXY=[Your Proxy Server]
```
