---
id: sample-applications
title: Sample Applications
sidebar_label: Sample Applications
---

Below you will find a few sample apps with Rookout pre-installed.  
If you prefer to set up Rookout in your own projects go over [here](/docs/quick-start).

<ul class="nav nav-tabs page-tabs" id="sample-apps" role="tablist">
<li class="nav-item">
<a class="nav-link active" id="python-tab" data-toggle="tab" href="#python" role="tab" aria-controls="python" aria-selected="true">Python</a>
</li>
<li class="nav-item">
<a class="nav-link" id="node-tab" data-toggle="tab" href="#node" role="tab" aria-controls="node" aria-selected="false">Node.JS</a>
</li>
<li class="nav-item">
<a class="nav-link" id="jvm-tab" data-toggle="tab" href="#jvm" role="tab" aria-controls="jvm" aria-selected="false">JVM</a>
</li>
</ul>

<div class="tab-content page-tabs-content" id="sample-apps">
<div class="tab-pane fade show active" id="python" role="tabpanel">

## Python

#### Prerequisites

1. [Python](https://www.python.org/downloads/) 2.7 or 3.5+
2. [pip](https://pip.pypa.io/en/stable/installing/)
3. [Docker](https://www.docker.com/get-docker) (alternative)

#### Setup

1. Clone the [python tutorial](https://github.com/Rookout/tutorial-python) to your local machine and deploy it by running the commands below.<br/>

<ul class="nav nav-tabs" id="python-envs" role="tablist">
<li class="nav-item">
<a class="nav-link active" id="python-linux-tab" data-toggle="tab" href="#python-linux" role="tab" aria-controls="linux" aria-selected="true">Linux/Mac</a>
</li>
<li class="nav-item">
<a class="nav-link" id="python-windows-tab" data-toggle="tab" href="#python-windows" role="tab" aria-controls="windows" aria-selected="false">Windows</a>
</li>
<li class="nav-item">
<a class="nav-link" id="python-docker-tab" data-toggle="tab" href="#python-docker" role="tab" aria-controls="docker" aria-selected="false">Docker</a>
</li>
</ul>

<div class="tab-content" id="python-envs">
<div class="tab-pane fade show active" id="python-linux" role="tabpanel">

```bash
git clone https://github.com/Rookout/tutorial-python && cd tutorial-python
export ROOKOUT_TOKEN=[Your Rookout Token]
pip install -r requirements.txt
python app.py
```

</div>
<div class="tab-pane fade" id="python-windows" role="tabpanel">

```bash
git clone https://github.com/Rookout/tutorial-python && cd tutorial-python
set ROOKOUT_TOKEN=[Your Rookout Token]
pip install -r requirements.txt
python app.py
```

</div>
<div class="tab-pane fade" id="python-docker" role="tabpanel">

```bash
docker run -p 5000:5000 -e "ROOKOUT_TOKEN=[Your Rookout Token]" rookout/tutorial-python
```

</div>
</div>
<div class="rookout-org-info"></div>

#### Usage

2. Go to [your Rookout IDE](https://app.rookout.com/) and **Log In**
3. Add the source code by following the instructions below:
    
    - Create a Workspace
        1. Click the Gear Wheel icon near the Workout selection menu, to the top left-hand side of the screen
        1. Click the + icon near the Search Workspace option to create a new Workspace
        1. Set the Workspace Name to "Python Tutorial"
        1. Click the + icon near "Sources" and choose either GitHub or Local Filesystem

    - Import source code from Github 
        1. Choose GitHub from the drop down list
        1. Type "Rookout" in Repository owner
        1. Type "tutorial-python" in Repository name
        1. Click Add Repository
        1. Click Apply
        1. Click Select Workspace

    - If you don't use Github, import the source code from your local machine
        1. Choose Local Filesystem and follow the instructions in the following dialog.
    
    
4. Open the file `app.py`  
<img src="/img/screenshots/python_tutorial_0.png" width="400px" height="300px" />  

5. Add a _Dumpframe_ rule next to line number 74 by clicking next the the line number in the file viewer
![Dumpframe Rule](/img/screenshots/getting_started_5.png)
6. Looking at the right-hand pane **Rules**, you will see the rule you added, on what line you added it and it should be 
<span style="color: #73CD1F;">**GREEN**</span>, meaning everything is communicating correctly.
![Valid Rule](/img/screenshots/getting_started_4.png)
    - If this is not the case, [click here](troubleshooting-rules.md) to see how to fix that
7. Go the the app webpage [http://localhost:5000/](http://localhost:5000/) and add a todo in order to trigger the rule
8. Check the bottom pane **Messages** and you'll see the dumpframe you just added, as it was triggered by the handler of the web api when you added a todo
![Message pane](/img/screenshots/getting_started_3.png)

#### Bug Hunt

We prepared for you a few manually introduced bugs in order to learn how to use Rookout.  
The first two will make sure you understand how to create and analyze our default rule - Dump Frame.  
The third bug will introduce a new rule type - Log. You will be walked through the process of editing the rule in order
to add custom elements to it.

For more information about Rule Scripting refer to [our reference](rules-index.md)

#### Bug scenarios

__Level: Beginner__
- __The bug: ``Clear Completed`` button does not work. When clicked - completed todos are not cleared.__
    - **Reproduce:** Add a few todos, check one or more as completed using the checkbox on the left of the task and click the ``Clear completed`` button on the bottom right corner.  
    <img src="/img/screenshots/python_tutorial_3.png" width="400px" height="310px" />  

    - **Debug:**  
        1. Load the app's code from github - Press `Add Source` -> `GithHub` -> Repository Owner: `Rookout` -> Repository: `tutorial-python` -> `View Repository`  
        <img src="/img/screenshots/python_tutorial_4.png" width="285px" height="350px" />  
        2. In the [Rookout app](https://app.rookout.com), open the file `app.py`  
        <img src="/img/screenshots/python_tutorial_0.png" width="400px" height="300px" />  
        3. Add a rule to line 43 by clicking left to the line numbering (just like you would have created a breakpoint on an IDE)  
        ![](/img/screenshots/python_tutorial_1.png)  
        4. Try clicking on `Clear completed` again to see the message that pops in the Rookout app
        5. We can now see the whole stacktrace leading to this point and the local variables:  
        <img src="/img/screenshots/python_tutorial_2.png" width="400px" height="332px" />  
        6. Notice how we created a new variable ``todo`` instead of overriding ``todos``
        7. Now we know what the bug is. This example is a very basic example for using Rookout

__Level: Beginner__
- __The bug: Special characters (<,>,;,`,&,/,\\) are not being accepted as part of the title when Adding or Updating a Todo.__
    - **Reproduce:** Add a todo with special characters. All of these characters should disappear.
    - **Debug:**
        1. In the Rookout app, open the file `app.py`
        2. In line 66 we see that the todo title is being filtered by `cleanStr` - Let's add a `Dump Frame` to line 67
        3. Try to add a todo with some special characters (e.g: `do <> this`)
        4. We can clearly see both `req['title']` and `todoStr` - which is the cleaned title.
        ```python
        todos = [ {...len:3},{...len:3} len:2]
        req = {... len:1 }
            title = "do <> this"
        todoStr = "do this"
        ```

__Level: Intermediate__
- __The bug: Duplicate Todo adds an invalid todo instead of an exact copy of an existing one.__
    - **Reproduce:** Add a task and when hovering on the text, on the right side you have the **&** symbol. Click on it to duplicate the task.
    - **Debug:**
        1. In the Rookout app, open the file `app.py`
        2. Using the **Rules** pane on the right, select the *Rule Type* "Log"
        3. Add this rule to line 92
        4. Before triggering the rule, let's edit it so it returns what we want
        5. In the **Rules** pane on the right, click the *Edit Rule* (pen) icon next to the rule you just added. It will open up the Rule configuration as a JSON file
        6. On line 37 in the `paths` object let's add a property `"store.rookout.locals.dup": "frame.dup"`
        7. On line 51 we have `processing.operations` object, let's add a new operation in the array :

        __name: send_rookout - means we are sending the information to the rookout web application__
        __path: store.rookout.locals.dup - we tell the rule what information to send__

        ```json
        {
            "name": "send_rookout",
            "path": "store.rookout.locals.dup"
        }
        ```
        
        7. Add and duplicate a todo in order to see the output, and now we can see what is being given to the object and match if we have an error in the function (parameters missing or in bad order).


#### What's next?

Check out our [Quick Start guide](rooks-setup.md) to start debugging your own code.
</div>
<div class="tab-pane fade" id="node" role="tabpanel">

## Node.JS

#### Prerequisites

1. Node.js version 10 - https://nodejs.org/en/download/ 
2. NPM - https://docs.npmjs.com/cli/install
3. XCode (Mac only) - https://developer.apple.com/xcode/
4. Docker - https://www.docker.com/get-docker (alternative)

#### Setup

1. Clone the [Node.js tutorial](https://github.com/Rookout/tutorial-nodejs) to your local machine and deploy it by running the commands below.<br/>

<ul class="nav nav-tabs" id="node-envs" role="tablist">
<li class="nav-item">
<a class="nav-link active" id="node-linux-tab" data-toggle="tab" href="#node-linux" role="tab" aria-controls="linux" aria-selected="true">Linux/Mac</a>
</li>
<li class="nav-item">
<a class="nav-link" id="node-windows-tab" data-toggle="tab" href="#node-windows" role="tab" aria-controls="windows" aria-selected="false">Windows</a>
</li>
<li class="nav-item">
<a class="nav-link" id="node-docker-tab" data-toggle="tab" href="#node-docker" role="tab" aria-controls="docker" aria-selected="false">Docker</a>
</li>
</ul>

<div class="tab-content" id="node-envs">
<div class="tab-pane fade show active" id="node-linux" role="tabpanel">

```bash
git clone https://github.com/Rookout/tutorial-nodejs && cd tutorial-nodejs
export ROOKOUT_TOKEN=[Your Rookout Token]
npm start
```

</div>
<div class="tab-pane fade" id="node-windows" role="tabpanel">

```bash
git clone https://github.com/Rookout/tutorial-nodejs && cd tutorial-nodejs
set ROOKOUT_TOKEN=[Your Rookout Token]
npm start
```    

</div>
<div class="tab-pane fade" id="node-docker" role="tabpanel">

```bash
docker run -p 4000:4000 -e "ROOKOUT_TOKEN=[Your Rookout Token]" rookout/tutorial-nodejs
```

</div>
</div>
<div class="rookout-org-info"></div>

#### Usage

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

#### Bug Hunt

We prepared for you a few manually introduced bugs in order to learn how to use Rookout.  
The first two will make sure you understand how to create and analyze our default rule - Dump Frame.  
The third bug will introduce a new rule type - Log. You will be walked through the process of editing the rule in order
to add custom elements to it.

For more information about Rule Scripting refer to [our reference](rules-index.md)

#### Bug scenarios

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


#### What's next?

Check out our [Quick Start guide](rooks-setup.md) to start debugging your own code.
</div>
<div class="tab-pane fade" id="jvm" role="tabpanel">

## JVM
#### Prerequisites

1. Java 8
2. [Docker](https://www.docker.com/get-docker) (alternative)

#### Setup

1. Clone the [java tutorial](https://github.com/Rookout/tutorial-java) to your local machine and deploying it by running the commands below.<br/>

<ul class="nav nav-tabs" id="jvm-envs" role="tablist">
<li class="nav-item">
<a class="nav-link active" id="jvm-linux-tab" data-toggle="tab" href="#jvm-linux" role="tab" aria-controls="linux" aria-selected="true">Linux/Mac</a>
</li>
<li class="nav-item">
<a class="nav-link" id="jvm-windows-tab" data-toggle="tab" href="#jvm-windows" role="tab" aria-controls="windows" aria-selected="false">Windows</a>
</li>
<li class="nav-item">
<a class="nav-link" id="jvm-docker-tab" data-toggle="tab" href="#jvm-docker" role="tab" aria-controls="docker" aria-selected="false">Docker</a>
</li>
</ul>

<div class="tab-content" id="jvm-envs">
<div class="tab-pane fade show active" id="jvm-linux" role="tabpanel">

```bash
git clone https://github.com/Rookout/tutorial-java.git && cd tutorial-java
export ROOKOUT_TOKEN=[Your Rookout Token]
./gradlew bootJar run
```

</div>
<div class="tab-pane fade" id="jvm-windows" role="tabpanel">

```bash
git clone https://github.com/Rookout/tutorial-java.git && cd tutorial-java
set ROOKOUT_TOKEN=[Your Rookout Token]
./gradlew bootJar run
```

</div>
<div class="tab-pane fade" id="jvm-docker" role="tabpanel">

```bash
docker run -p 8080:8080 -e "ROOKOUT_TOKEN=[Your Rookout Token]" rookout/tutorial-java
```

</div>
</div>
<div class="rookout-org-info"></div>

#### Usage

4.  After running the app & agent go to [your Rookout IDE](https://app.rookout.com/) and **Log In**
5.  Add the source code by following the instructions below:

    - Create a Workspace
        1. Click the Gear Wheel icon near the Workout selection menu, to the top left-hand side of the screen
        1. Click the + icon near the Search Workspace option to create a new Workspace
        1. Set the Workspace Name to "Java Tutorial"
        1. Click the + icon near "Sources" and choose either GitHub or Local Filesystem

    - Import source code from Github 
        1. Choose GitHub from the drop down list
        1. Type "Rookout" in Repository owner
        1. Type "tutorial-java" in Repository name
        1. Click Add Repository
        1. Click Apply
        1. Click Select Workspace

    - If you don't use Github, import the source code from your local machine
        1. Choose Local Filesystem and follow the instructions in the following dialog.

6. Open the file `src/main/java/com/rookout/tutorial/TodoController.java`

    Hint: click the search icon or use ctrl+shift+f to search for the file.

    ![TodoController.java](/img/screenshots/java-tutorial_1.png)

7.  Add a default (Dump Frame) rule to the `addTodo` function by clicking next the the line number in the file viewer
![Dumpframe Rule](/img/screenshots/java-tutorial_2.png)

8. Looking at the right-hand pane **Rules**, you will see the rule and the line number where you added it - it should be <span style="color: #73CD1F;">**GREEN**</span>   
    ![Valid Rule](/img/screenshots/java-tutorial_3.png)
    - **If this is not the case, [check our troubleshooting guide](troubleshooting-rules.md)** 

9. Go the the app page - [http://localhost:8080/](http://localhost:8080/) and add try to add a task to the todo list

![Add Task](/img/screenshots/java-tutorial_4.png)

10. Check the bottom pane **Messages** and you'll see the dumpframe you just added - it was triggered by the handler of the web page when you accessed it!

![Message pane](/img/screenshots/java-tutorial_5.png)

#### Bug Hunt

We prepared for you a few manually introduced bugs in order to learn how to use Rookout.  
The first two will make sure you understand how to create and analyze our default rule - Dump Frame.  
The third bug will introduce a new rule type - Log. You will be walked through the process of editing the rule in order
to add custom elements to it.

For more information about Rule Scripting refer to [our reference](rules-index.md)

#### Bug scenarios

__Level: Beginner__
- __The bug: ``Clear Completed`` button does not work. When clicked - completed todos are not cleared.__
    - **Reproduce:** Add a few todos, check one or more as completed using the checkbox on the left of the task and click the ``Clear completed`` button on the bottom right corner.  
    <img src="/img/screenshots/python_tutorial_3.png" width="400px" height="310px" />  

    - **Debug:**  
        1. Load the app's code from github / local - as explained [in here](java-getting-started.md#usage) 
        2. In the [Rookout app](https://app.rookout.com), open the file `src/main/java/com/rookout/tutorial/TodoController.java`  
        ![TodoController.java](/img/screenshots/java-tutorial_1.png)
        3. Add a `dumpframe` rule on the `return` of the `clearCompleted` function by clicking left to the line numbering (just like you would have created a breakpoint on an IDE)  
         ![Clear Completed](/img/screenshots/java_bughunt_1.png)
        4. Try clicking on `Clear completed` again to see the message that pops in the Rookout app
        5. We can now see the whole stacktrace leading to this point and the local variables:  
        ![Clear Completed](/img/screenshots/java_bughunt_2.png)
        6. Notice how we created a new variable `todoStore` instead of overriding `todos`
        7. Now we know what the bug is!

__Level: Beginner__
- __The bug: Special characters (<,>,;,`,&,/,\\) are not being accepted as part of the title when Adding or Updating a Todo.__
    - **Reproduce:** Add a todo with special characters. All of these characters should disappear.
    - **Debug:**
        1. In the Rookout app, open the file `src/main/java/com/rookout/tutorial/TodoController.java`
        2. In the addTodo function you will we see that the todo title is being filtered by `replaceAll` with a regex - Let's add a `Dump Frame` to the line after it
        ![newTodoRecord](/img/screenshots/java_bughunt_3.png)
        3. Try to add a todo with some special characters (e.g: `do <> this`)
        4. We can clearly see both `newTodoRecord.title` and `todoTitle` - which is the cleaned title.
        ![newTodoRecord](/img/screenshots/java_bughunt_4.png)
        

__Level: Intermediate__
- __The bug: Duplicate Todo adds an invalid todo instead of an exact copy of an existing one.__
    - **Reproduce:** Add a task and when hovering on the text, on the right side you have the **&** symbol. Click on it to duplicate the task.
    - **Debug:**
        1. In the Rookout app, open the file `src/main/java/com/rookout/tutorial/TodoController.java`
        2. Using the **Rules** pane on the right, select the *Rule Type* "Log"
        3. Add the rule in the duplicateTodo function on the line with `todos.add(newTodoRecord);`
        4. Before triggering the rule, let's edit it so it returns what we want
        5. In the **Rules** pane on the right, click the *Edit Rule* (pen) icon next to the rule you just added. It will open up the Rule configuration as a JSON file
        6. On line 37 in the `paths` object let's add a property `"store.rookout.locals.dup": "frame.newTodoRecord"`
        7. On line 51 we have `processing.operations` object, let's add a new operation in the array :
        __name: send_rookout - means we are sending the information to the rookout web application__
        __path: store.rookout.locals.dup - we tell the rule what information to send__

        ```json
        {
            "name": "send_rookout",
            "path": "store.rookout.locals.dup"
        }
        ```
        8. Click the save button on the upper pane.
        9. Add and duplicate a todo in order to see the output, now we can see what is being given to the object and match if we have an error in the function (parameters missing or in bad order).
        ![Invalid Duplicate Todo Record](/img/screenshots/java_bughunt_5.png)
        


#### What's next?

Check out our [Quick Start guide](rooks-setup.md) to start debugging your own code.
</div>

