---
id: agent-setup
title: Agent Setup
sidebar_label: Agent Setup
---

## Introduction

The Rookout ETL Agent is a component that can be installed within your network.  
The ETL Agent is only meant for advanced deployments meeting complex network and security requirements.  
Using the Rookout ETL Agent you may perform all related data processing inside your own network.

## Run as Container

The easiest way to deploy the ETL Agent is as a Docker container [available here](https://hub.docker.com/r/rookout/agent/).  
The ETL Agent can be configured to your needs using environment variables. 

### 1. Docker

To run as a Docker container, simply execute:

```bash
docker run -p 7486:7486 -e "ROOKOUT_TOKEN=[Your Rookout Token]" rookout/agent
```
<div class="rookout-org-info"></div>

### 2. Kubernetes and Helm

If you are running on Kubernetes, we recommend using our provided helm chart [available here](https://github.com/helm/charts/tree/master/stable/rookout).

Simply execute:

```bash
helm install --name rookout stable/rookout --set token=[Your Rookout Token]
```
<div class="rookout-org-info"></div>

## Run as Daemon

The Rookout ETL Agent is also available as a Linux Daemon.  
To install it using a setup script, run the following commands:

```bash
export ROOKOUT_TOKEN=[Your Rookout Token]
curl -fs https://get.rookout.com | bash
```
<div class="rookout-org-info"></div>

Alternatively, you can download the script to disk and execute it with command line arguments (see more options below):

```bash
curl -fs https://get.rookout.com > setup.sh
bash setup.sh --token=[Your Rookout Token]
```
<div class="rookout-org-info"></div>

### Linux Daemon Configuration

- The enviorments variables for the Linux daemon are accessible by editing the `/etc/default/rookout-agent` file.

- By default, the ETL Agent listens only on localhost when running in daemon mode.  
This can easily be changed by adding the following line to the configuration file:
```bash
export ROOKOUT_LISTEN_ALL=TRUE
```

### Linux Daemon OS Support

The Linux daemon is supported in the following operating systems:

| Operating System   | Version    |
| ------------------ | ---------- |
| Debian             | GNU/Linux 9 (strech)       |
| Ubuntu             | 14.04 LTS, 16.04 LTS         |
| CentOS             | 6,7          |
| Red Hat Enterprise | Linux 6, 7|

### Linux Daemon Update

The linux deamon can be updated to the latest version using the following command:
```bash
curl -fs https://get.rookout.com > setup.sh
bash setup.sh --update
```
The ETL Agent configuration will be saved during the update process.

### Linux Daemon Restart

When modifying the configuration it is important to restart the ETL Agent using one of the following options:

<ul class="nav nav-tabs" id="agent-restart" role="tablist">
<li class="nav-item">
<a class="nav-link active" id="initd-tab" data-toggle="tab" href="#initd" role="tab" aria-selected="true">init.d</a>
</li>
<li class="nav-item">
<a class="nav-link" id="systemd-tab" data-toggle="tab" href="#systemd" role="tab" aria-selected="false">systemd</a>
</li>
</ul>

<div class="tab-content" id="agent-restart">
<div class="tab-pane fade show active" id="initd" role="tabpanel">

```bash
/etc/init.d/rookout-agent restart
```

</div>
<div class="tab-pane fade" id="systemd" role="tabpanel">

```bash
systemctl restart rookout-agent
```

</div>
</div>

### Linux Daemon Uninstall

To uninstall the linux daemon run the following command:

```bash
curl -fs https://get.rookout.com/remove_agent.sh | bash
```

## Data Processing

### Disable Sending Data

The ETL Agent connects to the Rookout Service to receive commands and report telemetry information.  
Data collected from within the application may be sent to Rookout for interactive debugging sessions.

You may configure a local policy preventing the ETL Agent from sending application data to Rookout by adding the following line to the configuration file at `/etc/default/rookout-agent` .

```bash
export ROOKOUT_SEND_DATA=FALSE
```

### Local Breakpoint Targets

As the ETL Agent runs within your network, it allows you to direct the collected data into data sinks.  
For example, debug messages can be sent to Elasticsearch or Splunk clusters.

### Data Redaction

All data received by the ETL gent undergoes a data redaction process based on the configuration set by the user.

## Proxy Support 

The Rookout ETL Agent has HTTPS proxy support for advanced network configurations.  
As most production systems do have automated means for proxy detection, you should configure it statically.  

This can be done when installing the ETL Agent:
```bash
setup.sh --token=[Your Rookout Token] --https-proxy=[Your Proxy Server]
```
<div class="rookout-org-info"></div>

Or by adding the HTTPS_PROXY configuration to the ETL Agent configuration file at `/etc/default/rookout-agent` :

```bash
export HTTPS_PROXY=[Your Proxy Server]
```

## Performance Considerations

A single ETL Agent can handle thousands of concurrent applications connected to it, but the default configuration is optimized for about 100 concurrent applications.

The default limits include:
1. The ETL Agent is restricted to use a single CPU core - to change the limit set `ROOKOUT_AGENT_MAX_CPU` to the desired number of cores.
1. The ETL Agent is restricted to 512MB of RAM - to change the limit set `ROOKOUT_AGENT_MAX_MEMORY` to the desired memory in megabytes. Should the ETL Agent exceed that, it will exit with message similar to:
```text
Memory limit reached (520 Mb) The limit is (512 Mb) - exiting
```

## License

The Rookout ETL Agent usage license may be found here:
[Rookout ETL Agent License](license.md)
