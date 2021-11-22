---
id: dop-install
title: Datastore Installation
sidebar_label: Installation
---

---

*Please note that the Data On-Premise feature is only available on the Enterprise plan. [Contact us](https://www.rookout.com/company/contact) to enable the Data On-Premise feature for your organization.*

---

## Installation

Follow these installation instructions to deploy the Datastore in your environment, either on Kubernetes or Docker containers.

After your Datastore successfully connects to Rookout, it should appear in the Rookout app under *Settings > Connected Applications > Controllers*.


To install the Datastore as a Docker container (using [this image](https://hub.docker.com/r/rookout/data-on-prem/)), execute the following:

```bash
docker run -p 7488:7488 -e "ROOKOUT_TOKEN=[Your Rookout Token]" rookout/data-on-prem
```

<div class="rookout-org-info"></div>

This installs the Controller with the most basic configuration. See the configuration section below for more options.

## Configuration

To further configure the Controller installation, add environment variables as arguments to the `docker run` command with `-e "CONFIG=value"`.

All configuration values can be found [here](etl-controller-config.md#environment-variables).
