---
id: built-in-variables
title: Built-in Variables
sidebar_label: Built-in Variables
---
When setting breakpoint conditions or breakpoint logs, you can use Rookout's built-in variables as well as your local variables.

The built-in variables are divided into classes and their attributes. For example, the variable which represents the ID of the SDK instance the message came from, is the attribute `id` of the `rook` class. To use that variable, we write `rook.id`.

In a breakpoint log, you need to surround the variable with `{}` brackets like so: `{rook.id}`.

### SDK Class

The `rook` class represents the Rookout SDK instance the breakpoint message has come from.
Example: `rook.platform`

| Attribute             | Type   | Description                                                           |
| --------------------- | ------ | --------------------------------------------------------------------- |
| **id**                | string | The SDK's ID                                                          |
| **executable**        | string | The application the SDK is running in                                 |
| **command_arguments** | list   | The full command line of the application                              |
| **platform**          | string | The platform (runtime) running the application                        |
| **platform_type**     | string | The sub-platform (runtime) running the application                    |
| **platform_version**  | string | The platform (runtime) version                                        |
| **os**                | string | The operating system the SDK is running on                            |
| **os_release**        | string | OS major version                                                      |
| **os_version**        | string | OS full version identifier                                            |
| **os_string**         | string | OS full information                                                   |
| **ip**                | string | The IP address as seen from within the machine the SDK is running on  |
| **external_ip**       | string | The IP address as seen from outside the machine the SDK is running on |
| **user_commit**       | string | The application's git commit identifier                               |
| **process_id**        | int    | The application's process id                                          |
| **version**           | string | The SDK's version number                                              |
| **commit**            | string | The SDK's commit identifier                                           |
| **hostname**          | string | The hostname of the machine the SDK is running on                     |
| **labels**            | string | The labels defined for the SDK                                        |

### Breakpoint Class

The `bp` class represents the breakpoint that is being edited.
Example: `bp.lineno`

| Attribute      | Type   | Description                                   |
| -------------- | ------ | --------------------------------------------- |
| **user_email** | string | The email of the user who set the breakpoint  |
| **filename**   | string | The file name in which the breakpoint was set |
| **lineno**     | int    | Line number the breakpoint was set in         |
| **sha256**     | string | The SHA256 value of the file                  |

### Controller Class

The `controller` class represent the ETL Controller the messsage has come through.
Example: `controller.id`

| Attribute    | Type   | Description                        |
| ------------ | ------ | ---------------------------------- |
| **id**       | string | The Controller's id                |
| **hostname** | string | The Controller's hostname          |
| **ip**       | string | The Controller's IP address        |
| **platform** | string | The controller's machine platform  |
| **version**  | string | The controller's version           |
| **commit**   | string | The controller's commit identifier |
