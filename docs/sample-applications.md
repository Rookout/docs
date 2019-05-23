---
id: sample-applications
title: Sample Applications
sidebar_label: Sample Applications
---

Below you will find a few sample apps with Rookout pre-installed.  
If you prefer to set up Rookout in your own projects go over [here](quick-start.md).



<ul class="nav nav-tabs page-tabs" id="sample-apps" role="tablist">
<li class="nav-item">
<a class="nav-link-page active" id="python-tab" data-toggle="tab" href="#python" role="tab" aria-controls="python" aria-selected="true">Python</a>
</li>
<li class="nav-item">
<a class="nav-link-page" id="node-tab" data-toggle="tab" href="#node" role="tab" aria-controls="node" aria-selected="false">Node.js</a>
</li>
<li class="nav-item">
<a class="nav-link-page" id="jvm-tab" data-toggle="tab" href="#jvm" role="tab" aria-controls="jvm" aria-selected="false">JVM</a>
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

<!--DOCUSAURUS_CODE_TABS-->
<!--Linux/Mac-->
```bash
git clone https://github.com/Rookout/tutorial-python && cd tutorial-python
export ROOKOUT_TOKEN=[Your Rookout Token]
pip install -r requirements.txt
python app.py
```
<!--Windows-->
```bash
git clone https://github.com/Rookout/tutorial-python && cd tutorial-python
set ROOKOUT_TOKEN=[Your Rookout Token]
pip install -r requirements.txt
python app.py
```
<!--Docker-->
```bash
docker run -p 5000:5000 -e "ROOKOUT_TOKEN=[Your Rookout Token]" rookout/tutorial-python
```
<!--END_DOCUSAURUS_CODE_TABS-->
<div class="rookout-org-info"></div>

#### Usage

