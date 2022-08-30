---
id: go-setup
title: Go SDK
sidebar_label: Go
---
* * *

_Deploying the Golang SDK requires name/password to our private repository._

_Please [Contact us](https://www.rookout.com/company/contact) for access._

* * *

## SDK API

### start

```go

Start(labels);

```

The `Start` method is used to initialize the SDK.

| Argument        | Environment Variable             | Default Value | Description                                                                                             |
| --------------- | -------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------- |
| -               | `ROOKOUT_TOKEN`           | None          | The Rookout token for your organization. Should be left empty if you are using a Rookout ETL Controller |
| `labels` | -                                | {"{"}{"}"}            | A map of key:value labels for your application instances                                                |
| -               | `ROOKOUT_CONTROLLER_HOST` | None          | If you are using a Rookout ETL Controller, this is the hostname for it                                  |
| -               | `ROOKOUT_CONTROLLER_PORT` | None          | If you are using a Rookout ETL Controller, this is the port for it                                      |

_For more information, please [contact us](https://rookout.com/contact)._
