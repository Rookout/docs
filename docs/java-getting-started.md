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

- Open the file `src/main/java/com/rookout/tutorial/TodoController.java`
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
