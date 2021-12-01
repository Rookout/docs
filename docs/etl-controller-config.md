---
id: etl-controller-config
title: ETL Controller Configuration
sidebar_label: Configuration
---

---

*Please note that the ETL Controller feature is only available on the Enterprise plan. [Contact us](https://www.rookout.com/company/contact) to enable the ETL Controller feature for your organization.*

---

This page includes configuration details for the ETL Controller.

1. For Kubernetes, see the [Helm Values](#helm-values)
2. For Docker, see the [Environment Variables](#environment-variables)

## Helm Values

Configure the controller [k8s installation](etl-controller-install#kubernetes) by setting values in the `values.yaml` file or using `--set` in the `helm install` command.

### Controller Configuration

| Configuration                                                       | Key                                         | Value                | Default |
| ---                                                                 | ---                                         | ---                  | ---     |
| [Rookout token](#rookout-token)                                     | `controller.token`                          | Rookout token        | -       |  
| [Server mode](#server-mode)                                         | `controller.serverMode`                     | `PLAIN` or `TLS`     | `PLAIN` |
| [Proxy server](#proxy-server)                                       | `controller.proxy`                          | URL                  | -       |
| [Proxy username](#proxy-server)                                     | `controller.proxyUsername`                  | URL                  | -       |
| [Proxy password](#proxy-server)                                     | `controller.proxyPassword`                  | URL                  | -       |
| [Skip Datastore SSL verification](#skip-datastore-ssl-verification) | `controller.datastore_no_ssl_verif`         | `true` or `false`    | `false` |
| [Listen on port](#listen-on-port)                                   | `controller.port`                           | Integer              | 7488    |

### Additional Kubernetes Configuration

| Configuration                               | Key                                       | Value                | Default     |
| ---                                         | ---                                       | ---                  | ---         |
| Token secret name                           | `controller.tokenFromSecret.name`         | String               | -           |
| Token secret key                            | `controller.tokenFromSecret.key`          | String               | -           |
| Proxy password secret name                  | `controller.proxyPasswordFromSecret.name` | String               | -           |
| Proxy password secret key                   | `controller.proxyPasswordFromSecret.key`  | String               | -           |
| K8s labels                                  | `controller.labels`                       | Key: value           | -           |
| Pod<br>memory request                       | `controller.resources.requests.memory`    | Memory units         | 32Mi        |
| Pod<br>CPU request                          | `controller.resources.requests.cpu`       | CPU units            | 30m         |
| Pod<br>memory limit                         | `controller.resources.limits.memory`      | Bytes unit           | 1024Mi      |
| Pod<br>CPU limit                            | `controller.resources.limits.cpu`         | CPU units            | 4000m       |
| Container<br>image tag                      | `image.tag`                               | Image tag            | latest      |
| Container<br>image pull policy              | `image.pullPolicy`                        | Pull policy          | `Always`    |
| Container<br>image pull secret              | `image.pullSecrets`                       | Pull secrets         | -           |
| Service account<br>name                     | `serviceAccount.name`                     | String               | -           |
| Pod<br>annotations                          | `podAnnotations`                          | Key: value           | -           |
| Service<br>annotations                      | `service.annotations`                     | Key: value           | -           |

## Environment Variables

Configure a Controller [docker container](etl-controller-install#docker) by passing environment variables to it.

| Configuration                                                       | Environment Variable             | Value             | Default |
| ---                                                                 | ---                              | ---               | ---     |
| [Rookout token](#rookout-token)                                     | `ROOKOUT_TOKEN`                  | Rookout token     | -       |
| [Server mode](#server-mode)                                         | `ROOKOUT_CONTROLLER_SERVER_MODE` | `PLAIN` or `TLS`  | `PLAIN` |
| [Proxy server](#proxy-server)                                       | `ROOKOUT_PROXY`                  | URL               | -       |
| [Proxy username](#proxy-server)                                     | `ROOKOUT_PROXY_USERNAME`         | String            | -       |
| [Proxy password](#proxy-server)                                     | `ROOKOUT_PROXY_PASSWORD`         | String            | -       |
| [Send data to Rookout](#send-data-to-rookout)                       | `ROOKOUT_SEND_DATA`              | `true` or `false` | `true`  |
| [Skip Datastore SSL verification](#skip-datastore-ssl-verification) | `ROOKOUT_DOP_NO_SSL_VERIFY`      | `true` or `false` | `false` |

## Configuration Details

### Rookout Token

Set this to your organization's token just like you would when configuring the Rookout SDK.

### Server Mode

Configure the Controller to either use TLS encryption (`TLS` mode) or plain text (`PLAIN` mode) for incoming connections (SDK instances connecting to the Controller).

We recommend using `PLAIN` mode if possible, as it is the most straightforward. For security best practice, only use `PLAIN` if the connection is trusted and secure, or along with a [TLS termination proxy](https://en.wikipedia.org/wiki/TLS_termination_proxy).

If you can't provide a TLS termination proxy / load balancer, and the connection isn't secure, set the server mode to `TLS` and configure the following:

* For Docker deployments, place a certificate and a private key in `/var/controller-tls-secrets/tls.crt` and `/var/controller-tls-secrets/tls.key` respectively. You can create volumes for the certificate and key and map them to these locations.

* For K8s deployments, create the following secret & configmap in your k8s cluster instead:

```bash
kubectl create configmap rookout-tls-cert --from-file=tls.crt=<path to cert file>
kubectl create secret generic rookout-tls-key --from-file=tls.key=<path to key file>
```

### Proxy Server

Set this to your proxy URL/address to have the Controller manually connect through it.

If authentication is required, it is possible to add a username and password. The password can be added as a plain string or as a K8s secret.

### Send Data to Rookout

Set this configuration to `false` to send data collected by the Controller only to targets and not to Rookout's servers.

### Skip Datastore SSL Verification

Set this to `true` to make the Controller skip the verification of SSL certificates when connecting to the [Datastore](dop-intro.md).

For security best practices, you should set this to `false` unless the connection is trusted and secure.

### Listen on Port

Set the port the Controller should listen on for incoming SDK instances.

### Data Redaction

All data received by the ETL agent undergoes a data redaction process based on the configuration set by the user.

## Health Check

If you would like to perform a health check on the Rookout ETL Controller, you can access `http://<ROOKOUT_CONTROLLER_HOST>:<ROOKOUT_CONTROLLER_PORT>/healthz`. A healthy ETL Controller should return a response of "HTTP 200".
