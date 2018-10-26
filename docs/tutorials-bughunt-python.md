---
id: tutorials-bughunt-python
title: Python Bug Hunt
sidebar_label: Python Tutorial Bug Hunt
---

## What is this?

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


## Next steps

Head over to [our reference](reference-home.md) to understand all the Rookout components.   
See [our installation guides](installation-overview.md) for platform-specific installation examples.
