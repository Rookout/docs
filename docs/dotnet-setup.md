---
id: dotnet-setup
title: .NET Framework Beta SDK Instrumentation
sidebar_label: .NET Framework Beta SDK
---

## Please note that .NET SDK support is currently in Beta phase and we offer limited support to limited customers

This page will dive into the nitty gritty details on installing Rookout under various configurations.  
If you are encountering any difficulties with deploying Rookout, this is the place to look.

## .NET Framework

The [.NET Framework SDK](https://www.nuget.org/packages/Rookout) provides the ability to fetch debug data from a running application in real time.  

## Setup

### NuGet Package

Rookout SDK is installed as a [NuGet package](https://www.nuget.org/packages/Rookout) in your application.

#### API

The Rookout SDK needs to be started using a simple API.

```cs
using Rook;
namespace Program
{
    class Program
    {
        Rook.RookOptions options = new Rook.RookOptions() 
        {
            token = "[Your Rookout Token]"
        };
        Rook.API.Start(options);

        // ...
    }
}
```

<div class="rookout-org-info"></div>

## SDK API

The .NET Framework SDK is loaded via an API.  
Configuration may be passed through the API or using OS Environment Variables.

### start

```cs
public static void Start() // Using only environment variables
public static void Start(RookOptions opts)
public static void StartWithExceptions(RookOptions opts)
```

All methods initialize the SDK in the background using the optional configuration in the `opts` argument.  
The simpler `Start` will never impact the application's flow, writing a failure to the console.

When using the Start() function remember to set the ROOKOUT_TOKEN in the enviroment variable:

```bash
# Export your token as an environment variable
set ROOKOUT_TOKEN=[Your Rookout Token]

# Optional, see Labels section below Projects
set ROOKOUT_LABELS=env:dev
```

<div class="rookout-org-info"></div>
  
The `StartWithExceptions` will throw on error, so make sure to wrap the invocation with an appropriate `try`/`catch` block.

| Argument &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Environment Variable &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Default Value | Description |
| ------------ | ----------------------- | ------------- | ----------- |
| `token` | `ROOKOUT_TOKEN` | None | The Rookout token for your organization. Should be left empty if you are using a Rookout ETL Controller |
| `labels` | `ROOKOUT_LABELS` | {} | A dictionary of key:value labels for your application instances. Use `k:v,k:v` format for environment variables |
| `host` | `ROOKOUT_CONTROLLER_HOST` | None | If you are using a Rookout ETL Controller, this is the hostname for it |
| `port` | `ROOKOUT_CONTROLLER_PORT` | None | If you are using a Rookout ETL Controller, this is the port for it |
| `proxy` | `ROOKOUT_PROXY` | None | URL to proxy server
| `debug` | `ROOKOUT_DEBUG` | False | Set to `True` to increase log level to debug |
| `log_file` | `ROOKOUT_LOG_FILE` | None | Path to file to use for the SDK logs (default is `%USERPROFILE%/rookout/dotnet-rook.log`) |
| `log_level` | `ROOKOUT_LOG_LEVEL` | None | Control the SDK logging verbosity |
| `log_to_stderr` | `ROOKOUT_LOG_TO_STDERR` | False | Set to `True` to have the SDK log to stderr |
| `git_commit` | `ROOKOUT_COMMIT` | None | String that indicates your git commit |
| `git_origin` | `ROOKOUT_REMOTE_ORIGIN` | None | String that indicates your git remote origin |

## Test connectivity

To make sure the SDK was properly installed and test your configuration (environment variables only), download and run [TestConnectivity.exe](https://get.rookout.com/RookoutDotnetTestConnectivity.zip):

## Debug Information

Rookout requires your application to be deployed with debug information (Pdb files `<DebugType>pdbonly</DebugType>` or `-debug+`) and the optimize flag should not be enabled (`<Optimize>false</Optimize>`)   

## Supported Versions

| Implementation      | Versions               |
| ------------------  | -------------          |
| **.NET Framework**     | 4.5, 4.6, 4.7, 4.8    |

The following languages are officially supported: C#.

If the environment you are trying to debug is not mentioned in the list above, be sure to let us know: support@rookout.com .


## Breakpoint Statuses

To provide quick feedback, Breakpoint statuses are *aggregated* across all *historic* data reported on the Breakpoint.  
Whenever you edit the Breakpoint, it's status is reset.

**These are the available statuses**:

- `Active` (solid purple) - the Breakpoint has been applied by one or more of your applications has applied the Breakpoint and no errors have been reported.
- `Pending` (hollow purple) - the Breakpoint has yet to be applied by any of your applications and no errors have been reported.
- `Error` (hollow purple with exclamation point) - one or more of your applications has reported an error in processing, applying or executing the Breakpoint.
- `Warning` (solid purple with exclamation point) - this state appears in addition to the other states, indicating that one or more of your applications has reported a warning in processing, applying or executing the Breakpoint.
- `Disabled` (hollow grey) - the Breakpoint is in a disabled state and will not collect data.

## Pending (Hollow Purple)

`Pending` status occurs when none of your applications have yet to apply the Breakpoint and no errors have been reported.

This can be caused by any of the following reasons:

#### No Application instances
You have no application instances connected to the current [project](projects.md). This is common for Serverless and batch applications which are invoked on demand.

#### Wrong Source File
The source file you used the set the breakpoint is not loaded in any of the applications in the current [project](projects.md).

#### Running with a Debugger \ Analysis tool
You are using Rookout side-by-side with another debugger \ Analysis tool such as VisualStudio or another Instrumentation analysis tool. 
We Advise not to run the application without a debugger due to unexpected behavior. 

## Dependencies

Microsoft.DiaSymReader.Native (>= 1.7.0)
