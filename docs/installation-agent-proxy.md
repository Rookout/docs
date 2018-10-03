---
id: installation-agent-proxy
title: Installing Rookout Agent with a Proxy
---

## Using a command line argument

Run the Agent setup script with the --https-proxy argument:
```bash
setup.sh --token=<Your-Token> --https-proxy=<Your-Proxy>
```

## Using the configuration file

If the Agent is already installed, you can edit the configuration file `/etc/default/rookout-agent`
and set the environment variable as described above:
```bash
export HTTPS_PROXY=https://mypro.xy:1234
```
Save the file and restart the agent by running: 
```bash
systemctl restart rookout-agent
```

## Using an environment variable
Set the following environment variable, before installing the agent:
   
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

If you want to know more about configuring the agent, head over to the [Agent Documentation](/agent)