---
id: python-container-tutorial
title: "Deploy Rookout on a Python container"
sidebar_label: Python Container
---

This short tutorial will walk you through the perfect Rookout deployment for containerized Python applications in three quick steps.

For any follow-up questions, check out the full docs for the Rookout [Rookout pip package](python-setup) or reach out!

### Get Your Application

First things first, choose an application.
If you don't have one readily available, use our [sample application](https://github.com/Rookout/python-tutorial-2022).  

Start by:
```bash
git clone https://github.com/Rookout/python-tutorial-2022
cd python-tutorial-2022
```

### 1. Add the pip Package

Rookout for Python is a simple pip Package.
Go ahead and add it as a dependency:
```bash
pip install rook
```

If you use a requirements.txt file or something similar, add it there.

### 2. Start Rookout

Load and start the package to connect to your Rookout account (if you haven't signed up, do that [here](https://app.rookout.com/#mode=signUp)).

The best place to do that is at the beginning of your main function or the bottom of the global scope in your main file (in our case - `run.py`):
```python
import rook
rook.start(
    token="[Your Rookout Token]",
    labels={"env": "dev"}
    # When using multiprocessing, enable fork support to load Rookout in all workers
    #fork=True
)
```
<div class="rookout-org-info"></div>

Configuration is where you can get fancy. You have got additional options up your sleeve:
1. Move options from environment variables to secret or configuration managers.
2. If you are using a [Rookout Controller](etl-controller-intro), set up the remote host and port configuration.
3. Dig deeper into other options available right [here](python-setup#sdk-configuration).

### 3. Embed Source Information

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

### Test

**One second!** if you are not using our demo app, please commit and push your changes to a new branch.

Build and run your Docker image:
```
docker build . -t rookout-python-todo
docker run -it -p 8080:8080 rookout-python-todo
```

As your Python application spins up, search for this output at the top:
<img src="/img/screenshots/python_success.png" />

Interact with your application at `http://localhost:8080` and use Rookout to debug it on the fly!

### Questions?

Check out this reference [implementation](https://github.com/Rookout/python-tutorial-2022/compare/configure-rookout) or reach out to us via chat or [email](mailto:support@rookout.com).
