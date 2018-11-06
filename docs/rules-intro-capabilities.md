---
id: rules-intro-capabilities
title: Rule Capabilities
sidebar_label: Rule Capabilities
---

## Repository configuration

### Path Mapping

For Python and Node, Rookout uses relative file paths for searching files based on the repository’s root folder. (For Explorook, the root folder is the one you share).

If file layout for production is different, paths will not match.

As a simple test, you can go into the JSON and edit the filePath under location.

To handle this use-case, add a “.rookout” file at the root of your repository and map your paths:

TODO - add an explanation of the feature

### Include Externals

If you are installing your application in Python using pip install (to the site-packages directory) or your Node application using npm install (to the node_modules directory) you need to let Rookout know to the breakpoint in those files as well.

As a simple test, you can go into the JSON and add the includeExternals under location.

TODO - in the future we’ll add this feature to .rookout file

## Data Redaction

TODO - copy here once the original PR has been approved.

## Rate Limiting

TODO - document the capability here

## Integrations

TODO - a basic description of integrations here.
Point to the full integrations page.

## What's next?

To learn more about Rule capabilities, try the following pages:
- [Rule Troubleshooting](rules-intro-troubleshooting.md)
- [Related Concepts](rules-intro-related.md)

To review the full Rule API check out the [Reference Section](rules-index.md).