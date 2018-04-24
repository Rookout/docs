---
id: installation-agent-remote
title: Using a Remote Rookout Agent
---


## What is our Agentless solution ?

A [Rookout Agent](agent.md) is the component that takes care of all the connected Rooks and handles the data from them
to the _web management console_ and the [rules](rules-index.md) you add.


In case you don't want to install the Agent yourself, we provide Remote Agents hosted in our care that you can simply
connect to by passing a few environment variables to the Rook, as explained below.


If you are interested in this method, feel free to [contact us](mailto:support@rookout.com) or
[register here](https://www.rookout.com/join-our-early-adopters-plan/) if you haven't done so yet !

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
