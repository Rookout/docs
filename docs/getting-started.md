---
id: getting-started
title: Basic Debugging
sidebar_label: Basic Debugging
---

Now that you had your first taste of Rookout Debugging, it's time to see some of the cool stuff we can do.

### 1. Add a Dump Rule

Open the Rule type drop down list and choose a Dump Frame Rule.

![Rule Type](/img/screenshots/basic_debug_1.png)

As you have seen during the Quick Start Tutorial, Frame Dump Rules send every single variable in the active frame.

To make debugging easier, let's try and fetch a specific variable.

### 2. Fetch a specific variable

Add a Rule Point and trigger your app, just as you did during the Quick Start tutorial.

Right click an interesting variable, and choose Copy path.

![Rule Type](/img/screenshots/basic_debug_2.png)

Click Edit Rule, and locate the Set section.

The Set section tells Rookout which variables to fetch when a Rule point is hit.

It should look something like this:

![Set Section](/img/screenshots/basic_debug_3.png)

Replace the content of the Paths section with the following snippet:

```javascript
    "store.variable": "[paste the copied variable path here]"
```

The Rule should now look like this:

![Modified Set Section](/img/screenshots/basic_debug_4.png)

Trigger your app again.

Instead of the entire frame dump, you should now see only the variable you fetched.

Now let's try and format the debug message, just as we do in traditional printf() debugging.

### 3. Format a Debug Message

Click Edit Rule, and locate the Processing section.

It should look something like this:

![Modified Set Section](/img/screenshots/basic_debug_5.png)

The Processing section tells Rookout what to do with the fetched data.

For example, you could tell rookout to format the debug message as a string.

Replace the content of the Operations section with the following snippet:

```javascript
    {
        "name": "format",
        "path": "temp.message",
        "format": "@@@ here { [paste the copied variable path here] @@@}"
      },
      {
        "name": "send_rookout",
        "path": "temp.message"
      }
```

The Rule should now look like this:

![Modified Set Section](/img/screenshots/basic_debug_6.png)

Trigger your app again.

You should now see your debug message formatted as a string, including the fetched variable.

That wasn't so bad, was it? :)

Rookout Rules are quite robust, and if you dig deeper into our documentation you can learn how to use them.

## What's next?

- Hook Rookout into your data pipeline using one of our [Data Integrations](integrations-home.md).

- Troubleshoot your Rookout deployment using our [Troubleshooting guide](troubleshooting-rules.md).

- Dig deeper into [Rule scripting](rules-index.md).