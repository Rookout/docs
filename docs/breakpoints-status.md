---
id: breakpoints-status
title: Breakpoint Status
sidebar_label: Breakpoint Status
---

## Breakpoint Status Indicators

| Status                         | Icon | Description   |
| :------------------------------------------------------------ | :-------------: |:-------------        |
| Active                 | <img src="/img/screenshots/active.svg" width="30" height="30" />   | The Breakpoint has been applied to one or more of your applications, and is ready to stream data.|
| Pending                | <img src="/img/screenshots/pending.svg" width="30" height="30" />    | A connection has not been established with any of your applications / instances, hence data will not be streamed.|
| Disabled               | <img src="/img/screenshots/disabled.svg" width="30" height="30"/>  | The Breakpoint has been disabled and will not collect data.|
| Error                  | <img src="/img/screenshots/Error.svg" width="30" height="30"/>  | There was an issue with applying this breakpoint in one or more applications and data won't be streamed.|
| Warning               | <img src="/img/screenshots/WarningBlack.svg" width="30" height="30"/>  | The Breakpoint has been disabled and will not collect data.|


## Active

`Active` status occurs when one of or more of your applications has applied the Breakpoint and no errors have been reported.  
In most cases, once the Breakpoint has transitioned to active, you will see messages collected the next time the line is executed.

If you fail to see any messages arriving, this may be caused by any of the following reasons:

- #### Incorrect Application
  You are not invoking the *correct* line of code in the correct *application instance*.

- #### Output to Integration
  You are using a custom Breakpoint that sends the message to another target.

- #### (Python) Preforking
  You are using a pre-forking framework. Rookout must **only** be loaded after forking, check out the [documentation](python-setup.md#pre-forking-servers).

- #### (Python/JVM) Long Running Function
  You have placed a breakpoint on a long running function. In this runtime, breakpoints are only applied for function calls performed after the Breakpoint was created.

- #### (Node) Running with a Debugger
  You are using Rookout side-by-side with another debugger such as WebStorm or Stackdriver Debugger.
  
- #### (Node) No Source Maps
  You are using a transpiled application. Try using a minimal transpile level, or set it to a recent version of Node.js.
  Check out the Rookout [source map support section](node-setup.md#transpiling-and-source-maps).


## Pending

`Pending` status indicates that the breakpoint has not been applied to any of your applications.
This could mean one of the following:

- #### No Application instances
  The breakpoint could not be applied as no application instance matches the current filter.
  This could mean one of the following:
  - The Rookout SDK has not been installed.
  - The Rookout SDK has been installed, but the application cannot connect to the Rookout service.
  - The application can connect to the Rookout service, but is excluded by the current filter definition.
  - The application is a serverless application, that only spins up on demand.

- #### Wrong Source File
  The source file you used the set the breakpoint is not loaded in any of the applications in the current filter.

- #### (JVM) No Code
  You have set the breakpoint on a line that has no executable code associated with it.

- #### (JVM) No Debug Information
  You have compiled your classes without debug information.
  Click [here](https://docs.rookout.com/docs/jvm-setup#debug-information) for more information.

- #### (Node) No Source Maps
  You are using a transpiled application without including [source maps](https://developer.mozilla.org/en-US/docs/Tools/Debugger/How_to/Use_a_source_map).
  Check out the Rookout [source map support section](node-setup.md#transpiling-and-source-maps).

- #### (Python/Node) Code is in a Dependency
  You are debugging a package deployed as a dependency. This requires setting up your source repository [accordingly](source-repos.md#debugging-packages).

- #### (Python/Node) Different File Layout
  File paths are changed between source repository and deployment. This requires setting up your source repository [accordingly](source-repos.md#source-path-matching).
  

## Disabled

`Disabled` status occurs when the breakpoint was disabled due to limits. These include limits applied by the user for that specific breakpoint (e.g. time limit / hit limit).

To see more information on the reason why the breakpoint was disabled, right click on the breakpoint and select status.

You can re-enable the breakpoint (by reseting the limit counter) through right clicking on the breakpoint and selecting `Enable`.



## Error

`Error` status occurs when one of or more of your applications has reported an error in processing, applying or executing the Breakpoint.

`Error` messages are clearly documented within the IDE, but here are some of the common ones:

- #### Source file has changed
  Rookout verifies that the source file you are seeing in our IDE is the file you deploying in your application. If the file version is wrong (detected using an Hash calculation) the Breakpoint will not be set. If you use source commit detection you will see the correct git commit to use on the [App instances page](https://app.rookout.com/app/connectivity/rooks).

- #### (Python) Invalid Breakpoint position
  The breakpoint has been placed where Rookout cannot set it. This includes empty lines, comments and module-scope code (outside of classes and functions). This may also mean Rookout has been imported too early - in Python it must be imported after all modules has been loaded (read more about it [here](python-setup.md)).

- #### Sending to Rookout is Disabled
  The system administrator has disabled sending application data to the Rookout service for security reasons.
  Please choose another data sink for your breakpoint.

## Warning


`Warning` indicates some problems have occured with the Breakpoint, and Rookout is trying it's best to deliver the data you've requested.

`Warning` messages are clearly documented within the IDE, but here are some of the common ones:

- #### Breakpoint collection is sampled due to rate-limiting
  Rookout employs a built-in rate-limiting mechanism to prevent breakpoints set in hot code paths from impacting application performance. This error indicates the rate limit has been hit and the breakpoint has been rate-limited for the offending application instance. Collection is sampled in order to prevent performance impact on your application.
  Read more about configuring rate-limiting [here](breakpoint-limits.md#rate-limiting).

- #### Path suggestion
  Source file was deployed to unexpected location, this might happen in some serverless frameworks.
  We have matched a file with the same hash but in a different path than the wanted one.
  Use the [`.rookout`](source-repos.md#source-path-mapping) and the suggestion to map the paths correctly.

- #### (JVM/.Net) Source file not found
  Rookout relies on source file hashing to ensure you are debugging the correct version of the files you are trying to debug.  
  - In most JVM based languages, please include your source within your Jar/War/Ear archives. Read more about it on our [setup page](jvm-setup.md#packaging-sources).
  - In most .Net based languages, please embedded sources into your pdb. Read more about it on our [setup page](dotnet-setup.md#packaging-sources).

- #### (Node) Original Source Files are Missing
  Rookout relies on source file hashing to ensure you are debugging the correct version of the files you are trying to debug. For transpiled JS/TS/CS, please deploy your original sources side-by-side with the transpiled ones or include sources within the source map.
  Read more about it on our [setup page](node-setup#transpiling-and-source-maps).

- #### Attribute Not Found
  There is an invalid key in the breakpoint condition or collection configuration. For more information click [here](breakpoints-conditional#advanced-conditions-supported-operators-and-functions).

- #### Method Not Found
  Your are trying to use an unsupported method in condition configuration. Please check the supported [methods](breakpoints-conditional#advanced-conditions-supported-operators-and-functions).

- #### Key Not Found
  There is an invalid key in the breakpoint condition or collection configuration. For more information click [here](breakpoints-conditional#advanced-conditions-supported-operators-and-functions).


