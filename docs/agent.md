---
id: agent
title: Rookout Agent
---

Rookout Agents can be installed locally and provide a gateway between Rooks and the Rookout App.
They allow setting up Rooks in applications that cannot access the Rookout App.

For basic installation visit our [agent installation guide](installation-agent.md).

1. [Installation flags](#installation-flags)
2. [Supported operating systems](#os-support)
3. [Configuration Variables](#config-vars)
4. [Configuration Files](#config-files)

#### Installation flags

```bash
setup.sh [-h] [-dv] [-k=token] [--site=url] [--https-proxy=url]

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

Debian GNU/Linux 9 (stretch)
CentOS 6, 7
Ubuntu 14.04 LTS , 16.04 LTS
Red Hat Enterprise Linux 6, 7

#### Configuration Variables

Rookout Agent can easily be configured using the following environment variables:

| ROOKOUT_TOKEN | ROOKOUT_LISTEN_ALL | ROOKOUT_AGENT_TAGS |
|:----------------------------------------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| This configuration supplies the agent with a secure method to authenticate with the Rookout server.<br/><br/>It must be set for the agent to run. | Configuring the agent to listen on all addresses instead of only localhost.,The default value of this setting differs:- In the systemd service this value is set to False.- In the Docker image this value is set to True.<br/><br/>*WARNING:* It is not recommended to expose the agent port to the internet. | A list of semicolon `;` separated values (tags) that will be added to the Agent's identity.<br/>Those will be available both for the scripting engine and the frontend.<br/><br/>The default value is an empty list. |

#### Configuration Files

- For advanced use cases, the agent can be configured by editing (or creating) the JSON 
configuration file at `/etc/rookout/agent-config.json`

- Service environment configuration can be done by editing the file at `/etc/default/rookout-agent`
    - export https_proxy=https://<span></span>example.proxy:12345