2. Go to [your Rookout IDE](https://app.rookout.com/) and **Log In**
3. Add the source code by following the instructions below:
    
    - Create a Project
        1. Click the Gear Wheel icon near the Workout selection menu, to the top left-hand side of the screen
        1. Click the + icon near the Search Project option to create a new Project
        1. Set the Project Name to "Python Tutorial"
        1. Click the + icon near "Sources" and choose either GitHub or Local Filesystem

    - Import source code from Github 
        1. Choose GitHub from the drop down list
        1. Type "Rookout" in Repository owner
        1. Type "tutorial-python" in Repository name
        1. Click Add Repository
        1. Click Apply
        1. Click Select Project

    - If you don't use Github, import the source code from your local machine
        1. Choose Local Filesystem and follow the instructions in the following dialog.
    
    
4. Open the file `app.py`  
<img src="/img/screenshots/python_tutorial_0.png" width="400px" height="300px" />  

5. Add a _Snapshot_ Breakpoint next to line number 95 by clicking next the the line number in the file viewer
<img src="/img/screenshots/getting_started_5.png" width="400px" height="300px" />  
6. Looking at the right-hand pane **Breakpoint**, you will see the Breakpoint you added, on what line you added it and it should be 
<span style="color: #73CD1F;">**GREEN**</span>, meaning everything is communicating correctly.
![Valid Breakpoint](/img/screenshots/getting_started_4.png)
    - If this is not the case, [click here](troubleshooting-rules.md) to see how to fix that
7. Go the the app webpage [http://localhost:5000/](http://localhost:5000/) and add a todo in order to trigger the Breakpoint
8. Check the bottom pane **Messages** and you'll see the snapshot you just added, as it was triggered by the handler of the web api when you added a todo
![Message pane](/img/screenshots/getting_started_3.png)

#### Bug Hunt

We prepared for you a few manually introduced bugs in order to learn how to use Rookout.  
The first two will make sure you understand how to create and analyze our default Breakpoint - Snapshot.  
The third bug will introduce a new Breakpoint type - Log Line. You will be walked through the process of editing the Breakpoint in order
to add custom elements to it.

For more information about Breakpoint Scripting refer to [our reference](breakpoints.md).

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
        3. Add a Breakpoint to line 64 by clicking left to the line numbering (just like you would have created a breakpoint on an IDE)  
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
        2. In line 66 we see that the todo title is being filtered by `cleanStr` - Let's add a Snapshot Breakpoint to line 67
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
        2. Using the **Breakpoint** pane on the right, add a __Snapshot__ breakpoint at line 113
        3. Right click the Breakpoint and choose Edit from the context menu
        4. In the Breakpoint Editor, now displayed on the right hand side, add a variable named "dup"
        5. Uncheck the "Stack Trace" and "collect all local frame variables" options, and click "Set" to save the breakpoint.  
        6. Add and duplicate a todo in order to see the output. Note that now only the "dup" (short for duplicate) variable is fetched.  
        Now we can see what is being given to the object and match if we have an error in the function (parameters missing or in bad order).


#### What's next?

Check out our [Quick Start guide](sdk-setup.md) to start debugging your own code.
</div>
<div class="tab-pane fade" id="node" role="tabpanel">

## Node.js

#### Prerequisites

1. [Node.js](https://nodejs.org/en/download/) version 8/10
3. [Docker](https://www.docker.com/get-docker) (alternative)

#### Setup

1. Clone the [Node.js tutorial](https://github.com/Rookout/tutorial-nodejs) to your local machine and deploy it by running the commands below.<br/>

<!--DOCUSAURUS_CODE_TABS-->
<!--Linux/Mac-->
```bash
git clone https://github.com/Rookout/tutorial-nodejs && cd tutorial-nodejs
export ROOKOUT_TOKEN=[Your Rookout Token]
npm start
```
<!--Windows-->
```bash
git clone https://github.com/Rookout/tutorial-nodejs && cd tutorial-nodejs
set ROOKOUT_TOKEN=[Your Rookout Token]
npm start
```   
<!--Docker-->
```bash
docker run -p 4000:4000 -e "ROOKOUT_TOKEN=[Your Rookout Token]" rookout/tutorial-nodejs
```
<!--END_DOCUSAURUS_CODE_TABS-->
<div class="rookout-org-info"></div>

#### Usage

2. Log in to the Rookout app at [your Rookout IDE](https://app.rookout.com/) and **Log In**.

3. Add the source code by following the instructions below:

    - Create a Project
        1. Click the Gear Wheel icon near the Workout selection menu, to the top left-hand side of the screen
        1. Click the + icon near the Search Project option to create a new Project
        1. Set the Project Name to "Node Tutorial"
        1. Click the + icon near "Sources" and choose either GitHub or Local Filesystem

    - Import source code from Github 
        1. Choose GitHub from the drop down list
        1. Type "Rookout" in Repository owner
        1. Type "tutorial-nodejs" in Repository name
        1. Click Add Repository
        1. Click Apply
        1. Click Select Project
    
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

5. Add a _Snapshot_ Breakpoint next to line number 5 by clicking next the the line number in the file viewer
![Snapshot Breakpoint](/img/screenshots/getting_started_6.png)
6. Looking at the right-hand pane **Breakpoint**, you will see the Breakpoint you added, on what line you added it and it should be 
<span style="color: #73CD1F;">**GREEN**</span>, meaning everything is communicating correctly.
![Valid Breakpoint](/img/screenshots/getting_started_7.png)
    - If this is not the case, [click here](troubleshooting-rules.md) to see how to fix that
7. Go the the app webpage [http://localhost:4000/](http://localhost:4000/) in order to trigger the Breakpoint
8. Check the bottom pane **Messages** and you'll see the snapshot you just added, as it was triggered by the handler of the web page when you accessed it
![Message pane](/img/screenshots/getting_started_9.png)

#### Bug Hunt

We prepared for you a few manually introduced bugs in order to learn how to use Rookout.  
The first two will make sure you understand how to create and analyze our default Breakpoint - Snapshot.  
The third bug will introduce a new Breakpoint type - Log Line. You will be walked through the process of editing the Breakpoint in order
to add custom elements to it.

For more information about Breakpoint Scripting refer to [our reference](breakpoints.md).

#### Bug scenarios

__Level: Beginner__
- __The bug: Clear Completed button hangs, does not do what is intended - nothing is cleared.__
    - **Reproduce:** Add a few tasks, check one or more as completed using the checkbox on the left of the task and click the `Clear completed` button on the bottom right corner.
    - **Debug:**  
        1. In the Rookout app, open the file `/src/utils/store.js`
        2. Using the **Breakpoint** pane on the right, select the *Breakpoint Type* "Snapshot"
        3. Add this Breakpoint to line 131 and try again to click on `Clear completed` to see the message that pops in the Rookout app
        4. We can now see the whole stacktrace leading to this point and we pinpoint the error to this message :
        5. We see the `Locals` object and all we have in is `this`, which has `store.todos` inside it.
            - it means we need to access todos as `this.todos.filter(...` and not `todos.filter(...`
        6. We can now know what is not working on the server-side and fix it.

__Level: Beginner__
- __The bug: Special characters (<,>,;,`,&,/,\\) are not being accepted as part of the title when Adding or Updating a Todo.__
    - **Reproduce:** Add a task with special characters. All these characters should not be saved.
    - **Debug:**
        1. In the Rookout app, open the file `/src/services/todos.js`
        2. At lines 14 and 73 we see that the title passes the function `utils.cleanString(...)` - Let's add a __Snapshot__ Breakpoint to the end of the function in file `/src/services/utils.js`.
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
        2. Using the **Breakpoint** pane on the right, add a __Snapshot__ breakpoint at line 104
        3. Right click the Breakpoint and choose Edit from the context menu
        4. In the Breakpoint Editor, now displayed on the right hand side, add a variable named "todo"
        5. Uncheck the "Stack Trace" and "collect all local frame variables" options, and click "Set" to save the breakpoint
        6. Add and duplicate a todo in order to see the output. Note that only the "todo" variable was fetched.  
        Now we can see what is being given to the object and match if we have an error in the function (parameters missing or in bad order).


#### What's next?

Check out our [Quick Start guide](sdk-setup.md) to start debugging your own code.
</div>
<div class="tab-pane fade" id="jvm" role="tabpanel">

## JVM
#### Prerequisites

1. Java 8
2. [Docker](https://www.docker.com/get-docker) (alternative)

#### Setup

1. Clone the [java tutorial](https://github.com/Rookout/tutorial-java) to your local machine and deploying it by running the commands below.<br/>

<!--DOCUSAURUS_CODE_TABS-->
<!--Linux/Mac-->
```bash
git clone https://github.com/Rookout/tutorial-java.git && cd tutorial-java
export ROOKOUT_TOKEN=[Your Rookout Token]
./gradlew bootJar run
```
<!--Windows-->
```bash
git clone https://github.com/Rookout/tutorial-java.git && cd tutorial-java
set ROOKOUT_TOKEN=[Your Rookout Token]
./gradlew bootJar run
```
<!--Docker-->
```bash
docker run -p 8080:8080 -e "ROOKOUT_TOKEN=[Your Rookout Token]" rookout/tutorial-java
```
<!--END_DOCUSAURUS_CODE_TABS-->
<div class="rookout-org-info"></div>

#### Usage

4.  After running the app & agent go to [your Rookout IDE](https://app.rookout.com/) and **Log In**
5.  Add the source code by following the instructions below:

    - Create a Project
        1. Click the Gear Wheel icon near the Workout selection menu, to the top left-hand side of the screen
        1. Click the + icon near the Search Project option to create a new Project
        1. Set the Project Name to "Java Tutorial"
        1. Click the + icon near "Sources" and choose either GitHub or Local Filesystem

    - Import source code from Github 
        1. Choose GitHub from the drop down list
        1. Type "Rookout" in Repository owner
        1. Type "tutorial-java" in Repository name
        1. Click Add Repository
        1. Click Apply
        1. Click Select Project

    - If you don't use Github, import the source code from your local machine
        1. Choose Local Filesystem and follow the instructions in the following dialog.

6. Open the file `src/main/java/com/rookout/tutorial/TodoController.java`

    Hint: click the search icon or use ctrl+shift+f to search for the file.

    ![TodoController.java](/img/screenshots/java-tutorial_1.png)

7.  Add a default (Snapshot) Breakpoint to the `addTodo` function by clicking next the the line number in the file viewer
![Snapshot](/img/screenshots/java-tutorial_2.png)

8. Looking at the right-hand pane **Breakpoint**, you will see the Breakpoint and the line number where you added it - it should be <span style="color: #73CD1F;">**GREEN**</span>   
    ![Valid Breakpoint](/img/screenshots/java-tutorial_3.png)
    - **If this is not the case, [check our troubleshooting guide](troubleshooting-rules.md)** 

9. Go the the app page - [http://localhost:8080/](http://localhost:8080/) and add try to add a task to the todo list

![Add Task](/img/screenshots/java-tutorial_4.png)

10. Check the bottom pane **Messages** and you'll see the snapshot you just added - it was triggered by the handler of the web page when you accessed it!

![Message pane](/img/screenshots/java-tutorial_5.png)

#### Bug Hunt

We prepared for you a few manually introduced bugs in order to learn how to use Rookout.  
The first two will make sure you understand how to create and analyze our default Breakpoint - Snapshot.  
The third bug will introduce a new Breakpoint type - Log Line. You will be walked through the process of editing the Breakpoint in order
to add custom elements to it.

For more information about Breakpoint Scripting refer to [our reference](breakpoints.md).

#### Bug scenarios

__Level: Beginner__
- __The bug: ``Clear Completed`` button does not work. When clicked - completed todos are not cleared.__
    - **Reproduce:** Add a few todos, check one or more as completed using the checkbox on the left of the task and click the ``Clear completed`` button on the bottom right corner.  
    <img src="/img/screenshots/python_tutorial_3.png" width="400px" height="310px" />  

    - **Debug:**  
        1. Load the app's code from github / local - as explained [in here](java-getting-started.md#usage) 
        2. In the [Rookout app](https://app.rookout.com), open the file `src/main/java/com/rookout/tutorial/TodoController.java`  
        ![TodoController.java](/img/screenshots/java-tutorial_1.png)
        3. Add a __snapshot__ Breakpoint on the `return` of the `clearCompleted` function by clicking left to the line numbering (just like you would have created a breakpoint on an IDE)  
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
        2. In the addTodo function you will we see that the todo title is being filtered by `replaceAll` with a regex - Let's add a __Snapshot__ Breakpoint to the line after it  
        ![newTodoRecord](/img/screenshots/java_bughunt_3.png)
        3. Try to add a todo with some special characters (e.g: `do <> this`)
        4. We can clearly see both `newTodoRecord.title` and `todoTitle` - which is the cleaned title.  
        ![newTodoRecord](/img/screenshots/java_bughunt_4.png)
        

__Level: Intermediate__
- __The bug: Duplicate Todo adds an invalid todo instead of an exact copy of an existing one.__
    - **Reproduce:** Add a task and when hovering on the text, on the right side you have the **&** symbol. Click on it to duplicate the task.
    - **Debug:**
        1. In the Rookout app, open the file `src/main/java/com/rookout/tutorial/TodoController.java`
        2. Add a __Snapshot__ Breakpoint in the duplicateTodo function on the line with `todos.add(newTodoRecord);`
        3. Right click the Breakpoint and choose Edit from the context menu
        4. In the Breakpoint Editor, now displayed on the right hand side, add a variable named "newTodoRecord"
        5. Uncheck the "Stack Trace" and "collect all local frame variables" options, and click "Set" to save the breakpoint
        9. Add and duplicate a todo in order to see the output. Note that only the newTodoRecord variable was fetched.  
        Now we can see what is being given to the object and match if we have an error in the function (parameters missing or in bad order).  
        ![Invalid Duplicate Todo Record](/img/screenshots/java_bughunt_5.png)
        


#### What's next?

Check out our [Quick Start guide](sdk-setup.md) to start debugging your own code.
</div>

