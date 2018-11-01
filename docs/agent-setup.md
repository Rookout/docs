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
$ helm install --name [Your release name] stable/rookout --set token=[Your Rookout Token]
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
$ setup.sh --token=[Your Rookout Token]
```