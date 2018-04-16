---
id: getting-started
title: Walk me
sidebar_label: Rapid production debugging with Rookout
---

## What is Rookout

Rookout real-time instrumentation means you don’t need to restart, redeploy or write code to see inside your app.

Our solution supports Python, JVM, and NodeJS on AWS, Azure and Google Cloud or on your bare metal. We provide
end-to-end security, coupled with a small footprint and a negligible performance impact.

<details>
<summary>_What is a Rookout Agent?_</summary>
<p>
The Rookout agent provides local orchestration of data collection as well as basic ETL functionality.
It allows loading the data into local targets such as file system and elasticsearch.

The Agent can be either installed directly onto a systemd compatible OS, as a Docker container (recommended)
or as a service hosted by Rookout, connecting to the agent remotely.

For more information about the Agent see [Agent Overview](agent.md)
</p>
</details>

<details>
<summary>_What is a Rook?_</summary>
<p>
Rooks are the component that allows you to collect data directly from a running application.  
A Rook is a dependency that is loaded directly from your application as any other library.  

For more information about Rooks see [Rooks Overview](rooks-index.md)
</p>
</details>

#### Watch our demo

<iframe style="margin: 20px 0 0 0" width="560" height="315" src="https://www.youtube.com/embed/qTdpOC92DBI?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

## Tutorial

### Pre-requisites

- [docker-compose](https://docs.docker.com/compose/install/)

- [Rookout account](https://www.rookout.com/join-our-early-adopters-plan/)


### Tutorial

1. Clone our [GitHub repo](https://github.com/Rookout/tutorial-nodejs) to your local computer and run it.
    ```bash
    git clone https://github.com/Rookout/tutorial-nodejs
    export ROOKOUT_TOKEN=<Your-Token>
    cd tutorial-nodejs
    docker-compose up
    ```
    <details>
    <summary>_I don't want to use docker_</summary>
    ```bash
    git clone https://github.com/Rookout/tutorial-nodejs
    export ROOKOUT_TOKEN=<Your-Token>
    cd tutorial-nodejs
    make -j run-prod
    ```
    </details>

2. Go to [https://app.rookout.com/](https://app.rookout.com/) and **Log In**
3. Add the source code according to the instructions using the left pane **Source View**
    <details>
    <summary>_More details_</summary>
    <p>
    
    #### Adding source code
    
    - Click on Add source
    - Choose source control
        - Github
            1. Click on Connect
            1. Authorize O-Auth
            1. Fill `Repository Owner`
            1. Click `Repository` and choose from the dropdown menu
            1. Click Next
            1. Choose the desired branch
            1. Click View Repository
        - Local FileSystem - Server
            1. Click on Setup Server
            1. Choose a supported HTTP Server (Node.js)
            1. Leave the default port `8000` or choose your own
            1. Run your local server e.g. `simple-https -p 8000` in the right directory
            1. Click on Connect to Server
    </p>
    </details>
    
    
4. Open the file `src/handlers/homePage.js`
<details>
    <summary>_View file tree_</summary>
    <p>
    ```
    src/
    ├── handlers
    │   └── homePage.js
    ├── routes
    ├── services
    ├── static
    ├── templates
    └── utils
    ```
    </p>
</details>

5. Add a _Dumpframe_ rule next to line number 5 by clicking next the the line number in the file viewer
![Dumpframe Rule](/img/screenshots/getting_started_6.png)
6. Looking at the right-hand pane **Rules**, you will see the rule you added, on what line you added it and it should be 
<span style="color: #73CD1F;">**GREEN**</span>, meaning everything is communicating correctly.
![Valid Rule](/img/screenshots/getting_started_7.png)
    - If this is not the case, [click here](troubleshooting-rules.md) to see how to fix that
7. Go the the app webpage [http://localhost:4000/](http://localhost:4000/) in order to trigger the rule
8. Check the bottom pane **Messages** and you'll see the dumpframe you just added, as it was triggered by the handler of the web page when you accessed it
![Message pane](/img/screenshots/getting_started_9.png)

## Bug Hunt

Great! You're now ready to start debugging, let's start by having some fun with our 
[bug hunt](tutorials-bughunt-node.md) - follow instructions to try out some basic use cases.
