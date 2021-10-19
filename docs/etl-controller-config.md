---
id: etl-controller-config
title: ETL Controller Configuration
sidebar_label: Configuration
---

---

*Please note that the ETL Controller feature is only available on the Enterprise plan. [Contact us](https://www.rookout.com/company/contact) to enable the ETL Controller feature for your organization.*

---

This page includes configuration reference for the ETL Controller.

1. For Kubernetes installations see [Helm Values](#helm-values)
2. For Docker installations see [Environment Variables](#environment-variables)

## Helm Values

Configure the controller [k8s installation](etl-controller-k8s.md) by setting values in the `values.yaml` file or using `--set` in the `helm install` command.

### Controller Configuration

| Configuration                                         | Key                                         | Value                | Default |
| ---                                                   | ---                                         | ---                  | ---     |
| [Rookout token](#rookout-token)                       | `controller.token`                          | Rookout token        | -       |  
| [Server mode](#server-mode)                           | `controller.serverMode`                     | `PLAIN` or `TLS`     | `PLAIN` |
| [Proxy server](#proxy-server)                         | `controller.proxy`                          | URL                  | -       |
| [Proxy username](#proxy-server)                       | `controller.proxyUsername`                  | URL                  | -       |
| [Proxy password](#proxy-server)                       | `controller.proxyPassword`                  | URL                  | -       |
| [Skip SSL verification](#skip-ssl-verification)       | `controller.datastore_no_ssl_verif`         | `true` or `false`    | `false` |
| [Limit CPU cores](#resources-cpu-cores)               | `controller.internalResources.limits.cpu`   | Integer              | 4       |
| [Limit memory](#limit-memory)                         | `controller.internalReources.limits.memory` | Integer (MB)         | 1024    |
| [Listen on port](#listen-on-port)                     | `controller.port`                           | Integer              | 7488    |

### Additional Kubernetes Configuration

| Configuration                               | Key                                       | Value                | Default                    |
| ---                                         | ---                                       | ---                  | ---                        |
| Token secret name                           | `controller.tokenFromSecret.name`         | String               | -                          |
| Token secret key                            | `controller.tokenFromSecret.key`          | String               | -                          |
| Proxy password secret name                  | `controller.proxyPasswordFromSecret.name` | String               | -                          |
| Proxy password secret key                   | `controller.proxyPasswordFromSecret.key`  | String               | -                          |
| K8s labels                                  | `controller.labels`                       | Key: value           | -                          |
| Create an ingress                           | `ingress.enabled`                         | `true` or `false`    | `false`                    |
| Ingress host                                | `ingress.host`                            | Domain name          | Internal<br>domain name    |
| Pod<br>memory request                       | `controller.resources.requests.memory`    | Memory units         | 32Mi                       |
| Pod<br>CPU request                          | `controller.resources.requests.cpu`       | CPU units            | 30m                        |
| Pod<br>memory limit                         | `controller.resources.limits.memory`      | Bytes unit           | 1024Mi                     |
| Pod<br>CPU limit                            | `controller.resources.limits.cpu`         | CPU units            | 4000m                      |
| Container<br>image registry                 | `image.registry`                          | URL                  | docker.io                  |
| Container<br>image name                     | `image.repository`                        | Image name           | rookout/controller         |
| Container<br>image tag                      | `image.tag`                               | Image tag            | latest                     |
| Container<br>image pull policy              | `image.pullPolicy`                        | Pull policy          | `Always` or `IfNotPresent` |
| Container<br>image pull secret              | `image.pullSecrets`                       | Pull secrets         | -                          |
| Service account<br>name                     | `serviceAccount.name`                     | String               | -                          |
| Pod<br>annotations                          | `podAnnotations`                          | Key: value           | -                          |
| Service<br>annotations                      | `service.annotations`                     | Key: value           | -                          |

## Environment Variables

Configure the controller [docker container](etl-controller-docker.md) by passing environment variables to it.

| Configuration                                         | Environment Variable             | Value             | Default |
| ---                                                   | ---                              | ---               | ---     |
| [Rookout token](#rookout-token)                       | `ROOKOUT_TOKEN`                  | Rookout token     | -       |
| [Server mode](#server-mode)                           | `ROOKOUT_CONTROLLER_SERVER_MODE` | `PLAIN` or `TLS`  | `PLAIN` |
| [Proxy server](#proxy-server)                         | `ROOKOUT_PROXY`                  | URL               | -       |
| [Proxy username](#proxy-server)                       | `ROOKOUT_PROXY_USERNAME`         | String            | -       |
| [Proxy password](#proxy-server)                       | `ROOKOUT_PROXY_PASSWORD`         | String            | -       |
| [Send data to Rookout](#send-data-to-rookout)         | `ROOKOUT_SEND_DATA`              | `true` or `false` | `true`  |
| [Skip SSL verification](#skip-ssl-verification)       | `ROOKOUT_SKIP_SSL_VERIFY`        | `true` or `false` | `false` |
| [Limit CPU cores](#resources-cpu-cores)               | `ROOKOUT_CONTROLLER_MAX_CPU`     | Integer           | 1       |
| [Limit memory](#limit-memory)                         | `ROOKOUT_CONTROLLER_MAX_MEMORY`  | Integer (MB)      | 512     |

## Configuration Details

### Rookout Token

Set this to your organization's token just like you would when configuring the Rookout SDK.

### Server Mode

Configure whether the connection of SDK instances to the Controller will be encrypted using TLS or not.

For security best practices, set this to `PLAIN` only if the connection is secure and trusted, or if you are using TLS termination.

If server mode is set to `TLS`, a certificate and a private key must be provided at `/var/controller-tls-secrets/tls.crt` and `/var/controller-tls-secrets/tls.key` respectively.

To do so in a K8s deployment, you will need to create the following secret & configmap in your k8s cluster:

```bash
kubectl create configmap rookout-tls-cert --from-file=tls.crt=<path to cert file>
kubectl create secret generic rookout-tls-key --from-file=tls.key=<path to key file>
```

For Docker deployments, create volumes for the certificate and key that are mapped to the locations described above.

### Proxy Server

Set this to your proxy URL/address to have the Controller manually connect through it.

If authentication is required, it is possible to add a username and password. The password can be added as a plain string or as a K8s secret.

### Send Data to Rookout

If you wish that data collected from breakpoints will only be sent by the Controller to targets and not to Rookout's servers and the web IDE, set this configuration to `false`.

### Skip SSL Verification

If this is set to `true`, the Controller will skip the verification of SSL certificates when connecting to servers.

For security best practices, this option should always be set to `false`.

### Limit CPU Cores

Limit the amount of CPU cores the Controller will use.

### Limit Memory

Limit the amount of RAM the Controller will use.

### Listen on Port

Set the port the Controller will listen on for incoming SDK instances.

### Data Redaction

All data received by the ETL agent undergoes a data redaction process based on the configuration set by the user.

## Health Check

If you would like to perform a health check on the Rookout ETL Controller, you can access `http://<ROOKOUT_CONTROLLER_HOST>:<ROOKOUT_CONTROLLER_PORT>/healthz`. A healthy ETL Controller will return an HTTP 200 OK response.
