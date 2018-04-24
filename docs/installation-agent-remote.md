---
id: installation-agent-remote
title: Using a Remote Rookout Agent
---


## What is our Agentless solution ?

We provide remote [Rookout Agents](agent.md) for certain deployment scenarios such as serverless computing
(e.g. AWS Lambda) or containerized applications which cannot host an Agent as well.

Using our agentless solution in some cases as described above is required or will be more efficient and contribute
an easier installation process from your end.

Integrating a remote agent in your application is very simple as all it need is 3 environment variables to inform
the rook to which agent to connect. [More detailed steps below](#configuration-for-remote-agent)

Feel free to [contact us](mailto:support@rookout.com) about our agentless solution.

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
