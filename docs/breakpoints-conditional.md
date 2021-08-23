---
id: breakpoints-conditional
title: Conditional breakpoints
---

A large amount of messages in a Debug Session can be confusing at times, especially when trying to solve a specific bug or find a certain use case. 
For a faster debugging experience - you can refine data and filter out irrelevant messages by setting a Conditional Breakpoint. 

Conditional breakpoints allow you to limit the data collected from a code snippet. You will only collect data when the defined expression evaluates as true.
This makes it possible to debug specific scenarios, and limit the messages that you are collection.

Add a breakpoint condition by right clicking on a breakpoint and selecting the 'Edit' option. After selecting 'Advance', a right pane will open up. Click on the arrow next to 'Condition', enter the condition expression you wish to use (either through the basic or advanced editor) and click 'Set' at the bottom of the pane.

<iframe width="560" height="315" src="https://www.youtube.com/embed/IkuvAH52PVA" frameborder="0" allow="autoplay; encrypted-media;" allowfullscreen></iframe>

### Rookout provides two types of conditions:
- Simple - compare the values of one or two variables.
- Advanced - define a complex condition using logical parameters (use "&&" for AND statement,  "||" for OR statement, "(" and ")" for encapsulation).

### Advanced conditions - supported operators and functions:

| Operator  | Example  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Description |
| ------------ | ----------------------- | ------------- |
| `==` | `a==1`, `b=='bbb'`, `x==y`  | 	If the values of two operands are equal, then the condition becomes true. |
| `!=` | `a!=1`, `b!='bbb'`, `x!=y`  |  If values of two operands are not equal, then condition becomes true. |
| `>` | `a>1`, `x>y`  | If the value of left operand is greater than the value of right operand, then condition becomes true. |
| `>=` | `a>=1`, `x>=y`  | If the value of left operand is greater than or equal to the value of right operand, then condition becomes true. |
| `<` | `a<1`, `x<y` | If the value of left operand is less than the value of right operand, then condition becomes true. |
| `<=` | `a<=1`, `x<=y` | If the value of left operand is less than or equal to the value of right operand, then condition becomes true. |
| `in` | `'bbb' in a` | If the value of the left operand is included in the right operand, then the condition becomes true. |
| `&&` | `a<=1 && b!='bbb'` |  If both the operands are true then condition becomes true. |
| <code> &#124;&#124;</code> | `a<=1`<code>&#124;&#124;</code>`b=='bbb'`  | If any of the two operands are non-zero then condition becomes true. |
| `()` | `(a<=1`<code>&#124;&#124;</code>`b=='bbb') && (x<y)` | Parentheses could be used for changing the precedence when evaluating the conditio |
| `[]` | `arr[4]!=4`, `dict['a']!=4`  | Set conditions regarding to a specific sequence’s element - list, dict etc. |
| `size` | `arr.size() >= 32` | Use size instead of len or length on any platform |


* Evaluating functions are currently not supported in conditions. 


**Keep in mind:** 
1. The supported syntax may be different from your dev language and it can be confusing - just make sure you use the supported operators above.  
2. A condition can be invalid due to typos and wrong variables. Please check that your variables are written correctly. 

### Breakpoint Limits:

You can set limits on individual breakpoints to limit the amount of data that is collected. When the limits are reached, the breakpoint will be disabled automatically. Once disabled it will not collect additional snapshot data, even if the code is triggered. The user may re-enable the breakpoint by right clicking on it and selecting Enable.

The limits can be based on:
- Time (e.g. 1 Hour, 24 hours, a week etc.)
- Hit limit (based on the number of times that the breakpoint gets triggered)

<iframe src="https://www.youtube.com/watch?v=nQGP8GUpWXY" width="640" height="400" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
