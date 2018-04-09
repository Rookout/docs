---
id: installation-agent-proxy
title: Installing Rookout Agent with a Proxy
---


### Installation as a systemd service with a proxy

In order to configure the agent to use a proxy we can configure it as an argument in the installation script or by editing
the configuration file after it is already installed.

For systemd (Linux) based operating system the agent is available as a service. To download it execute:
```bash
$ curl -fs https://get.rookout.com -o setup.sh
```

To install it and use a proxy, run the script with these arguments :  
**Make sure the https proxy is in this format:** _`https://example.proxy:12345`_
```bash
$ bash setup.sh --token=<Your-Token> --https-proxy=<Your-Proxy>
```

If you have already installed the Rookout Agent and want to use or change the proxy, edit this configuration file :  
`/etc/default/rookout-agent`  
and export the https_proxy variable inside :  
`export https_proxy=https://example.proxy:12345`  
Then, restart the agent with the following command :
```bash
$ systemctl restart rookout-agent
```

If you want to know more about configuring the agent, head over to the [Agent Documentation](/agent)

### Installing the rook

#### Java Rook Installation

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
    
*For explanation on how to do this using Gradle or Maven head to our [installation examples](https://github.com/Rookout/deployment-examples)*