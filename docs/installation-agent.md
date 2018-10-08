---
id: installation-agent
title: Agent Installation
---


There are three ways to install the Agent -  
1. [Using Docker](#using-docker)
2. [systemd service](#systemd-service)
3. [Remote Agent](installation-agent-proxy.md)

[Basic Agent Configuration](#basic-agent-configuration)

### Using Docker

Installing the Rookout Agent using Docker is very straight forward.  
It is available as a public Docker [image](https://hub.docker.com/r/rookout/agent/) based on Alpine Linux

To get an agent up and running in a container execute this commands in a terminal:
```bash
$ docker pull rookout/agent
$ docker run -p 7486:7486 -e "ROOKOUT_TOKEN=<Your-Token>" rookout/agent
```

All done ! If you still don't have a Rook installed, [follow these instructions.](#installing-a-rook)


### systemd service

For systemd (Linux) based operating system the agent is available as a service. 

All that is needed is setting the Token as an environment variable and running the installation script.  
To install it execute:
```bash
$ export ROOKOUT_TOKEN=<Your-Token>
$ curl -fs https://get.rookout.com | bash
```

### Basic Agent Configuration

You can configure the Agent using environment variables :  
`ROOKOUT_TOKEN` - *This configuration supplies the agent with a secure method to authenticate with the Rookout server.
                   It must be set for the agent to run.*  
`ROOKOUT_LISTEN_ALL` - *Configuring the agent to listen on all addresses instead of only localhost.*  
`ROOKOUT_AGENT_TAGS` - *A list of comma separated values (tags) that will be added to the Agent's identity.
                        Those will be available both for the scripting engine and the frontend.
                        The default value is an empty list.*

For more advanced configuration visit our [agent configuration reference](agent.md)