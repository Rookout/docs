---
id: reference
title: Reference
---


Rookout is separated into two components - Rook and Agent.

### Rook

Rooks are the component that allows you to collect data directly from a running application.  
A Rook is a dependency that is loaded directly from your application as any other library.  
For more information about Rooks see [Rooks Overview](rooks-index.md)


### Agent

The Rookout agent provides local orchestration of data collection as well as basic ETL functionality.
It allows loading the data into local targets such as file system and elasticsearch.

The Agent can be either installed directly onto a systemd compatible OS or as recommended, as a Docker container.

For more information about the Agent see [Agent Overview](agent.md)


&nbsp;


---


&nbsp;


### Rules

Rookout uses a flexible language to specify data collection and processing rules.
We are constantly working on improving and simplifying the syntax.

Whenever you place a breakpoint on a line, a rule is created - it has a JSON syntax
and can be customized for your needs.

For more information about Rules see [Scripting Overview](rules-index.md)
