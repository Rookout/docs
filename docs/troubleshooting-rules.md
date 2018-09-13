---
id: troubleshooting-rules
title: Troubleshooting Rules
---

As you create, modify or trigger a rule, it may change its status once or more.

As rules are created, they are in Pending status (Grey).
In this state, Rookout will try and connect the Rule to the Rooks it applies to.

If all goes well, as the Rule is activated in all Rooks it applies to, the Rule will change its status to Active (Green).
If the rule does not turn green in a few seconds, check out the cases below to try and troubleshooit it.

In some cases, the Rook may face a temporary limitation preventing it from applying the Rule, and the Rule will change its status to Warning (Orange).
In such cases the Rule *may* send messages, but you are advised to click the Rule status indicator and follow the instructions below to resolve the warning.
Note that in this case the Rule will maintain the Warning status. You may remove it and add it again to make sure it turns Active.

In other cases, the Rook may face an issue preventing it from working as expected, and the Rule will change its status to Error (Red).
In such cases the Rule is not expected to send messages, and you are advised to click the Rule status indicator and follow the instructions below to resolve the warning.
Note that in this case the Rule will maintain the Error status. You may remove it and add it again to make sure it turns Active.

## Rule remains in Pending status - Grey
The most likely reason for a Rule remaining in Pending status is that it cannot connect to the relevant Rooks.
Make sure the relevant App Instances are available in the Rookout application -> App Instances & Agents page.
If the relevant App Instances are missing, it may indicate one or more of the following:
- The application you are trying to debug is down (Which means the Rooks are inactive). Follow the instructions in the [Troubleshooting Rooks](troubleshooting-rooks.md) page.
- The application is up, but the Rooks are not accessible (That is, the Rookout service cannot access the Rooks). Follow the instructions in the [Troubleshooting Rooks](troubleshooting-rooks.md) page.
- In serverless frameworks such as Lambda, the application itself isn't up until the serverless function is triggered.
In such cases, the Rule will only become Active after the first function trigger.

If you are using *selectors* in your script, make sure they correctly apply to the relevant Rules.

If you are debugging a Python or Node application, make sure the paths are defined correctly.

If you are debugging a Node application, make sure the source maps are available.

If you are using local Rook Agents, make sure they are up and running, and they are accessible from the application you are trying to debug.
Make sure the relevant Rook Agents are available in the Rookout application -> App Instances & Agents page -> Agents tab.
If the relevant Agents are missing, follow the instructions in the [Agent Troubleshooting](troubleshooting-agent.md) page.

## Rule is in Warning status - Orange

The most likely reason for a Rule switching to Warning status is an error in the Rule script.
Click the Rule status indocator to open the notifications page, and expand the relevant notification(s).
For example, an *Attribute not found* notification may hint that a variable you are trying to fetch in a Set action is missing.
Check your script and make sure the relevant path(s) are defined correctly.

If you are debugging a Java applicatin, make sure the source files are not missing.

## Rule is in Error status - Red

The most likely reason for a Rule switching to Error status is a malformed or mismatched Rule script.
Click the Rule status indocator to open the notifications page, and expand the relevant notification(s).
- If you see a malformed JSON file error, make sure the Rule JSON file matches the JSON format, or try to create a new Rule from a template to get a fresh start.
- If you see a hash mismatch error, make sure the code version in your source view matches the code version in the deployed application.

If you are debugging a Python application, make sure to import the Rookout SDK after other modules have been properly initialized.
In some cases, adding the `from rook import auto_start` line just after the `__name__ == “__main__”`line may cause the Rook to fail initialization.
If you are debugging a CPython application, Rookout may not work as expected.
