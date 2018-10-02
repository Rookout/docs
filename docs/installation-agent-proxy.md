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


**If you are required to use a proxy please read carefully!**

## Setting up the proxy for the current environment
If you are setting your proxy using an environment variable, be sure to do it this way before any command you
execute that may need it:  
   
```bash
Proxy structure :
<[protocol://][user:password@]proxyhost[:port]>
```
Unix example:
```bash 
export HTTPS_PROXY=https://mypro.xy:1234
```
Windows example: 
```bash
set HTTPS_PROXY=https://mypro.xy:1234
```



## Installing a Rook
To make sure the proxy is used when downloading the rook dependency, execute the command like this:

### Python
Unix:
```bash
export HTTPS_PROXY=https://mypro.xy:1234 && pip install rook
```
Windows:
```bash
set HTTPS_PROXY=https://mypro.xy:1234 && pip install rook
```

### Node
Unix:
```bash
export HTTPS_PROXY=https://mypro.xy:1234 && npm install --save rookout
```
Windows:
```bash
set HTTPS_PROXY=https://mypro.xy:1234 && npm install --save rookout
```

### Java
Unix:
```bash
export HTTPS_PROXY=https://mypro.xy:1234 && curl -L "https://repository.sonatype.org/service/local/artifact/maven/redirect?r=central-proxy&g=com.rookout&a=rook&v=LATEST" -o rook.jar
```
Windows:
```bash
set HTTPS_PROXY=https://mypro.xy:1234 && curl -L "https://repository.sonatype.org/service/local/artifact/maven/redirect?r=central-proxy&g=com.rookout&a=rook&v=LATEST" -o rook.jar
```

## Installing and running the Agent

**Remote Agents do not currently work with proxies. If you need to use a proxy you have to install the agent yourself using
Docker or as a systemd service**


If you are installing the Rookout Agent, use this argument when running the setup script: --https-proxy
```bash
setup.sh --token=<Your-Token> --https-proxy=<Your-Proxy>
```

If the agent is already installed, you can edit the configuration file `/etc/default/rookout-agent`
and set the environment variable as explained beforehand: 
```bash
export HTTPS_PROXY=https://mypro.xy:1234
```
Save the file and restart the agent by running: 
```bash
systemctl restart rookout-agent
```