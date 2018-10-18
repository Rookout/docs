---
id: integrations-overview
title: Basic Integrations
---

Now that we fetched the variable we wanted, let's pipeline it into our data flow.

### 1. Locate the Target operation

As you have seen during the Quick Start Tutorial, Rookout Rules can easily send debug message to the Rookout IDE.</b>
To integrate Rookout into our debugging and troubleshooting flow, let's send it to our our logging or monitoring tool.</b>
Edit a Rule, and locate the Processing section.</b>
It should contain a "send_rookout" operation that looks something like this:</b>

![Send Rookout](/img/screenshots/basic_integration_1.png)

### 2. Send data to an HTTP server

Replace the operation section with the following snippet:

```json
{
  "name": "web_hook",
  "target": {
    "url": "[Target URL address]"
  },
  "items": {
    "value1": "[Path to the variable you fetched]"
  }
}
```

The Rule should now look something like this:

![Web Hook](/img/screenshots/basic_integration_2.png)

Trigger your app again.<br/>
Instead of seeing the debug message in the Rookout IDE, the data was now sent to the specified URL as a JSON object.<br/>
You may also fetch additional variables and add them to the 'items' list.

### 3. Send data to your logging or monitoring tool

Visit the [Script Operations page](rules-operations.md) and locate your logging or monitoring tool.<br/>
If you couldn't find your favorite tool, please contact support@rookout.com and let us know about it :)<br/>
Copy the sample snippet into the operation section in your Rule, just as we did earlier in this guide.<br/>
Edit the variables relevant to the chosen tool (token, URL, specific variables etc.).

Trigger your app again.<br/>
Instead of seeing the debug message in the Rookout IDE, the data was now sent the chosen tool.

You can also find some integration examples in our [Data Integrations page](integrations-home.md) and in our [Output Integrations Git repository](https://github.com/Rookout/deployment-examples).

## What's next?

- Troubleshoot your Rookout deployment using our [Troubleshooting guide](troubleshooting-rules.md).

- Dig deeper into [Rule scripting](rules-index.md).