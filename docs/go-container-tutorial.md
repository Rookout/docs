---
id: go-container-tutorial
title: "Deploy Rookout on a Go container"
sidebar_label: Go Container
---

---

*Deploying the Golang SDK requires name/password to our private repository.*

*Please [Contact us](https://www.rookout.com/company/contact) for access.*

---

This short tutorial will walk you through the perfect Rookout deployment for containerized Go applications in four quick steps.

### Get Your Application

First things first, choose an application.
If you don't have one readily available, use our [sample application](https://github.com/Rookout/go-tutorial-2022).  

Start by:
```bash
git clone https://github.com/Rookout/go-tutorial-2022
cd go-tutorial-2022
```

### 1. Add the stub GoSDK Package

Rookout for Go is a private package.
However, to allow seemless integration during developement, we publish a stub package that can be integrated as a placeholder
and replaced by the real package during deployment.
Go ahead and add it as a dependency:
```bash
go get github.com/Rookout/GoSDK
```
Make sure the installed package's version ends with "-stub"
### 2. Start Rookout

Load and start the package to connect to your Rookout account (if you haven't signed up, do that [here](https://app.rookout.com/#mode=signUp)).

The best place to do that is at the beginning of your main function (in our case - `main.go`):
```go
import (
	// ...
	rookout "github.com/Rookout/GoSDK"
	// ...
)

// ...
func main() {
    rookout.Start(rookout.RookOptions{
		Token: "[Your Rookout Token]",
		Labels: map[string]string{"env": "dev"},
	})
    // ...
```
<div class="rookout-org-info"></div>

Configuration is where you can get fancy. You have got additional options up your sleeve:
1. Move options from environment variables to secret or configuration managers.
2. If you are using a [Rookout Controller](etl-controller-intro), set up the remote host and port configuration.
3. Dig deeper into other options available right [here](go-setup#start).

### 3. Embed the Full GoSDK During Deployment
After obtaining the credentials for our private repository, follow these instructions:
1. Get the ARTIFACTORY_CREDS build argument in your Dockerfile:
```docker
ARG ARTIFACTORY_CREDS
```
2. Set the following Go environment variables in your Dockerfile before building the project
```docker
RUN go env -w GONOSUMDB="github.com/Rookout/GoSDK"
RUN go env -w GOPROXY="https://proxy.golang.org,https://${ARTIFACTORY_CREDS}@rookout.jfrog.io/artifactory/api/go/rookout-go,direct"
```
3. Make sure you install necessary OS dependencies on your image.\
    i. For alpine:
    ```docker
    RUN apk add --no-cache gcc musl-dev build-base zlib-static
    ```
    ii. For debian:
    ```docker
    RUN apt update && apt install -y libffi-dev zlib1g-dev libedit-dev libc++-11-dev libc++abi-11-dev
    ```
    iii. For photon:
    ```docker
    RUN tdnf install -y git gcc glibc-devel binutils zlib-devel openssl-devel linux-api-headers
    ```
    iv. For ubuntu: No need for any extra dependencies\
    v. For macOS: No need for any extra dependencies
3. Replace your project's GoSDK version with the real package after you copy your source code to the image (Make sure you explicitly write the version's name):
```docker
ADD go.mod go.sum ./
RUN go mod download
COPY . .
RUN go get -d github.com/Rookout/GoSDK@v0.1.15
```
Notice we did not get the stub, but the full version.
4. Modify the build command to allow for GoSDK to work:
For that, add -gcflags 'all=-N -l' to the build command, as well as a tag relevant to the image's base OS
    i. For alpine:
    ```docker
    RUN go build -tags=alpine314,rookout_static -gcflags='all=-N -l' <path_to_main.go>
    ```
    ii. For debian (ubuntu tag is here on purpose):
    ```docker
    RUN go build -tags=ubuntu18,rookout_static -gcflags='all=-N -l' <path_to_main.go>
    ```
    iii. For photon (ubuntu tag is here on purpose):
    ```docker
    RUN go build -tags=ubuntu18,rookout_static -gcflags='all=-N -l' <path_to_main.go>
    ```
    iv. For ubuntu 20:
    ```docker
    RUN go build -tags=ubuntu20,rookout_static -gcflags='all=-N -l' <path_to_main.go>
    ```
    v. For ubuntu 18:
    ```docker
    RUN go build -tags=ubuntu18,rookout_static -gcflags='all=-N -l' <path_to_main.go>
    ```
    vi. For macOS:
    ```docker
    RUN go build -tags=darwin,rookout_static -gcflags='all=-N -l' <path_to_main.go>
    ```
*Note:* in [multi-stage](https://docs.docker.com/develop/develop-images/multistage-build/) builds (like ours), make these changes in the **build** stage.
### 4. Embed Source Information

Rookout offers the smoothest debugging experience by fetching up-to-date source code for each server.

Set this up for containerized applications by adding a handful of [files](https://www.rookout.com/blog/embedding-source-code-version-information-in-docker-images/) from your `.git` folder to the container image.

Edit (or add) your `.Dockerignore` file and adapt the traditional `.git` exclude:
```ignore
# Keep ignoring .git
.git
# Allow specific files with !
!.git/HEAD
!.git/config
!.git/refs
```

Add a final `COPY` command to the `Dockerfile`.
```docker
COPY .git /.git
```

*Note:* in [multi-stage](https://docs.docker.com/develop/develop-images/multistage-build/) builds (like ours), make this change in the **final** stage.
### Test

**One second!** if you are not using our demo app, please commit and push your changes to a new branch.

Build and run your Docker image:
```
docker build . --build-arg ARTIFACTORY_CREDS=<SECRET> -t rookout-go-todo
docker run -it -p 8080:8080 rookout-go-todo
```

As your Go application spins up, search for this output at the top:
<img src="/img/screenshots/go_success.png" />

Interact with your application at `http://localhost:8080` and use Rookout to debug it on the fly!

### Questions?

1. Check out this reference [implementation](https://github.com/Rookout/go-tutorial-2022/compare/configure-rookout).
2. Dig into the full Go agent [docs](go-setup).
3. Reach out to us via chat or [email](mailto:support@rookout.com).
