---
id: breakpoints-conditional
title: Conditional breakpoints
---


Conditional breakpoints limit data collection from a code snippet to cases when the defined expression evaluates as true.

<iframe style="margin: 20px 0 0 0" width="560" height="315" src="https://www.youtube.com/embed/iua-P2o6U9w" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>


### Rookout provides two types of conditions:
- Simple - compare the value of one or two variables.
- Advanced - define a complex condition using logical parameters (use "&&" for AND statement,  "||" for OR statement, "(" and ")" for encapsulation).

### Add and Edit Conditional breakpoints:
- Set a breakpoint.
- Click on the <img src="/img/screenshots/edit.png" height="15" width="22" > icon in the breakpoint pane.
- Choose condition type - Simple or Advanced.
- Set your condition.

### Advanced conditions - supported operators and functions:

| Operator  | Example  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Description |
| ------------ | ----------------------- | ------------- |
| `==` | `a==1`, `b=='bbb'`, `x==y`  | 	If the values of two operands are equal, then the condition becomes true. |
| `!=` | `a!=1`, `b!='bbb'`, `x!=y`  |  If values of two operands are not equal, then condition becomes true. |
| `>` | `a>1`, `x>y`  | If the value of left operand is greater than the value of right operand, then condition becomes true. |
| `>=` | `a>=1`, `x>=y`  | If the value of left operand is greater than or equal to the value of right operand, then condition becomes true. |
| `<` | `a<1`, `x<y` | If the value of left operand is less than the value of right operand, then condition becomes true. |
| `<=` | `a<=1`, `x<=y` | If the value of left operand is less than or equal to the value of right operand, then condition becomes true. |
| `&&` | `a<=1 && b!='bbb'` |  If both the operands are true then condition becomes true. |
| <code> &#124;&#124;</code> | `a<=1`<code>&#124;&#124;</code>`b=='bbb'`  | If any of the two operands are non-zero then condition becomes true. |
| `()` | `(a<=1`<code>&#124;&#124;</code>`b=='bbb') && (x<y)` | Parentheses could be used for changing the precedence when evaluating the conditio |
| `[]` | `arr[4]!=4`, `dict['a']!=4`  | Set conditions regarding to a specific sequence’s element - list, dict etc. |
| `size` | `arr.size() >= 32` | Use size instead of len or length on any platform |

