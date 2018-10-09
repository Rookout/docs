---
id: troubleshooting-agent
title: Agents
---

## Docker Agent

- Detect if running by using
  `$ docker ps | grep rookout`
- Detect if has been run in the past by using
  `$ docker ps -a | grep rookout`
- Configuration should only be done by using environment variables
  `From docker command line -e “KEY=VALUE”`


## systemd Agent

- Detect if running by executing
  `service rookout-agent status`
- Detect if has been installed by looking at init.d directory at:
  `/etc/init.d/rookout-agent`
