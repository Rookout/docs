---
id: getting-started
title: Walk me
sidebar_label: Rapid production debugging with Rookout
---

## What is Rookout

Rookout real-time instrumentation means you don’t need to restart, redeploy or write code to see inside your app.

Our solution supports Python, JVM, and NodeJS on AWS, Azure and Google Cloud or on your bare metal. We provide
end-to-end security, coupled with a small footprint and a negligible performance impact.


#### Watch our demo (click to start)

<a href="https://www.youtube.com/watch?v=qTdpOC92DBI" target="_blank">
    <img src="https://img.youtube.com/vi/qTdpOC92DBI/0.jpg" alt="Rookout Demo Video" />
</a>

## Tutorial

### Pre-requisites

- [docker-compose](https://docs.docker.com/compose/install/)

- [Rookout account](https://www.rookout.com/join-our-early-adopters-plan/)


### Tutorial

1. Clone our [GitHub repo](https://github.com/Rookout/tutorial-nodejs) to your local computer.
    ```bash
    $ git clone https://github.com/Rookout/tutorial-nodejs.git
    ```
2. Run the tutorial
    ```bash
    export ROOKOUT_TOKEN=<Your-Token> && docker-compose up
    ```
    <details>
    <summary>_I don't want to use docker_</summary>
    ```bash
    export ROOKOUT_TOKEN=<Your-Token> && make -j run-prod
    ```
    </details>

3. Go to [https://app.rookout.com/](https://app.rookout.com/) and **Log In**
4. Add the source code according to the instructions using the left pane **Source View**
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
    
    
5. Open the file `src/handlers/homePage.js`
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

6. Add a _Dumpframe_ rule next to line number 5 by clicking next the the line number in the file viewer
![Dumpframe Rule](/img/screenshots/getting_started_6.png)
7. Looking at the right-hand pane **Rules**, you will see the rule you added, on what line you added it and it should be 
<span style="color: #73CD1F;">**GREEN**</span>, meaning everything is communicating correctly.
![Valid Rule](/img/screenshots/getting_started_7.png)
    - If this is not the case, [click here](troubleshooting-rules.md) to see how to fix that
8. Go the the app webpage [http://localhost:4000/](http://localhost:4000/) in order to trigger the rule
9. Check the bottom pane **Messages** and you'll see the dumpframe you just added, as it was triggered by the handler of the web page when you accessed it
![Message pane](/img/screenshots/getting_started_9.png)

## Bug Hunt

Great! You're now ready to start debugging, let's start by having some fun with our 
[bug hunt](tutorials-bughunt-node.md) - follow instructions to try out some basic use cases.
