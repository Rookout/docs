---
id: installation-agent
title: Agent Installation
---

Rookout Agents can be installed locally and provide a gateway between Rooks and the Rookout App. They allow setting up Rooks in applications that cannot access the Rookout App.

### Supported Operating Systems

| Operating System   | Version    |
| ------------------ | ---------- |
| Debian             | GNU/Linux 9 (strech)       |
| Ubuntu             | 14.04 LTS, 16.04 LTS         |
| CentOS             | 6,7          |
| Red Hat Enterprise | Linux 6, 7|

### Agent Setup

There are three ways to install the Agent -  
1. [Using Docker](#using-docker)
2. [Using initd](#using-initd)
3. [Using systemd](#using-systemd)

Once the Agent has been istalled, check out the [Basic Agent Configuration](#basic-agent-configuration) section.

#### Using Docker

Installing the Rookout Agent using Docker is very straightforward.  
It is available as a public Docker [image](https://hub.docker.com/r/rookout/agent/) based on Alpine Linux

To get an agent up and running in a container execute this commands in a terminal:

```bash
$ docker pull rookout/agent
$ docker run -p 7486:7486 -e "ROOKOUT_TOKEN=[Your Rookout Token]" rookout/agent
```
<div class="rookout-org-info org-info-normal-snippet"></div>


All done ! If you still don't have a Rook installed, [follow these instructions.](#installing-a-rook)

### Using initd

The Rookout Agent is available as a direct installation [in the following link](https://get.rookout.com/setup.sh)
To install it execute:
```bash
setup.sh --token=[Your Rookout Token]
```

### Using systemd

For systemd (Linux) based operating system the Rookout Agent is available as a service. 

All that is needed is setting the Token as an environment variable and running the installation script.  
To install it execute:
```bash
$ export ROOKOUT_TOKEN=[Your Rookout Token]
$ curl -fs https://get.rookout.com | bash
```

### Basic Configuration

The most common way to configure the agent is using environment variables:
`ROOKOUT_TOKEN` - *This configuration supplies the agent with a secure method to authenticate with the Rookout server.
                   It must be set for the agent to run.*  
`ROOKOUT_LISTEN_ALL` - *Configuring the agent to listen on all addresses instead of only localhost.*  
`ROOKOUT_AGENT_TAGS` - *A list of comma separated values (tags) that will be added to the Agent's identity.
                        Those will be available both for the scripting engine and the frontend.
                        The default value is an empty list.*

Other configuration methods can be found [here](agent.md).

