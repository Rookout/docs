---
id: agent
title: Rookout Agent
---

The Rookout agent provides local orchestration of data collection as well as basic ETL functionality.
It allows loading the data into local targets such as file system and elasticsearch.

## Installation

The Rookout agent is distributed in multiple forms:
1. Docker image
2. systemd service

Please note that the ROOKOUT_TOKEN environment variable must be set for the agent to run.

### Docker Image

The Rookout agent is available as a public Docker [image](https://hub.docker.com/r/rookout/agent/) based on Alpine Linux.

To activate it execute:
```bash
$ docker pull rookout/agent
$ docker run -p 7486:7486 -e "ROOKOUT_TOKEN=<Your-Token>" rookout/agent
```

**Note:** For production deployment it is recommended to set the auto restart policy of Docker or the management platform.

### systemd service
For systemd (Linux) based operating system the agent is available as a service. To install it execute:
```bash
$ curl -fs https://get.rookout.com | bash
```

```
Usage: setup.sh [-h] [-dv] [-k=token] [--site=url] [--https-proxy=url]

Installs rookout-agent

Flags:
-h, --help                    Display this usage prompt
-v, --verbose                 Verbose mode
-d, --debug                   Debug mode (echo on)
-k=token, --token=token       Rookout Token
--site=url                    Alternative URL for agent
--https-proxy=url             HTTPS Proxy for agent to use
```

#### Supported Operating Systems

| Operating System   | Version    |
| ------------------ | ---------- |
| Debian             | None       |
| Ubuntu             | 16         |
| CentOS             | 7          |

## Configuration Variables

Rookout Agent can easily be configured using the following environment variables:

##### ROOKOUT_TOKEN
This configuration supplies the agent with a secure method to authenticate with the Rookout server.  
It must be set for the agent to run.

##### ROOKOUT_LISTEN_ALL
Configuring the agent to listen on all addresses instead of only localhost.  
The default value of this setting differs:
- In the systemd service this value is set to False.
- In the Docker image this value is set to True.

*WARNING:* It is not recommended to expose the agent port to the internet.

##### ROOKOUT_AGENT_TAGS
A list of comma separated values (tags) that will be added to the Agent's identity.  
Those will be available both for the scripting engine and the frontend.  
The default value is an empty list.

## Configuration Files

- For advanced use cases, the agent can be configured by editing (or creating) the JSON 
configuration file at `/etc/rookout/agent-config.json`

- Service environment configuration can be done by editing the file at `/etc/default/rookout-agent`
    - export https_proxy=https://<span></span>example.proxy:12345
