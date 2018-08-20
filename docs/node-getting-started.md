---
id: node-getting-started
title: Getting started with Rookout and NodeJS
sidebar_label: NodeJS Tutorial
---

In this tutorial, we will setup and debug a sandbox Node.JS application.
Before moving forward, make sure you have a [Rookout account](https://www.rookout.com/trial/) and a [Docker Compose](https://docs.docker.com/compose/install/) setup.

1. Clone the [Node.js tutorial](https://github.com/Rookout/tutorial-nodejs) to your local machine and run it:

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

2. Log in to the Rookout app at [https://app.rookout.com/](https://app.rookout.com/) and **Log In**

If this is your first time using Rookout, close the tutorial and create a workspace.

3. Create a workspace and import the source code into Rookout: **Workspace Creation**
    <details>
    <summary>_More details_</summary>
    <p>
    
    #### Adding source code
    - From Github 
        1. Set the Workspace Name to "Node Tutorial"
        1. Click the + icon near "Sources" and choose GitHub from the drop down lost
        1. Type "Rookout" in Repository owner
        1. Type "tutorial-nodejs" in Repository name
        1. Click Add Repository
        1. Click Apply
        1. Click Select Workspace
    
    - From your local machine
        1. TODO - Explorook
        
    </p>

    Expect to find the file tree of the imported code on source view, to the left hand side of the Rookout IDE.

    </details>
    
    
4. From the source view, open the file `src/handlers/homePage.js`

    Hint: click the search icon or use ctrl+shift+f to search for the file.
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
