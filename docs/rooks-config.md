---
id: rooks-config
title: Rook Configuration
---

Rooks can be configured using configuration files and environment variables.<br/>
Configuration values are loaded with the following precedence:
1. Environment Variables
1. Application Specific Configuration File
1. Global Configuration File
1. Rook Defaults

## Configuration Sources

#### 1. Environment Variables

Environment variables for the hosting application can be used for on the fly configuration of the Rook.
Only the most basic configurations can be accessed this way:

| ROOKOUT_AGENT_HOST | ROOKOUT_AGENT_PORT | ROOKOUT_TOKEN | ROOKOUT_ROOK_TAGS |
|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------:|:--------------------------------------------------------------:|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Host running the Rookout agent to connect to.<br/><br/>The default value is LOCALHOST.<br/><br/>**WARNING:** The communication medium between the Rook and the agent is assumed to be secure by nature. Do not communicate over the open internet! | Port number the Rookout agent is listening on.<br/><br/>The default value is 7486. | Auth Token of your organization if using an agentless solution | A list of semicolon `;` separated values (tags) that will be added to the Rook's identity.<br/>Those will be available both for the scripting engine and the frontend.<br/><br/>The default value is an empty list. |

#### 2. Application Specific Configuration File

If there's a "rookout-config.json" file in the same directory as the application being executed, it will be loaded and
loaded by the Rook.

#### 3. Global Configuration File

If there's a global configuration file in the path "/etc/rookout/rook-config.json" it will be loaded by the Rook.

#### 4. Rook Defaults

Any configuration value not otherwise specified will use the default value built into the Rook.

## Configuration Files

All configuration files use the same format and are loaded in the same manner in the order of precedence described above.

### Configuration File Format

All configuration files use the JSON format and are namespace oriented. 

For example, check out this configuration file:
```json
{
  "LoggingConfiguration" : {
    "LOGGER_NAME": null,
    "FILE_NAME": "rookout.log",
    "LOG_TO_STDERR": true
  },
  "AgentAddress" : {
    "HOST": "rookout-agent"
  }
}
```

The above configuration affects two namespaces the LoggingConfiguration in charge of Rook internal logging and the 
AgentAddress configuration in charge of resolving the Rookout Agent network address.

### Configuration File Contents

##### LoggingConfiguration
This namespace is in charge of configuring the Rook's internal logging.

| Configuration | Meaning | Type | Default | Platforms | 
|---------------|---------|------|---------|-----------|
|LOGGER_NAME| Logger name to be used by the Rook | String | "Rook" | Java, Python |
|FILE_NAME| File name to be used by the logger. To stop logging to file use an empty string. | String | rookout/(platform)-rook.log | Java, Python |
|LOG_TO_STDERR| Will logger write to console (stderr) | Boolean | False | Java, Python |
|LOG_LEVEL| Log level to be used by the Rook (following the python levels) | String | WARNING | Java, Python |
|PROPAGATE_LOGS| Will logs be propagated to parent loggers | Boolean | False | Java, Python

##### DefaultConfiguration
This namespace is in charge of the configuration mechanism itself. It can be used by the global configuration file to 
affect the application configuration file. 

| Configuration | Meaning | Type | Default | Platforms | 
|---------------|---------|------|---------|-----------|
|LOAD_FROM_APP_FOLDER| Will the application configuration file be loaded | Boolean | True | Java, Python

##### AgentAddress
This namespace is in charge of defining the network address of the Rookout Agent.

| Configuration | Meaning | Type | Default | Platforms | 
|---------------|---------|------|---------|-----------|
|HOST|Rookout Agent hostname|String|"localhost"|Java, Python
|PORT|Rookout Agent port|int|9090|Java, Python

##### OutputConfiguration

| Configuration | Meaning | Type | Default | Platforms | 
|---------------|---------|------|---------|-----------|
|FLUSH_TIME_INTERVAL|Interval the Rook will flush messages to the Agent|float|0.25|Java, Python
|MAX_ITEMS|Maximum number of messages the Rook will hold in memory|int|1000|Java, Python

##### ImportServiceConfig
This namespace is in charge of import monitoring configuration in Python.

| Configuration | Meaning | Type | Default | Platforms | 
|---------------|---------|------|---------|-----------|
|USE_IMPORT_HOOK|Will the import hook be used. Will affect ImportError traceback.|Boolean|False|Python
|SYS_MODULES_QUERY_INTERVAL|Interval to look for new modules in sys.modules|float|0.25|Python

##### LoggingServiceConfig

This namespace is in charge of logging monitoring configuration in.

| Configuration | Meaning | Type | Default | Platforms | 
|---------------|---------|------|---------|-----------|
|BASIC_CONFIG_ROOT|Will logging.basicConfig() before installing Rook log handlers|Boolean|True|Python
