---
id: etl-controller-docker
title: ETL Controller on Docker
sidebar_label: Installation - Docker
---

---

*Please note that the ETL Controller feature is only available on the Enterprise plan. [Contact us](https://www.rookout.com/company/contact) to enable the ETL Controller feature for your organization.*

---

## Installation

To install the Controller as a Docker container (using [this image](https://hub.docker.com/r/rookout/controller/)), execute:

```bash
docker run -p 7488:7488 -e "ROOKOUT_TOKEN=[Your Rookout Token]" rookout/controller
```

<div class="rookout-org-info"></div>

This installs the Controller with the most basic configuration. See the configuration section below for more options.

## Configuration

To further configure the Controller installation, add environment variables as arguments to the `docker run` command with `-e "CONFIG=value"`.

All configuration values can be found [here](etl-controller-config.md#environment-variables).
