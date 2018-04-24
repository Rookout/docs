---
id: installation-agent-remote
title: Using a Remote Rookout Agent
---

## What is agentless ?

In certain scenarios it is easier not having to deploy the [Rookout Agent](#agent) as another process on the same cluster or machine.
This is especially true for [Serverless](https://en.wikipedia.org/wiki/Serverless_computing) and [PaaS](https://en.wikipedia.org/wiki/Platform_as_a_service) based deployment.

Rookout supports this use-case by offering an agentless deployment, providing the agent as part of our SaaS offering.
To enable this for your Rookout account, please [contact us](mailto:support@rookout.com).

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

Great! Now you can simply run your application with the Rook and it will connect to the correct agent !


For more Rook Configuration, see our [Rook Config Reference.](rooks-config.md)
