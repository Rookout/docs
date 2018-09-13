---
id: troubleshooting-rules
title: Rules Troubleshooting
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
Note that in this case the Rule will maintain the Rttot status. You may remove it and add it again to make sure it turns Active.

## Rule is in Pending status - Grey
- Rule is not being applied because of selectors
- Rule is not being applied because there are no agents
- Rule is not being applied because there are no Rooks
- Rule is not being applied because the appropriate Rooks are not connected
- Rule is not being applied because paths differ (Python/Node)
- Rule is not being applied because source maps are missing (Node)
- In serverless frameworks such as Lambda, the application itself isn't up until the serverless function is triggered.
In such cases, the Rule will only become Active after the first function trigger.

## Rule is in Warning status - Orange
- Error in script
- Source missing (Java)


## Rule is in Error status - Red
- JSON is invalid
  - JSON has failed loading/processing
  - Check your JSON against documentation and templates
- Hash mismatch
  - Source file differs between configuration and production
  - **Future features:** smaller hashes, identify production file based on hash and display
- Python Bdb failed to find code
  - Two “features”:
    - In Python there is no “Hoisting” and code objects are only created as their definitions are executed.
    Today, we are unable to know if this has happened and will assume any loaded module has been fully loaded.
    - In order to avoid this problem, import rook only after modules has been properly initialized. A common use-case
    is loaded just before if `__name__ == “__main__”`
  - Module scope instrumentation is not supported under CPython
