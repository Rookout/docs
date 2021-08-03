---
id: etl-controller-k8s
title: ETL Controller on Kubernetes
sidebar_label: Installation - Kubernetes
---

---

*Please note that the ETL Controller feature is only available on the Enterprise plan. [Contact us](https://www.rookout.com/company/contact) to enable the ETL Controller feature for your organization.*

---

## Installation

### Install using Helm

*Note: Installation requires Kubernetes 1.9+ with Beta APIs enabled.*

To install our Helm chart, execute according to your Helm version:

<!--DOCUSAURUS_CODE_TABS-->

<!--Helm v2-->

```bash
helm repo add rookout https://helm-charts.rookout.com
helm repo update
helm install --name my-controller rookout/controller --set controller.token=[Your Rookout Token]
```

<div class="rookout-org-info"></div>

<!--Helm v3-->

```bash
helm repo add rookout https://helm-charts.rookout.com
helm repo update
helm install my-controller rookout/controller --set controller.token=[Your Rookout Token]
```

<div class="rookout-org-info"></div>

<!--END_DOCUSAURUS_CODE_TABS-->

This installs the Controller with the most basic configuration, see the [configuration](#configuration) section for more options.

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

## Configuration

To further configure the Controller installation, add configuration values to the `values.yaml` file or to the installation command using `--set`.

All configuration values can be found [here](etl-controller-config#helm-values).
