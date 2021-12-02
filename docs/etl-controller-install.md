---
id: etl-controller-install
title: ETL Controller Installation
sidebar_label: Installation
---

---

*Please note that the ETL Controller feature is only available on the Enterprise plan. [Contact us](https://www.rookout.com/company/contact) to enable the ETL Controller feature for your organization.*

---

Follow these installation instructions to deploy the ETL Controller in your environment, either on Kubernetes or Docker.

## Kubernetes

There are two ways to deploy the ETL Controller on Kubernetes.

### Install using Helm

To install our Helm chart, execute according to your Helm version:

<!--DOCUSAURUS_CODE_TABS-->

<!--Helm v3-->

```bash
helm repo add rookout https://helm-charts.rookout.com
helm repo update
helm install my-controller rookout/controller --set controller.token=[Your Rookout Token]
```

<div class="rookout-org-info"></div>

<!--Helm v2-->

```bash
helm repo add rookout https://helm-charts.rookout.com
helm repo update
helm install --name my-controller rookout/controller --set controller.token=[Your Rookout Token]
```

<div class="rookout-org-info"></div>

<!--END_DOCUSAURUS_CODE_TABS-->

### Install without Helm

If you're not using Helm with your Kubernetes cluster, you'll still be able to deploy the Controller.

Helm is needed to be installed locally ([Helm](https://helm.sh/docs/intro/install/)) in order to create the yaml file from the templates.

First, Clone our [Helm charts repository](https://github.com/Rookout/helm-charts) and go to the directory called "charts/controller".

Next, execute according to your Helm version:

<!--DOCUSAURUS_CODE_TABS-->

<!--Helm v2-->

```bash
helm template . --set controller.token=[Your Rookout Token] --name=my-controller > rookout-controller.yaml
```

<div class="rookout-org-info"></div>

<!--Helm v3-->

```bash
helm template my-controller . --set controller.token=[Your Rookout Token] > rookout-controller.yaml
```

<div class="rookout-org-info"></div>

<!--END_DOCUSAURUS_CODE_TABS-->

This command should create a file called "rookout-controller.yaml" including the Kubernetes deployment and service configuration.

To apply the configuration, execute:

```bash
kubectl apply -f rookout-controller.yaml
```

## Docker

To deploy the Controller as a Docker container (using [this image](https://hub.docker.com/r/rookout/controller/)), execute the following:

```bash
docker run -p 7488:7488 -e "ROOKOUT_TOKEN=[Your Rookout Token]" rookout/controller
```

<div class="rookout-org-info"></div>

## Next Steps

The instructions above describe how to deploy the Controller with the most basic configuration.

When the Controller successfully connects to Rookout, it should appear in the Rookout app under *Settings > Connected Applications > Controllers*.

To connect Rookout SDK instances to the ETL Controller, set `ROOKOUT_CONTROLLER_HOST` and `ROOKOUT_CONTROLLER_PORT` environment variables for the SDK (or use per-SDK start function parameters).

`ROOKOUT_CONTROLLER_HOST` should start with `ws://` for unencrypted connections (when using the Controller's `PLAIN` server mode without a TLS termination proxy) or `wss://` for encrypted connections (using `TLS` mode or a TLS termination proxy).

To further configure your Controller installation:
* Kubernetes - add configuration values to the `values.yaml` file or the installation command using `--set`.
* Docker - add configuration values as environment variables using the `-e` flag.

Read more about encryption, and all other configuration values [here](etl-controller-config.md#helm-values).
