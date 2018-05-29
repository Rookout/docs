---
id: python-getting-started
title: Getting started with Rookout and Python
sidebar_label: Python Tutorial
---


1. Clone our [GitHub repo](https://github.com/Rookout/tutorial-python) to your local computer and run it.

<details>
<summary>Mac/Linux</summary>
<p>

```bash
git clone https://github.com/Rookout/tutorial-python
export ROOKOUT_TOKEN=<Your-Token>
cd tutorial-python
docker-compose up
```

</p>
</details>

<details>
<summary>Windows</summary>
<p>

```batch
git clone https://github.com/Rookout/tutorial-python
set ROOKOUT_TOKEN=<Your-Token>
cd tutorial-python
docker-compose up
```

</p>
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
            1. Authorize Github Account
            1. Fill `Repository Owner` with `"Rookout"`
            1. Fill `Repository` with ``tutorial-python``
            1. Click Next
            1. Click View Repository
    </p>
    </details>
    
    
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

## Bug Hunt

Great! You're now ready to start debugging, let's start by having some fun with our 
**[bug hunt](tutorials-bughunt-python.md)** - follow instructions to try out some basic use cases.