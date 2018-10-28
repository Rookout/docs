---
id: node-getting-started
title: Node.js sandbox tutorial
sidebar_label: NodeJS
---

In this tutorial, we will setup and debug a sample Node.JS application.

## Prerequisites

1. Node.js version 10 - https://nodejs.org/en/download/ 
2. NPM - https://docs.npmjs.com/cli/install
3. XCode (Mac only) - https://developer.apple.com/xcode/
4. Docker (optional) - https://www.docker.com/get-docker (In case you want to skip installing Node.js and NPM)

## Setup

1. Clone the [Node.js tutorial](https://github.com/Rookout/tutorial-nodejs) to your local machine and deploy it by running the commands below.<br/>
Your Rookout Token may be copied from the walkthrough tutorial, or from the Organization Settings page.

<div class="tab-container">
<input id="tab1" type="radio" name="tabs" class="tab-button" checked="true" />
<label for="tab1" class="tab-title">Linux/Mac</label>
<input id="tab2" type="radio" name="tabs" class="tab-button" />
<label for="tab2" class="tab-title">Windows</label>
<input id="tab3" type="radio" name="tabs" class="tab-button" />
<label for="tab3" class="tab-title">Docker</label>
<div id="content1" class="tab-content hljs">
<button onclick="copyToClipboard(this)" class="tab-copy button">Copy</button>

    git clone https://github.com/Rookout/tutorial-nodejs
    export ROOKOUT_TOKEN=[Your Rookout Token]
    cd tutorial-nodejs
    npm start

</div>
<div id="content2" class="tab-content hljs">
<button onclick="copyToClipboard(this)" class="tab-copy button">Copy</button>

    git clone https://github.com/Rookout/tutorial-nodejs
    set ROOKOUT_TOKEN=[Your Rookout Token]
    cd tutorial-nodejs
    npm start
    

</div>
<div id="content3" class="tab-content hljs">
<button onclick="copyToClipboard(this)" class="tab-copy button">Copy</button>

    
    git clone https://github.com/Rookout/tutorial-nodejs
    export ROOKOUT_TOKEN=[Your Rookout Token]
    cd tutorial-nodejs
    docker build . -t tutorial-nodejs
    docker run -p 4000:4000 -e ROOKOUT_TOKEN=$ROOKOUT_TOKEN tutorial-nodejs

</div>
</div>

2. Log in to the Rookout app at [your Rookout IDE](https://app.rookout.com/) and **Log In**.

3. Add the source code by following the instructions below:

    - Create a Workspace
        1. Click the Gear Wheel icon near the Workout selection menu, to the top left-hand side of the screen
        1. Click the + icon near the Search Workspace option to create a new Workspace
        1. Set the Workspace Name to "Node Tutorial"
        1. Click the + icon near "Sources" and choose either GitHub or Local Filesystem

    - Import source code from Github 
        1. Choose GitHub from the drop down list
        1. Type "Rookout" in Repository owner
        1. Type "tutorial-nodejs" in Repository name
        1. Click Add Repository
        1. Click Apply
        1. Click Select Workspace
    
    - If you don't use Github, import the source code from your local machine
        1. Choose Local Filesystem and follow the instructions in the following dialog.
    
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

We prepared for you a few manually introduced bugs in order to learn how to use Rookout.  
The first two will make sure you understand how to create and analyze our default rule - Dump Frame.  
The third bug will introduce a new rule type - Log. You will be walked through the process of editing the rule in order
to add custom elements to it.

For more information about Rule Scripting refer to [our reference](rules-index.md)

## Bug scenarios

__Level: Beginner__
- __The bug: Clear Completed button hangs, does not do what is intended - nothing is cleared.__
    - **Reproduce:** Add a few tasks, check one or more as completed using the checkbox on the left of the task and click the `Clear completed` button on the bottom right corner.
    - **Debug:**  
        1. In the Rookout app, open the file `/src/utils/store.js`
        2. Using the **Rules** pane on the right, select the *Rule Type* "Dump Frame"
        3. Add this rule to line 131 and try again to click on `Clear completed` to see the message that pops in the Rookout app
        4. We can now see the whole stacktrace leading to this point and we pinpoint the error to this message :
        5. We see the `Locals` object and all we have in is `this`, which has `store.todos` inside it.
            - it means we need to access todos as `this.todos.filter(...` and not `todos.filter(...`
        6. We can now know what is not working on the server-side and fix it.

__Level: Beginner__
- __The bug: Special characters (<,>,;,`,&,/,\\) are not being accepted as part of the title when Adding or Updating a Todo.__
    - **Reproduce:** Add a task with special characters. All these characters should not be saved.
    - **Debug:**
        1. In the Rookout app, open the file `/src/services/todos.js`
        2. At lines 14 and 73 we see that the title passes the function `utils.cleanString(...)` - Let's add a `Dump Frame` to the end of the function in file `/src/services/utils.js`.
        3. Try to add a task with some of these characters to get the frame.
        4. We can see that after using this function, on line 3 these characters are being found and replaced by regex. We found the source of the issue.
        ```javascript
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
        3. Add this rule to line 104
        4. Before triggering the rule, let's edit it so it returns what we want
        5. In the **Rules** pane on the right, click the *Edit Rule* (pen) icon next to the rule you just added. It will open up the Rule configuration as a JSON file
        6. On line 6 in the `paths` object let's add a property `"store.rookout.locals.todo": "frame.todo"`
        7. On line 28 we have `processing.operations` object, let's add a new operation in the array :

        __name: send_rookout - means we are sending the information to the rookout web application__
        __path: store.rookout.locals.todo - we tell the rule what information to send__

        ```json
        {
            "name": "send_rookout",
            "path": "store.rookout.locals.todo"
        }
        ```
        
        7. Add and duplicate a todo in order to see the output, and now we can see what is being given to the object and match if we have an error in the function (parameters missing or in bad order).


## What's next?

Head over to [our reference](reference-home.md) to understand all the Rookout components.   
See [our installation guides](installation-overview.md) for platform-specific installation examples.
