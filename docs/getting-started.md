---
id: getting-started
title: Getting Started
---

## What is Rookout

Rookout real-time instrumentation means you don’t need to restart, redeploy or write code to see inside your app.

Our solution supports Python, JVM, and NodeJS on AWS, Azure and Google Cloud or on your bare metal. We provide
end-to-end security, coupled with a small footprint and a negligible performance impact.


#### Watch our demo (click to start)

<a href="https://www.youtube.com/watch?v=qTdpOC92DBI" target="_blank">
    <img src="https://img.youtube.com/vi/qTdpOC92DBI/0.jpg" alt="Rookout Demo Video" />
</a>

## Tutorial
### Pre-requisites

- Docker, [available here](https://www.docker.com/community-edition#/download)

- Rookout account, [open an account on our website](https://www.rookout.com/join-our-early-adopters-plan/)




### Tutorial

1. First, you will need to clone or download our [tutorial github repository](https://github.com/Rookout/tutorial-nodejs).
1. Running Locally
   
   - **With Docker**
       1. Insert your agent token in the docker-compose.yml
       1. Run `docker-compose up`
   
   - **Without Docker**
       1. Insert your agent token in the Makefile
       1. Run `make -j run-prod`

1. After running the server go to [https://app.rookout.com/](https://app.rookout.com/) and **Log In**
1. Add the source code according to the instructions using the left pane **Source View**
1. Open the file `/src/handlers/homePage.js`
1. In the right-hand pane **Rules** choose the Rule Type `Log - Rookout`
1. Add a rule to line 5 by clicking next the the line number in the file viewer
1. Looking at the right-hand pane **Rules**, you should see the rule you added, on what line you added it and it should be GREEN, meaning everything is communicating correctly.
    - If this is not the case, [click here](#rules-common-issues) to see how to fix that
1. Refresh, or go the the app page [http://localhost:4000/](http://localhost:4000/) in order to trigger the rule
1. Check the bottom pane **Messages** and you should now see the log message you just added, and it was triggered by the handler of the web page when you accessed it

__The integration is working and we can know debug some things together to learn how to use Rookout__

Go through our [bug hunt](tutorials-bughunt-node.md) and follow instructions to see some basic use cases.

## Rules Common Issues

- Rule status is RED -- Hash mismatch. It means the file used in the server is not the same file used from github/local server in app.rookout.com

- Rule status is GRAY -- No rook connected to the agent. Make sure you have inserted the token in the right place and that connection is made properly.

## Want to learn more ?

Head over to [our reference](reference-home.md) for more specific information
or to [our installation guides](installation-overview.md) for platform-specific installation examples
