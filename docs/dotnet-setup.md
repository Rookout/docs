---
id: dotnet-setup
title: .NET SDK Instrumentation
sidebar_label: .NET
---

This page will dive into the nitty gritty details on installing Rookout under various configurations.  
If you are encountering any difficulties with deploying Rookout, this is the place to look.

## .NET

The [.NET SDK](https://www.nuget.org/packages/Rookout) provides the ability to fetch debug data from a running application in real time.  

## Setup

### NuGet Package

Rookout SDK is installed as a [NuGet package](https://www.nuget.org/packages/Rookout) in your application.

#### API

The Rookout SDK needs to be started using a simple API.

<!--DOCUSAURUS_CODE_TABS-->
<!--C#-->
```cs
using Rook;
namespace Program
{
    class Program
    {
        static int Main(string[] args)
        {
            Rook.RookOptions options = new Rook.RookOptions() 
            {
                token = "[Your Rookout Token]",
                labels = new Dictionary<string, string> { { "env", "dev" } }
            };
            Rook.API.Start(options);
    
            // ...
        }
    }
}
```
<!--VB.NET-->
```vs
Imports Rook

Module Program
    Sub Main(args As String())
        Dim opts = New RookOptions()
        opts.token = "[Your Rookout Token]"
        opts.labels = New Dictionary(Of String, String)()
        opts.labels.Add("env", "dev")
        Rook.API.Start(opts)
    
        //......
    
    End Sub
End Module
```
<!--F#-->
```fs
open System
open Rook
open System.Collections.Generic

[<EntryPoint>]
let main argv =
    let labels = new Dictionary<string, string>()
    labels.Add("env", "dev")
  
    let opt = Rook.RookOptions(token="[Your Rookout Token]", labels=labels)
    Rook.API.Start(opt)

    // .....

```
<!--END_DOCUSAURUS_CODE_TABS-->
<div class="rookout-org-info"></div>


## SDK API

The .NET SDK is loaded via an API.  
Configuration may be passed through the API or using OS Environment Variables.

### start

```cs
public static void Start(RookOptions opts)
```

The Start method is used to initialize the SDK in the background and accepts the RookOptions object with the following attributes:

| Argument &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Environment Variable &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Default Value | Description |
| ------------ | ----------------------- | ------------- | ----------- |
| `token` | `ROOKOUT_TOKEN` | None | The Rookout token for your organization. Should be left empty if you are using a Rookout ETL Controller |
| `labels` | `ROOKOUT_LABELS` | {} | A dictionary of key:value labels for your application instances. Use `k:v,k:v` format for environment variables |
| `git_commit` | `ROOKOUT_COMMIT` | None | String that indicates your git commit |
| `git_origin` | `ROOKOUT_REMOTE_ORIGIN` | None | String that indicates your git remote origin |
| `host` | `ROOKOUT_CONTROLLER_HOST` | None | If you are using a Rookout ETL Controller, this is the hostname for it |
| `port` | `ROOKOUT_CONTROLLER_PORT` | None | If you are using a Rookout ETL Controller, this is the port for it |
| `proxy` | `ROOKOUT_PROXY` | None | URL to proxy server
| `debug` | `ROOKOUT_DEBUG` | False | Set to `True` to increase log level to debug |

## Setup your .csproj files

For the best Rookout experience please make sure the following attributes are in each `.csproj` you wish to debug:

[`<DebugType>full</DebugType>`](https://docs.rookout.com/docs/dotnet-setup/#debug-information)

[`<Optimize>false</Optimize>`](https://docs.rookout.com/docs/dotnet-setup/#debug-information)

[`<MSBuildGitHashCommand>git config --get remote.origin.url %26%26 git rev-parse HEAD</MSBuildGitHashCommand>`](https://docs.rookout.com/docs/dotnet-setup/#source-information) - Another Nuget package needed

[`<EmbedAllSources>true</EmbedAllSources>`](https://docs.rookout.com/docs/dotnet-setup/#packaging-sources)
 

## Test connectivity

To make sure the SDK was properly installed and test your configuration (environment variables only), download and run TestConnectivity:
* [Windows .Net Framework](https://get.rookout.com/test_connectivity_windows_x64_framework.zip)
* [.Net Core](https://get.rookout.com/test_connectivity_core_x64.zip)
    
Unix: 
* Core 2.x: `chmod +x ./rookout_test_core_2.x.sh && ./rookout_test_core_2.x.sh`
* Core 3.x: `chmod +x ./rookout_test_core_3.x.sh && ./rookout_test_core_3.x.sh`

Windows: Simply run rookout_test_core_2.x.bat or rookout_test_core_3.x.bat respectively.

## Debug Information

Rookout requires your application to be deployed with debug information (Pdb files `<DebugType>full</DebugType>`). Note that disabling the optimize flag will further improve data collection (`<Optimize>false</Optimize>`)

Pdb (Program Data Base) file is a repository to maintain information about your application. 

It stores the important debug information such as:
* file names 
* variable names 
* offsets of the functions
* file hashes

Although Rookout doesn't run your program in debug mode, we need the PDB file to properly collect the data per your request.

For further reading: https://devblogs.microsoft.com/devops/understanding-symbol-files-and-visual-studios-symbol-settings/

## Source information

Use the MSBuildGitHash package to initialize the SDK with information about the sources used in your application.

MSBuildGitHash is installed as a [NuGet package](https://www.nuget.org/packages/MSBuildGitHash) in your application.

After installing the [NuGet package](https://www.nuget.org/packages/MSBuildGitHash) remember to add the following line in the .csproj file:

```xml
    <MSBuildGitHashCommand>git config --get remote.origin.url %26%26 git rev-parse HEAD</MSBuildGitHashCommand>
```

## Packaging Sources

To make sure you are collecting data from the source line where you have set the breakpoint, include your source files within your library.

```xml
    <EmbedAllSources>true</EmbedAllSources>
```

## Supported Versions

| Implementation      | Versions              |
| ------------------  | -------------         |
| **.NET Framework**  | 4.5, 4.6, 4.7, 4.8    |
| **.NET Core**       | 2.1, 2.2, 3.0, 3.1    |

## Supported Languages

The following languages are officially supported: C#, VB.NET and F#.

## IIS support

We currently support IIS 8.0 and above.

If the environment you are trying to debug is not mentioned in the list above, be sure to let us know: {@inject: supportEmail}
