---
id: installation
title: Installation Overview
---

## How does it work?

Rookout's architecture is composed of three main components.

### Agent

The Agent provides local orchestration of data collection as well as basic ETL functionality.
It allows loading the data into local targets such as file system and elasticsearch.

### Rook

Rooks are the component that allows you to collect data directly from a running application
and send it to the agent.

### Web management console

Designed like an IDE to bring familiarity, it allows you to add, remove and edit non-breaking "breakpoints" called [Rules](rules-index.md),
manage users in your organization and see all the data you have gathered by the aid of the Rooks.


## Installing

To install Rookout in your application there are two steps :
1. Add the Rook dependency
2. Install the Rookout Agent, or configure the Rook to use a remote agent hosted by us.

## Installing a Rook

- [Node Rook Installation](installation-node.md)
- [Python Rook Installation](installation-python.md)
- [Java Rook Installation](installation-java.md)

### Basic Rook Configuration

You can configure any rook using environment variables :  
`ROOKOUT_AGENT_HOST` - *Host running the Rookout Agent to connect to, default: LOCALHOST*  
`ROOKOUT_AGENT_PORT` - *Port number the Rookout Agent is listening on, default: 7486*  
`ROOKOUT_ROOK_TAGS` - *A list of comma separated values (tags) that will be added to the Rook's identity, default: EMPTY*

For more advanced configuration visit our [rook configuration reference](rooks-config.md)

## Installing the Rookout Agent

To install a Rookout Agent see [this page](installation-agent.md)

## Next steps

**I want to deploy a Rook on a specific platform, are there examples?**  
Yes! Head over to our [Installation Examples](https://github.com/Rookout/deployment-examples) to see specifics.

**I want to be more efficient, what can I add to Rookout?**  
We have prepared integrations with several well-known tools you could use.  
Check out our [Output Integrations](integrations-home.md)

**Everything is installed, how do I know it works?**  
Head to [app.rookout.com](https://app.rookout.com) and start debugging !

If you encounter any issue, you can check the [Troubleshooting section](troubleshooting-home.md) or [contact us](emailto:support@rookout.com)
