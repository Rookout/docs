---
id: troubleshooting-proxy
title: Proxy
---


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

More details are [available here](installation-agent-proxy.md)

## Using simple-https server
In order to download it from NPM using the proxy run this command with your correct proxy:
```bash
export HTTPS_PROXY=https://mypro.xy:1234 && npm install -g simple-https
```

Using a proxy will not work as the https certificate created is for `localhost`
Make sure you are disabling the `Use SSL` option when configuring the file server in our App.
You can then use the `--no-ssl` flag for local file serving.

![simple-https no-ssl option](/img/screenshots/proxy-simplehttps.png)



### sudo https_proxy
*If you need to install a npm package globally and it requires sudo do the following*

When executing commands as SUDO the proxy environment variable is not kept.
In order to fix this we need to tell the system to not reset these variables when running as sudo -
to do this follow these steps:
1. Editing /etc/sudoers by running `sudo visudo`. This is a dedicated command that opens your default text editor
to edit these settings.
1. Find the line `Defaults env_reset`
1. After this line, add `Defaults env_keep="HTTPS_PROXY"`
1. Save and quit
