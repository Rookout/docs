---
id: getting-started
title: Rapid production debugging with Rookout
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

- Docker, [available here](https://www.docker.com/community-edition#/download)

- Rookout account, [open an account on our website](https://www.rookout.com/join-our-early-adopters-plan/)




### Tutorial

1. First, you will need to clone or download our [tutorial github repository](https://github.com/Rookout/tutorial-nodejs).
2. Running Locally

   1. Set your agent token in an env variable 
     ```bash
     export ROOKOUT_TOKEN=<Your-Token>
     ```
   2. Start agent and app
        - With Docker `docker-compose up`
   
        - Without Docker `make -j run-prod`

3. After running the server go to [https://app.rookout.com/](https://app.rookout.com/) and **Log In**
4. Add the source code according to the instructions using the left pane **Source View**
    <details>
    <summary>More details</summary>
    <p>
    
    #### Adding source code
    
    1. Click on Add source
    1. Choose source control
        - Github
            - Click on Connect
            - Authorize O-Auth
            - Fill `Repository Owner`
            - Click `Repository` and choose from the dropdown menu
            - Click Next
            - Choose the desired branch
            - Click View Repository
        - Local FileSystem - Server
            - Click on Setup Server
            - Choose a supported HTTP Server (Node.js)
            - Leave the default port `8000` or choose your own
            - Run your local server e.g. `simple-https -p 8000` in the right directory
            - Click on Connect to Server
    </p>
    </details>
    
    
5. Open the file `src/handlers/homePage.js`
<details>
    <summary>View file tree</summary>
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

6. Add a default (Dumpframe) rule next to the line number 5 by clicking next the the line number in the file viewer
7. Looking at the right-hand pane **Rules**, you will see the rule you added, on what line you added it and it should be GREEN, meaning everything is communicating correctly.
    - If this is not the case, [click here](troubleshooting-rules.md) to see how to fix that
8. Refresh, or go the the app page [http://localhost:4000/](http://localhost:4000/) in order to trigger the rule
9. Check the bottom pane **Messages** and you'll see the dumpframe you just added, as it was triggered by the handler of the web page when you accessed it


Go through our [bug hunt](tutorials-bughunt-node.md) and follow instructions to see some basic use cases.

### Bug Hunt

**What is this?**

We prepared for you a few manually introduced bugs in order to learn how to use Rookout.
The first two will make sure you understand how to create and analyze our most complete rule - the Dump Frame.
The third bug will introduce a new rule type - Log. You will be walked through the process of editing the rule in order
to add custom elements to it.

For more information about Rule Scripting refer to [our reference](rules-index.md)

__Level: Beginner__
- __The bug: Clear Completed button hangs, does not do what is intended - nothing is cleared.__
    - **Reproduce:** Add a few tasks, check one or more as completed using the checkbox on the left of the task and click the `Clear completed` button on the bottom right corner.
    - **Debug:**  
        1. In the Rookout app, open the file `/src/utils/store.js`
        2. Using the **Rules** pane on the right, select the *Rule Type* "Dump Frame"
        3. Add this rule to line 131 and try again to click on `Clear completed` to see the message that pops in the Rookout app
        4. We can now see the whole stacktrace leading to this point and we pinpoint the error to this message :
        5. We see the `Locals` object and all we have in is `this`, which has `todos` inside it.
            - it means we need to access todos as `this.todos.filter(...` and not `todos.filter(...`
        6. We can now know what is not working on the server-side and fix it.

__Level: Beginner__
- __The bug: Special characters (<,>,;,`,&,/,\\) are not being accepted as part of the title when Adding or Updating a Todo.__
    - **Reproduce:** Add a task with special characters. All these characters should not be saved.
    - **Debug:**
        1. In the Rookout app, open the file `/src/services/todos.js`
        2. At lines 14 and 61 we see that the title passes the function `utils.cleanString(...)` - Let's add a `Dump Frame` to the end of the function in file `/src/services/utils.js`.
        3. Try to add a task with some of these characters to get the frame.
        4. We can see that after using this function, on line 3 these characters are being found and replaced by regex. We found the source of the issue.
        ```
        regex = ...
        this = ...
        str = "Test < > &&"
        trimmedStr = "Test"
        ```

__Level: Intermediate__
- __The bug: Duplicate Todo adds an invalid todo instead of an exact copy of an existing one.__
    - **Reproduce:** Add a task and when hovering on the text, on the right side you have the **&** symbol. Click on it to duplicate the task.
    - **Debug:**
        1. In the Rookout app, open the file `/src/services/todos.js`
        2. Using the **Rules** pane on the right, select the *Rule Type* "Log"
        3. Add this rule to line 92
        4. Before triggering the rule, let's edit it so it returns what we want
        5. In the **Rules** pane on the right, click the *Edit Rule* (pen) icon next to the rule you just added. It will open up the Rule configuration as a JSON file
        6. On line 6 in the `paths` object let's add a property `"store.rookout.locals.todo": "frame.todo"`
        7. On line 28 we have `processing.operations` object, let's add a new operation in the array :

        __name: send_rookout - means we are sending the information to the rookout web application__
        __path: store.rookout.locals.todo - we tell the rule what information to send__

        ```
        {
            "name": "send_rookout",
            "path": "store.rookout.locals.todo"
        }
        ```
        
        7. Add and duplicate a todo in order to see the output, and now we can see what is being given to the object and match if we have an error in the function (parameters missing or in bad order).


## Next steps

Head over to [our reference](reference-home.md)  
See [our installation guides](installation-overview.md) for platform-specific installation examples
