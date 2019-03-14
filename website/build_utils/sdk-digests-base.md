---
id: sdk-digests
title: SDK Digests
sidebar_label: SDK Digests
---

<ul class="nav nav-tabs page-tabs" id="rooks-digests" role="tablist">
<li class="nav-item">
<a class="nav-link active" id="python-tab" data-toggle="tab" href="#python" role="tab" aria-controls="python" aria-selected="true">Python</a>
</li>
<li class="nav-item">
<a class="nav-link" id="node-tab" data-toggle="tab" href="#node" role="tab" aria-controls="node" aria-selected="false">Node.js</a>
</li>
<li class="nav-item">
<a class="nav-link" id="jvm-tab" data-toggle="tab" href="#jvm" role="tab" aria-controls="jvm" aria-selected="false">JVM</a>
</li>
</ul>

<div class="tab-content page-tabs-content" id="rooks-setup">
<div class="tab-pane fade show active" id="python" role="tabpanel">

## Python

The [Python SDK](https://pypi.org/project/rook/) provides the ability to fetch debug data from a running application in real time.  
It can easily be installed by running the following command:
```bash
pip install rook
```

<br/>
<div id="python-digests"></div>

</div>

<div class="tab-pane fade" id="node" role="tabpanel">

## Node.js

The [NodeJS SDK](https://www.npmjs.com/package/rookout) provides the ability to fetch debug data from a running application in real time.  
It can easily be installed by running the following command:
```bash
npm install --save rookout
```

<br/>
<div id="node-digests"></div>

</div>

<div class="tab-pane fade" id="jvm" role="tabpanel">

## JVM

The [JVM SDK](https://mvnrepository.com/artifact/com.rookout/rook/latest) provides the ability to fetch debug data from a running application in real time.  
It can be download directly to the target system by running the following command:
```bash
curl -L "https://repository.sonatype.org/service/local/artifact/maven/redirect?r=central-proxy&g=com.rookout&a=rook&v=LATEST" -o rook.jar
```

<br/>
<div id="java-digests"></div>

</div>
