---
id: installation-agent-remote
title: Using a Remote Rookout Agent
---


If we have provided you with a remote Rookout Agent, all you have to do is integrate the appropriate Rook into your
application and set the relevant environment variables to connect to the Agent.

## Installing the Rook

If you haven't installed a Rook already, please take a look at the relevant examples for your platform :

- [Node](installation-node.md)
- [Java](installation-java.md)
- [Python](installation-python.md)

## Configuration for Remote Agent

All that is needed are these 3 Environment Variables, set where the Rook is running.


| Key   |      Value      | Description |
|----------|-------------|--------------|
| `ROOKOUT_AGENT_HOST` |  cloud.agent.rookout.com | Hostname the agent is listening on |
| `ROOKOUT_AGENT_PORT` |    443   | Port the agent is listening on |
| `ROOKOUT_TOKEN` | <Your-Org-Token> | Your unique Organization Token |

On Linux you can do this like so:
```bash
export ROOKOUT_AGENT_HOST=cloud.agent.rookout.com
export ROOKOUT_AGENT_PORT=443
export ROOKOUT_TOKEN=YOUR_TOKEN
```

If you are using windows use the `set` command instead:
```bash
set ROOKOUT_AGENT_HOST=cloud.agent.rookout.com
set ROOKOUT_AGENT_PORT=443
set ROOKOUT_TOKEN=YOUR_TOKEN
```


For more Rook Configuration, see our [Rook Config Reference.](rooks-config.md)
