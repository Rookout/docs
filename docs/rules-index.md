---
id: rules
title: Scripting Overview
---


Rookout uses a flexible language to specify data collection and processing rules.
We are constantly working on improving and simplifying the syntax. 
Feel free to reach out to [us](emailto:docs@rookout.com) with suggestions!

## Rule Structure

Rules are a well structured construct describing the data collection and processing.
Each rule is made of the following components:

1. **id** - the rule's unique identifier. Used to track all related events.
1. **template_id** - the template this rule was derived from.
1. **appearance** - this section customizes the display of the rule.
1. **selector** - this section defines for which Rooks this rule applies. It is in the form of a *script* returning 
True/False for each Rook.
1. **processing** - this section defines the data processing in the agent and sending the data to various targets. 
It is in the form of a *script*.
1. **server_processing** - this section allows configuring data processing as a service using the Rookout Cloud. Coming Soon!
1. **aug** - this section defines the way the data is extracted from the application. It is comprised of multiple 
sub-sectinos, more about them can be read [here](/scripts/aug). A quick overview:
    1. **location** - this section defines the event this aug applies to.
    2. **condition** - this section defines any additional limitations on when to execute the aug.
    3. **extractor** - this section defines any additional information to extract from the application before runnig the 
    action.
    4. **action** - this section defines what do when the aug is executed. 


## Script Language

Rookout uses a simple scripting language to allow data extraction, transformation and loading (ETL).

The scripting language is made of three main constructs:
- Namespaces - objects encapsulating the script state. They can be thought of as trees of variables.
- Paths - objects pointing to specific objects within the namespace.
- Operations - the tasks the script is executing. Those tasks use paths to refer to the script state.

Take a look at the following "Hello World" example script:

```json
{
    "operations": [
      {
        "name": "format",
        "path": "temp.message",
        "format": "Hello World"
      },
      {
        "name": "send_rookout",
        "path": "temp.message"
      }
    ]
}
```

This script is simply a sequence of two operations:
1. The format operation used to construct the "Hello World" string and store it in the "temp" namespace.
1. The send_rookout operation used to read the message from the namespace and send it to the Rookout Cloud.

 For more information check out the [uses](/scripts/uses) of scripts in Rookout and the available 
 [operations](/scripts/operations) and [paths](/scripts/paths).
