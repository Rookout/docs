---
id: source-repos
title: Source Repositories
sidebar_label: Source Repositories
---

Each workspace contains the source code the proejcts you wish to debug.

Rookout allows you to easily load sources from your local file system or your git provider.  This is preformed directly in our Web based IDE.

## Repository Settings

If you are deploying your software in some non-trival ways, Rookout offers the option of customizing the way breakpoints are set directly from your source repository.

Simply create a file named `.rookout` at the root of your repository and add to it any of the configurations below.

### Debugging Packages

By default, Rookout ignores your projet's dependencies.  
This includes the `node_modules` directory for NodeJS applications and the `site-packages` directory for Python applications.

If you are debugging a project installed as a package, add the following snippet to your `.rookout` file:

```python
#package
```

### Source Path Matching

By default Rookout uses the repository relative path of the source file you are debugging to find it.

You may have to change it in a couple of cases:
- You are removing a part of the path when deploying your code.
- The path is too short or generic, and you want to make it more specific to avoid path collisions.

This is done through simple path substition instructions:

#### Shortening a Path

To convert `microservice1/app.py` to `app.py` use:
```bash
/microservice1 /
```

#### Replace a Path

To convert `microservice1/app.py` to `app/app.py` use:
```bash
/microservice1 /app
```

#### Lengthening a Path

To convert `app.py` to `microservice1/app.py` use:
```bash
/ /microservice1
```

#### Manipulating a Path with Spaces

To convert `my app/app.py` to `app.py` use:
```bash
"my app" /
```
