---
id: etl-controller-config
title: ETL Controller Configuration
sidebar_label: Configuration
---

---

*Please note that the ETL Controller feature is only available on the Enterprise plan.*

*Enterprise users - please [contact us](https://www.rookout.com/company/contact) to enable the ETL Controller feature for your organization.*

---

## Environment Variables

Configure the controller [docker container](etl-controller-docker) by passing environment variables to it.

| Configuration                  | Environment Variable             | Value             | Default          |
| ---                            | ---                              | ---               | ---              |
| Rookout token                  | `ROOKOUT_TOKEN`                  | Rookout token     | -                |
| Server mode                    | `ROOKOUT_CONTROLLER_SERVER_MODE` | `PLAIN` or `TLS`  | `PLAIN`          |
| Proxy server                   | `ROOKOUT_PROXY`                  | URL               | -                |
| Disable sending data           | `ROOKOUT_SEND_DATA`              | `true` or `false` | `true`           |
| Skip SSL verification          | `ROOKOUT_SKIP_SSL_VERIFY`        | `true` or `false` | `false`          |
| Limit CPU cores                | `ROOKOUT_CONTROLLER_MAX_CPU`     | Integer           | 1                |
| Limit memory resources (MB)    | `ROOKOUT_CONTROLLER_MAX_MEMORY`  | Integer           | 512              |
| Listen on port                 | `ROOKS_WS_LISTEN_ADDR`           | Integer           | 7488             |
| Listen on all interfaces       | `ROOKOUT_LISTEN_ALL`             | `true` or `false` | `false`          |

## Helm Values

Configure the controller [k8s installation](etl-controller-k8s) by setting values in the `values.yaml` file or using `--set` in the `helm install` command.

| Configuration                               | Key                                         | Value                | Default                 |
| ---                                         | ---                                         | ---                  | ---                     |
| Rookout token                               | `controller.token`                          | Rookout token        | -                       |  
| Server mode                                 | `controller.serverMode`                     | `PLAIN` or `TLS`     | `PLAIN`                 |
| Proxy server                                | `controller.proxy`                          | URL                  | -                       |
| Skip SSL<br>verification                    | `controller.datastore_no_ssl_verif`         | `true` or `false`    | `false`                 |
| Limit controller's<br>CPU cores             | `controller.internalResources.limits.cpu`   | Integer              | 4                       |
| Limit controller's<br>memory resources (MB) | `controller.internalReources.limits.memory` | Integer              | 1024                    |
| Listen on port                              | `controller.port`                           | Integer              | 7488                    |
| Listen on all<br>interfaces                 | `controller.listenAll`                      | `true` or `false`    | `false`                 |
| Token secret name                           | `controller.tokenFromSecret.name`           | String               | -                       |
| Token secret key                            | `controller.tokenFromSecret.key`            | String               | -                       |
| K8s labels                                  | `controller.labels`                         | Key: Value           | -                       |
| Create an ingress                           | `ingress.enabled`                           | `true` or `false`    | `false`                 |
| Ingress host                                | `ingress.host`                              | Domain name          | Internal<br>domain name |           


| Configuration            |            Parameter                      |              Description                 |                          Default                        | 
| --- | --- | --- |
| Rookout token            | `controller.token`                           | Rookout organizational token             | `Nil` You must provide your own token                   |  
| Server mode              | `controller.serverMode`                   | TLS / PLAIN                    | PLAIN (required)
| `controller.tokenFromSecret.name`                 | Secret ref in which the Rookout token resides  | `Nil` You must provide your own secret (Optional if setting the token using controller.token)                   |  
| `controller.tokenFromSecret.key`                 | Key of the secret in which the Rookout token resides  | `Nil` You must provide your own secret (Optional if setting the token using controller.token)                   |  
| `ingress.enabled` | Creates a simple ingress that will direct a defined hostname to the controller. Note that this ingress does not consist of cert-manager | `False` | 
| `ingress.host` | Hostname set to the controller | (none) | 
| `controller.listenAll`                       | Configuring the Controller to listen on all addresses instead of only localhost.                      | `False` Listens only on localhost |
| `controller.port`                       | On which port to listen for connections                       | 7488 |
| `controller.labels`                       | Additional labels for the Deployment | (None)  |
| `controller.proxy`                       | HTTPS proxy. example: https://127.0.0.1:9090 | (None) |
| `controller.resources.requests.cpu`          | CPU resource requests                    | `30m`                                                   |
| `controller.resources.limits.cpu`            | CPU resource limits                      | `4000m`                                                 |
| `controller.resources.requests.memory`       | Memory resource requests                 | `32Mi`                                                  |
| `controller.resources.limits.memory`         | Memory resource limits                   | `1024Mi`                                                |
| `controller.internalResources.limits.cpu`    | Rookout Controller internal cpu limit, measured in number of full cpus     | `4`                    |
| `controller.internalReources.limits.memory`  | Rookout Controller internal memory limit, measured in Mb                 | `1024`                   |
| `image.registry`                          | Rookout image registry                   | `docker.io`                                             |
| `image.repository`                        | Rookout image name                       | `rookout/controller`                                         |
| `image.tag`                               | Rookout image tag                        | `{VERSION}`                                             |
| `image.pullPolicy`                        | Image pull policy                        | `Always` if `imageTag` is `latest`, else `IfNotPresent` |
| `image.pullSecrets`                       | Specify image pull secrets               | `nil`                                                   |
| `serviceAccount.name` | Optional name for the service account | (none) |
| `podAnnotations` | Annotations for the controller k8s pod | (none) |
| `service.annotations` | Annotations for the controller k8s service | (none) |
| `affinity` | deployment affinity (optional) | (none) |
| `tolerations` | deployment tolerations (optional) | (none) |
| `nodeSelector` | deployment nodeSelector (optional) | (none) |
| `controller.datastore_no_ssl_verif` | skip SSL cert verification when connecting to datastore | false |

## Configuration Details

### Disable Sending Data

The ETL Controller connects to the Rookout Service to receive commands and report telemetry information.
Data collected from within the application may be sent to Rookout for interactive debugging sessions.

You may configure a local policy preventing the ETL Controller from sending application data to Rookout by adding the following line to the configuration file at `/etc/default/rookout-controller` .

```bash
export ROOKOUT_SEND_DATA=FALSE

```

### Local Breakpoint Targets

As the ETL Controller runs within your network, it allows you to direct the collected data into data sinks.
For example, debug messages can be sent to Elasticsearch or Splunk.

### Data Redaction

All data received by the ETL agent undergoes a data redaction process based on the configuration set by the user.

### Proxy Support

The Rookout ETL Controller has HTTPS proxy support for advanced network configurations.
As most production systems do have automated means for proxy detection, you should configure it statically.

This can be done when installing the ETL Controller by adding:

```bash
setup.sh --token=[Your Rookout Token] --https-proxy=[Your Proxy Server]

```

<div class="rookout-org-info"></div>

Or by adding the ROOKOUT_PROXY configuration to the ETL Controller configuration file at `/etc/default/rookout-controller` :

```bash
export ROOKOUT_PROXY=[Your Proxy Server]

```

### Security options

The controller uses the system certificate store to verify secure connections to servers. If you prefer to skip certificate verification,
you can set the `ROOKOUT_SKIP_SSL_VERIFY` environment variable.

```bash
export ROOKOUT_SKIP_SSL_VERIFY=1

```

**Note**: This might compromise the security of your system.

## Performance

A single ETL Controller can handle thousands of concurrent applications connected to it, but the default configuration is optimized for about 100 concurrent applications.

The default limits include:

1. The ETL Controller is restricted to use a single CPU core - to change the limit set `ROOKOUT_CONTROLLER_MAX_CPU` to the desired number of cores.
2. The ETL Controller is restricted to 512MB of RAM - to change the limit set `ROOKOUT_CONTROLLER_MAX_MEMORY` to the desired memory in megabytes. Should the ETL Controller exceed that, it will exit with message similar to:

```text
Memory limit reached (520 Mb) The limit is (512 Mb) - exiting

```

You can also adjust the limit when installing the ETL controller:

```bash
setup.sh --token=[Your Rookout Token] --max-mem=1024

```

<div class="rookout-org-info"></div>

## Health Check

If you would like to perform a health check on the Rookout ETL Controller, you can access http://<ROOKOUT_CONTROLLER_HOST>:<ROOKOUT_CONTROLLER_PORT>/healthz.  For example, a default configuration on your localhost might make the health check URL available at http://localhost:7488/healthz).  A healthy ETL Controller will return an HTTP 200 OK response.
