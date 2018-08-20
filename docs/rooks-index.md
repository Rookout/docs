---
id: rooks
title: Rooks Overview
---

Rooks imported as an SDK and deployed with your application.
They provide the ability to fetch data from a running application in real time.
Rooks fetch data defined by [Rules](rules-index.md) that can be configured in [the Rookout Service].

A basic Rook configuration is done by configuring the following environment variables:

#### ROOKOUT_TOKEN
Your unique identifier, pointing your Rooks to your own account at the Rookout Service.

#### ROOKOUT_ROOK_TAGS
A list of semicolon ; separated values (tags) that lets you filter and search instances for your application.
For example, a Rook can have a Staging or Production tag to let you filter data fetched from one of these environments.

</p>

Advanced Rook configuration can be found [here](rooks-config.md).

## Supported Platforms:
- [Python](rooks-python.md)
- [JVM](rooks-java.md)
- [NodeJS](rooks-node.md)
