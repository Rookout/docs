---
id: etl-controller-intro
title: ETL Controller Introduction
sidebar_label: Introduction
---

---

*Please note that the ETL Controller feature is only available on the Enterprise plan. [Contact us](https://www.rookout.com/company/contact) to enable the ETL Controller feature for your organization.*

---

## Introduction

The Rookout ETL Controller is a component made for advanced deployments dealing with complex network or security requirements.

The ETL Controller can be installed within your network and handle connections from multiple Rookout SDK instances and send the collected data to configurable targets such as Elasticsearch, Slack, Datadog, and many more. Instead of having each Rookout instance connect directly to the outside world, the ETL Controller can act as a gateway for your network.

Connecting the ETL Controller to a datastore lets you choose to keep all the collected data on-premise.
For more information about the Rookout Datastore, [contact us](https://rookout.com/contact).

## Connection

The diagram below describes the data flow:

![ETL Controller Diagram](/img/screenshots/etl_controller_diagram.png)

The SDK instances connect to the Controller over WebSocket the hostname and port need to be configured for each SDK instance.

The ETL Controller connects to Rookout's cloud services to receive commands and report telemetry information over WebSocket Secure through port 443.

## License

You can find the Rookout ETL Controller usage license here:
[Rookout ETL Controller License](license.md)
