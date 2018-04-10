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


| Key   |      Value      |
|----------|-------------|
| `ROOKOUT_AGENT_HOST` |  cloud.agent.rookout.com |
| `ROOKOUT_AGENT_PORT` |    443   |
| `ROOKOUT_TOKEN` | <Your-Org-Token> |


For more Rook Configuration, see our [Rook Config Reference.](rooks-config.md)
