---
id: troubleshooting-rules
title: Rules
---


## Gray - Rule is pending
- Rule is not being applied because of selectors
- Rule is not being applied because there are no agents
- Rule is not being applied because there are no Rooks
- Rule is not being applied because the appropriate Rooks are not connected
- Rule is not being applied because paths differ (Python/Node)
- Rule is not being applied because source maps are missing (Node)

## Orange - Rule is Warning
- Error in script
- Source missing (Java)


## Red - Rule is Error
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
