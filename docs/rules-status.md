---
id: rules-status
title: Rule Status
sidebar_label: Rule Status
---

Rule status is a simple visual indicator designed to give you quick feedback if your rule is behvaing as expected.  

Rule status appears as a lightbulb or a warnning sign next to the rule on the right pane of the screen.  
For more information on a rule status, you may click it or read more below.

## Rule Statuses

To provide quick feedback, rule statuses are *aggregated* accross all *historic* data reported on the rule.  
Whenever you edit the rule, it's status is reset.

**These are the available statuses**:

- `Pending` (gray) - the rule has yet to be applied by any of your applications and no errors have been reported.
- `Active` (green) - the rule has been applied by one or more of your applications has applied the rule and no errors have been reported.
- `Error` (red) - one or more of your applications has reported an error in processing, applying or executing the rule.

- `Warning` (sign) - this state appears in addition to the other states, indicating that one or more of your applications has reported a warning in processing, applying or executing the rule.

## Pending (Gray)

`Pending` status occurs when none of your applications have yet to apply the rule and no errors have been reported.

This can be caused by any of the following reasons:

- You have no applications connected to the current [project](projects.md). This is common for Serverless and batch applications which are invoked on demand.
- The source file you used the set the breakpoint is not loaded in any of the applications in the current [project](projects.md).
- `JVM` you have set the breakpoint on a line that has no executable code associated with it.
- `JVM` you have compiled your classes without debug information. `Gradle` compiles with debug information by default but `ant` and `javac` do not.
- `Node` you are using a transpiled application without including [source maps](https://developer.mozilla.org/en-US/docs/Tools/Debugger/How_to/Use_a_source_map). Rookout has strong source map [support](rooks-setup.md).
- `Python`/`Node` you are debugging a package deployed as a depedency. This requires setting up your source repository [accordingly](source-repos.md#debugging-packages).
- `Python`/`Node` file paths are changed between source repository and deployment. This requires setting up your source repository [accordingly](source-repos.md#source-path-matching).

## Active Rule (Green)

`Active` status occurs when one of or more of your applications has applied the rule and no errors have been reported.  
In most cases, once the rule has transitioned to active, you will see messages collected the next time the line is executed.

If you fail to see any messages arriving, this may be caused by any of the following reasons:

- You are not invoking the *correct* line of code in the correct *application instance*.
- You are using a custom rule that send the message to another [data-sink](rules-integrations.md).
- `Python` you are using a pre-forking framework. Rookout must **only** be loaded after forking, check out the [documentation](rooks-setup.md#pre-forking-servers).
- `Python/JVM` you have placed a breakpoint on a long rununing function. In this runtime, breakpoints are only applied for function calls performed after the rule was created.

## Error (Red)

`Error` status occurs when one of or more of your applications has reported an error in processing, applying or executing the rule.

`Error` indicates at least some of your application instances will fail to collect the data requested, but other application instances may be able to collect the data successfully.

`Error` messages are clearly documented within the IDE, but here are some of the common ones:
- **Source file has changed** - Rookout verifies that the source file you are seeing in our IDE is the file you deploying in your application. If the file version is wrong (detected using an Hash calculation) the rule will not be set. If you use [source commit detection](http://localhost:3000/docs/rooks-setup.html#source-commit-detection) you will see the correct git commit to use on the [App instances page](https://app.rookout.com/app/connectivity/rooks).
- `Python` **Invalid rule position** - the breakpoint has been placed where Rookout cannot set it. This includes empty lines, comments and module-scope code (outside of classes and functions). This may also mean Rookout has been imported too early - in Python it must be imported after all modules has been loaded (read more about it [here](rooks-setup.md)).

## Warning (Sign)

`Warning` status occurs when one of or more of your applications has reported a warning in processing, applying or executing the rule.

`Warning` indicates some problems have occured with the rule, and Rookout is trying it's best to deliver the you requested. This may result in the rule being executed with full success, partial success, or with no success.  
Rookout recommends you fix `Warning` whent they appear.

`Warning` messages are clearly documented within the IDE, but here are some of the common ones:
- `JVM` **Source file not found** - Rookout relies on source file hashing to ensure you are debugging the correct version of the files you are trying to debug. In JVM based languages, you need to include your source within your Jar/War/Ear archives- read more about it on our [setup page](rooks-setup.md).
