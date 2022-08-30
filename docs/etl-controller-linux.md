---
id: etl-controller-linux
title: Installing the ETL Controller on Linux
sidebar_label: Installation - Linux
---
* * *

_Please note that the ETL Controller feature is only available on the Enterprise plan. [Contact us](https://www.rookout.com/company/contact) to enable the ETL Controller feature for your organization._

* * *

## Installation

## 3. Linux Daemon

To install the Controller using a setup script, run the following commands:

```bash

export ROOKOUT_TOKEN=[Your Rookout Token]
curl -fs https://get.rookout.com | bash

```

<div className="rookout-org-info" />

Alternatively, you can download the script and execute it with command line arguments (see more options below):

```bash

curl -fs https://get.rookout.com > setup.sh
bash setup.sh --token=[Your Rookout Token]

```

<div className="rookout-org-info" />

\*\*Configuring the Controller

The environment variables for the Linux daemon are accessible by editing the `/etc/default/rookout-controller` file.

By default, the ETL Controller listens on localhost when running in daemon mode.
To make it listen on all interfaces, add the following line to the configuration file:

```bash

export ROOKOUT_LISTEN_ALL=TRUE

```

Or by adding a parameter to the install script:

```bash

setup.sh --token=[Your Rookout Token] --listen-all

```

<div className="rookout-org-info" />

**Controller OS support:**

The Linux daemon is supported in the following operating systems:

| Operating System   | Version              |
| ------------------ | -------------------- |
| Debian             | GNU/Linux 9 (strech) |
| Ubuntu             | 14.04 LTS, 16.04 LTS |
| CentOS             | 6,7                  |
| Red Hat Enterprise | Linux 6, 7           |

**Updating the Controller:**

The Linux deamon can be updated to the latest version by rerunning the setup script:

If you would like to keep the pre-existing configuration rather than overwriting it with the new flags specified, add `--keep-old-config` to the run command.

If you don't specify `--keep-old-config`, the new version will be installed using the new settings.

**Restarting the Controller:**

When modifying the configuration it is important to restart the ETL Controller using one of the following options:

DOCUSAURUS_CODE_TABS

initd

```bash

/etc/init.d/rookout-controller restart


```

systemd

```bash

systemctl restart rookout-controller


```

END_DOCUSAURUS_CODE_TABS

**Uninstalling the Controller:**

To uninstall the Linux daemon run the following command:

```bash

curl -fs <https://get.rookout.com/remove_controller.sh> | sudo bash


```
