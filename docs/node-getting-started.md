---
id: node-getting-started
title: Getting started with Rookout and NodeJS
sidebar_label: NodeJS Tutorial
---

1. Clone our [GitHub repo](https://github.com/Rookout/tutorial-nodejs) to your local computer and run it.
    ```bash
    git clone https://github.com/Rookout/tutorial-nodejs
    export ROOKOUT_TOKEN=<Your-Token>
    cd tutorial-nodejs
    docker-compose up
    ```
    <details>
    <summary>_I don't want to use docker_</summary>
    
    For Linux:  
    
    ```bash
    git clone https://github.com/Rookout/tutorial-nodejs
    export ROOKOUT_TOKEN=<Your-Token>
    cd tutorial-nodejs
    make -j run-prod
    ```
    
    For Mac:
    
    - make sure you have `xcode` installed (you need this for gRPC).
    - make sure that you use node version <= `8.x.x`   
    
    Run the agent (you will still have to run it in docker for the agent):
    
    ```bash
    export ROOKOUT_TOKEN=<Your-Token>
    docker-compose up -d rookout-agent
    ```
    
    Then run the node server:
    
    ```bash
    make install-dependencies start-web
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
        
    src/
    ├── handlers
    │   └── homePage.js
    ├── routes
    ├── services
    ├── static
    ├── templates
    └── utils
        
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
