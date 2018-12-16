---
id: breakpoints-status
title: Breakpoint Status
sidebar_label: Breakpoint Status
---

Breakpoint status is a simple visual indicator designed to give you quick feedback if your Breakpoint is behvaing as expected.  

Breakpoint status appears as a lightbulb or a warnning sign next to the Breakpoint on the right pane of the screen.  
For more information on a Breakpoint status, you may click it or read more below.

## Breakpoint Statuses

To provide quick feedback, Breakpoint statuses are *aggregated* accross all *historic* data reported on the Breakpoint.  
Whenever you edit the Breakpoint, it's status is reset.

**These are the available statuses**:

- `Pending` (gray) - the Breakpoint has yet to be applied by any of your applications and no errors have been reported.
- `Active` (green) - the Breakpoint has been applied by one or more of your applications has applied the Breakpoint and no errors have been reported.
- `Error` (red) - one or more of your applications has reported an error in processing, applying or executing the Breakpoint.

- `Warning` (sign) - this state appears in addition to the other states, indicating that one or more of your applications has reported a warning in processing, applying or executing the Breakpoint.

## Pending (Gray)

`Pending` status occurs when none of your applications have yet to apply the Breakpoint and no errors have been reported.

This can be caused by any of the following reasons:

#### No Applications
You have no applications connected to the current [project](projects.md). This is common for Serverless and batch applications which are invoked on demand.

#### Wrong Source File
The source file you used the set the breakpoint is not loaded in any of the applications in the current [project](projects.md).

#### (JVM) No Code
You have set the breakpoint on a line that has no executable code associated with it.

#### (JVM) No Debug Information
You have compiled your classes without debug information.  
`Gradle` and `Maven` compiles with debug information by default but [`Ant`](https://ant.apache.org/manual/Tasks/javac.html) and [`javac`](https://docs.oracle.com/javase/7/docs/technotes/tools/windows/javac.html) do not.  

Here a few examples on how to configure them:

<ul class="nav nav-tabs" id="java-debug" role="tablist">
<li class="nav-item">
<a class="nav-link active" id="ant-debug-tab" data-toggle="tab" href="#ant-debug" role="tab" aria-controls="ant-debug" aria-selected="true">Ant</a>
</li>
<li class="nav-item">
<a class="nav-link" id="javac-debug-tab" data-toggle="tab" href="#javac-debug" role="tab" aria-controls="javac-debug" aria-selected="false">javac</a>
</li>
</ul>

<div class="tab-content" id="java-debug-content">
<div class="tab-pane fade show active" id="ant-debug" role="tabpanel">

```xml
<javac srcdir="${source-directory}"
        destdir="${classes-directory}"
        classpath="${lib-directory}"
        debug="true"
/>
```

</div>
<div class="tab-pane fade" id="javac-debug" role="tabpanel">

```bash
javac -g MyClass.java
```

</div>

#### (Node) No Source Maps
You are using a transpiled application without including [source maps](https://developer.mozilla.org/en-US/docs/Tools/Debugger/How_to/Use_a_source_map). Rookout has strong source map [support](breakpoints-setup.md).

#### (Python/Node) Code is in a Dependency
You are debugging a package deployed as a depedency. This requires setting up your source repository [accordingly](source-repos.md#debugging-packages).

#### (Python/Node) Different File Layout
File paths are changed between source repository and deployment. This requires setting up your source repository [accordingly](source-repos.md#source-path-matching).

## Active Breakpoint (Green)

`Active` status occurs when one of or more of your applications has applied the Breakpoint and no errors have been reported.  
In most cases, once the Breakpoint has transitioned to active, you will see messages collected the next time the line is executed.

If you fail to see any messages arriving, this may be caused by any of the following reasons:

#### Incorrect Application
You are not invoking the *correct* line of code in the correct *application instance*.

#### Output to Integration
You are using a custom Breakpoint that send the message to another [data-sink](breakpoints-integrations.md).

#### (Python) Preforking
You are using a pre-forking framework. Rookout must **only** be loaded after forking, check out the [documentation](breakpoints-setup.md#pre-forking-servers).

#### (Python/JVM) Long Running Function
You have placed a breakpoint on a long rununing function. In this runtime, breakpoints are only applied for function calls performed after the Breakpoint was created.

## Error (Red)

`Error` status occurs when one of or more of your applications has reported an error in processing, applying or executing the Breakpoint.

`Error` indicates at least some of your application instances will fail to collect the data requested, but other application instances may be able to collect the data successfully.

`Error` messages are clearly documented within the IDE, but here are some of the common ones:

#### Source file has changed 
Rookout verifies that the source file you are seeing in our IDE is the file you deploying in your application. If the file version is wrong (detected using an Hash calculation) the Breakpoint will not be set. If you use [source commit detection](http://localhost:3000/docs/rooks-setup.html#source-commit-detection) you will see the correct git commit to use on the [App instances page](https://app.rookout.com/app/connectivity/rooks).

#### (Python) Invalid Breakpoint position
The breakpoint has been placed where Rookout cannot set it. This includes empty lines, comments and module-scope code (outside of classes and functions). This may also mean Rookout has been imported too early - in Python it must be imported after all modules has been loaded (read more about it [here](breakpoints-setup.md)).

#### Invalid Path in Breakpoint Configuration
The breakpoint contains a invalid path argument.  Check out the [Breakpoint Tasks](breakpoints-tasks.md) and the [Breakpoint Reference](breakpoints-reference.md) for more information on how to properly configure breakpoints.

**Note:** If Rookout deems the invalid configuration to be non-critical, this might show up as a warning instead.

#### Sending to Rookout is Disabled
The system administrator has disabled sending application data to the Rookout service for security reasons (read more about this configuration [here](agent-setup.md#disable-sending-data)).  
Please choose another data sink for your breakpoint.

#### Breakpoint was Disabled due to Rate-Limiting
Rookout employs a built-in rate-limiting mechanism to prevent breakpoints set in hot code paths from impacting application performance. This error indicates the rate limit has been hit and the breakpoint has been disabled in the offending application instance.  
Read more about configuring rate-limiting [here](breakpoints-tasks.md#rate-limiting).

## Warning (Sign)

`Warning` status occurs when one of or more of your applications has reported a warning in processing, applying or executing the Breakpoint.

`Warning` indicates some problems have occured with the Breakpoint, and Rookout is trying it's best to deliver the you requested. This may result in the Breakpoint being executed with full success, partial success, or with no success.  
Rookout recommends you fix `Warning` whent they appear.

`Warning` messages are clearly documented within the IDE, but here are some of the common ones:

#### (JVM) Source file not found 
Rookout relies on source file hashing to ensure you are debugging the correct version of the files you are trying to debug. In most JVM based languages, please include your source within your Jar/War/Ear archives.  
Read more about it on our [setup page](breakpoints-setup.md).

#### (Node) Original Source Files are Missing
Rookout relies on source file hashing to ensure you are debugging the correct version of the files you are trying to debug. For transpiled JS/TS/CS, please deploy your original sources side-by-side with the transpiled ones or include sources within the source map.  
Read more about it on our [setup page](breakpoints-setup.md).
