---
id: etl-controller-intro
title: ETL Controller
sidebar_label: Introduction
---

---

*Please note that the ETL Controller feature is only available on the Enterprise plan. [Contact us](https://www.rookout.com/company/contact) to enable the ETL Controller feature for your organization.*

---

## Introduction

The Rookout ETL Controller is a component made for advanced deployments dealing with complex network or security requirements.

The ETL Controller can be installed within your network and handle connections from multiple Rookout SDK instances and send the collected data to configurable targets such as Elasticsearch, Slack, Datadog, and many more. It can also act as a gateway from your network instead of having each Rookout instance connect directly to the outside world.

Connecting the ETL Controller to a datastore lets you choose to keep all the collected data on-premise.
For more information about the Rookout Datastore, [contact us](https://rookout.com/contact).

## Connection

The data flow is described in the diagram below:

![ETL Controller Diagram](/img/screenshots/etl_controller_diagram.png)

The SDK instances connect to the Controller using websocket, by default through port 7488. The controller host needs to be configured for each SDK instance. When connecting to an ETL controller, the token is configured in the Controller itself and is therefore not needed to be specified in the SDK configuration.

The ETL Controller connects to Rookout's cloud services to receive commands and report telemetry information using websocket secure through port 443.

## Installation

Installation methods:

1. [Kubernetes](etl-controller-k8s.md)
2. [Docker](etl-controller-docker.md)

## Configuration

See configuration options [here](etl-controller-config.md).

## License

The Rookout ETL Controller usage license can be found here:
[Rookout ETL Controller License](license.md)
