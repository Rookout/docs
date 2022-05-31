---
id: dop-config
title: Datastore Configuration
sidebar_label: Configuration
---

---

*Please note that the Data On-Premise feature is only available on the Enterprise plan. [Contact us](https://www.rookout.com/company/contact) to enable the Data On-Premise feature for your organization.*

---

This page includes configuration details for the Datastore.

1. For Kubernetes, see the [Helm Values](#helm-values)
2. For Docker, see the [Environment Variables](#environment-variables)

## Helm Values

Configure the Datastore [k8s installation](dop-install#kubernetes) by setting values in the `values.yaml` file or using `--set` in the `helm install` or `helm upgrade` commands.

### Datastore Configuration

| Configuration                                         | Key                          | Value                        | Default |
| ---                                                   | ---                          | ---                          | ---     |
| [Rookout token](#rookout-token)                       | `datastore.token`            | Rookout token                | -       |  
| [Server mode](#server-mode)                           | `datastore.serverMode`       | `PLAIN`, `TLS`, or `AUTOTLS` | `PLAIN` |
| [Listen on port](#listen-on-port)                     | `datastore.dopContainerPort` | Integer                      | 8080    |
| [In-memory database](#in-memory-database)             | `datastore.inMemoryDb`       | `true` or `false`            | `false` |

### Additional Kubernetes Configuration

| Configuration                    | Key                                       | Value                | Default     |
| ---                              | ---                                       | ---                  | ---         |
| Token secret name                | `datastore.tokenFromSecret.name`          | String               | -           |
| Token secret key                 | `datastore.tokenFromSecret.key`           | String               | -           |
| K8s labels                       | `datastore.labels`                        | Key: value           | -           |
| Pod<br>memory request            | `datastore.resources.requests.memory`     | Memory units         | 1Gi         |
| Pod<br>CPU request               | `datastore.resources.requests.cpu`        | CPU units            | 1           |
| Pod<br>memory limit              | `datastore.resources.limits.memory`       | Bytes unit           | 4Gi         |
| Pod<br>CPU limit                 | `datastore.resources.limits.cpu`          | CPU units            | 2           |
| Container<br>image tag           | `image.tag`                               | Image tag            | latest      |
| Container<br>image pull policy   | `image.pullPolicy`                        | Pull policy          | `Always`    |
| Container<br>image pull secret   | `image.pullSecrets`                       | Pull secrets         | -           |
| Service account<br>name          | `serviceAccount.name`                     | String               | -           |
| Pod<br>annotations               | `podAnnotations`                          | Key: value           | -           |
| Service<br>annotations           | `service.annotations`                     | Key: value           | -           |
| Service port                     | `datastore.servicePort`                   | Integer              | 80          |
| Service port (TLS mode)          | `datastore.servicePortTLS`                | Integer              | 443         |


## Environment Variables

Configure a Datastore [docker container](dop-install#docker) by passing environment variables to it.

| Configuration                                         | Environment Variable             | Value             | Default |
| ---                                                   | ---                              | ---               | ---     |
| [Rookout token](#rookout-token)                       | `ROOKOUT_DOP_LOGGING_TOKEN`      | Rookout token     | -       |
| [Server mode](#server-mode)                           | `ROOKOUT_DOP_SERVER_MODE`        | `PLAIN` or `TLS`  | `PLAIN` |
| [Limit CPU cores](#resources-cpu-cores)               | `ROOKOUT_CONTROLLER_MAX_CPU`     | Integer           | 1       |
| [Limit memory](#limit-memory)                         | `ROOKOUT_CONTROLLER_MAX_MEMORY`  | Integer (MB)      | 512     |
| [Listen on port](#listen-on-port)                     | `ROOKOUT_DOP_PORT`               | Integer           | 8080     |

## Configuration Details

### Rookout Token

Set this to your organization's token just like you would when configuring the Rookout SDK.

### Server Mode

Configure the Datastore to either use TLS encryption or plain text for incoming connections.

There are three modes available to choose from:

#### PLAIN (recommended)

We recommend using `PLAIN` mode when possible, as it is the most straightforward. For security best practice, only use `PLAIN` along with a [TLS termination proxy](https://en.wikipedia.org/wiki/TLS_termination_proxy), or if the connection is trusted and secure.

#### TLS

If you can't provide a TLS termination proxy / load balancer, set the server mode to `TLS` and configure the following:

* For Docker deployments, place a certificate and a private key in `/var/rookout/cert.pem` `/var/rookout/key.pem` respectively. You can create volumes for the certificate and key and map them to these locations.

* For K8s deployments, create the following secret & configmap in your k8s cluster instead:

```bash
kubectl create configmap rookout-tls-cert --from-file=cert.pem=<path to cert file>
kubectl create secret generic rookout-tls-key --from-file=key.pem=<path to key file>
```

#### AUTOTLS

If you can't provide a TLS termination proxy / load balancer and also can't provide a valid TLS certificate for the Datastore, set the server mode to `AUTOTLS`. This mode automatically fetches a certificate from the "Let's Encrypt" service. To use this mode configure the following:

1. Set the `datastore.autoTlsDomain` variable for K8s deployments or the `ROOKOUT_DOP_AUTO_TLS_DOMAIN` environment variable for Docker deployments, to match a domain name of the Datastore, one that is accessible from the internet.

2. Make sure that the TCP port 9090 of the Datastore container is accessible from the internet, so that the "Let's Encrypt" service can challenge it.

Read more about Let's Encrypt [here](https://letsencrypt.org/).

### Listen on Port

Set the internal port the Datastore should listen on for incoming connections.

Note that under K8s deployments, the external service port is 80 for `PLAIN` server mode and 443 otherwise.

### In-memory database

Set this to `true` to have the Datastore store it's data in-memory (RAM) instead of on the disk.
