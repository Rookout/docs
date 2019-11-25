---
id: agent-setup
title: Controller Setup
sidebar_label: Controller Setup
---

## Introduction

The Rookout ETL Controller is a component that can be installed within your network.  
The ETL Controller is only meant for advanced deployments meeting complex network and security requirements.  
Using the Rookout ETL Controller you may perform all related data processing inside your own network.

## Run as Container

The easiest way to deploy the ETL Controller is as a Docker container [available here](https://hub.docker.com/r/rookout/controller/).  
The ETL Controller can be configured to your needs using environment variables. 

### 1. Docker

To run as a Docker container, simply execute:

```bash
docker run -p 7488:7488 -e "ROOKOUT_TOKEN=[Your Rookout Token]" rookout/controller
```
<div class="rookout-org-info"></div>

### 2. Kubernetes and Helm

If you are running on Kubernetes, we recommend using our provided helm chart [available here](https://github.com/Rookout/helm-charts/tree/master/charts/controller).

Simply execute:

```bash
helm repo add rookout https://helm-charts.rookout.com
helm repo update
helm install --name my-release rookout/controller --set controller.token=[Your Rookout Token]
```
<div class="rookout-org-info"></div>

## Run as Daemon

The Rookout ETL Controller is also available as a Linux Daemon.  
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

- The environment variables for the Linux daemon are accessible by editing the `/etc/default/rookout-controller` file.

- By default, the ETL Controller listens only on localhost when running in daemon mode.  
This can easily be changed by adding the following line to the configuration file:
```bash
export ROOKOUT_LISTEN_ALL=TRUE
```

You can also do this when installing the ETL controller:

```bash
setup.sh --token=[Your Rookout Token] --listen-all
```
<div class="rookout-org-info"></div>

### Linux Daemon OS Support

The Linux daemon is supported in the following operating systems:

| Operating System   | Version    |
| ------------------ | ---------- |
| Debian             | GNU/Linux 9 (strech)       |
| Ubuntu             | 14.04 LTS, 16.04 LTS         |
| CentOS             | 6,7          |
| Red Hat Enterprise | Linux 6, 7|

### Linux Daemon Update

The linux deamon can be updated to the latest version by rerunning the setup script:

If you would like to keep the pre-existing configuration rather than overwriting it with the flags specified now, use `--keep-old-config` 

```bash
curl -fs https://get.rookout.com > setup.sh
bash setup.sh --keep-old-config
```


If you don't specify `--keep-old-config`, the new version will be installed using the new settings.

### Linux Daemon Restart

When modifying the configuration it is important to restart the ETL Controller using one of the following options:

<!--DOCUSAURUS_CODE_TABS-->
<!--initd-->
```bash
/etc/init.d/rookout-controller restart
```
<!--systemd-->
```bash
systemctl restart rookout-controller
```
<!--END_DOCUSAURUS_CODE_TABS-->


### Linux Daemon Uninstall

To uninstall the linux daemon run the following command:

```bash
curl -fs https://get.rookout.com/remove_controller.sh | sudo bash
```

## Data Processing

### Disable Sending Data

The ETL Controller connects to the Rookout Service to receive commands and report telemetry information.  
Data collected from within the application may be sent to Rookout for interactive debugging sessions.

You may configure a local policy preventing the ETL Controller from sending application data to Rookout by adding the following line to the configuration file at `/etc/default/rookout-controller` .

```bash
export ROOKOUT_SEND_DATA=FALSE
```

### Local Breakpoint Targets

As the ETL Controller runs within your network, it allows you to direct the collected data into data sinks.  
For example, debug messages can be sent to Elasticsearch or Splunk clusters.

### Data Redaction

All data received by the ETL agent undergoes a data redaction process based on the configuration set by the user.

## Proxy Support 

The Rookout ETL Controller has HTTPS proxy support for advanced network configurations.  
As most production systems do have automated means for proxy detection, you should configure it statically.  

This can be done when installing the ETL Controller:
```bash
setup.sh --token=[Your Rookout Token] --https-proxy=[Your Proxy Server]
```
<div class="rookout-org-info"></div>

Or by adding the ROOKOUT_PROXY configuration to the ETL Controller configuration file at `/etc/default/rookout-controller` :

```bash
export ROOKOUT_PROXY=[Your Proxy Server]
```

## Security options

The controller uses the system certificate store to verify secure connections to servers. If you prefer to skip certificate verification,
you can set the `ROOKOUT_SKIP_SSL_VERIFY` environment variable.

```bash
export ROOKOUT_SKIP_SSL_VERIFY=1
```

**Note**: This might compromise the security of your system.

## Performance Considerations

A single ETL Controller can handle thousands of concurrent applications connected to it, but the default configuration is optimized for about 100 concurrent applications.

The default limits include:
1. The ETL Controller is restricted to use a single CPU core - to change the limit set `ROOKOUT_CONTROLLER_MAX_CPU` to the desired number of cores.
2. The ETL Controller is restricted to 512MB of RAM - to change the limit set `ROOKOUT_CONTROLLER_MAX_MEMORY` to the desired memory in megabytes. Should the ETL Controller exceed that, it will exit with message similar to:
```text
Memory limit reached (520 Mb) The limit is (512 Mb) - exiting
```

You can also adjust the limit when installing the ETL controller:

```bash
setup.sh --token=[Your Rookout Token] --max-mem=1024
```
<div class="rookout-org-info"></div>

## Health Check

If you would like to perform a health check on the Rookout ETL Controller, you can access http://<ROOKOUT_CONTROLLER_HOST>:<ROOKOUT_CONTROLLER_PORT>/healthz.  For example, a default configuration on your localhost might make the health check URL available at http://localhost:7488/healthz.  A healthy ETL Controller will return an HTTP 200 OK response.

## License

The Rookout ETL Controller usage license may be found here:
[Rookout ETL Controller License](license.md)
