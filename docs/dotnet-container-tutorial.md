---
id: dotnet-container-tutorial
title: "Deploy Rookout on a .NET container"
sidebar_label: .NET Container
---

This short tutorial will walk you through the perfect Rookout deployment for containerized .NET applications in four quick steps.

### Get Your Application

First things first, choose an application.
If you don't have one readily available, use our [sample application](https://github.com/Rookout/dotnet-tutorial-2022).  

Start by:
```bash
git clone https://github.com/Rookout/dotnet-tutorial-2022
cd dotnet-tutorial-2022
```

### 1. Add the NuGet Package

Rookout for .NET is a simple NuGet Package.  
Go ahead and add it as a dependency:
```bash
dotnet add package Rookout
```

### 2. Start Rookout

Load and start the package to connect to your Rookout account (if you haven't signed up, do that [here](https://app.rookout.com/#mode=signUp)).

Start the SDK within your application by adding the following to your *main* method or your application's entry point. In our case, Program.cs:
```cs
using Rook;
Rook.RookOptions options = new Rook.RookOptions()
{
    token = "[Your Rookout Token]",
    labels = new Dictionary<string, string> { { "env", "dev" } }
};
Rook.API.Start(options);

// ...
```
<div class="rookout-org-info"></div>

Configuration is where you can get fancy. You have got additional options up your sleeve:
1. Move options to secret or configuration managers.
2. If you are using a [Rookout Controller](etl-controller-intro.md), set up the remote host and port configuration.
3. Dig deeper into other options available right [here](dotnet-setup.md#sdk-api).

### 3. Configure Build Settings

For the best and most reliable debugging experience, add a couple of settings to your `.csproj` file(s):
1. Set the debug information format to `portable`.
2. Embed sources in the PDB file for verificaiton.
```xml
    <DebugType>portable</DebugType>
    <EmbedAllSources>true</EmbedAllSources>
```

### 4. Embed Source Information
Rookout offers the smoothest debugging experience by displaying up-to-date source code for each server.

Set this up for containerized applications by adding a handful of [files](https://www.rookout.com/blog/embedding-source-code-version-information-in-docker-images/) from your `.git` folder to the container image.

Edit (or add) your `.dockerignore` file and adapt the traditional `.git` exclude:
```ignore
# Keep ignoring .git
.git
# Allow specific files with !
!.git/HEAD
!.git/config
!.git/refs
```

Add a `COPY` command to the end of the `Dockerfile`, just above the `ENTRYPOINT`.
```docker
COPY .git /.git
```

*Note:* in [multi-stage](https://docs.docker.com/develop/develop-images/multistage-build/) builds (like ours), make all your changes on the **final** stage.

### Test

**One second!** if you are not using our demo app, please commit and push your changes to a new branch.

Build and run your Docker image:
```
docker build . -t rookout-dotnet-todo
docker run -it -p 8080:80 rookout-dotnet-todo
```

As your .NET application spins up, search for this output at the top:
<img src="/img/screenshots/dotnet_success.png" />

Interact with your application at `http://localhost:8080` and use Rookout to debug it on the fly!

### Questions?

1. Check out this reference [implementation](https://github.com/Rookout/dotnet-tutorial-2022/compare/configure-rookout).
2. Dig into our .Net [docs](dotnet-setup.md).
3. Reach out to us via chat or [email](mailto:support@rookout.com).
