---
id: agent
title: Agent Configuration
---

For basic installation visit our [agent installation guide](installation-agent.md).

1. [Supported operating systems](#supported-operating-systems)
2. [Using the installation script](#using-the-installation-script)
3. [Using environment variables](#using-environment-variables)
4. [Using configuration files](#using-configuration-files)

#### Supported operating systems

| Operating System   | Version    |
| ------------------ | ---------- |
| Debian             | GNU/Linux 9 (strech)       |
| Ubuntu             | 14.04 LTS, 16.04 LTS         |
| CentOS             | 6,7          |
| Red Hat Enterprise | Linux 6, 7|

#### Using the installation script

```bash
$ curl -fs https://get.rookout.com | bash

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

### Using environment variables

Rookout Agent can easily be configured using the following environment variables:

| ROOKOUT_TOKEN | ROOKOUT_LISTEN_ALL | ROOKOUT_AGENT_TAGS | ROOKOUT_SEND_DATA |
|:-------------:|:------------------:|:------------------:|:-----------------:|
| This configuration supplies the agent with a secure method to authenticate with the Rookout server.<br/><br/>It must be set for the agent to run.|Configuring the agent to listen on all addresses instead of only localhost.,The default value of this setting differs:- In the systemd service this value is set to False.- In the Docker image this value is set to True.<br/><br/>*WARNING:* It is not recommended to expose the agent port to the internet. | A list of semicolon `;` separated values (tags) that will be added to the Agent's identity.<br/>Those will be available both for the scripting engine and the frontend.<br/><br/>The default value is an empty list. | Set this value to False to prevent the Agent from sending data to the Rookout IDE. |

### Using configuration files

- For advanced use cases, the agent can be configured by editing (or creating) the JSON 
configuration file at `/etc/rookout/agent-config.json`

- Service environment configuration can be done by editing the file at `/etc/default/rookout-agent`
    - export https_proxy=https://<span></span>example.proxy:12345
