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

To install our Helm chart, execute according to your Helm version:

<!--DOCUSAURUS_CODE_TABS-->

<!--Helm v3-->

```bash
helm repo add rookout https://helm-charts.rookout.com
helm repo update
helm install my-datastore rookout/datastore --set datastore.token=<YOUR_ORGANIZATION_TOKEN>
```

<div class="rookout-org-info"></div>

<!--Helm v2-->

```bash
helm repo add rookout https://helm-charts.rookout.com
helm repo update
helm install --name my-datastore rookout/datastore --set datastore.token=<YOUR_ORGANIZATION_TOKEN>
```

<div class="rookout-org-info"></div>

<!--END_DOCUSAURUS_CODE_TABS-->
 
### Install without Helm

If you're not using Helm with your Kubernetes cluster, you'll still be able to deploy the Datastore.

Helm is needed to be installed locally ([Helm](https://helm.sh/docs/intro/install/)) to create the yaml file from the templates.

First, Clone our [Helm charts repository](https://github.com/Rookout/helm-charts) and go to the directory called "charts/datastore".

Next, execute according to your Helm version:

<!--DOCUSAURUS_CODE_TABS-->

<!--Helm v3-->

```bash
helm template my-controller . --set datastore.token=[Your Rookout Token] > rookout-datastore.yaml
```

<div class="rookout-org-info"></div>

<!--Helm v2-->

```bash
helm template --name my-datastore . --set datastore.token=[Your Rookout Token] > rookout-datastore.yaml
```

<div class="rookout-org-info"></div>

<!--END_DOCUSAURUS_CODE_TABS-->

This command should create a file called "rookout-datastore.yaml" including the Kubernetes deployment and service configuration.

To apply the configuration, execute:

```bash
kubectl apply -f rookout-datastore.yaml
```

## Docker

To deploy the Datastore as a Docker container (using [this image](https://hub.docker.com/r/rookout/data-on-prem/)), execute the following:

```bash
docker run -p 8080:8080 -e "ROOKOUT_DOP_SERVER_MODE=PLAIN" -e "ROOKOUT_TOKEN=[Your Rookout Token]" rookout/data-on-prem
```

<div class="rookout-org-info"></div>

## Next Steps

The instructions above describe the deployment process of the Datastore with the most basic configuration.

Using the Datastore requires setting up a TLS termination proxy (recommended) or providing it with a TLS certificate for encryption purposes.

To configure the Rookout app to use the datastore, go to the "Setup" page in the settings menu and check the "Enable On-Prem Datastore component" box. Then, enter the URL for the Datastore in the text boxes, and click "Test" to test the connection.

The first URL is called "Datastore URL accessible from user's browser" which should start with `https://` followed by the domain name of the datastore that is accessible from the user's computers.

The second URL is called "Datastore URL accessible from the Rookout Controller". It should either start with `http://` if using `PLAIN` server mode and the ETL Controller is in the same local network as the Datastore, or with `https://` otherwise.

To further configure your Datastore installation:

* Kubernetes - add configuration values to the `values.yaml` file or the installation command using `--set`.
* Docker - add configuration values as environment variables using the `-e` flag.

Read more about encryption, and all other configuration values [here](dop-config.md#helm-values).

