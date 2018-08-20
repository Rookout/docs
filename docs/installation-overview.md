---
id: installation
title: Setting up
---

## Setting up Rookout

If you have already walked through one of our hands-on tutorials, you should have access to the Rookout app.
Setting Rookout to debug your own code requires the following steps.

1. Add a Rook dependency to your application code
2. Configure the Rook using environment variables

### Adding a Rook

- [Adding a Node.js Rook](installation-node.md)
- [Adding a Python Rook](installation-python.md)
- [Adding a Java Rook](installation-java.md)

### Basic Rook Configuration

You can configure any rook using environment variables :  
`ROOKOUT_TOKEN` - *Your unique identifier, pointing your Rooks to your own account at the Rookout Service.*  
`ROOKOUT_ROOK_TAGS` - *A list of comma separated values (tags) that will be added to the Rook's identity, default: EMPTY*  

For more advanced configuration visit our [rook configuration reference](rooks-config.md)

## Define a workspace

And fetch your source code from GitHub or Explorook

## Setup your first Rule

And get some data

## Next steps

**I want to deploy a Rook on a specific platform, are there examples?**  
Yes! Head over to our [Installation Examples](https://github.com/Rookout/deployment-examples) to see specifics.

**I want to be more efficient, what can I add to Rookout?**  
We have prepared integrations with several well-known tools you could use.  
Check out our [Output Integrations](integrations-home.md)

**Everything is installed, how do I know it works?**  
Head to [app.rookout.com](https://app.rookout.com) and start debugging !

If you encounter any issue, you can check the [Troubleshooting section](troubleshooting-home.md) or [contact us](emailto:support@rookout.com)
