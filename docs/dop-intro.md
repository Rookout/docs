---
id: dop-intro
title: Data On-Premise
sidebar_label: Introduction
---
* * *

_Please note that the Data On-Premise feature is only available on the Enterprise plan. [Contact us](https://www.rookout.com/company/contact) to enable the Data On-Premise feature for your organization._

* * *

## Introduction

Although Rookout never has access to your source code, for many of our clients, such as Fortune 100 corporations and companies within regulated industries, handing off data processing to Rookout is not possible due to internal and external policies, regulations, and other factors.

Rookout’s hybrid Data On-Premise architecture allows users to benefit from the productivity and security features of Rookout while enjoying the simplicity and efficiency of a SaaS product. 

Under this architecture, clients install two simple, stateless, local services that mediate between their servers and users to the Rookout SaaS. This way, no application data is ever processed by Rookout’s servers, and in fact, doesn’t have to leave the corporate network.

## Datastore

The Datastore component is installed in your environment of choice and acts as a data sink for the ETL Controller. When a Datastore is set up and configured for your organization, the ETL Controller saves application data there instead of sending it to Rookout.  

If you don't have an ETL Controller set up, check out [the documentation page](etl-controller-intro.md) for it.

## Data Processed

Below is a comprehensive list of all the data collected and processed by the Rookout SaaS service in the hybrid Data On-Premise deployment method.

Under this configuration, Rookout does not send any application data to the Rookout SaaS, only metadata.

![Data Processed](/img/screenshots/data_processed.png)

## Connection

The diagram below demonstrates the data flow:

![ETL Controller Diagram](/img/screenshots/datastore_diagram.png)

For details about the connection of the SDK and the ETL Controller, see [this section](etl-controller-intro.md#connection).

When data is received, the ETL Controller connects to the Datastore over HTTPS to store the data. When using Rookout, if configured right, the user's web browser connects directly to the Datastore over WebSocket (securely) to fetch the stored data.

## License

Find the Rookout Datastore usage license here:
[Rookout Datastore License](license.md)

## Next Steps

To deploy the datastore to your environment, follow the instructions [here](dop-install.mdx).
