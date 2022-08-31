---
id: node-container-tutorial
title: "Deploy Rookout on a Node.JS container"
sidebar_label: Node.JS Container
---
This short tutorial will walk you through the perfect Rookout deployment for containerized NodeJS applications in four quick steps.

### Get Your Application

First things first, choose an application.
If you don't have one readily available, use our [sample application](https://github.com/Rookout/node-tutorial-2022).  

Start by:

```bash

git clone https://github.com/Rookout/node-tutorial-2022
cd node-tutorial-2022

```

### 1. Add the npm Package

Rookout for NodeJS is a simple npm Package.  
Go ahead and add it as a dependency:

```bash

npm install --save rookout

```

### 2. Start Rookout

Load and start the package to connect to your Rookout account (if you haven't signed up, do that [here](https://app.rookout.com/#mode=signUp)).

The start function returns a promise - wait for it to debug the application initialization code.

Edit your main file - in our case `index.js`:

```javascript

const rookout = require('rookout')
rookout.start({ 
    token: '[Your Rookout Token]',
    labels: {
        env: 'dev'
    }
}).then(/*Start your application here*/)

```

<div className="rookout-org-info" />

Configuration is where you can get fancy. You have got additional options up your sleeve:

1.  Move options to secret or configuration managers.
2.  If you are using a [Rookout Controller](etl-controller-intro.md), set up the remote host and port configuration.
3.  Dig deeper into other options available right [here](node-setup.mdx#configuration).

### 3. Include Source Maps

Configure transpiling tools to generate source maps and include them in your container image.

For babel, open the `babel.config.json` file and change the `sourceMaps` configuration to `inline`:

```json

{
    "sourceMaps": "inline"
}

```

Instructions to configure Webpack, TypeScript, and CoffeeScript may be found [here](https://docs.rookout.com/docs/node-setup/#source-maps).

### 4. Embed Source Information

Rookout offers the smoothest debugging experience by displaying up-to-date source code for each server.

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

Add a `COPY` command to the end of the `Dockerfile`, just above the `ENTRYPOINT`.

```docker

COPY .git /.git

```

_Note:_ in [multi-stage](https://docs.docker.com/develop/develop-images/multistage-build/) builds (like ours), make all your changes on the **final** stage.

### Test

**One second!** if you are not using our demo app, please commit and push your changes to a new branch.

Build and run your Docker image:

```

docker build . -t rookout-nodejs-todo
docker run -it -p 8080:8080 rookout-nodejs-todo

```

As your Node.JS application spins up, search for this output at the top:
<img src="/img/screenshots/nodejs_success.png" />

Interact with your application at `http://localhost:8080` and use Rookout to debug it on the fly!

### Questions?

1.  Check out this reference [implementation](https://github.com/Rookout/node-tutorial-2022/compare/configure-rookout).
2.  Dig into our Node.JS [docs](node-setup.mdx).
3.  Reach out to us via chat or [email](mailto:support@rookout.com).
