---
id: breakpoints-conditional
title: Conditional Breakpoints
---

Receiving too many messages while debugging can be confusing, especially when looking for a specific use case. That is where conditional breakpoints come into play - you can use conditions and filter out just the data you need.

Conditional breakpoints allow you to limit the data collected. You will only collect data when the defined expression evaluates as true.
This makes it possible to debug specific scenarios and limit the number of messages you receive.

Setting a condition is done by right-clicking on a breakpoint and selecting the 'Edit' option.

<iframe width="560" height="315" src="https://www.youtube.com/embed/IkuvAH52PVA" frameborder="0" allow="autoplay; encrypted-media;" allowfullscreen></iframe>

### Rookout provides two types of conditions:
- Simple - compare the values of one or two variables.
- Advanced - define a complex condition using logical parameters (use "&&" for AND statement,  "||" for OR statement, "(" and ")" for encapsulation).

### Advanced conditions - supported operators and functions:

| Operator  | Example | Description |
| --- | --- | --- |
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

**Keep in mind:** 
1. The supported syntax may differ between languages.
