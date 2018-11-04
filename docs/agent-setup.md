---
id: agent-setup
title: Agent Setup
sidebar_label: Agent Setup
---

## Introduction

The Rookout Agent is an ETL component that can be installed within your network. It collects debugging data from the from your application instances, performs aggregation and data redaction, and sends the results to your target data collection application. This allows you to guarantee that sensitive debug data does not make it to unwanted destinations.

## Installation

### 1. Using Docker

The easiest way to deploy the agent is a Docker container available [here](https://hub.docker.com/r/rookout/agent/).  
To use it, run the following command:

```bash
$ docker run -p 7486:7486 -e "ROOKOUT_TOKEN=[Your Rookout Token]" rookout/agent
```

### 2. Using Kubernetes and Helm

If you are running on Kubernetes, we recommend using our provided helm chart available [here](https://github.com/helm/charts/tree/master/stable/rookout).

To use it, run the following command:

```bash
$ helm install --name rookout stable/rookout --set token=[Your Rookout Token]
```

### 3. Linux Daemon

The Rookout Agent is available as a Linux Daemon.
To install it using a setup script, run the following commands:

```bash
$ export ROOKOUT_TOKEN=[Your Rookout Token]
$ curl -fs https://get.rookout.com | bash
```

Alternatively, you can download the script directly from the following link: https://get.rookout.com  
And run it using the following commands:
```bash
$ curl -fs https://get.rookout.com > setup.sh
$ bash setup.sh --token=[Your Rookout Token]
```

#### Linux Daemon configuration

- Linux Daemon configuration is easily accessible through environment variables.    
The easiest way to work with it is to add export statements in this file:
/etc/default/rookout-agent

- By default, the Agent listens only on localhost when running in daemon mode.  
The easiest way to do that is to set the LISTEN_ALL environment variable in the env configuration file.

- Linux Daemon is supported in the following operating systems:

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
To prevent sending data to the Rookout Service due to security restrictions, set the environment variable ROOKOUT_SEND_DATA to false.

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

Or by setting the environment variable HTTPS_PROXY:
```bash
$ export HTTPS_PROXY=[Your Proxy Server]
```
