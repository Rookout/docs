---
id: dop-install
title: Datastore Installation
sidebar_label: Installation
---

---

*Please note that the Data On-Premise feature is only available on the Enterprise plan. [Contact us](https://www.rookout.com/company/contact) to enable the Data On-Premise feature for your organization.*

---

Follow these installation instructions to deploy the Datastore in your environment, either on Kubernetes or Docker.

## Kubernetes

There are two ways to deploy the Datastore on Kubernetes.

### Install using Helm

*Note: Installation requires Kubernetes 1.9+ with Beta APIs enabled.*

To install our Helm chart, execute according to your Helm version:

<!--DOCUSAURUS_CODE_TABS-->

<!--Helm v2-->

```bash
helm repo add rookout https://helm-charts.rookout.com
helm repo update
helm install --name my-datastore rookout/datastore --set datastore.token=<YOUR_ORGANIZATION_TOKEN>
```

<div class="rookout-org-info"></div>

<!--Helm v3-->

```bash
helm repo add rookout https://helm-charts.rookout.com
helm repo update
helm install my-datastore rookout/datastore --set datastore.token=<YOUR_ORGANIZATION_TOKEN>
```

<div class="rookout-org-info"></div>

<!--END_DOCUSAURUS_CODE_TABS-->
 
### Install without Helm

If you're not using Helm with your kubernetes cluster, you'll still be able to install the Controller.

Helm is needed to be installed locally ([Helm](https://helm.sh/docs/intro/install/)) in order to create the yaml file from the templates.

First, Clone our [Helm charts repository](https://github.com/Rookout/helm-charts) and change directory to "charts/controller".

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

This should have created a file called "rookout-controller.yaml" with the kubernetes deployment and service configuration.

To apply the configuration, execute:

```bash
kubectl apply -f rookout-controller.yaml
```

## Docker

To install the Datastore as a Docker container (using [this image](https://hub.docker.com/r/rookout/data-on-prem/)), execute the following:

```bash
docker run -p 7488:7488 -e "ROOKOUT_TOKEN=[Your Rookout Token]" rookout/data-on-prem
```

<div class="rookout-org-info"></div>

## Configuration

The instructions above describe how to install the Datastore with the most basic configuration.

To further configure your Datastore installation:

* Kubernetes - add configuration values to the `values.yaml` file or the installation command using `--set`.
* Docker - add configuration values as environment variables using the `-e` flag.

<!-- Connecting Rookout SDK instances to the Controller requires providing a TLS certificate or adding a TLS termination proxy for encryption purposes. -->

Read more about encryption, and all other configuration values [here](etl-controller-config.md#helm-values).

