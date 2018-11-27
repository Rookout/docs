---
id: rules-status
title: Rule Status
sidebar_label: Rule Status
---

## Understanding Rule Status

If your Rule is stuck in Pending state, it means that the Rookout SDK has not successfully applied the rule (yet), but no Error was reported.
Active - At least one SDK has some time in the past successfully applied the rule
Error - something reported an error about the rule
Warning - irrespective of Active or Error, some component did not manage to work with the rule exactly as expected. The system attempts to finish it “Best Effort”.

## Active Rule

If your Rule is Active but you fail to see debug messages, first make sure you are invoking the correct application instance.  

You may also be running in an environment that heavily customizes the runtime. This is especially common for Python with hosting servers such as uWSGI or Google App Engine. Please contact us at support@rookout.com .

## Pending

Make sure there are Rooks connected and active in your Workspace (top left corner of the screen, auto-refreshes if you have less than 25 Rooks).
Make sure you have installed Rookout on the correct application.
Node/Python - include externals
Node - make sure you have source maps if transpiling
Python - uWSGI workaround (We want to have that in the code in the future)

## Warning

Follow the instructions in the warning message.

## Error

Follow the instructions in the error message.

## What's next?

To review the full Rule API check out the [Reference Section](rules-index.md).
