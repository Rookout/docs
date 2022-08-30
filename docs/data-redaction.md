---
id: data-redaction
title: Data Redaction
sidebar_label: Data Redaction
---
Rookout offers data redaction rules to let you control sensitive data and specify which data it should not collect.
In the **Data Redaction** page under the settings menu, an admin can define data redaction using regular expression patterns.

<img src="/img/screenshots/data_redaction_example_1.png" />

For example, adding a rule for the variable name “secretKey” replaces the output `“secretKey”:“12345”` with `“secretKey”:“[REDACTED]“`.
Adding a rule regarding the variable value “[0-9]+” will replace `“nameAndPassword”:“LordHelmet-12345”` with `“nameAndPassword”:“LordHelmet-****“`.

Replacing the data redaction method to “Include-list” redacts all variable names and values, except those specified in the list.

**Please note, data redaction settings only apply to breakpoints set after the configuration change.**

The regular expressions expected syntax is the [RE2](https://github.com/google/re2/wiki/Syntax). The use of flags is currently unsupported. Case sensitivity can be set using the checkbox to the left of any list item.

<iframe width={600} height={300} src="https://www.youtube.com/embed/dJgit1yPem4" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true} />
