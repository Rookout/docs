---
id: installation
title: Installation Overview
---

To install Rookout in your application there are two steps :
1. Add the Rook dependency
2. Install the Rookout Agent, or configure the Rook to use a remote agent hosted by us.

## Installing a Rook

- [Node Rook Installation](#node-rook-installation)
- [Python Rook Installation](#python-rook-installation)
- [Java Rook Installation](#java-rook-installation)
- [Basic Rook Configuration](#basic-rook-configuration)

### Node Rook Installation

__Pre-requisites:__  
- *Node v4.x/v6.x/v8.x*
- *npm*

1. Add our npm package to your package.json :  
    ```bash 
    $ npm install --save rookout
    ```
    
2. Require the package in your app's entry-point file :  
    ```javascript
    const rook = require('rookout/auto_start');
    ```
    
All done ! You now need to [install the Rookout Agent.](#rookout-agent-installation)

### Python Rook Installation

__Pre-requisites:__  
- *Python 2.7 / 3.5*
- *pip*

1. Install the Rookout pypi package :  
    ```bash
    $ pip install rook
    ```

2. Import the package in your app's entry-point file :  
    ```python
    from rook import auto_start
    ```

All done ! You now need to [install the Rookout Agent.](#rookout-agent-installation)

### Java Rook Installation

__Pre-requisites:__  
- *Oracle Java 7/8 __or__ OpenJDK 1.7/1.8*

1. Download our java agent :  
    ```bash
    $ curl -L "https://repository.sonatype.org/service/local/artifact/maven/redirect?r=central-proxy&g=com.rookout&a=rook&v=LATEST" -o rook.jar
    ```

2. Set your JVM to use the rook as a java agent :  
    ```bash
    $ export JAVA_OPTIONS="$JAVA_OPTIONS -javaagent:{DOWNLOAD_DIR}/rook.jar"
    ```
    
3. Add your source files to the .jar/.war/.ear when building.  
this can be done manually or through the help of a build tool such as Gradle or Maven.
    
*For explanation on how to do this using Gradle or Maven head to our [installation examples](installation-java.md)*

All done ! You now need to [install the Rookout Agent.](#rookout-agent-installation)


### Basic Rook Configuration

You can configure any rook using environment variables :  
`ROOKOUT_AGENT_HOST` - *Host running the Rookout Agent to connect to, default: LOCALHOST*  
`ROOKOUT_AGENT_PORT` - *Port number the Rookout Agent is listening on, default: 7486*  
`ROOKOUT_ROOK_TAGS` - *A list of comma separated values (tags) that will be added to the Rook's identity, default: EMPTY*

For more advanced configuration visit our [rook configuration reference](rooks-config.md)

## Installing the Rookout Agent

There are two ways to install the Agent -  
1. [Using Docker](#using-docker)
2. [systemd service](#systemd-service)
3. [Remote Agent](#remote-agent)

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
```
$ export ROOKOUT_TOKEN=<Your-Token>
$ curl -fs https://get.rookout.com | bash
```


### Remote Agent

If you have already contacted us and we have provided you with an agent hosted by us, you need to configure your **Rook** to connect to it.  
This is done by setting 3 environment variables on the system the Rook is running on :

1. `ROOKOUT_AGENT_HOST` - _cloud.agent.rookout.com_
2. `ROOKOUT_AGENT_PORT` - _443_
3. `ROOKOUT_TOKEN` - _Your organization token_

See [Installing a Rook](#installing-a-rook) for more information

### Basic Agent Configuration

You can configure the Agent using environment variables :  
`ROOKOUT_TOKEN` - *This configuration supplies the agent with a secure method to authenticate with the Rookout server.
                   It must be set for the agent to run.*  
`ROOKOUT_LISTEN_ALL` - *Configuring the agent to listen on all addresses instead of only localhost.*  
`ROOKOUT_AGENT_TAGS` - *A list of comma separated values (tags) that will be added to the Agent's identity.
                        Those will be available both for the scripting engine and the frontend.
                        The default value is an empty list.*

For more advanced configuration visit our [agent configuration reference](agent.md)



## Finishing up

**I want to deploy a Rook on a specific platform, are there examples?**  
Yes! Head over to our [Installation Examples](https://github.com/Rookout/deployment-examples) to see specifics.

**I want to be more efficient, what can I add to Rookout?**  
We have prepared integrations with several well-known tools you could use.  
Check out our [Output Integrations](integration-home.md)

**Everything is installed, how do I know it works?**  
Head to [app.rookout.com](https://app.rookout.com) and start debugging !

If you encounter any issue, you can check the [Troubleshooting Page](/troubleshooting.html) or [contact us](emailto:support@rookout.com)
