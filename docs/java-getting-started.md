---
id: java-getting-started
title: Getting started with Rookout and Java
sidebar_label: Java Tutorial
---

## Prerequisites

1. Docker - https://www.docker.com/get-docker
2. java 8
3. gradle - https://gradle.org/install/ (you can skip it and use only docker)

## Installation

1. Clone the tutorial repository

```bash
git clone https://github.com/Rookout/tutorial-java.git
cd tutorial-java
``` 

2. Set your agent token in an ENV variable 

```bash
export ROOKOUT_TOKEN=YOUR_TOKEN_IN_HERE
 ```

3. Build the app then run the agent & app

- Options 1 - Building the app without installing gradle:

```bash
make build-jar-with-docker
```

- Options 2 - Building the app with gradle:

```bash
make build-jar-local
```

- Running the app locally:

```bash
make run-local
```

- Running the app with docker:

```bash
make run-docker
```

## Usage

- After running the app & agent go to [https://app.rookout.com/][rookout-app-url] and **Log In**
- Add the source code according to the instructions using the left pane **Source View**

<details>
<summary>More details</summary>
<p>

#### Adding source code


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

- Import source code from your local machine
    1. If you do not use GitHub, choose Local Filesystem and follow the instructions in the following dialog.

</p>
</details>

- Open the file `src/main/java/com/rookout/tutorial/TodoController.java`

Hint: click the search icon or use ctrl+shift+f to search for the file.

![TodoController.java](/img/screenshots/java-tutorial_1.png)

- Add a default (Dump Frame) rule to the `addTodo` function by clicking next the the line number in the file viewer
![Dumpframe Rule](/img/screenshots/java-tutorial_2.png)

- Looking at the right-hand pane **Rules**, you will see the rule and the line number where you added it - it should be <span style="color: #73CD1F;">**GREEN**</span>   
    ![Valid Rule](/img/screenshots/java-tutorial_3.png)
    - **If this is not the case, [check our troubleshooting guide](troubleshooting-rules.md)** 

- Go the the app page - [http://localhost:8080/](http://localhost:8080/) and add try to add a task to the todo list

![Add Task](/img/screenshots/java-tutorial_4.png)

- Check the bottom pane **Messages** and you'll see the dumpframe you just added - it was triggered by the handler of the web page when you accessed it!

![Message pane](/img/screenshots/java-tutorial_5.png)

## Bug Hunt

Great! You're now ready to start debugging, let's start by having some fun with our 
[bug hunt](tutorials-bughunt-java.md) - follow instructions to try out some basic use cases.


[rookout-app-url]: https://app.rookout.com/
