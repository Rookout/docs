---
id: getting-started
title: Adding Rules
sidebar_label: Adding Rules
---

Now that you had your first taste of Rookout Debugging, it's time to see some of the cool stuff we can do.

### 1. Add a Dump Rule

Open the Rule type drop down list and choose a Dump Frame Rule.

![Rule Type](/img/screenshots/basic_debug_1.png)

As you have seen during the Quick Start Tutorial, Frame Dump Rules send every single variable in the active frame.<br/>
To make debugging easier, let's try and fetch a specific variable.

### 2. Fetch a specific variable

Add a Rule Point and trigger your app, just as you did during the Quick Start tutorial.<br/>
Right click an interesting variable, and choose Copy path.

![Rule Type](/img/screenshots/basic_debug_2.png)

Click Edit Rule, and locate the Set section.<br/>
The Set section tells Rookout which variables to fetch when a Rule point is hit.<br/>
It should look something like this:

![Set Section](/img/screenshots/basic_debug_3.png)

Replace the content of the Paths section with the following snippet:

```json
    "store.variable": "[paste the copied variable path here]"
```

The Rule should now look like this:

![Modified Set Section](/img/screenshots/basic_debug_4.png)

Trigger your app again.<br/>
Instead of the entire frame dump, you should now see only the variable you fetched.<br/>
Now let's try and format the debug message, just as we do in traditional printf() debugging.

### 3. Format a Debug Message

Click Edit Rule, and locate the Processing section.<br/>
It should look something like this:

![Modified Set Section](/img/screenshots/basic_debug_5.png)

The Processing section tells Rookout what to do with the fetched data.<br/>
For example, you could tell rookout to format the debug message as a string.<br/>
Replace the content of the Operations section with the following snippet:

```json
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

Trigger your app again.<br/>
You should now see your debug message formatted as a string, including the fetched variable.<br/>
That wasn't so bad, was it? :)<br/>
Rookout Rules are quite robust, and if you dig deeper into our documentation you can learn how to use them.

## Next step

- __Integrate your debug messages into your data pipeline with our [Basic Integrations](integrations-overview.md) guide.__

## Additional information

- If you faced any issues, please let us know: support@rookout.com

- Hook Rookout into your data pipeline using one of our [Data Integrations](rules-integrations.md).

- Troubleshoot your Rookout deployment using our [Troubleshooting guide](troubleshooting-rules.md).

- Dig deeper into [Rule scripting](rules.md).