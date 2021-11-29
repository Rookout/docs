---
id: go-setup
title: Go SDK Instrumentation
sidebar_label: Go
---

This page will dive into the nitty gritty details on installing Rookout under various configurations.  
If you are encountering any difficulties with deploying Rookout, this is the place to look.

## Setup

Start the SDK within your application:
```go
import (
	rookout "github.com/Rookout/GoRook"
)

func main() {
	_ = rookout.Start(map[string]string{"env": "prod"})
}
```
<div class="rookout-org-info"></div>

The `Start` function can get a map of labels as an argument.

## SDK API

### start

```go
Start(labels);
```

The `Start` method is used to initialize the SDK.

| Argument &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Environment Variable &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Default Value | Description |
| ------------ | ----------------------- | ------------- | ----------- |
| - | `ROOKOUT_TOKEN` | None | The Rookout token for your organization. Should be left empty if you are using a Rookout ETL Controller |
| `labels` | - | {} | A map of key:value labels for your application instances |
| - | `ROOKOUT_CONTROLLER_HOST` | None | If you are using a Rookout ETL Controller, this is the hostname for it |
| - | `ROOKOUT_CONTROLLER_PORT` | None | If you are using a Rookout ETL Controller, this is the port for it |

*For more information, please [contact us](https://rookout.com/contact).*
