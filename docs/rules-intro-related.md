---
id: rules-intro-concepts
title: Related Concepts
sidebar_label: Related Concepts
---

## Workspaces

A Rookout Rule is defined in the context of a Workspace.
A Workspace lets you define the source code to which the Rule is applied to, and offers filtering capabilities (tags).

## Rookout SDK

When adding or changing a Rule, the Rookout Service will attempt to apply to all applicable App Instances.
That is, the rule will be applied to App Instances that have the [Rookout SDK](rooks-setup.md) installed, and that meet the workspace filtering (tags).
Be sure to check the App Instances page to verify that Rookout has access to the applications you wish to debug.

## Agent

Rookout offers an optional component for performing local ETL and data redaction within your network.  
The [Rookout Agent](agent-setup.md) may be installed to prevent sensitive debug data from being sent to the Rookout Service.  
Once the Agent has been installed and the Rookout SDK deployments have been configured, debug data fetched by Rules will be sent to the Rookout Agent.  
The Rookout Agent will perform the required filtering actions, and will send the filtered data to the target destination (usually a local log file or logging service).

## Integrations

By default, Rookout Rules send debug messages to the Rookout IDE.
You may use the [Script Operations](rules-operations.md) section to determine alternative destinations.
For a full list of supported integrations, check out our [Integrations Page](integrations-home.md).