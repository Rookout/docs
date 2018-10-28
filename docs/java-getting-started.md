---
id: java-getting-started
title: Java sandbox tutorial
sidebar_label: Java
---

## Prerequisites

1. Java 8
2. [Gradle](https://gradle.org/install/)
3. [curl](https://curl.haxx.se/download.html) (Windows only)
4. [Docker](https://www.docker.com/get-docker) (optional)

## Setup

1. Clone the [java tutorial](https://github.com/Rookout/tutorial-java) to your local machine and deploying it by running the commands below.<br/>
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

    git clone https://github.com/Rookout/tutorial-java.git
    export ROOKOUT_TOKEN=[Your Rookout Token]
    cd tutorial-java
    make build-jar-local run-local

</div>
<div id="content2" class="tab-content hljs">
<button onclick="copyToClipboard(this)" class="tab-copy button">Copy</button>

    git clone https://github.com/Rookout/tutorial-java.git
    set ROOKOUT_TOKEN=[Your Rookout Token]
    cd tutorial-java
    gradle -i clean
    gradle -i bootJar
    curl -L "https://repository.sonatype.org/service/local/artifact/maven/redirect?r=central-proxy&g=com.rookout&a=rook&v=LATEST" -o rook.jar
    java  -javaagent:rook.jar -jar build/libs/tutorial-1.0.0.jar

</div>
<div id="content3" class="tab-content hljs">
<button onclick="copyToClipboard(this)" class="tab-copy button">Copy</button>

    git clone https://github.com/Rookout/tutorial-java.git
    export ROOKOUT_TOKEN=[Your Rookout Token]
    cd tutorial-java
    make build-jar-with-docker run-docker    

</div>
</div>

## Usage

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

## Bug Hunt

We prepared for you a few manually introduced bugs in order to learn how to use Rookout.  
The first two will make sure you understand how to create and analyze our default rule - Dump Frame.  
The third bug will introduce a new rule type - Log. You will be walked through the process of editing the rule in order
to add custom elements to it.

For more information about Rule Scripting refer to [our reference](rules-index.md)

## Bug scenarios

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
        


## What's next?

Head over to [our reference](reference-home.md) to understand all the Rookout components.   
See [our installation guides](installation-overview.md) for platform-specific installation examples.